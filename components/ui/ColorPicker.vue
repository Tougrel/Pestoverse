<script setup lang="ts">

const appConfig = useAppConfig();
const colorMode = useColorMode();

const primary = computed(() => appConfig.ui.primary);

const setColor = (color: string) => {
    appConfig.ui.primary = color;
    localStorage.setItem("ui-color", color);
};

defineProps<{ size: string; buttonClass?: string }>();
</script>

<template>
    <UPopover :popper="{ placement: 'bottom' }" class="inline-flex">
        <div class="hover:text-primary-700 hover:dark:text-primary-400 flex items-center gap-2 transition-colors" :class="buttonClass">
            <Icon :name="ICONS.PALETTE" :size="size" class="text-primary-700 dark:text-primary-400" />
        </div>

        <template #panel>
            <div class="flex flex-col gap-4 p-2">
                <div class="grid grid-cols-5 gap-1">
                    <Icon
                        :name="ICONS.WHITE_THEME"
                        size="1.5em"
                        role="button"
                        @click="colorMode.preference = 'white'"
                        :class="{ 'text-primary-700 dark:text-primary-400': colorMode.preference === 'white' }"
                    />
                    <Icon
                        :name="ICONS.DARK_THEME"
                        size="1.5em"
                        role="button"
                        @click="colorMode.preference = 'dark'"
                        :class="{ 'text-primary-700 dark:text-primary-400': colorMode.preference === 'dark' }"
                    />
                </div>
                <hr class="border-background dark:border-white" />
                <div class="grid grid-cols-5 gap-1">
                    <button
                        v-for="(color, index) in Object.entries(COLORS)
                            .map((c) => {
                                return {
                                    name: c[0],
                                    value: ['dark'].includes(colorMode.preference) ? c[1]['400'] : c[1]['700'],
                                };
                            })"
                        :key="index"
                        class="rounded-lg p-1 transition-colors hover:bg-gray-300 dark:hover:bg-background"
                        :class="{ 'bg-gray-300 dark:bg-background': primary === color.name }"
                        @click="setColor(color.name)"
                    >
                        <div class="h-4 w-4 rounded-full" :style="`background: ${color.value}`" />
                    </button>
                </div>
            </div>
        </template>
    </UPopover>
</template>
