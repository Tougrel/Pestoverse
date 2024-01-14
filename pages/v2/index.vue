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

const markers = transformMarkers();

definePageMeta({
    description: "Map of journeys Pestini have taken travelling the empty world",
    middleware: ["new-ui"],
    devs_only: true,
});
</script>

<template>
    <NuxtLayout name="new">
        <ClientOnly>
            <MapView :markers="markers" />
        </ClientOnly>
    </NuxtLayout>
</template>
