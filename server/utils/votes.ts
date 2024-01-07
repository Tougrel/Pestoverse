import { and, eq, inArray } from "drizzle-orm";

type Database = ReturnType<typeof getDb>;

export type VoteEntry = {
    id?: number;
    categoryId: number;
    optionId: number;
};

export async function getVotes(db: Database, userId: string): Promise<Vote[]> {
    return await db.select().from(votes).where(eq(votes.discordId, userId));
}

export async function addVotes(db: Database, userId: string, entries: VoteEntry[]): Promise<void> {
    const voteList: InsertVote[] = entries.map((entry) => ({
        discordId: userId,
        categoryId: entry.categoryId,
        optionId: entry.optionId,
    }));
    if (voteList.length > 0) {
        await db.insert(votes).values(voteList);
    }
}

export async function deleteVotes(db: Database, userId: string, ids: number[]): Promise<void> {
    if (ids.length > 0) {
        await db.delete(votes).where(and(inArray(votes.id, ids), eq(votes.discordId, userId)));
    }
}

export async function updateVotes(db: Database, userId: string, entries: VoteEntry[]) {
    for (let i in entries) {
        let entry = entries[i];
        if (entry.id === undefined) {
            continue;
        }
        await db
            .update(votes)
            .set({
                optionId: entry.optionId,
            })
            .where(and(eq(votes.id, entry.id), eq(votes.discordId, userId)));
    }
}
