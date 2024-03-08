<script setup lang="ts">
const gallery = await queryContent("thank-you").only(["images", "name"]).find();
const images = gallery.flatMap((entry) =>
    entry.images.flatMap((image: { url: string; width: number; height: number }) => ({
        name: entry.name,
        twitter: image.twitter,
        artist: image.artist,
        src: image.url,
        width: image.width,
        height: image.height,
    })),
) as [{ name: string; artist?: string; twitter?: string | boolean; src: string; width: number; height: number }];

const loading = ref(true);
const modalOpen = useState<boolean>("gallery-modal", () => false);
const modalImage = useState<string>("gallery-modal-image");
const modalImageData = useState<string>("gallery-modal-data");

const openModal = (image: any) => {
    modalOpen.value = true;
    modalImageData.value = image;
};

const getLabel = (image: any) => {
    const hasTwitter = getTwitter(image) !== null;
    const artist = image.artist;
    let label = "Art by "
    if (artist) {
        label += artist;
    } else {
        label += image.name;
    }
    if (hasTwitter) {
        label += " (Click to open Twitter)"
    }
    return label
}

const getTwitter = (image: any) => {
    let artist = null;
    if (!image.artist) return artist;
    if (image.twitter === false) return artist;
    artist = image.artist;
    if (image.twitter) artist = image.twitter;
    return artist;
}

const goToArtist = (image: any) => {
    const twitter = getTwitter(image);
    if (!twitter) return;
    navigateTo(`https://twitter.com/${twitter}`, { open: { target: "_blank" } });
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
            @click="openModal(image)"
            :name="image.name"
            :src="image.src"
            :width="image.width"
            :height="image.height"
            prefix="thank-you/"
            class="mb-4"
        />
        <UModal v-model="modalOpen">
            <UiImage
                @click="goToArtist(modalImageData)"
                :name="getLabel(modalImageData)"
                :src="modalImageData.src"
                :width="modalImageData.width"
                :height="modalImageData.height"
                :full="true"
                prefix="thank-you/"
            />
        </UModal>
    </div>
</template>
