export default defineEventHandler(async (event) => {
    return await updateCache(event, "winnersReleased", true, 0);
});
