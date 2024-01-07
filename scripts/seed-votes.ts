import { drizzle } from "drizzle-orm/better-sqlite3";
import { categories, votes } from "../server/utils/db/schema";
import SQLiteDatabase from "better-sqlite3";

const getRandomVote = () => {
    return Math.floor(Math.random() * 4); // 0-3
};

const main = async () => {
    const count = 10;
    const db = drizzle(new SQLiteDatabase("local.db"));
    const categoryData = db
        .select()
        .from(categories)
        .all()
        .map(({ id }) => id);
    for (let i = 0; i < count; i++) {
        const user = new Date().getTime();
        for (const i in categoryData) {
            const category = categoryData[i];
            await db.insert(votes).values({
                discordId: "" + user,
                categoryId: category,
                optionId: getRandomVote(),
            });
        }
    }
};

main();
