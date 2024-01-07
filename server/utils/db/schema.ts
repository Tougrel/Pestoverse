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
            userIdx: index("submissions_user_idx").on(table.discordId),
        };
    },
);

export const voteOptions = sqliteTable("vote_options", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    categoryId: integer("category_id")
        .notNull()
        .references(() => categories.id),
    name: text("name").notNull(),
});

export const votes = sqliteTable(
    "votes",
    {
        id: integer("id").primaryKey({ autoIncrement: true }),
        discordId: text("discord_id").notNull(),
        optionId: integer("option_id")
            .notNull()
            .references(() => voteOptions.id),
        categoryId: integer("category_id")
            .notNull()
            .references(() => categories.id),
    },
    (table) => {
        return {
            userIdx: index("votes_user_idx").on(table.discordId),
        };
    },
);

export const submissionNamesView = sqliteView("submissions_view").as((qb) => qb.selectDistinct({ submission: submissions.submission }).from(submissions));

export type Category = typeof categories.$inferSelect;
export type InsertCategory = typeof categories.$inferInsert;

export type Submission = typeof submissions.$inferSelect;
export type InsertSubmission = typeof submissions.$inferInsert;

export type VoteOption = typeof voteOptions.$inferSelect;

export type Vote = typeof votes.$inferSelect;
export type InsertVote = typeof votes.$inferInsert;
