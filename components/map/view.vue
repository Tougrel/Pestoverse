<script setup lang="ts">
import "ol/ol.css";
import { onMounted } from "vue";
import { MarkerImageData, MarkerProps } from "types/marker";
import { Map, View } from "ol";
import { Vector as LayerVector } from "ol/layer";
import { Vector as SourceVector } from "ol/source";
import { Style, Icon } from "ol/style";
import { GeoJSON } from "ol/format";
import type { Coordinate } from "ol/coordinate";
import { boundingExtent } from "ol/extent";
import type { FeatureLike } from "ol/Feature";
import { fromLonLat } from "ol/proj";
import { apply } from "ol-mapbox-style";

const colorMode = useColorMode();
const props = defineProps<{ markers: MarkerProps[] }>();

const toLonLat = (latlon: Coordinate): Coordinate => {
    return [latlon[1], latlon[0]];
};

const mapCenter = toLonLat([34.92485641107942, 30.656626315862535]);
const mapZoom = 3;
const mapName = computed((previous) => {
    switch (colorMode.value) {
        case "white":
            return "basic";
        case "dark":
            return "dark";
        default:
            return previous;
    }
});
const styleJson = computed(() => {
    return `https://${import.meta.env.VITE_TILESERVER || "map.ika.gg"}/styles/${mapName.value}/style.json`;
});

const slideoverOpen = useState<boolean>("map-slideover", () => false);
const modalOpen = useState<boolean>("map-modal", () => false);
const modalImages = useState<MarkerImageData[]>("map-modal-images", () => []);
const modalActiveImage = useState<number>("map-modal-active-image", () => 0);

const slideoverData = ref({} as MarkerProps);

const openModal = (images: MarkerImageData[], index: number) => {
    modalOpen.value = true;
    modalImages.value = images;
    modalActiveImage.value = index;
};

onMounted(() => {
    const geoJson = {
        type: "FeatureCollection",
        crs: {
            type: "name",
            properties: {
                name: "EPSG:3857",
            },
        },
        features: [] as Array<any>,
    };

    const iconCache = {} as { [id: string]: string };

    const styleFunction = (feature: any) => {
        const uid = feature.getGeometry().ol_uid;
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
                    height: 34,
                }),
            }),
        ];
    };

    props.markers.forEach((entry, i) => {
        geoJson.features.push({
            type: "Feature",
            id: `pestino-${i}`,
            geometry: {
                type: "Point",
                coordinates: fromLonLat(toLonLat(entry.coords)),
            },
            properties: entry,
        });
    });

    const markerLayer = new LayerVector({
        source: new SourceVector({
            features: new GeoJSON().readFeatures(geoJson),
            format: new GeoJSON(),
        }),
        style: styleFunction,
        zIndex: 1,
    });

    const map = new Map({
        target: "mapView",
        view: new View({
            constrainResolution: true,
            center: fromLonLat(mapCenter),
            zoom: mapZoom,
            minZoom: mapZoom,
            maxZoom: 10,
        }),
        layers: [markerLayer],
    });

    map.on("singleclick", (event) => {
        const features = [] as FeatureLike[];
        map.forEachFeatureAtPixel(event.pixel, (feature) => {
            const id = feature.getId();
            if (typeof id !== "string" || !id.startsWith("pestino")) return;
            features.push(feature);
        });
        if (features.length) {
            if (features.length > 1) {
                const extent = boundingExtent(features.map((r) => r.getGeometry().getCoordinates()));
                map.getView().fit(extent, { duration: 1000, padding: [50, 50, 50, 50] });
            } else {
                const { coords, name, images } = features[0].getProperties();
                const data = { coords, name, images };
                slideoverOpen.value = true;
                slideoverData.value = data;
            }
        }
    });

    map.on("pointermove", (e) => {
        if (e.dragging) return;

        markerLayer.getFeatures(e.pixel).then((features) => {
            let cursor = "pointer";
            if (!features.length) cursor = "";
            map.getTargetElement().style.cursor = cursor;
        });
    });

    apply(map, styleJson.value);

    watch(styleJson, (value) => {
        apply(map, value);
    });
});
</script>

<template>
    <div id="mapView" class="z-0 h-full w-full bg-white dark:bg-background"></div>
    <UiSlideOver state="map-slideover">
        <div class="flex flex-col gap-4">
            <UiImage v-for="(image, index) in slideoverData.images" @click="openModal(slideoverData.images, index)" :src="image.url" :width="image.width" :height="image.height" :name="slideoverData.name" />
        </div>
        <UModal v-model="modalOpen">
            <img v-for="(image, index) in modalImages" v-show="index === modalActiveImage" loading="lazy" decoding="async" :src="getFullImage(image.url)" />
        </UModal>
    </UiSlideOver>
</template>
