<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
import maplibregl, { Map, NavigationControl, StyleSpecification, Marker, Popup, LngLatBoundsLike, AttributionControl } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import light from "./light";
import dark from "./dark";
import { MarkerImageData, MarkerProps } from "types/marker";
import { PMTiles, Protocol } from "pmtiles";
import haversine from "haversine";

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

const mapBaseUrl = `${runtimeConfig.app.cdnURL}/map`;

const tileUrl = `${mapBaseUrl}/osm-planet.pmtiles`;

const protocol = new Protocol();
maplibregl.addProtocol("pmtiles", protocol.tile);
const p = new PMTiles(tileUrl);
protocol.add(p);

const defaultZoom = 3;

const getStyle = (color: typeof colorMode, lang: string = "en") => {
    return {
        version: 8,
        glyphs: `${mapBaseUrl}/fonts/{fontstack}/{range}.pbf`,
        sprite: `${mapBaseUrl}/sprite`,
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
    const zoomModifier = map.getMaxZoom() - map.getZoom();
    if (zoomModifier === 0) {
        return [];
    }
    return props.markers.filter((marker) => haversine(coordinates, marker.coords, { format: "[lat,lon]", threshold: zoomModifier * 14 }));
};

const openSlideOver = (entry: MarkerProps) => {
    slideOverOpen.value = true;
    slideOverData.value = {
        coords: entry.coords,
        name: entry.name,
        images: entry.images,
    };
};

class ResetZoomControl {
    protected _map: Map;
    protected _container: HTMLElement;

    onAdd(map: Map) {
        this._map = map;
        this._container = document.createElement("div");
        this._container.className = "maplibregl-ctrl maplibregl-ctrl-group";
        this._container.title = "Reset Zoom";

        const button = document.createElement("button");
        const span = document.createElement("span");
        span.className = "maplibregl-ctrl-icon p-1.5";
        span.innerHTML =
            '<svg fill="#000000" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"></defs><path d="M22.4478,21A10.855,10.855,0,0,0,25,14,10.99,10.99,0,0,0,6,6.4658V2H4v8h8V8H7.332a8.9768,8.9768,0,1,1-2.1,8H3.1912A11.0118,11.0118,0,0,0,14,25a10.855,10.855,0,0,0,7-2.5522L28.5859,30,30,28.5859Z"/></svg>';
        button.appendChild(span);
        this._container.appendChild(button);

        button.addEventListener("click", () => map.zoomTo(defaultZoom, { duration: 2000 }));

        return this._container;
    }
    onRemove() {
        this._container.parentNode.removeChild(this._container);
        this._map = undefined;
    }
}

const handleMarkerClick = (map: Map, entry: MarkerProps, marker: Marker, document: Document) => {
    const overlappingMarkers = getOverlappingMarkers(map, entry.coords);
    const currentZoom = map.getZoom();
    const maxZoom = map.getMaxZoom();

    if (overlappingMarkers.length > 1 && currentZoom < maxZoom - 2) {
        // 2 is an arbitrary number, but prevents flying around too much in the states
        map.fitBounds(overlappingMarkers.map((marker) => toLonLat(marker.coords)) as LngLatBoundsLike, { duration: 3000, padding: 100 });
        // } else if (overlappingMarkers.length > 1) {
        // TODO show popover
    } else {
        // Zoom into the marker a bit - less on mobile to avoid too much pinching around
        const targetZoom = 4;
        const zoomLevel = map.getZoom() < targetZoom ? targetZoom : map.getZoom();
        if (currentZoom < maxZoom - 1) {
            // prevents jumping around between markers when you're around max zoom
            map.flyTo({ zoom: zoomLevel, duration: 1500, center: toLonLat(entry.coords) });
        }
        openSlideOver(entry);
    }
};

const language = "en"; // TODO replace with i18n!!

onMounted(() => {
    p.getHeader().then((h) => {
        map.value = markRaw(
            new Map({
                container: mapContainer.value as HTMLElement,
                minZoom: 1.5,
                zoom: defaultZoom,
                maxZoom: 10,
                center: [h.centerLon, h.centerLat],
                style: getStyle(colorMode, language),
                dragRotate: false,
            }),
        );

        map.value.touchZoomRotate.disableRotation();
        map.value.addControl(new NavigationControl({ visualizePitch: false, showCompass: false }), "top-left");
        map.value.addControl(new ResetZoomControl(), "top-left");
        map.value.addControl(
            new AttributionControl({
                compact: true,
                customAttribution: [
                    '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a>',
                    '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
                ],
            }),
        );

        props.markers.forEach((entry) => {
            if (map.value) {
                const el = getMarkerIcon();
                const marker = new Marker({ element: el }).setLngLat(toLonLat(entry.coords)).addTo(map.value);
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
