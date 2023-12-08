import "@auth/core/types";

declare module "@auth/core/types" {
	interface Session {
		profile: Profile;
	}
	
	interface Profile {
		id: string;
		username: string;
		global_name: string;
		avatar: string;
		discriminator: string;
		public_flags: number;
		flags: number;
		banner: string | null;
		banner_color: string;
		accent_color: number;
		locale: string;
		mfa_enabled: boolean;
		premium_type: number;
		avatar_decoration: string | null;
		email: string;
		verified: boolean;
		image: string;
		in_guild: boolean;
	}
}
