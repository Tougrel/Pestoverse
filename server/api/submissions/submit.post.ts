import { getDb } from "~/server/db/database";
import { submissions, Submission } from "~/server/db/schema";
import { authOptions } from "~/server/api/auth/[...]";
import { getServerSession } from "#auth";
import { eq, inArray } from "drizzle-orm";

type RequestSubmission = Omit<Submission, "id" | "userId">;
type NewSubmission = Omit<Submission, "id">;

const normaliseBody = (body: { [key: string]: string }): RequestSubmission[] => {
    const result = [];
    for (const [key, value] of Object.entries(body)) {
        if (!isNaN(Number(key)) && value !== "") {
            result.push({ categoryId: Number(key), submission: value });
        }
    }
    return result;
};

const findChanges = (
    existingSubmissions: Submission[],
    body: RequestSubmission[],
    userId: number,
): { created: NewSubmission[]; updated: Submission[]; deleted: number[] } => {
    body = body.map((submission) => {
        if (submission.submission) {
            return {
                ...submission,
                submission: submission.submission.trim(),
            };
        }
        return submission;
    });
    let updated: Submission[] = [];
    let deleted: number[] = [];
    existingSubmissions.forEach((submission) => {
        let pairedEntry = body.find((sub) => sub.categoryId == submission.categoryId);
        if (pairedEntry && pairedEntry.submission !== submission.submission) {
            updated.push({ id: submission.id, userId: submission.userId, ...pairedEntry });
        } else if (pairedEntry === undefined) {
            deleted.push(submission.id);
        }
    });

    const created: NewSubmission[] = body
        .filter((b) => !existingSubmissions.some((s) => s.categoryId === b.categoryId))
        .map((submission) => ({ ...submission, userId: userId }));

    return { created, updated, deleted };
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

    const submissionChanges = findChanges(existingSubmissions, requestSubmissions, userId);
    const newSubmissions = submissionChanges.created;
    const deletedSubmissions = submissionChanges.deleted;
    const updatedSubmissions = submissionChanges.updated;

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
