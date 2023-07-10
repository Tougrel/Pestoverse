<script setup lang="ts">
const colorMode = useColorMode();
</script>

<template>
    <nav class="flex flex-row flex-wrap items-center gap-4">
        <UDropdown :items="NAV_MENU" :popper="{ placement: 'bottom' }">
            <div class="inline-flex items-center gap-2 border-2 border-green-700 dark:border-green-400 p-2 rounded-lg hover:text-green-700 hover:dark:text-green-400 transition-colors"
                role="button">
                <Icon :name="ICONS.NAV_MENU" size="2em" class="text-green-700 dark:text-green-400" />
                <span class="text-lg font-medium">Menu</span>
            </div>
        </UDropdown>

        <UDropdown :items="THEME_MENU" :popper="{ placement: 'bottom' }">
            <div
                class="inline-flex items-center gap-2 border-2 border-green-700 dark:border-green-400 p-2 rounded-lg hover:text-green-700 hover:dark:text-green-400 transition-colors">
                <Icon v-if="colorMode.preference === 'system'" :name="ICONS.SYSTEM_THEME" size="2em"
                    class="text-green-700 dark:text-green-400" />
                <Icon v-if="colorMode.preference === 'white'" :name="ICONS.WHITE_THEME" size="2em"
                    class="text-green-700 dark:text-green-400" />
                <Icon v-if="colorMode.preference === 'dark'" :name="ICONS.DARK_THEME" size="2em"
                    class="text-green-700 dark:text-green-400" />
                <span class="text-lg font-medium">Theme</span>
            </div>
        </UDropdown>
    </nav>
</template>
