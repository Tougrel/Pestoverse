import { submissions } from "~/server/db/schema";
import { authOptions } from "~/server/api/auth/[...]";
import { getServerSession } from "#auth";
import { getFromCache } from "~/server/db/cache";

export default defineEventHandler(async (event) => {
    const session = await getServerSession(event, authOptions);
    if (!session) {
        throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
    }
    const value = await getFromCache(event, "submission_names", async (db) => {
        // @ts-ignore
        const result = await db.selectDistinct({ submission: submissions.submission }).from(submissions).orderBy(submissions.submission);
        return result.map((submission) => submission.submission);
    });
    return value;
});
