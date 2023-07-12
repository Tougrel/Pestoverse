// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: {
		enabled: true,
	},

	modules: ["@nuxt/devtools", "@nuxt/image", "@nuxthq/ui", "nuxt-icon"],

	css: ["~/assets/css/index.css"],

	ui: {
		icons: ["heroicons", "mdi"],
	},

	colorMode: {
		fallback: "dark",
		classSuffix: "",
	},

	image: {
		none: {},
		dir: "static/images",
	},
});
