import type { KVItemSettings, Settings } from "@pestoverse/dashboard";
import RelativeTime from '@yaireo/relative-time';

const relativeTime = new RelativeTime();

export default defineEventHandler(async (event) => {
    // const session = await getLoggedInSession(event);
    const cache = getCacheStore(event);
    const cacheKeys = await cache.list();
    const kvItems: KVItemSettings[] = cacheKeys.keys.map(item => {
        let expiryString = "N/A";
        const expiration = item.expiration || 0;
        if (expiration > 0) {
            expiryString = relativeTime.from(new Date(Date.now() + expiration));
        }
        return {
           key: item.name,
           expiry: expiryString 
        }
    });
    const result: Settings = {
        awards: {
            nominations_start: "2023-12-29T00:00",
            nominations_end: "2024-01-12T00:00",
            voting_start: "2024-01-12T00:00",
            voting_end: "2024-01-19T00:00",
        },
        toggles: {
            toggle1: {
                name: "Toggle 1",
                value: true
            },
            toggle2: {
                name: "Toggle 2",
                value: false
            },
            toggle3: {
                name: "Toggle 3",
                value: true
            }
        },
        kv_items: kvItems
    }
    return result;
});
