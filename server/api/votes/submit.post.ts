import { Vote } from "~/server/utils/db/schema";

type RequestVote = Omit<Vote, "id" | "discordId">;

const normaliseBody = (body: { [key: string]: string }): RequestVote[] => {
    const result = [];
    for (const [key, value] of Object.entries(body)) {
        if (!isNaN(Number(key)) && value !== "") {
            result.push({ categoryId: Number(key), optionId: Number(value) });
        }
    }
    return result;
};

const isOpen = () => {
    const currentTime = Date.now();
    const closingTime = Date.UTC(2024, 0, 20, 0, 0, 0);
    return currentTime < closingTime;
}

const findChanges = (existingVotes: Vote[], body: RequestVote[]): { created: VoteEntry[]; updated: VoteEntry[]; deleted: number[] } => {
    let updated: VoteEntry[] = [];
    let deleted: number[] = [];
    existingVotes.forEach((vote) => {
        let pairedEntry = body.find((sub) => sub.categoryId == vote.categoryId);
        if (pairedEntry && pairedEntry.optionId !== vote.optionId) {
            let update = {
                id: vote.id,
                categoryId: vote.categoryId,
            };
            if (pairedEntry) {
                // should never really hit this, but just in case...
                updated.push({ optionId: pairedEntry.optionId, ...update });
            } else {
                updated.push({ optionId: vote.optionId, ...update });
            }
        } else if (pairedEntry === undefined) {
            deleted.push(vote.id);
        }
    });

    const created: VoteEntry[] = body.filter((b) => !existingVotes.some((s) => s.categoryId === b.categoryId));

    return { created, updated, deleted };
};

export default defineEventHandler(async (event) => {
    const session = await getLoggedInSession(event);
    const body = await readBody(event);
    const discordId = session.profile.id;
    const db = getDb(event.context);
    const existingVotes = await getVotes(db, discordId);
    const requestVotes = normaliseBody(JSON.parse(body));

    if (!isOpen()) {
        throw createError({ statusCode: 400, statusMessage: "Voting is now closed."});
    }

    const voteChanges = findChanges(existingVotes, requestVotes);

    await deleteVotes(db, discordId, voteChanges.deleted);
    await addVotes(db, discordId, voteChanges.created);
    await updateVotes(db, discordId, voteChanges.updated);
});
