<script setup lang="ts">
const loading = ref(true);

useSeoMeta({
  title: "Pestoverse",
  description: "The official community website created by Yuniiho's community!",
  ogTitle: "Pestoverse",
  ogDescription: "The official community website created by Yuniiho's community!",
  // ogImage: "",
  // ogUrl: "",
  twitterTitle: "Pestoverse",
  twitterDescription: "The official community website created by Yuniiho's community!",
  // twitterImage: "",
  twitterCard: "summary",
});

useHead({
  titleTemplate: title => title && title.includes("Pestoverse") ? title : `${title} - Pestoverse`,
  htmlAttrs: {
    lang: "en",
  },
  link: [
    {
      rel: "icon",
      type: "image/png",
      href: "/favicon.png",
    },
  ],
});

onMounted(() => {
  loading.value = false;
});
</script>

<template>
  <UiLoading v-if="loading" />
  <NuxtPage v-else />
</template>
