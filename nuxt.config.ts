import { fileURLToPath } from "url";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: {
		enabled: true,
	},

	modules: ["@nuxt/devtools", "@nuxt/image", "@nuxthq/ui", "nuxt-icon", "@nuxt/content", "@nuxtjs/google-fonts"],

	css: ["~/assets/css/index.css"],

	ui: {
		icons: ["heroicons", "mdi"],
	},

	alias: {
		'static': fileURLToPath(new URL('./static', import.meta.url)),
	},

	colorMode: {
		preference: "dark",
		fallback: "dark",
		classSuffix: "",
	},

	image: {
		none: {},
		dir: "static/images",
	},

	googleFonts: {
		useStylesheet: true,
		families: {
			Poppins: [400, 500, 600, 700],
		},
	},
});
