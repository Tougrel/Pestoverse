<script setup lang="ts">
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
            <div class="inline-flex items-center gap-2 border-2 border-primary-700 dark:border-primary-400 p-2 rounded-lg hover:text-primary-700 hover:dark:text-primary-400 transition-colors"
                :class="buttonClass" role="button">
                <Icon :name="ICONS.NAV_MENU" :size="normalIconSize" class="text-primary-700 dark:text-primary-400" />
                <span class="font-medium" :class="textSizeClass">Menu</span>
            </div>
        </UDropdown>

        <UiColorPicker :size="normalIconSize" :button-class="buttonClass" />
    </nav>
</template>
