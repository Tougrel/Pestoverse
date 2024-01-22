import { fileURLToPath } from "url";

const getAuthBaseUrl = () => {
    const defaultUrl = process.env.NUXT_NEXTAUTH_URL;
    if (process.env.CF_PAGES !== "1") {
        return defaultUrl;
    }
    // Use default URL for branches with custom domains
    if (["development", "main"].indexOf(process.env.CF_PAGES_BRANCH || "") !== -1) {
        return defaultUrl;
    }
    const newUrl = process.env.CF_PAGES_URL || defaultUrl;
    console.log(newUrl);
    return newUrl
}

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
        baseUrl: process.env.NUXT_NEXTAUTH_URL,
    },

    runtimeConfig: {
        authJs: {
            secret: process.env.NUXT_NEXTAUTH_SECRET,
        },
        discord: {
            client_id: process.env.NUXT_DISCORD_ID,
            client_secret: process.env.NUXT_DISCORD_SECRET,
        },
        public: {
            cdnBase: "https://cdn.pestoverse.world",
            authJs: {
                baseUrl: getAuthBaseUrl(),
                verifyClientOnEveryRequest: false,
            },
        },
    },

    googleFonts: {
        useStylesheet: true,
        families: {
            Poppins: [400, 500, 600, 700],
        },
    },
});
