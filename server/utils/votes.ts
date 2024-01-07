import { and, eq, inArray, sql, count, desc } from "drizzle-orm";

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

export async function getTopVotesByCategory(db: Database) {
    type ResultData = {
        categoryId: number;
        label: string;
        entryCount: number;
    };
    // for some reason select({}) is valid, but typescript doesn't like it
    const data = (await db
        // @ts-ignore
        .select({
            categoryId: submissions.categoryId,
            label: sql`lower(${submissions.submission})`,
            entryCount: count(submissions.submission),
        })
        .from(submissions)
        .groupBy(sql`lower(${submissions.submission})`, submissions.categoryId)
        .orderBy(desc(count(submissions.submission)))) as unknown as ResultData[];
    const categories = data.reduce((acc, current) => {
        const { categoryId } = current;
        if (categoryId === undefined) return acc;
        if (acc.has(categoryId)) {
            acc.get(categoryId)?.push(current);
        } else {
            acc.set(categoryId, [current]);
        }
        return acc;
    }, new Map<number, ResultData[]>());
    categories.forEach((value) => {
        value.sort((a, b) => b.entryCount - a.entryCount);
        value.splice(4);
        value.sort((a, b) => a.label?.localeCompare(b.label));
    });
    return Object.fromEntries(categories);
}
