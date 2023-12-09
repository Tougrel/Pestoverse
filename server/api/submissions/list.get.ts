import { getDb } from "~/server/db/database";
import { submissions } from "~/server/db/schema";
import { authOptions } from "~/server/api/auth/[...]";
import { getServerSession } from "#auth";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
    const session = await getServerSession(event, authOptions);
    if (!session) {
        throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
    }
    const userId = parseInt(session.profile.id);
    const db = getDb(event.context);
    const result = await db.select().from(submissions).where(eq(submissions.userId, userId));
    return result.reduce((obj, item) => Object.assign(obj, { [item.categoryId]: item.submission }), {});
});
