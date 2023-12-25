import DiscordProvider from "@auth/core/providers/discord";
import type { AuthConfig } from "@auth/core/types";
import type { Guild } from "@pestoverse/types";
import { NuxtAuthHandler } from "#auth";

const runtimeConfig = useRuntimeConfig();

export const authOptions: AuthConfig = {
	secret: runtimeConfig.authJs.secret,
	providers: [
		DiscordProvider(	{
			clientId: runtimeConfig.discord.client_id,
			clientSecret: runtimeConfig.discord.client_secret,
			authorization: "https://discord.com/api/oauth2/authorize?scope=identify+guilds",
			profile(profile) {
				if (profile.avatar === null) {
					const defaultAvatarNumber = parseInt(profile.discriminator) % 5
					profile.image_url = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`
				} else {
					const format = profile.avatar.startsWith("a_") ? "gif" : "webp"
					profile.image_url = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${format}`
				}
				
				return profile;
			}
		}),
	],
	callbacks: {
		jwt: async ({ token, account, profile }) => {
			// account obj includes the access_token and token_type
			if (account) {
				const response = await fetch("https://discord.com/api/v10/users/@me/guilds", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${account.access_token}`,
					}
				});

				if (response.status === 200) {
					const guilds = await response.json();

					if (profile) profile.in_guild = guilds.filter((g: Guild) => g.id === "649539673483640832").length > 0;
					token.profile = profile;
				}
			}

			return token;
		},
		session: async ({ session, token, user }) => {
			session.user = user;
			session.profile = token.profile;

			return session;
		}
	}
}

export default NuxtAuthHandler(authOptions, runtimeConfig);
