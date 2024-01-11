export default defineEventHandler(async (event) => {
    const session = await getLoggedInSession(event);
    const discordId = session.profile.id;
    const db = getDb(event.context);
    const result = await getVotes(db, discordId);
    return result.reduce((obj, item) => Object.assign(obj, { [item.categoryId]: item.optionId }), {});
});
