<script setup lang="ts">
const gallery = await queryContent("gallery").only(["images", "name"]).find();
const images = gallery.flatMap((entry) => entry.images.flatMap((image: string) => ({ name: entry.name, src: image }))) as [{ name: string; src: string }];

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
            <div class="before:box-inherit after:box-inherit mx-auto box-border columns-2 [column-fill:_balance] xl:columns-3 2xl:columns-4">
                <div v-for="image in images" class="relative mx-0.5 mb-6 break-inside-avoid">
                    <span
                        v-if="image.name"
                        class="absolute bottom-0 right-0 rounded-br-md rounded-tl-md bg-background px-2 py-1 text-sm text-white opacity-25 hover:opacity-50"
                        >{{ image.name }}</span
                    >
                    <NuxtImg role="button" class="rounded-lg" loading="lazy" decoding="async" :src="image.src" @click="openModal(image.src)" />
                </div>
                <UModal v-model="modalOpen">
                    <img loading="lazy" decoding="async" :src="modalImage" />
                </UModal>
            </div>
        </div>
    </NuxtLayout>
</template>
