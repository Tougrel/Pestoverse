<script setup lang="ts">
const { session } = useAuth();
const router = useRouter();
const pages = ref([
    {
        label: "Map",
        icon: "heroicons:map-solid",
        to: "/",
    },
    {
        label: "Gallery",
        icon: "heroicons:photo-solid",
        to: "/gallery",
    },
    {
        label: "Awards",
        icon: "heroicons:trophy-solid",
        to: "/awards",
    },
    {
        label: "Credits",
        icon: "mdi:handshake",
        to: "/credits",
    },
    {
        label: "Dashboard",
        icon: "mdi:view-dashboard",
        to: "/dashboard",
        devs: true,
    },
]);

const filterPages = (pgs: any[]) => {
    if (session.value && ["256048990750113793", "769556133215862784"].indexOf(session.value.profile.id) !== -1) return pgs;
    else return pgs.filter((value) => !value.devs);
};
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
            <NuxtLink v-for="page in filterPages(pages)" :key="page.label" :to="page.to" active-class="text-primary-500">
                <Icon :name="page.icon" size="1.5em" class="mr-2" />
                <span class="text-lg font-medium">{{ page.label }}</span>
            </NuxtLink>
            <UiAuth />
        </div>

        <div class="flex flex-col items-start gap-2">
            <div class="flex flex-row items-center gap-2">
                <EasterEggButton />
                <a href="https://github.com/Tougrel/Pestoverse" target="_blank" class="hover:text-primary-700 dark:hover:text-primary-500 transition-colors">
                    <Icon :name="ICONS.GITHUB" size="2em" />
                </a>
                <UiColorPicker size="2em" />
            </div>
            <p class="text-sm text-gray-400">
                Made with <span class="animate-pulse">❤️</span> by the <span class="text-primary-700 dark:text-primary-500">pesto community</span>!
            </p>
        </div>
    </header>
</template>
