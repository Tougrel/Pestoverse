<script setup lang="ts">
import type { LatLngExpression } from "leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { onMounted } from "vue";
import { MarkerProps } from "types/marker";

import leafletMarker from 'static/images/leaflet/leaf-green.png';
import leafletShadow from 'static/images/leaflet/leaf-shadow.png';

const props = defineProps<{ markers: MarkerProps[] }>();

const mapCenter = [28.883744, -28.621836] as LatLngExpression;
const mapZoom = 3;
const mapTiles = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

const isOpen = useState<boolean>("map-slideover", () => false);

const slideoverData = ref({} as MarkerProps);

onMounted(() => {
    const map = L.map('mapView').setView(mapCenter, mapZoom);
    L.tileLayer(mapTiles, {
        maxZoom: 10
    }).addTo(map);

    map.setMaxBounds(map.getBounds());

    props.markers.forEach(entry => {
        const icon = getEmote();

        const markerIcon = L.icon({
            iconUrl: icon,
            iconSize:     [38, 38], // size of the icon
            iconAnchor:   [22, 22], // point of the icon which will correspond to marker's location
            className: 'dark:invert dark:hue-rotate-180 dark:brightness-95 dark:contrast-90'
        });
        const marker = L.marker(entry.coords, { icon: markerIcon }).addTo(map);
        marker.on('click', () => {
            isOpen.value = true;
            slideoverData.value = entry;
        })
    })
})

</script>

<template>
    <div id="mapView" class="w-full h-full z-0 dark:invert dark:hue-rotate-180 dark:brightness-95 dark:contrast-90"></div>
    <UiSlideover state="map-slideover">
        <img v-for="image in slideoverData.images" loading="lazy" decoding="async" :src="image" :title="slideoverData.name"/>
    </UiSlideover>
</template>