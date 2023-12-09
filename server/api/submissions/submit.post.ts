import { getDb } from "~/server/db/database";
import { submissions, Submission } from "~/server/db/schema";
import { authOptions } from "~/server/api/auth/[...]";
import { getServerSession } from "#auth";
import { eq, inArray } from "drizzle-orm";

type RequestSubmission = Omit<Submission, "id" | "userId">;

const normaliseBody = (body: { [key: string]: string }): RequestSubmission[] => {
    const result = [];
    for (const [key, value] of Object.entries(body)) {
        if (!isNaN(Number(key))) {
            result.push({ categoryId: Number(key), submission: value });
        }
    }
    return result;
};

const findDeleted = (existingSubmissions: Submission[], body: RequestSubmission[]) => {
    return existingSubmissions.filter((submission) => body.every((b) => b.categoryId !== submission.categoryId)).map((submission) => submission.id);
};

const findNew = (existingSubmissions: Submission[], body: RequestSubmission[], userId: number) => {
    return body.filter((b) => !existingSubmissions.some((s) => s.categoryId === b.categoryId)).map((submission) => ({ ...submission, userId: userId }));
};

const findUpdated = (existingSubmissions: Submission[], body: RequestSubmission[]) => {
    return body
        .filter((b) => existingSubmissions.some((s) => s.categoryId === b.categoryId && s.submission !== b.submission))
        .map((b) => ({ ...b, id: existingSubmissions.find((s) => s.categoryId === b.categoryId)?.id }));
};

export default defineEventHandler(async (event) => {
    const session = await getServerSession(event, authOptions);
    if (!session) {
        throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
    }
    const body = await readBody(event);
    const userId = parseInt(session.profile.id);
    const db = getDb(event.context);
    const existingSubmissions = await db.select().from(submissions).where(eq(submissions.userId, userId)).all();
    const requestSubmissions = normaliseBody(JSON.parse(body));

    const deletedSubmissions = findDeleted(existingSubmissions, requestSubmissions);
    const newSubmissions = findNew(existingSubmissions, requestSubmissions, userId);
    const updatedSubmissions = findUpdated(existingSubmissions, requestSubmissions);

    if (deletedSubmissions.length > 0) {
        console.log("deleting", deletedSubmissions);
        await db.delete(submissions).where(inArray(submissions.id, deletedSubmissions));
    }
    if (newSubmissions.length > 0) {
        console.log("adding", newSubmissions);
        await db.insert(submissions).values(newSubmissions);
    }
    updatedSubmissions
        .filter((s) => s.id !== undefined)
        .forEach(async (s) => {
            if (s.id === undefined) {
                console.log("existing submission id is null, skipping", s);
                return;
            }
            console.log("updating", s);
            await db.update(submissions).set({ submission: s.submission }).where(eq(submissions.id, s.id));
        });
});
