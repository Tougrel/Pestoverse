<script setup lang="ts">
import type { Lang, LangIDs } from "~/utils/i18n";

const route = useRoute();
const langID = useState<LangIDs>("lang_id");
const lang = useState<Lang>("lang");

defineProps<{ buttonClass?: string; map?: boolean }>();
</script>

<template>
    <header class="z-10 flex flex-col items-center justify-center gap-4 lg:flex-row lg:justify-between" :class="{ 'w-full': !map }">
        <h1 v-if="!map" class="text-primary-700 dark:text-primary-400 order-none hidden text-2xl font-bold lg:block">
            {{ lang.get(langID)?.get("pestoverse") }}
        </h1>

        <div v-if="!map" class="order-2 flex flex-row items-center gap-2 lg:order-1">
            <img v-if="PAGES(lang, langID)[route.path?.toString()].image" :src="PAGES(lang, langID)[route.path].icon as string" width="24" />
            <Icon v-else :name="PAGES(lang, langID)[route.path].icon as string" size="2em" class="text-primary-700 dark:text-primary-400" />
            <p class="text-primary-700 dark:text-primary-400 text-xl font-medium">
                {{ PAGES(lang, langID)[route.path].name }}
            </p>
        </div>

        <div class="order-1 flex flex-row items-center gap-4 lg:order-2">
            <UDropdown :items="NAV_MENU(lang, langID)" :popper="{ placement: 'bottom' }">
                <nav
                    class="hover:text-primary-700 hover:dark:text-primary-400 inline-flex items-center gap-2 transition-colors"
                    :class="buttonClass"
                    role="button"
                >
                    <Icon :name="ICONS.NAV_MENU" size="2em" class="text-primary-700 dark:text-primary-400" />
                    <span class="font-medium">{{ lang.get(langID)?.get("nav.menu") }}</span>
                </nav>
            </UDropdown>

            <UiColorPicker size="2em" :button-class="buttonClass" />
            <UiLangPicker size="2em" :button-class="buttonClass" />
        </div>
    </header>
</template>
