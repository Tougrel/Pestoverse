<script setup lang="ts">
import pestoBinoculars from 'static/images/emotes/pestoBinoculars.webp';

const gallery = await queryContent('gallery')
    .only(['images'])
    .find();

const appConfig = useAppConfig();

const images = gallery.flatMap((entry) => entry.images);

const modalOpen = useState<boolean>('gallery-modal', () => false);
const modalImage = useState<string>('gallery-modal-image');

const openModal = (image: string) => {
    modalOpen.value = true;
    modalImage.value = image;
}

</script>

<template>
    <NuxtLayout name="default">
        <div class="flex flex-col items-center gap-6">
            <div class="flex flex-col items-center">
                <img loading="lazy" decoding="async" :src="pestoBinoculars" />
                <h1 class="text-4xl text-green-600 dark:text-green-400 font-bold">Look at all the Pesto</h1>
            </div>

            <div class="flex flex-row flex-wrap gap-4">
                <UCard v-for="image in images" :ui="appConfig.ui.galleryCard">
                    <NuxtImg role="button" class="h-64 m-auto" loading="lazy" decoding="async" :src="image" @click="openModal(image)"/>
                </UCard>
            </div>
        </div>
        <UModal v-model="modalOpen">
            <img loading="lazy" decoding="async" :src="modalImage"/>
        </UModal>
    </NuxtLayout>
</template>