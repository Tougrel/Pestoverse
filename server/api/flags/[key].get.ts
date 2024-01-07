import { flags } from "../../db/schema";
import { eq } from "drizzle-orm";
import { getFromCache } from "~/server/db/cache";

export default defineEventHandler(async (event) => {
    const key = getRouterParam(event, "key");
    if (!key) {
        throw createError({ status: 400, statusMessage: "Invalid Setting" });
    }

    return await getFromCache(
        event,
        `flags_${key}`,
        async (db) => {
            const result = await db.select({ value: flags.value }).from(flags).where(eq(flags.key, key));
            if (result.length === 0) {
                throw createError({ status: 404, statusMessage: "Flag Not Found" });
            }
            return result[0];
        },
        -1,
    );
});
