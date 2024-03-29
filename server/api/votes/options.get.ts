import { getTopVotesByCategory } from "~/server/utils/votes";

export default defineEventHandler(async (event) => {
    return await getOrRefreshCache(
        event,
        "voteOptions",
        async (db) => {
            return await getTopVotesByCategory(db);
        },
        0, // don't want to automatically refresh this
    );
});
