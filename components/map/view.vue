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

    const greenIcon = L.icon({
        iconUrl: '/images/leaflet/leaf-green.png',
        shadowUrl: '/images/leaflet/leaf-shadow.png',

        iconSize:     [38, 95], // size of the icon
        shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    props.markers.forEach(entry => {
        const marker = L.marker(entry.coords, { icon: greenIcon }).addTo(map);
        marker.bindPopup(`<img src="${entry.image}">`, {
            minWidth: 256
        });
    })
})

</script>

<template>
    <div id="mapView" class="w-full h-full z-0"></div>
</template>