import { categories } from "~/server/utils/db/schema";

export default defineEventHandler(async (event) => {
    return await getFromCache(event, "categories", async (db) => {
        // @ts-ignore
        return await db.select().from(categories).all();
    });
});
