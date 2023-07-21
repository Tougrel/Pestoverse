<script setup lang="ts">
import "ol/ol.css";
import { onMounted } from "vue";
import { MarkerProps } from "types/marker";
import { Map, View } from "ol";
import { Vector as LayerVector } from "ol/layer";
import { Vector as SourceVector } from "ol/source";
import { Style, Icon } from "ol/style";
import { GeoJSON } from "ol/format";
import type { Coordinate } from "ol/coordinate";
import { fromLonLat } from "ol/proj";
import { apply } from "ol-mapbox-style";

const colorMode = useColorMode();
const props = defineProps<{ markers: MarkerProps[] }>();

const toLonLat = (latlon: Coordinate): Coordinate => {
    return [latlon[1], latlon[0]];
}

const mapCenter = toLonLat([28.883744, -28.621836]);
const mapZoom = 3;
const mapName = computed((previous) => {
    switch (colorMode.preference) {
        case "white":
            return "basic";
        case "dark":
            return "dark";
        default:
            return previous;
    }
})
const styleJson = computed(() => {
    return `https://${import.meta.env.VITE_TILESERVER || "map.ika.gg"}/styles/${mapName.value}/style.json`
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
    // const map = L.map("mapView").setView(mapCenter, mapZoom);
    // const layer = L.tileLayer(mapLayer, {
    //     minZoom: 3,
    //     maxZoom: 8,
    //     attribution: 'Map <a href="https://www.maptilesapi.com/" target="_blank">&copy; Map Tiles API</a> | Map Data <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
    // }).addTo(map);

    // const southWestBounds = L.latLng(-85.081364, -180.351563);
    // const northEastBounds = L.latLng(85.06627, 180.351563);
    // const bounds = L.latLngBounds(southWestBounds, northEastBounds);

    // map.setMaxBounds(bounds);

    let geoJson = {
        type: 'FeatureCollection',
        crs: {
            type: 'name',
            properties: {
                name: 'EPSG:3857'
            },
        },
        features: [] as Array<any>,
    };

    const iconCache = {} as { [id: string]: string };

    const styleFunction = (feature: any) => {
        const uid = feature.getGeometry().ol_uid
        let icon;
        if (uid in iconCache) {
            icon = iconCache[uid];
        } else {
            icon = getEmote();
            iconCache[uid] = icon;
        }
        return [
            new Style({
                image: new Icon({
                    src: icon,
                    height: 38
                })
            })
        ]
    }

    props.markers.forEach((entry, i) => {
        geoJson.features.push({
            type: 'Feature',
            id: `pestino-${i}`,
            geometry: {
                type: "Point",
                coordinates: fromLonLat(toLonLat(entry.coords))
            },
            properties: entry
        })
        // const marker = L.marker(entry.coords, { icon: markerIcon }).addTo(map);
        // marker.on("click", () => {
        //     slideoverOpen.value = true;
        //     slideoverData.value = entry;
        // });
    });

    const markerLayer = new LayerVector({
        source: new SourceVector({
            features: new GeoJSON().readFeatures(geoJson),
            format: new GeoJSON()
        }),
        style: styleFunction,
        zIndex: 1,
    })

    const map = new Map({
        target: 'mapView',
        view: new View({
            constrainResolution: true,
            center: fromLonLat(mapCenter),
            zoom: mapZoom,
            minZoom: mapZoom,
            maxZoom: 8
        }),
        layers: [
            markerLayer
        ]
    })

    // map.on("click", (event) => {

    // })

    map.on("click", (event) => {
        map.forEachFeatureAtPixel(event.pixel, (feature) => {
            const id = feature.getId();
            if (typeof id !== 'string' || !id.startsWith('pestino')) {
                return;
            } 
            const { coords, name, images} = feature.getProperties();
            const data = { coords, name, images }
            slideoverOpen.value = true;
            slideoverData.value = data;
        })
    })

    map.on('pointermove', (e) => {
        if (e.dragging) return;
        
        const pixel = map.getEventPixel(e.originalEvent);
        let hit = false;
        map.forEachFeatureAtPixel(pixel, (feature) => {
            const id = feature.getId();
            if (typeof id === 'string' && id.startsWith('pestino')) {
                hit = true;
            }
        })

        map.getTargetElement().style.cursor = hit ? 'pointer' : '';
    });

    apply(map, styleJson.value);

    watch(styleJson, (value) => {
        apply(map, value);
    })
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
            <img v-for="(image, index) in modalImages" v-show="index === modalActiveImage" loading="lazy" decoding="async"
                :src="image" />
        </UModal>
    </UiSlideover>
</template>
