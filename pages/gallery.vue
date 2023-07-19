<script setup lang="ts">
const gallery = await queryContent("gallery").only(["images"]).find();
const images = gallery.flatMap((entry) => entry.images);

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
                <div v-for="image in images" class="mx-0.5 mb-6 break-inside-avoid">
                    <NuxtImg role="button" class="rounded-lg" loading="lazy" decoding="async" :src="image" @click="openModal(image)" />
                </div>
                <UModal v-model="modalOpen">
                    <img loading="lazy" decoding="async" :src="modalImage" />
                </UModal>
            </div>
        </div>
    </NuxtLayout>
</template>
