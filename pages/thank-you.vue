<script setup lang="ts">
const gallery = await queryContent("thank-you").only(["images", "name"]).find();
const images = gallery.flatMap((entry) =>
    entry.images.flatMap((image: { url: string; width: number; height: number }) => ({
        name: entry.name,
        src: image.url,
        width: image.width,
        height: image.height,
    })),
) as [{ name: string; src: string; width: number; height: number }];

const loading = ref(true);
const modalOpen = useState<boolean>("gallery-modal", () => false);
const modalImage = useState<string>("gallery-modal-image");

const openModal = (image: string) => {
    modalOpen.value = true;
    modalImage.value = getFullImage(image, "thank-you/");
};

definePageMeta({
    description: "Thank you for the amazing memories Yunii! We will never forget you!",
    layout: "default",
});

onMounted(() => {
    setTimeout(() => (loading.value = false), 1500);
});
</script>

<template>
    <div v-if="loading" class="flex h-full w-full flex-col items-center justify-center">
        <img src="static/images/emotes/waddle.gif" decoding="async" loading="lazy" class="bg-cover bg-repeat-x" />
    </div>
    <div v-show="!loading" class="columns-1 gap-4 p-4 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5">
        <UiImage
            v-for="image in images"
            @click="openModal(image.src)"
            :name="image.name"
            :src="image.src"
            :width="image.width"
            :height="image.height"
            prefix="thank-you/"
            class="mb-4"
        />
        <UModal v-model="modalOpen">
            <img loading="lazy" decoding="async" :src="modalImage" />
        </UModal>
    </div>
</template>
