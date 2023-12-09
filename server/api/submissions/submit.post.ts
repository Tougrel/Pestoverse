import { getDb } from "~/server/db/database";
import { submissions, categories } from "~/server/db/schema";

export default defineEventHandler(async (event) => {
    const db = getDb(event.context);
    const submissionsResult = await db.select().from(submissions).all();
    const categoriesResult = await db.select().from(categories).all();
    return {
        submissions: submissionsResult,
        categories: categoriesResult,
    };
});
