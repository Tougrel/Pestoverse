<script setup lang="ts">
import { LangNames } from "~/utils/i18n";

const lang = useLang();
defineProps<{ name: string; description: LangNames; iconPath: string }>();
</script>

<template>
    <UCard>
        <template #header>
            <div class="flex flex-row justify-center">
                <img :src="iconPath" loading="lazy" :alt="name" decoding="async" class="h-32 rounded-full" />
            </div>
        </template>

        <div class="flex flex-col gap-2">
            <h2 class="text-primary-600 dark:text-primary-400 text-2xl font-bold">{{ name }}</h2>
            <p class="text-gray-500 dark:text-gray-300">{{ lang.get(description) }}</p>
        </div>
    </UCard>
</template>
