import { fileURLToPath } from "url";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {
        enabled: true,
    },

    modules: ["@nuxt/devtools", "@nuxt/image", "@nuxt/ui", "nuxt-icon", "@nuxt/content", "@nuxtjs/google-fonts", "@hebilicious/authjs-nuxt"],

    css: ["~/assets/css/index.css"],

    ui: {
        icons: ["heroicons", "mdi"],
    },

    alias: {
        static: fileURLToPath(new URL("./static", import.meta.url)),
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

    authJs: {
        verifyClientOnEveryRequest: false,
    },

    runtimeConfig: {
        authJs: {
            secret: process.env.NUXT_NEXTAUTH_SECRET,
        },
        discord: {
            client_id: process.env.NUXT_DISCORD_ID,
            client_secret: process.env.NUXT_DISCORD_SECRET,
        },
        twitch: {
            client_id: process.env.NUXT_TWITCH_ID,
            client_secret: process.env.NUXT_TWITCH_SECRET,
        },
        public: {
            cdnBase: "https://cdn.pestoverse.world",
            authJs: {
                baseUrl: process.env.NUXT_NEXTAUTH_URL,
                verifyClientOnEveryRequest: false
            }
        },
    },

    googleFonts: {
        useStylesheet: true,
        families: {
            Poppins: [400, 500, 600, 700],
        },
    },
});
