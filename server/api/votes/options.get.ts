export default defineEventHandler(async (event) => {
    return await getFromCache(event, "voteOptions", async (db) => {
        const data = await db.select().from(voteOptions).all();
        const grouped = data.reduce((acc, current) => {
            const { categoryId } = current;
            const voteOption = {
                id: current.id,
                label: current.name,
            };
            if (categoryId === undefined) return acc;
            if (acc.has(categoryId)) {
                acc.get(categoryId)?.push(voteOption);
            } else {
                acc.set(categoryId, [voteOption]);
            }
            return acc;
        }, new Map<number, { id: number; label: string }[]>());
        // Sort the list of options so we don't always have the most voted at the top
        grouped.forEach((value) => {
            value.sort((a, b) => a.label.localeCompare(b.label));
        });
        const result = Object.fromEntries(grouped);
        return result;
    });
});
