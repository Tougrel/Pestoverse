import { integer, text, sqliteTable, index, sqliteView } from "drizzle-orm/sqlite-core";

export const categories = sqliteTable("categories", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    description: text("description").notNull(),
});

export const submissions = sqliteTable(
    "submissions",
    {
        id: integer("id").primaryKey({ autoIncrement: true }),
        userId: integer("user_id").notNull(),
        discordId: text("discord_id").notNull().default(""),
        categoryId: integer("category_id")
            .notNull()
            .references(() => categories.id),
        submission: text("submission"),
    },
    (table) => {
        return {
            userIdx: index("discord_idx").on(table.discordId),
        };
    },
);

export const submissionNamesView = sqliteView("submissions_view").as((qb) => qb.selectDistinct({ submission: submissions.submission }).from(submissions));

export type Category = typeof categories.$inferSelect;
export type InsertCategory = typeof categories.$inferInsert;

export type Submission = typeof submissions.$inferSelect;
export type InsertSubmission = typeof submissions.$inferInsert;
