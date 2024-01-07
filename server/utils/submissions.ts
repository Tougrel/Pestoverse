import { and, eq, inArray, or } from "drizzle-orm";

type Database = ReturnType<typeof getDb>;

export type SubmissionEntry = {
    id?: number;
    categoryId: number;
    value: string | null;
    updateId?: boolean;
};

const BASE_SUBMISSION = {
    userId: 0,
};

export async function getSubmissions(db: Database, userId: string): Promise<Submission[]> {
    return await db
        .select()
        .from(submissions)
        .where(or(eq(submissions.discordId, userId), eq(submissions.userId, parseInt(userId))));
}

export async function addSubmissions(db: Database, userId: string, entries: SubmissionEntry[]): Promise<void> {
    const submissionList: InsertSubmission[] = entries.map((entry) => ({
        ...BASE_SUBMISSION,
        discordId: userId,
        categoryId: entry.categoryId,
        submission: entry.value,
    }));
    if (submissionList.length > 0) {
        await db.insert(submissions).values(submissionList);
    }
}

export async function deleteSubmissions(db: Database, userId: string, ids: number[]): Promise<void> {
    if (ids.length > 0) {
        await db.delete(submissions).where(and(inArray(submissions.id, ids), or(eq(submissions.discordId, userId), eq(submissions.userId, parseInt(userId)))));
    }
}

export async function updateSubmissions(db: Database, userId: string, entries: SubmissionEntry[]) {
    for (let i in entries) {
        let entry = entries[i];
        if (entry.id === undefined) {
            continue;
        }
        let updateData = {
            submission: entry.value,
        } as { submission: string | null; discordId?: string; userId?: number };
        if (entry.updateId) {
            updateData = {
                discordId: userId,
                ...BASE_SUBMISSION,
                ...updateData,
            };
        }
        await db.update(submissions).set(updateData).where(eq(submissions.id, entry.id));
    }
}
