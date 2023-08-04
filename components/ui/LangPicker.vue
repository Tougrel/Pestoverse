<script setup lang="ts">
const lang = useLang();

defineProps<{ size: string; buttonClass?: string }>();
</script>

<template>
    <UPopover :popper="{ placement: 'bottom' }" class="inline-flex">
        <div class="hover:text-primary-700 hover:dark:text-primary-400 flex items-center gap-2 transition-colors" :class="buttonClass">
            <Icon :name="ICONS.LANGUAGE" :size="size" class="text-primary-700 dark:text-primary-400" />
        </div>

        <template #panel>
            <div class="flex flex-col gap-4 p-2">
                <div class="grid grid-cols-5 gap-1">
                    <Icon :name="ICONS.WHITE_THEME" size="1.5em" role="button" />
                    <Icon :name="ICONS.DARK_THEME" size="1.5em" role="button" />
                </div>
            </div>
        </template>
    </UPopover>
</template>
