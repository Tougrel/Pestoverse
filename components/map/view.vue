<script setup lang="ts">
import {Map, NavigationControl, StyleSpecification, Marker} from 'maplibre-gl';
import MapboxLanguage from '@mapbox/mapbox-gl-language';
import 'maplibre-gl/dist/maplibre-gl.css';
import light from "./light";
import dark from "./dark";
import {MarkerProps} from "~/types/marker";

const props = defineProps<{ markers: MarkerProps[] }>();

const slideOverOpen = useState<boolean>("map-slideover", () => false);
const slideOverData = ref({} as MarkerProps);
const modalOpen = useState<boolean>("map-modal", () => false);
const modalImages = useState<string[]>("map-modal-images", () => []);
const modalActiveImage = useState<number>("map-modal-active-image", () => 0);

const toLonLat = (latlon: [number, number]): [number, number] => {
    return [latlon[1], latlon[0]];
};

const colorMode = useColorMode();
const mapContainer = shallowRef<HTMLElement>();
const map = shallowRef<Map>();

const getStyle = (color: typeof colorMode) => {
    return {
        version: 8,
        glyphs: 'https://tiles.stadiamaps.com/fonts/{fontstack}/{range}.pbf',
        sources: {
            "protomaps": {
                type: "vector",
                url: "https://tiles.ika.gg/osm-planet.json"
            }
        },
        'layers': color.value === "white" ? light : dark
    } as StyleSpecification
}

const getMarkerIcon = () => {
    const el = document.createElement('div');
    el.className = 'marker hover:cursor-pointer bg-cover h-7 w-7';
    el.style.backgroundImage = `url(${getEmote()})`;
    return el;
}

const openSlideover = (entry: MarkerProps) => {
    slideOverOpen.value = true;
    slideOverData.value = {
        coords: entry.coords,
        name: entry.name,
        images: entry.images
    };
    // TODO: zoom in on clusters
}

onMounted(() => {
    map.value = markRaw(new Map({
        container: mapContainer.value as HTMLElement,
        zoom: 3,
        maxZoom: 10,
        center: toLonLat([34.92485641107942, 30.656626315862535]),
        style: getStyle(colorMode)
    }));

    map.value.addControl(new NavigationControl({visualizePitch: false, showCompass: false}), "top-left")
    map.value.addControl(new MapboxLanguage({
        defaultLanguage: 'it',
        languageField: /^name:/,
        getLanguageField: (language) => {
            return language === 'mul' ? 'name:en' : `name:${language}`
        },
        languageSource: 'protomaps'
    }))

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
        map.value?.setStyle(getStyle(value))
    })
})
</script>

<template>
    <div ref="mapContainer" class="h-full w-full bg-white dark:bg-background"></div>
    <UiSlideOver state="map-slideover">
        <div class="flex flex-col gap-4">
            <button v-for="(image, index) in slideOverData.images" @click="openModal(slideOverData.images, index)"
                    class="relative">
                <span v-if="slideOverData.name"
                      class="absolute bottom-0 right-0 text-white text-sm bg-background opacity-25 hover:opacity-50 px-2 py-1 rounded-br-md rounded-tl-md">{{
                        slideOverData.name
                    }}</span>
                <NuxtImg class="rounded" loading="lazy" decoding="async" :src="image" />
            </button>
        </div>
        <UModal v-model="modalOpen">
            <NuxtImg v-for="(image, index) in modalImages" v-show="index === modalActiveImage" loading="lazy"
                     decoding="async" :src="image" />
        </UModal>
    </UiSlideOver>
</template>
