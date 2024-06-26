<script setup lang="ts">
const gallery = await queryContent("thank-you").only(["images", "name"]).find();
type ImageData = {
    name: string;
    artist?: string;
    twitter?: string | boolean;
    src: string;
    width: number;
    height: number;
};
const images = gallery.flatMap((entry) =>
    entry.images.flatMap((image: { url: string; width: number; height: number; twitter: string; artist: string }) => ({
        name: entry.name,
        twitter: image.twitter,
        artist: image.artist,
        src: image.url,
        width: image.width,
        height: image.height,
    })),
) as [ImageData];

const loading = ref(true);
const modalOpen = useState<boolean>("gallery-modal", () => false);
const modalImageData = useState<ImageData>("gallery-modal-data");

const openModal = (image: any) => {
    modalOpen.value = true;
    modalImageData.value = image;
};

const getLabel = (image: any) => {
    const hasTwitter = getTwitter(image) !== null;
    const artist = image.artist;
    let label = "Art by ";
    if (artist) {
        label += artist;
    } else {
        label += image.name;
    }
    if (hasTwitter) {
        label += " (Click to open Twitter)";
    }
    return label;
};

const getTwitter = (image: any) => {
    let artist = null;
    if (!image.artist) return artist;
    if (image.twitter === false) return artist;
    artist = image.artist;
    if (image.twitter) artist = image.twitter;
    return artist;
};

const goToArtist = (image: any) => {
    const twitter = getTwitter(image);
    if (!twitter) return;
    return `https://twitter.com/${twitter}`;
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

    <img src="https://cdn.pestoverse.world/allpestona.png" alt="Pesto Family" class="rounded-lg object-contain p-4" />
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
                :link="goToArtist(modalImageData)"
                :name="getLabel(modalImageData)"
                :src="modalImageData.src"
                :width="modalImageData.width"
                :height="modalImageData.height"
                :full="true"
                prefix="thank-you/"
            />
        </UModal>
    </div>
    <div v-show="!loading" class="columns-1 px-4 pb-4 md:columns-2">
        <iframe
            class="mb-4 h-auto w-full rounded-lg [aspect-ratio:16/9]"
            src="https://www.youtube.com/embed/qnumxLjtrJI"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
        ></iframe>
        <video controls class="h-auto w-full rounded-lg [aspect-ratio:16/9]">
            <source src="https://cdn.pestoverse.world/thank-you/birthday_pesto_besto_1.mp4" type="video/mp4" allowfullscreen />
        </video>
    </div>
</template>
