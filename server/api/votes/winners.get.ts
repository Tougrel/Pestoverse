import { count, eq, sql } from "drizzle-orm";

type Winner = {
    name?: string;
    categoryId: number;
    optionId: number;
    voteCount: number;
    categoryName: string;
};

export default defineEventHandler(async (event) => {
    let options = await getFromCache(event, "voteOptions");
    if (!("cloudflare" in event.context)) {
        options = await getTopVotesByCategory(getDb(event));
    }
    console.log(options);
    return await getOrRefreshCache(
        event,
        "winners",
        async (db) => {
            const rankedVotes = db
                //@ts-expect-error TS doesn't like overloaded methods on union types
                .select({
                    categoryId: votes.categoryId,
                    optionId: votes.optionId,
                    voteCount: count(votes.optionId).as("voteCount"),
                    rank: sql`row_number() over (partition by ${votes.categoryId} order by count(*) desc)`.as("rank"),
                })
                .from(votes)
                .groupBy(votes.categoryId, votes.optionId)
                .as("rankedVotes");
            const winners = (await db
                //@ts-expect-error
                .select({
                    categoryId: rankedVotes.categoryId,
                    categoryName: categories.name,
                    optionId: rankedVotes.optionId,
                    //@ts-expect-error this does exist but TS says it doesn't
                    voteCount: rankedVotes.voteCount,
                })
                .from(rankedVotes)
                //@ts-expect-error this does exist but TS says it doesn't
                .where(eq(rankedVotes.rank, 1))
                .leftJoin(categories, eq(rankedVotes.categoryId, categories.id))) as unknown as Winner[];
            let result = winners.reduce(
                (acc, item) => {
                    const { categoryId, categoryName, voteCount, optionId } = item;
                    const winnerData = options[categoryId][optionId];
                    const name = winnerData.label;
                    acc[categoryName] = { name, votes: voteCount };
                    return acc;
                },
                {} as { [category: string]: { name: string; votes: number } },
            );
            return result;
        },
        15 * 60, // 15 minutes
    );
});
