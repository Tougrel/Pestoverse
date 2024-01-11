import { Submission } from "~/server/utils/db/schema";

type RequestSubmission = Omit<Submission, "id" | "userId" | "discordId">;

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
): { created: SubmissionEntry[]; updated: SubmissionEntry[]; deleted: number[] } => {
    body = body.map((submission) => {
        if (submission.submission) {
            return {
                ...submission,
                submission: submission.submission.toLowerCase().trim(),
            };
        }
        return submission;
    });
    let updated: SubmissionEntry[] = [];
    let deleted: number[] = [];
    existingSubmissions.forEach((submission) => {
        let pairedEntry = body.find((sub) => sub.categoryId == submission.categoryId);
        let updateId = false;
        if (submission.userId !== 0 || submission.discordId === "") {
            updateId = true;
        }
        if ((pairedEntry && pairedEntry.submission !== submission.submission) || updateId) {
            let update = {
                id: submission.id,
                categoryId: submission.categoryId,
                updateId,
            };
            if (pairedEntry) {
                // should never really hit this, but just in case...
                updated.push({ value: pairedEntry.submission, ...update });
            } else {
                updated.push({ value: submission.submission, ...update });
            }
        } else if (pairedEntry === undefined) {
            deleted.push(submission.id);
        }
    });

    const created: SubmissionEntry[] = body
        .filter((b) => !existingSubmissions.some((s) => s.categoryId === b.categoryId))
        .map((submission) => ({ categoryId: submission.categoryId, value: submission.submission }));

    return { created, updated, deleted };
};

export default defineEventHandler(async (event) => {
    const session = await getLoggedInSession(event);
    const body = await readBody(event);
    const discordId = session.profile.id;
    const db = getDb(event.context);
    const existingSubmissions = await getSubmissions(db, discordId);
    const requestSubmissions = normaliseBody(JSON.parse(body));

    const submissionChanges = findChanges(existingSubmissions, requestSubmissions);

    await deleteSubmissions(db, discordId, submissionChanges.deleted);
    await addSubmissions(db, discordId, submissionChanges.created);
    await updateSubmissions(db, discordId, submissionChanges.updated);
});
