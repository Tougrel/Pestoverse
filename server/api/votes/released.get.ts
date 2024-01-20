export default defineEventHandler(async (event) => {
    const released = await getFromCache(event, "winnersReleased");
    return {
        released: released === true
    }
});
