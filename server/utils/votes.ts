import { and, eq, inArray, sql, count, desc, lt } from "drizzle-orm";

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
        rank?: number;
    };
    const rankedSubmissions = db
        //@ts-expect-error TS doesn't like overloaded methods on union types
        .select({
            categoryId: submissions.categoryId,
            submission: sql`lower(${submissions.submission})`.as("submission"),
            entryCount: count(submissions.submission).as("entryCount"),
            rank: sql`row_number() over (partition by ${submissions.categoryId} order by count(*) desc)`.as("rank"),
        })
        .from(submissions)
        .groupBy(sql`lower(${submissions.submission})`, submissions.categoryId)
        .as("rankedSubmissions");
    const data = (await db
        // @ts-expect-error
        .select({
            categoryId: rankedSubmissions.categoryId,
            label: rankedSubmissions.submission,
            // @ts-expect-error says it doesn't exist, but it does
            entryCount: rankedSubmissions.entryCount,
            // @ts-expect-error says it doesn't exist, but it does
            rank: rankedSubmissions.rank,
        })
        .from(rankedSubmissions)
        // @ts-expect-error says it doesn't exist, but it does
        .where(lt(rankedSubmissions.rank, 5))
        .orderBy(rankedSubmissions.submission)) as unknown as ResultData[];
    const categories = data.reduce(
        (acc, current) => {
            const { categoryId } = current;
            if (categoryId in acc) {
                acc[categoryId].push(current);
            } else {
                acc[categoryId] = [current];
            }
            return acc;
        },
        {} as { [categoryId: number]: ResultData[] },
    );
    return categories;
}
