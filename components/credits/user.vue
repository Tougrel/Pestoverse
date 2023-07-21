<script setup lang="ts">
defineProps<{ name: string; description: string; iconPath: string }>();
</script>

<template>
    <UCard>
        <template #header>
            <div class="flex flex-row justify-center">
                <img :src="iconPath" loading="lazy" decoding="async" class="h-32 rounded-full" />
            </div>
        </template>

        <div class="flex flex-col gap-2">
            <h2 class="text-primary-600 dark:text-primary-400 text-2xl font-bold">{{ name }}</h2>
            <p class="text-gray-500 dark:text-gray-300">{{ description }}</p>
        </div>
    </UCard>
</template>
