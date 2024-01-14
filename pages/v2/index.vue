<script setup lang="ts">
import type { MarkerProps } from "@pestoverse/types";

const images = await queryContent("gallery").only(["coords", "images", "name"]).find();
const transformMarkers = () => {
    let markers = [] as MarkerProps[];
    images.forEach((image) => {
        if (!("coords" in image)) return;
        if (!("images" in image)) return;
        markers.push({
            name: image["name"] || "",
            coords: image["coords"],
            images: image["images"],
        });
    });
    return markers;
};

const loading = ref(true);

const loaded = () => {
    console.log('loaded')
    loading.value = false
}

const markers = transformMarkers();

definePageMeta({
    description: "Map of journeys Pestini have taken travelling the empty world",
    middleware: ["new-ui"],
    devs_only: true,
});

</script>

<template>
    <NuxtLayout name="new">
        <div v-show="loading" class="flex h-full w-full flex-col items-center justify-center">
            <img src="/static/images/emotes/waddle.gif" decoding="async" loading="lazy" class="bg-cover bg-repeat-x" />
        </div>
        <ClientOnly>
            <MapView :markers="markers" @loaded.once="loaded" />
        </ClientOnly>
    </NuxtLayout>
</template>
