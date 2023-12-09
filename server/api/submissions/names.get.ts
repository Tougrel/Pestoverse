import { getDb } from "~/server/db/database";
import { submissions } from "~/server/db/schema";
import { authOptions } from "~/server/api/auth/[...]";
import { getServerSession } from "#auth";

export default defineEventHandler(async (event) => {
    const session = await getServerSession(event, authOptions);
    if (!session) {
        throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
    }
    const db = getDb(event.context);
    const result = await db.selectDistinct({ submission: submissions.submission }).from(submissions).orderBy(submissions.submission);
    return result.map((submission) => submission.submission);
});
