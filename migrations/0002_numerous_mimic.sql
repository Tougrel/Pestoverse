CREATE TABLE `votes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`discord_id` text NOT NULL,
	`option_id` integer NOT NULL,
	`category_id` integer NOT NULL,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
DROP INDEX IF EXISTS `discord_idx`;--> statement-breakpoint
CREATE INDEX `votes_user_idx` ON `votes` (`discord_id`);--> statement-breakpoint
CREATE INDEX `submissions_user_idx` ON `submissions` (`discord_id`);