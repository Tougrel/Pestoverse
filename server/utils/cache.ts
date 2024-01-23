import { type H3Event } from "h3";

// 2 Hours
const CACHE_TTL = 60 * 60 * 2;

type CacheValue = {
    value: any;
    expiry: number | null;
};

const localCacheData: { [key: string]: CacheValue } = {};

export function getCacheStore(event: H3Event): CacheStore {
    const isCloudflare = "cloudflare" in event.context;
    if (isCloudflare) {
        return new CloudflareCacheStore(event.context.cloudflare.env.KV_CACHE);
    }
    return new LocalCacheStore();
}

export const getFromCache = async (event: H3Event, key: string) => {
    const cache = getCacheStore(event);

    let cacheValue = await cache.get(key, { type: "json" });
    console.log("got value", cacheValue, typeof cacheValue, "for", key);
    let result = null;
    if (cacheValue !== null && JSON.stringify(cacheValue) !== "{}") {
        result = cacheValue;
    }
    return result;
};

export const updateCache = async (event: H3Event, key: string, value: any, ttl: number = 0) => {
    const cache = getCacheStore(event);
    console.log("adding value", value, "with ttl", ttl);
    const cacheOpts = {} as KVNamespacePutOptions;
    if (ttl > 0) {
        cacheOpts.expirationTtl = ttl;
    }
    await cache.put(key, JSON.stringify(value), cacheOpts);
    return value;
};

export const getOrRefreshCache = async (event: H3Event, key: string, data: (db: ReturnType<typeof getDb>) => any, ttl: number = CACHE_TTL) => {
    const context = event.context;
    const db = getDb(context);

    let result = await getFromCache(event, key);

    if (result === null) {
        result = await data(db);
        return await updateCache(event, key, result, ttl);
    }

    return result;
};

interface CacheStore {
    get(key: string, options?: KVNamespaceGetOptions<"json">): Promise<unknown>;
    put(key: string, value: string, options?: KVNamespacePutOptions): Promise<void>;
    list(options?: KVNamespaceListOptions): Promise<KVNamespaceListResult<unknown, string>>;
}

class CloudflareCacheStore implements CacheStore {
    store: KVNamespace;

    constructor(store: KVNamespace) {
        this.store = store;
    }
    async get(key: string, options?: KVNamespaceGetOptions<"json">): Promise<unknown> {
        return await this.store.get(key, options);
    }

    async put(key: string, value: string, options?: KVNamespacePutOptions): Promise<void> {
        await this.store.put(key, value, options);
    }

    async list(options?: KVNamespaceListOptions): Promise<KVNamespaceListResult<unknown, string>> {
        return await this.store.list(options);
    }
}

class LocalCacheStore implements CacheStore {
    async get(key: string, options?: KVNamespaceGetOptions<"json">): Promise<unknown> {
        if (!(key in localCacheData)) {
            return null;
        }
        const value = localCacheData[key];
        if (value.expiry !== null && Date.now() >= value.expiry) {
            delete localCacheData[key];
            return null;
        }
        const result = value.value;
        if (result === null || options?.type !== "json") {
            return result;
        }
        return JSON.parse(result);
    }

    async put(key: string, value: string, options?: KVNamespacePutOptions): Promise<void> {
        const ttl = options?.expirationTtl || null;
        let expiry = null;
        if (ttl) {
            expiry = Date.now() + ttl * 1000;
        }
        localCacheData[key] = {
            value,
            expiry,
        };
    }

    async list(_options?: KVNamespaceListOptions): Promise<KVNamespaceListResult<unknown, string>> {
        const keys: KVNamespaceListKey<unknown, string>[] = Object.entries(localCacheData).map(([key, value]) => {
            return {
                name: key,
                expiration: value.expiry,
            } as KVNamespaceListKey<unknown, string>
        })

        return {
            keys,
            list_complete: true,
            cacheStatus: null
        }
    }
}
