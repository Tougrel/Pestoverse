<script setup lang="ts">
const loading = ref(true);

useState("kudo-slideover", () => false);

useSeoMeta({
    title: "Pestoverse",
    description: "The official website for running, upcoming and archived events created by Yuniiho's community!",

    ogTitle: "Pestoverse",
    ogDescription: "The official website for running, upcoming and archived events created by Yuniiho's community!",

    twitterTitle: "Pestoverse",
    twitterDescription: "The official website for running, upcoming and archived created by Yuniiho's community!",
    twitterCard: "summary",
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
    loading.value = false;

    const primary = localStorage.getItem("ui-color");
    if (primary) useAppConfig().ui.primary = primary;
});
</script>

<template>
    <main>
        <UiLoadingScreen v-if="loading" />
        <KudoSidebar v-if="!loading" />
        <NuxtPage v-if="!loading" />
    </main>
</template>
