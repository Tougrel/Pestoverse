<script setup lang="ts">
const gallery = await queryContent("gallery").only(["images", "name"]).find();
const images = gallery.flatMap((entry) => entry.images.flatMap((image: { url: string, width: number, height: number }) => ({ name: entry.name, src: image.url, width: image.width, height: image.height }))) as [{ name: string, src: string, width: number, height: number }];

const modalOpen = useState<boolean>("gallery-modal", () => false);
const modalImage = useState<string>("gallery-modal-image");

const openModal = (image: string) => {
    modalOpen.value = true;
    modalImage.value = image;
};
</script>

<template>
    <NuxtLayout name="default">
        <div class="relative flex max-w-screen-2xl flex-col justify-center">
            <div
                class="before:box-inherit after:box-inherit mx-auto box-border columns-2 [column-fill:_balance] xl:columns-3 2xl:columns-4">
                <div v-for="image in images" class="mx-0.5 mb-6 break-inside-avoid relative min-h-44">
                    <span v-if="image.name" class="absolute bottom-0 right-0 text-white text-sm bg-background opacity-25 hover:opacity-50 px-2 py-1 rounded-br-md rounded-tl-md">{{ image.name }}</span>
                    <img role="button" class="w-full rounded-lg" loading="lazy" decoding="async" :src="image.src"
                        :width="image.width" :height="image.height" @click="openModal(image.src)" />
                </div>
                <UModal v-model="modalOpen">
                    <img loading="lazy" decoding="async" :src="modalImage" />
                </UModal>
            </div>
        </div>
    </NuxtLayout></template>
