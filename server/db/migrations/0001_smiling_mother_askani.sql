DROP INDEX IF EXISTS `user_idx`;--> statement-breakpoint
DROP INDEX IF EXISTS `category_idx`;--> statement-breakpoint
ALTER TABLE submissions ADD `discord_id` text DEFAULT '' NOT NULL;--> statement-breakpoint
CREATE INDEX `discord_idx` ON `submissions` (`discord_id`);