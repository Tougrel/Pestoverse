import { getDb } from "./database";
import { type H3Event } from "h3";

// 2 Hours
const CACHE_TTL = 60 * 60 * 2;

export const getFromCache = async (event: H3Event, key: string, data: (db: ReturnType<typeof getDb>) => any, ttl: number = CACHE_TTL) => {
    const context = event.context;
    const db = getDb(context);

    const isCloudflare = "cloudflare" in context;

    let result = null;

    if (isCloudflare) {
        const cache: KVNamespace = context.cloudflare.env.KV_CACHE;
        let cacheValue = await cache.get(key, { type: "json" });
        console.log("got value", cacheValue, typeof cacheValue);
        if (cacheValue !== null && JSON.stringify(cacheValue) !== "{}") {
            result = cacheValue;
        } else {
            cacheValue = await data(db);
            console.log("adding value", cacheValue);
            await cache.put(key, JSON.stringify(cacheValue), { expirationTtl: ttl });
            result = cacheValue;
        }
    } else {
        result = data(db);
    }

    return result;
};
