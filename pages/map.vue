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
</script>

<template>
    <NuxtLayout name="map">
        <div v-show="loading" class="flex h-full w-full flex-col items-center justify-center">
            <img src="/static/images/emotes/waddle.gif" decoding="async" loading="lazy" class="bg-cover bg-repeat-x" />
        </div>
        <ClientOnly>
            <MapView :markers="markers" @loaded="loaded" />
        </ClientOnly>
    </NuxtLayout>
</template>
