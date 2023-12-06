<script setup lang="ts">
import type { MarkerProps } from "@types/pestoverse";

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
</script>

<template>
    <NuxtLayout name="map">
        <ClientOnly>
            <MapView :markers="markers" />
        </ClientOnly>
    </NuxtLayout>
</template>
