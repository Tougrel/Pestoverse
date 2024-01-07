import { count, eq } from "drizzle-orm";
import { getTopVotesByCategory } from "~/server/utils/votes";

type Winner = {
    name?: string;
    categoryId: number;
    optionId: number;
    voteCount: number;
    categoryName: string;
};

export default defineEventHandler(async (event) => {
    const session = await getLoggedInSession(event);
    if (["256048990750113793", "769556133215862784"].indexOf(session.profile.id) == -1) {
        throw createError({ statusCode: 403, statusMessage: "Not allowed" });
    }
    const options = await getFromCache(event, "voteOptions", async (db) => {
        if ("cloudflare" in event.context) {
            throw createError({ statusCode: 400, statusMessage: "This should be cached..." });
        }
        return await getTopVotesByCategory(db);
    });
    return await getFromCache(
        event,
        "winners",
        async (db) => {
            const winners = (await db
                // @ts-ignore
                .select({
                    categoryId: votes.categoryId,
                    optionId: votes.optionId,
                    voteCount: count(votes.optionId),
                    categoryName: categories.name,
                })
                .from(votes)
                .leftJoin(categories, eq(votes.categoryId, categories.id))
                .groupBy(votes.categoryId, votes.optionId)) as unknown as Winner[];
            const results = winners.map((winner) => {
                const winnerData = options[winner.categoryId][winner.optionId];
                const winnerName = winnerData.label;
                return {
                    ...winner,
                    name: winnerName,
                };
            }) as Winner[];
            const winnersByCategory = results.reduce((acc, item) => {
                const { categoryName } = item;
                if (categoryName === undefined) return acc;
                if (acc.has(categoryName)) {
                    acc.get(categoryName)?.push(item);
                } else {
                    acc.set(categoryName, [item]);
                }
                return acc;
            }, new Map<string, Winner[]>());
            winnersByCategory.forEach((winners) => {
                winners.sort((a, b) => b.voteCount - a.voteCount);
                winners.splice(1);
            });
            return Object.fromEntries(winnersByCategory);
        },
        0, // don't want to automatically refresh this
    );
});
