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
    <div class="flex h-screen flex-col items-center gap-8 p-8 lg:p-24">
        <h1 class="text-primary-600 dark:text-primary-400 text-4xl font-bold leading-4">List of possible categories!</h1>
        <p class="text-lg text-gray-300">
            Make sure to suggest categories
            <NuxtLink to="https://github.com/Tougrel/Pestoverse/discussions/68" class="text-primary-600 dark:text-primary-400">here </NuxtLink>
            or on Discord by contacting Tougrel, Ikanexus or any moderator!
        </p>
        <ul class="list-outside list-decimal">
            <li v-for="item in list" class="py-1">
                <span>{{ item }}</span>
            </li>
        </ul>
    </div>
</template>
