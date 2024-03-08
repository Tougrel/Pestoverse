<script setup lang="ts">
const props = defineProps<{ src: string; name?: string; width: number; height: number; prefix: string; full?: boolean, link?: string }>();
const imageLoaded = ref(false);

let element = "button";
if (props.link) {
    element = "a"
}
</script>

<template>
    <component :is="element" class="group w-full break-inside-avoid rounded-lg" @click="$emit('click')" :href="element === 'a' ? props.link : ''" :target="element === 'a' ? '_blank' : ''">
        <figure
            class="relative table w-full rounded-lg bg-cover"
            :style="{ backgroundImage: `url(${getPlaceholderImage(src, prefix)})` }"
            :class="{ '!bg-none': imageLoaded }"
        >
            <img
                role="button"
                class="block w-full rounded-lg bg-cover bg-center transition-[opacity_200ms_ease-in-out]"
                :class="{ 'opacity-100': imageLoaded, 'opacity-0': !imageLoaded }"
                loading="lazy"
                decoding="async"
                :src="full ? getFullImage(src, prefix) : getResizedImage(src, prefix)"
                :width="width"
                :height="height"
                @load="imageLoaded = true"
            />
            <figcaption
                v-if="name"
                class="absolute bottom-0 right-0 table-caption caption-bottom rounded-br-md rounded-tl-md bg-background px-2 py-1 text-sm text-white opacity-25 group-hover:opacity-50"
            >
                {{ name }}
            </figcaption>
        </figure>
    </component>
</template>
