<script setup lang="ts">
import type { LatLngExpression } from "leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { onMounted } from "vue";
import { MarkerProps } from "types/marker";

const colorMode = useColorMode();
const config = useRuntimeConfig();
const props = defineProps<{ markers: MarkerProps[] }>();

const mapCenter = [28.883744, -28.621836] as LatLngExpression;
const mapZoom = 3;
const mapName = computed((previous) => {
    console.log(colorMode.preference);
    switch(colorMode.preference) {
        case "white":
            return "basic-v2";
        case "dark":
            return "basic-v2-dark";
        default:
            return previous;
    }
})
const mapTiles = computed(() => {
    return `https://${config.public.maptilerBase}/${mapName.value}/{z}/{x}/{y}.png?key=${config.public.maptilerKey}`
});

const slideoverOpen = useState<boolean>("map-slideover", () => false);
const modalOpen = useState<boolean>("map-modal", () => false);
const modalImages = useState<string[]>("map-modal-images", () => []);
const modalActiveImage = useState<number>("map-modal-active-image", () => 0);

const slideoverData = ref({} as MarkerProps);

const openModal = (images: string[], index: number) => {
    modalOpen.value = true;
    modalImages.value = images;
    modalActiveImage.value = index;
};

onMounted(() => {
    const map = L.map("mapView").setView(mapCenter, mapZoom);
    const layer = L.tileLayer(mapTiles.value, {
        minZoom: 3,
        maxZoom: 8,
        attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
    }).addTo(map);

    watch(mapTiles, (value) => {
        layer.setUrl(value);
    })

    const southWestBounds = L.latLng(-85.081364, -180.351563);
    const northEastBounds = L.latLng(85.06627, 180.351563);
    const bounds = L.latLngBounds(southWestBounds, northEastBounds);

    map.setMaxBounds(bounds);

    props.markers.forEach((entry) => {
        const icon = getEmote();

        const markerIcon = L.icon({
            iconUrl: icon,
            iconSize: [38, 38], // size of the icon
            iconAnchor: [22, 22], // point of the icon which will correspond to marker's location
        });
        const marker = L.marker(entry.coords, { icon: markerIcon }).addTo(map);
        marker.on("click", () => {
            slideoverOpen.value = true;
            slideoverData.value = entry;
        });
    });
});
</script>

<template>
    <div id="mapView" class="z-0 h-full w-full bg-white dark:bg-background"></div>
    <UiSlideOver state="map-slideover">
        <div class="flex flex-col gap-4">
            <button v-for="(image, index) in slideoverData.images" @click="openModal(slideoverData.images, index)">
                <img class="rounded" loading="lazy" decoding="async" :src="image" :title="slideoverData.name" />
            </button>
        </div>
        <UModal v-model="modalOpen">
            <img v-for="(image, index) in modalImages" v-show="index === modalActiveImage" loading="lazy" decoding="async" :src="image" />
        </UModal>
    </UiSlideover>
</template>
