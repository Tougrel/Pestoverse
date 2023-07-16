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
                <h1 class="text-4xl text-primary-600 dark:text-primary-400 font-bold">Look at all the Pesto</h1>
            </div>

            <div class="relative flex flex-col justify-center max-w-screen-2xl">
                <div class="columns-2 xl:columns-3 2xl:columns-4 [column-fill:_balance] box-border mx-auto before:box-inherit after:box-inherit">
                    <div v-for="image in images" class="break-inside-avoid mx-0.5 mb-6">
                        <NuxtImg role="button" class="rounded-lg" loading="lazy" decoding="async" :src="image" @click="openModal(image)"/>
                    </div>
                </div>
            </div>
        </div>
        <UModal v-model="modalOpen">
            <img loading="lazy" decoding="async" :src="modalImage"/>
        </UModal>
    </NuxtLayout>
</template>