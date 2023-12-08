<script setup lang="ts">
const list = ref([
    "Mod of the year",
    "Best Yunii fanart",
    "Artist of the year",
    "Most chaotic pestie",
    "Sussiest pestie",
    "Most gassy pestie",
    "Most biteable pestie",
    "The chaddest pestie",
    "Most gamba addicted pestie",
    "Best gambler",
    "Worst gambler",
    "Best gamer",
    "Most helpful pestie",
    "Most wholesome pestie",
    "Most nice pestie",
    "Best discord streamer",
    "Best discord chatter",
]);
</script>

<template>
    <NuxtLayout name="default">
        <div class="flex flex-1 flex-col items-center justify-center gap-4">
            <div class="flex flex-col items-center">
                <h1 class="text-4xl font-bold">List of possible categories!</h1>
                <p class="text-lg text-gray-300">
                    Make sure to suggest categories
                    <NuxtLink to="https://github.com/Tougrel/Pestoverse/discussions/68" class="text-primary-600 dark:text-primary-400">here </NuxtLink>
                    or on Discord by contacting Tougrel, Ikanexus or any moderator!
                </p>
            </div>

            <div class="flex max-w-screen-xl flex-row flex-wrap items-center gap-4">
                <UBadge v-for="item in list" color="primary" variant="soft" :label="item" size="lg" />
            </div>
        </div>
    </NuxtLayout>
</template>
