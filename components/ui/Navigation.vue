<script setup lang="ts">
const router = useRouter();
const pages = [
    {
        label: "Map",
        icon: "heroicons:map-solid",
        to: "/v2",
    },
    {
        label: "Gallery",
        icon: "heroicons:photo-solid",
        to: "/v2/gallery",
    },
    {
        label: "Awards",
        icon: "heroicons:trophy-solid",
        to: "/awards",
    },
    {
        label: "Credits",
        icon: "mdi:handshake",
        to: "/v2/credits",
    },
];
</script>

<template>
    <header class="flex max-w-[256px] flex-col justify-between bg-background-darker p-6 text-white">
        <div class="flex flex-col gap-2">
            <NuxtLink to="/" class="text-primary-500 text-2xl font-bold"> Pestoverse </NuxtLink>
            <p class="text-sm text-gray-400">The official website for running, upcoming and archived events created by Yuniiho's community!</p>
            <UDivider />
            <p class="text-sm text-gray-400">{{ router.currentRoute.value.meta?.description }}</p>
        </div>

        <div class="flex flex-col gap-2">
            <NuxtLink v-for="page in pages" :to="page.to" active-class="text-primary-500">
                <Icon :name="page.icon" size="1.5em" class="mr-2" />
                <span class="text-lg font-medium">{{ page.label }}</span>
            </NuxtLink>
            <UiAuth />
        </div>

        <div class="flex flex-col items-start gap-2">
            <div class="flex flex-row items-center gap-2">
                <EasterEggV2Button />
                <UiColorPicker size="2em" />
            </div>
            <p class="text-sm text-gray-400">
                Made with <span class="animate-pulse">❤️</span> by the <span class="text-primary-700 dark:text-primary-500">pesto community</span>!
            </p>
        </div>
    </header>
</template>
