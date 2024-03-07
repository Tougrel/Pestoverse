<script setup lang="ts">
defineProps<{ src: string; name?: string; width: number; height: number; prefix: string }>();
const imageLoaded = ref(false);
</script>

<template>
    <button class="group w-full break-inside-avoid rounded-lg" @click="$emit('click')">
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
                :src="getResizedImage(src, prefix)"
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
    </button>
</template>
