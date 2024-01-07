import { drizzle } from "drizzle-orm/better-sqlite3";
import { submissions, categories } from "../server/utils/db/schema";
import SQLiteDatabase from "better-sqlite3";

const examples = [
    "abba_demon_pestie",
    "aleghor",
    "alleycatto",
    "andreapower04",
    "bardowo",
    "blau",
    "bootfighter",
    "chubby ghost",
    "cynomore",
    "d3minded",
    "destroysc",
    "divisibleone",
    "dyarikku",
    "eldritch_dragon",
    "eskimoish",
    "evangellium",
    "every kamila artworks",
    "everyone",
    "flame_leo18",
    "franek89",
    "furu",
    "geolounge",
    "goblotrash69",
    "graysilverain",
    "greenmst",
    "happy nep nep",
    "hitomi",
    "hitomi okami",
    "honeba",
    "itsdhoru",
    "j_only_j",
    "kiri_noh",
    "koalafrank",
    "kobutanori",
    "korporal quark",
    "kuroiyoko",
    "lesheran",
    "loghog",
    "lorenzo-z",
    "manateck",
    "marilu",
    "mrbyte",
    "mrgrimmlore",
    "natsubun",
    "nnavy15",
    "otakud",
    "pardzival",
    "pickle",
    "porygonz7727",
    "razu",
    "rhei75",
    "saachichu",
    "salty_stoic",
    "samin",
    "saykoro",
    "shaezonai",
    "spukycat",
    "syrionino",
    "tanaino/tanaros",
    "thunderwing_ds",
    "toropokoro",
    "tougrel",
    "tougrel&ikanexus",
    "vihilsta",
    "vihilsta or eskimoish",
    "weeabooski",
    "xion511",
    "ysondoa",
    "yukiiarts",
    "zeroyonder",
    "zoiyya",
];

const getRandomExample = () => {
    const index = Math.floor(Math.random() * examples.length);
    return examples[index];
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
            await db.insert(submissions).values({
                userId: 0,
                discordId: "" + user,
                categoryId: category,
                submission: getRandomExample(),
            });
        }
    }
};

main();
