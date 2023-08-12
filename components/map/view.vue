<script setup lang="ts">
import {Map, NavigationControl, StyleSpecification, Marker} from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import light from "./light";
import dark from "./dark";
import { MarkerImageData, MarkerProps } from "types/marker";

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

const getStyle = (color: typeof colorMode, lang: string = 'en') => {
    return {
        version: 8,
        glyphs: 'https://tileassets.ika.gg/fonts/{fontstack}/{range}.pbf',
        sources: {
            "protomaps": {
                type: "vector",
                url: "https://tiles.ika.gg/osm-planet.json"
            }
        },
        'layers': color.value === "white" ? light(lang) : dark(lang)
    } as StyleSpecification
}

const getMarkerIcon = () => {
    const el = document.createElement('div');
    el.className = 'marker hover:cursor-pointer bg-cover h-7 w-7';
    el.style.backgroundImage = `url(${getEmote()})`;
    return el;
}

const openModal = (images: MarkerImageData[], index: number) => {
  modalOpen.value = true;
  modalImages.value = images;
  modalActiveImage.value = index;
};

const openSlideover = (entry: MarkerProps) => {
    slideOverOpen.value = true;
    slideOverData.value = {
        coords: entry.coords,
        name: entry.name,
        images: entry.images
    };
    // TODO: zoom in on clusters
}

const language = 'en'; // TODO replace with i18n!!

onMounted(() => {
    map.value = markRaw(new Map({
        container: mapContainer.value as HTMLElement,
        zoom: 3,
        maxZoom: 10,
        center: toLonLat([34.92485641107942, 30.656626315862535]),
        style: getStyle(colorMode, language),
    }));

    map.value.addControl(new NavigationControl({visualizePitch: false, showCompass: false}), "top-left")

    props.markers.forEach(entry => {
        if (map.value) {
            const el = getMarkerIcon()
            const marker = new Marker({ element: el })
                .setLngLat(toLonLat(entry.coords))
                .addTo(map.value);
            el.addEventListener('click', () => {
                openSlideover(entry);
            })
        }
    });

    watch(colorMode, (value) => {
        map.value?.setStyle(getStyle(value, language))
    })
})
</script>

<template>
    <div ref="mapContainer" class="h-full w-full bg-white dark:bg-background"></div>
    <UiSlideOver state="map-slideover">
        <div class="flex flex-col gap-4">
            <UiImage v-for="(image, index) in slideOverData.images" @click="openModal(slideOverData.images, index)" :src="image.url" :width="image.width" :height="image.height" :name="slideOverData.name" />
        </div>
        <UModal v-model="modalOpen">
            <img v-for="(image, index) in modalImages" v-show="index === modalActiveImage" loading="lazy" decoding="async" :src="getFullImage(image.url)" :alt="slideOverData.name" />
        </UModal>
    </UiSlideOver>
</template>
