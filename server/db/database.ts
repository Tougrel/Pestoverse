import { drizzle as drizzleD1 } from "drizzle-orm/d1";
import { drizzle as drizzleSqlite } from "drizzle-orm/better-sqlite3";
import SQLiteDatabase from "better-sqlite3";

export const getDb = (context: any) => {
    if ("cloudflare" in context) {
        return drizzleD1(context.cloudflare.env.DATABASE as D1Database);
    }
    return drizzleSqlite(new SQLiteDatabase("local.db"));
};
