<script setup lang="ts">
import { Lang, LangIDs } from "~/utils/i18n";

const langID = useState<LangIDs>("lang_id");
const lang = useState<Lang>("lang");
</script>

<template>
    <footer class="flex w-full flex-row flex-wrap items-center justify-center gap-4 p-2 lg:justify-between lg:p-4">
        <div class="flex flex-col items-center text-center lg:items-start lg:text-start">
            <p class="text-gray-600 dark:text-gray-300">
                {{ lang.get(langID)?.get("footer.made") }} <span class="animate-pulse">❤️</span>
                {{ lang.get(langID)?.get("footer.made.by") }}
                <a
                    href="https://github.com/Tougrel/pestoverse"
                    class="text-primary-700 dark:text-primary-400 before:from-primary-300 relative font-bold before:absolute before:top-5 before:h-0.5 before:w-0 before:rounded-lg before:bg-gradient-to-r before:to-pink-300 before:transition-[width] before:duration-300 before:hover:w-full"
                >
                    {{ lang.get(langID)?.get("footer.made.community") }}</a
                >!
            </p>
            <p class="text-gray-700 dark:text-gray-300">
                {{ lang.get(langID)?.get("footer.credits") }}
                <NuxtLink
                    to="/credits"
                    class="text-primary-700 dark:text-primary-400 hover:text-primary-800 hover:dark:text-primary-500 before:from-primary-300 relative before:absolute before:top-5 before:h-0.5 before:w-0 before:rounded-lg before:bg-gradient-to-r before:to-pink-300 before:transition-[width] before:duration-300 before:hover:w-full"
                >
                    {{ lang.get(langID)?.get("nav.menu.credits") }}
                </NuxtLink>
                {{ lang.get(langID)?.get("footer.credits.page") }}!
            </p>
        </div>
        <div class="flex flex-row items-center justify-between gap-4">
            <UTooltip text="Github">
                <a href="https://github.com/Tougrel/Pestoverse" target="_blank" class="hover:text-primary-700 dark:hover:text-primary-500 transition-colors">
                    <Icon :name="ICONS.GITHUB" size="2em" />
                </a>
            </UTooltip>
            <UTooltip text="Crowdin">
                <a href="https://crowdin.com/project/pestoverse" target="_blank" class="hover:text-primary-700 dark:hover:text-primary-500 transition-colors">
                    <Icon :name="ICONS.CROWDIN" size="2em" />
                </a>
            </UTooltip>
        </div>
    </footer>
</template>
