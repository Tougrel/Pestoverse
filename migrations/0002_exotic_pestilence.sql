CREATE TABLE `vote_options` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`category_id` integer NOT NULL,
	`name` text NOT NULL,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `votes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`discord_id` text NOT NULL,
	`option_id` integer NOT NULL,
	`category_id` integer NOT NULL,
	FOREIGN KEY (`option_id`) REFERENCES `vote_options`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
DROP INDEX IF EXISTS `discord_idx`;--> statement-breakpoint
CREATE INDEX `votes_user_idx` ON `votes` (`discord_id`);--> statement-breakpoint
CREATE INDEX `submissions_user_idx` ON `submissions` (`discord_id`);