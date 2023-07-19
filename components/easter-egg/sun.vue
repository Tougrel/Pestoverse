<script setup lang="ts">
const appConfig = useAppConfig();
const primary = computed(() => appConfig.ui.primary);

const gradient = computed((gradient => {
    const color = primary.value;
    const colors = Object(COLORS);
    if (color in colors) {
        const lightColor = colors[color]['400'];
        const darkColor = colors[color]['600'];
        return {
            "--tw-gradient-from-color": darkColor,
            "--tw-gradient-from": "var(--tw-gradient-from-color) var(--tw-gradient-to-position)",
            "--tw-gradient-to-color": lightColor,
            "--tw-gradient-to": "var(--tw-gradient-to-color) var(--tw-gradient-to-position)",
            "--tw-gradient-stops": "var(--tw-gradient-from), var(--tw-gradient-to)"
        }
    }
    return gradient;
}))

</script>
<template>
    <NuxtLink to="/map"
        class="transition-all duration-300 hover:scale-105 text-center h-48 w-48">
        <div class="fixed h-48 w-48 animate-[sunfire_4s_infinite_alternate] rounded-full bg-gradient-radial"
            :style="gradient">
        </div>
        <div class="relative top-1/2 -mt-2">Start exploring!</div>
    </NuxtLink>
</template>
