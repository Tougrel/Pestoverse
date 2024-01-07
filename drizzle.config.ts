import type { Config } from "drizzle-kit";

export default {
    schema: "./utils/db/schema.ts",
    out: "./migrations",
    driver: "better-sqlite",
    dbCredentials: { url: "./local.db" },
} satisfies Config;
