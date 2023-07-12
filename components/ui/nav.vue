<script setup lang="ts">
const colorMode = useColorMode();
const props = defineProps<{ iconSize?: string, fontSize?: "sm" | "md" | "lg", buttonClass?: string }>();

const textSizeClass = {
    'text-sm': props.fontSize === 'sm',
    'text-md': props.fontSize === 'md',
    'text-lg': props.fontSize === 'lg',
};
let normalIconSize = '2em';
if (props.iconSize) {
    normalIconSize = props.iconSize;
}
</script>

<template>
    <nav class="flex flex-row flex-wrap items-center gap-4">
        <UDropdown :items="NAV_MENU" :popper="{ placement: 'bottom' }">
            <div class="inline-flex items-center gap-2 border-2 border-green-700 dark:border-green-400 p-2 rounded-lg hover:text-green-700 hover:dark:text-green-400 transition-colors" :class="buttonClass"
                role="button">
                <Icon :name="ICONS.NAV_MENU" :size="normalIconSize" class="text-green-700 dark:text-green-400" />
                <span class="font-medium" :class="textSizeClass">Menu</span>
            </div>
        </UDropdown>

        <UDropdown :items="THEME_MENU" :popper="{ placement: 'bottom' }">
            <div
                class="inline-flex items-center gap-2 border-2 border-green-700 dark:border-green-400 p-2 rounded-lg hover:text-green-700 hover:dark:text-green-400 transition-colors" :class="buttonClass">
                <Icon v-if="colorMode.preference === 'system'" :name="ICONS.SYSTEM_THEME" :size="normalIconSize"
                    class="text-green-700 dark:text-green-400" />
                <Icon v-if="colorMode.preference === 'white'" :name="ICONS.WHITE_THEME" :size="normalIconSize"
                    class="text-green-700 dark:text-green-400" />
                <Icon v-if="colorMode.preference === 'dark'" :name="ICONS.DARK_THEME" :size="normalIconSize"
                    class="text-green-700 dark:text-green-400" />
                <span class="font-medium" :class="textSizeClass">Theme</span>
            </div>
        </UDropdown>
    </nav>
</template>
