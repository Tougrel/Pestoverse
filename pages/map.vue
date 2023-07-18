<script setup lang="ts">
import { MarkerProps } from "types/marker";

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
    <div class="flex h-screen flex-col items-center gap-8">
        <ClientOnly>
            <MapView :markers="markers" />
        </ClientOnly>
        <UiNav class="absolute right-5 top-5" fontSize="sm" iconSize="1.5em" buttonClass="bg-white dark:bg-black/60" />
    </div>
</template>
