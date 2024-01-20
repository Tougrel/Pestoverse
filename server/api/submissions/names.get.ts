import { submissions } from "~/server/utils/db/schema";

export default defineEventHandler(async (event) => {
    const session = await getLoggedInSession(event);
    const value = await getOrRefreshCache(
        event,
        "submission_names",
        async (db) => {
            // @ts-ignore
            const result = await db.selectDistinct({ submission: submissions.submission }).from(submissions).orderBy(submissions.submission);
            return result
                .map((submission) => submission.submission?.toLowerCase())
                .filter((item, index, arr) => {
                    return arr.indexOf(item) === index;
                })
                .sort();
        },
        15 * 60, // 15 minutes
    );
    return value;
});
