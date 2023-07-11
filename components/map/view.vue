<script setup lang="ts">
import type { LatLng, LatLngExpression } from "leaflet";
type MarkerProps = {
    name: string,
    coords: LatLngExpression,
    image: string
}

const props = defineProps<{ markers: MarkerProps[] }>();

import { onMounted } from "vue";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const mapCenter = [28.883744, -28.621836] as LatLngExpression;
const mapZoom = 3;
const mapTiles = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

onMounted(() => {
    const map = L.map('mapView').setView(mapCenter, mapZoom);
    L.tileLayer(mapTiles, {
        maxZoom: 10
    }).addTo(map);

    props.markers.forEach(entry => {
        const marker = L.marker(entry.coords).addTo(map);
        marker.bindPopup(`<img src="${entry.image}">`, {
            minWidth: 256
        });
    })
})

</script>

<template>
    <div id="mapView" class="w-full h-full"></div>
</template>