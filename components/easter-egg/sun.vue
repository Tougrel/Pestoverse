<script setup lang="ts">
const appConfig = useAppConfig();
const primary = computed(() => appConfig.ui.primary);

const gradient = computed((gradient => {
    const color = primary.value;
    console.log(COLORS);
    if (color in COLORS) {
        const fromColor = COLORS[color]['400'];
        const toColor = COLORS[color]['600'];
        return {
            "--tw-gradient-from-color": fromColor,
            "--tw-gradient-from": "var(--tw-gradient-from-color) var(--tw-gradient-to-position)",
            "--tw-gradient-to-color": toColor,
            "--tw-gradient-to": "var(--tw-gradient-to-color) var(--tw-gradient-to-position)",
            "--tw-gradient-stops": "var(--tw-gradient-from), var(--tw-gradient-to)"
        }
    }
    return gradient;
}))

</script>
<template>
    <div
        class="fixed -mt-20 h-48 w-48 animate-[sunfire_4s_infinite_alternate] rounded-full bg-gradient-radial" :style="gradient">
    </div>
</template>
