<script setup lang="ts">
import maplibregl, {Map, NavigationControl, StyleSpecification, Marker, Popup, LngLatBoundsLike} from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import light from "./light";
import dark from "./dark";
import { MarkerImageData, MarkerProps } from "types/marker";
import { PMTiles, Protocol } from "pmtiles";
import haversine from 'haversine';

const props = defineProps<{ markers: MarkerProps[] }>();

const slideOverOpen = useState<boolean>("map-slideover", () => false);
const slideOverData = ref({} as MarkerProps);
const modalOpen = useState<boolean>("map-modal", () => false);
const modalImages = useState<MarkerImageData[]>("map-modal-images", () => []);
const modalActiveImage = useState<number>("map-modal-active-image", () => 0);

const toLonLat = (latlon: [number, number]): [number, number] => {
    return [latlon[1], latlon[0]];
};

const colorMode = useColorMode();
const mapContainer = shallowRef<HTMLElement>();
const map = shallowRef<Map>();

const tileUrl = "https://tileassets.ika.gg/osm-planet.pmtiles";

const protocol = new Protocol();
maplibregl.addProtocol("pmtiles", protocol.tile);
const p = new PMTiles(tileUrl);
protocol.add(p);

const getStyle = (color: typeof colorMode, lang: string = "en") => {
    return {
        version: 8,
        glyphs: "https://tileassets.ika.gg/fonts/{fontstack}/{range}.pbf",
        sprite: "https://tileassets.ika.gg/sprite",
        sources: {
            protomaps: {
                type: "vector",
                url: `pmtiles://${tileUrl}`,
            },
        },
        layers: color.value === "white" ? light(lang) : dark(lang),
    } as StyleSpecification;
};

const getMarkerIcon = () => {
    const el = document.createElement("div");
    el.className = "marker hover:cursor-pointer bg-cover h-7 w-7";
    el.style.backgroundImage = `url(${getEmote()})`;
    return el;
};

const openModal = (images: MarkerImageData[], index: number) => {
    modalOpen.value = true;
    modalImages.value = images;
    modalActiveImage.value = index;
};

const getOverlappingMarkers = (map: Map, coordinates: [number, number]): MarkerProps[] => {
    const zoomModifier = map.getMaxZoom() - map.getZoom()
    console.log('zoom', zoomModifier)
    console.log('logZoom', Math.log(map.getZoom()))
    if (zoomModifier === 0) {
        return [];
    }
    return props.markers.filter(marker => haversine(coordinates, marker.coords, { format: "[lat,lon]", threshold: zoomModifier * 14 }))
}

const openSlideOver = (entry: MarkerProps) => {
    slideOverOpen.value = true;
    slideOverData.value = {
        coords: entry.coords,
        name: entry.name,
        images: entry.images,
    };
}

const handleMarkerClick = (map: Map, entry: MarkerProps, marker: Marker, document: Document) => {

    const overlappingMarkers = getOverlappingMarkers(map, entry.coords);
    const currentZoom = map.getZoom();
    const maxZoom = map.getMaxZoom();

    if (overlappingMarkers.length > 1 && currentZoom < maxZoom - 2) { // 2 is an arbitrary number, but prevents flying around too much in the states
        map.fitBounds(overlappingMarkers.map(marker => toLonLat(marker.coords)) as LngLatBoundsLike, {duration: 3000, padding: 100})
    // } else if (overlappingMarkers.length > 1) {
        // TODO show popover
    } else {
        // Zoom into the marker a bit - less on mobile to avoid too much pinching around
        const targetZoom = 4;
        const zoomLevel = map.getZoom() < targetZoom ? targetZoom : map.getZoom();
        if (currentZoom < maxZoom - 1) { // prevents jumping around between markers when you're around max zoom
            map.flyTo({zoom: zoomLevel, duration: 1500, center: toLonLat(entry.coords)});
        }
        openSlideOver(entry)
    }
};

const language = "en"; // TODO replace with i18n!!

onMounted(() => {
    p.getHeader().then((h) => {
        map.value = markRaw(
            new Map({
                container: mapContainer.value as HTMLElement,
                zoom: 3,
                maxZoom: 10,
                center: [-12.2167999, 28.6135],
                style: getStyle(colorMode, language),
                dragRotate: false,
            }),
        );

        map.value.addControl(new NavigationControl({ visualizePitch: false, showCompass: false }), "top-left");

        props.markers.forEach((entry) => {
            if (map.value) {
                const el = getMarkerIcon();
                const marker = new Marker({ element: el })
                    .setLngLat(toLonLat(entry.coords))
                    .addTo(map.value);
                el.addEventListener("click", () => {
                    if (map.value) {
                        handleMarkerClick(map.value, entry, marker, document);
                    }
                });
            }
        });

        watch(colorMode, (value) => {
            map.value?.setStyle(getStyle(value, language));
        });
    });
});
</script>

<template>
    <div ref="mapContainer" class="h-full w-full bg-white dark:bg-background"></div>
    <UiSlideOver state="map-slideover">
        <div class="flex flex-col gap-4">
            <UiImage
                v-for="(image, index) in slideOverData.images"
                @click="openModal(slideOverData.images, index)"
                :src="image.url"
                :width="image.width"
                :height="image.height"
                :name="slideOverData.name"
            />
        </div>
        <UModal v-model="modalOpen">
            <img
                v-for="(image, index) in modalImages"
                v-show="index === modalActiveImage"
                loading="lazy"
                decoding="async"
                :src="getFullImage(image.url)"
                :alt="slideOverData.name"
            />
        </UModal>
    </UiSlideOver>
</template>
