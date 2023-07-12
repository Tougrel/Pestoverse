<script setup lang="ts">
defineProps<{ name: string; description: string; iconPath: string; }>();
</script>

<template>
    <UCard>
        <template #header>
            <div class="flex flex-row justify-center">
                <img :src="iconPath" width="128" loading="lazy" decoding="async" class="rounded-full" />
            </div>
        </template>

        <div class="flex flex-col gap-2">
            <h2 class="text-2xl font-bold text-green-600 dark:text-green-400">{{ name }}</h2>
            <p class="text-gray-500 dark:text-gray-300">{{ description }}</p>
        </div>
    </UCard>
</template>
