<script setup lang="ts">
const props = defineProps<{ buttonClass?: string; map?: boolean }>();
const route = useRoute();

let iconSize = "2em";
</script>

<template>
    <header class="z-10 flex flex-col items-center justify-center gap-4 lg:flex-row lg:justify-between" :class="{ 'w-full': !map }">
        <h1 v-if="!map" class="text-primary-700 dark:text-primary-400 order-none hidden text-2xl font-bold lg:block">Pestoverse</h1>

        <div v-if="!map" class="order-2 flex flex-row items-center gap-2 lg:order-1">
            <img v-if="PAGES[route.path as keyof typeof PAGES].image" :src="PAGES[route.path as keyof typeof PAGES].icon as string" width="24" />
            <Icon v-else :name="ICONS.COFFEE" size="2em" class="text-primary-700 dark:text-primary-400" />
            <p class="text-primary-700 dark:text-primary-400 text-xl font-medium">{{ PAGES[route.path as keyof typeof PAGES].name }}</p>
        </div>

        <div class="order-1 flex flex-row items-center gap-4 lg:order-2">
            <UDropdown :items="NAV_MENU" :popper="{ placement: 'bottom' }">
                <nav
                    class="hover:text-primary-700 hover:dark:text-primary-400 inline-flex items-center gap-2 transition-colors"
                    :class="buttonClass"
                    role="button"
                >
                    <Icon :name="ICONS.NAV_MENU" :size="iconSize" class="text-primary-700 dark:text-primary-400" />
                    <span class="font-medium">Menu</span>
                </nav>
            </UDropdown>

            <UiColorPicker :size="iconSize" :button-class="buttonClass" />
        </div>
    </header>
</template>
