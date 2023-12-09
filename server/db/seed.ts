import { InsertCategory, categories } from "~/server/db/schema";
import { getDb } from "~/server/db/database";

const categoryList = [
    "Mod of the year",
    "Best Yunii fanart",
    "Artist of the year",
    "Most chaotic pestie",
    "Sussiest pestie",
    "Most gassy pestie",
    "Most biteable pestie",
    "The chaddest pestie",
    "Most gamba addicted pestie",
    "Best gambler",
    "Worst gambler",
    "Best gamer",
    "Most helpful pestie",
    "Most wholesome pestie",
    "Most nice pestie",
    "Best discord streamer",
    "Best discord chatter",
];

const main = async () => {
    const db = getDb({});
    const data: InsertCategory[] = categoryList.map((category) => {
        return { name: category };
    });
    console.log("Seeding categories:");
    console.log(data);
    await db.insert(categories).values(data);
    console.log("Seeding complete");
};

main();
