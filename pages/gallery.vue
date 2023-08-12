<script setup lang="ts">
const gallery = await queryContent("gallery").only(["images", "name"]).find();
const images = gallery.flatMap((entry) =>
    entry.images.flatMap((image: { url: string; width: number; height: number }) => ({
        name: entry.name,
        src: image.url,
        width: image.width,
        height: image.height,
    })),
) as [{ name: string; src: string; width: number; height: number }];

const modalOpen = useState<boolean>("gallery-modal", () => false);
const modalImage = useState<string>("gallery-modal-image");

const openModal = (image: string) => {
    modalOpen.value = true;
    modalImage.value = getFullImage(image);
};
</script>

<template>
    <NuxtLayout name="default">
        <div class="max-w-screen-2xl columns-1 gap-4 sm:columns-2 md:columns-3 lg:columns-4">
            <UiImage v-for="image in images" @click="openModal(image.src)" :name="image.name" :src="image.src" :width="image.width" :height="image.height" />
            <UModal v-model="modalOpen">
                <img loading="lazy" decoding="async" :src="modalImage" />
            </UModal>
        </div>
    </NuxtLayout>
</template>
