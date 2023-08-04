<script setup lang="ts">
useState("lang", () => null);
useState("lang_id", () => "en-us");
const loading = useState("loading", () => {
    return {
        website: true,
        lang: true,
    };
});

useState("kudo-slideover", () => false);

useSeoMeta({
    title: "Pestoverse",
    description: "The official website for running, upcoming and archived events created by Yuniiho's community!",

    ogTitle: "Pestoverse",
    ogDescription: "The official website for running, upcoming and archived events created by Yuniiho's community!",
    ogUrl: "https://pestoverse.tougrel.dev",
    ogImage: "https://i.imgur.com/HjwqC9A.png",
    ogImageType: "image/png",

    twitterTitle: "Pestoverse",
    twitterDescription: "The official website for running, upcoming and archived created by Yuniiho's community!",
    twitterImage: "https://i.imgur.com/HjwqC9A.png",
    twitterImageType: "image/png",
    twitterCard: "summary_large_image",
});

useHead({
    titleTemplate: (title) => (title && title.includes("Pestoverse") ? title : `${title} - Pestoverse`),
    htmlAttrs: {
        lang: "en",
    },
    link: [
        {
            rel: "icon",
            type: "image/vnd.microsoft.icon",
            href: "/favicon.ico",
        },
        {
            rel: "shortcut icon",
            type: "image/vnd.microsoft.icon",
            href: "/favicon.ico",
        },
        {
            rel: "icon",
            type: "image/png",
            href: "/icons/favicon-32x32.png",
        },
    ],
});

onMounted(() => {
    generateLanguageMap();
    loading.value.website = false;

    const primary = localStorage.getItem("ui-color");
    if (primary) useAppConfig().ui.primary = primary;
});
</script>

<template>
    <main>
        <UiLoadingScreen v-if="loading.website && loading.lang" />
        <KudoSidebar v-if="!loading.website && !loading.lang" />
        <NuxtPage v-if="!loading.website && !loading.lang" />
    </main>
</template>
