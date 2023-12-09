import { getDb } from "~/server/db/database";
import { categories } from "~/server/db/schema";

export default defineEventHandler(async (event) => {
    const db = getDb(event.context);
    const result = await db.select().from(categories).all();
    return result;
});
