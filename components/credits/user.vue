<script setup lang="ts">
defineProps<{ name: string; description: string; iconPath: string; }>();
</script>

<template>
    <UCard>
        <template #header>
            <div class="flex flex-row justify-center">
                <img :src="iconPath" loading="lazy" decoding="async" class="rounded-full h-32" />
            </div>
        </template>

        <div class="flex flex-col gap-2">
            <h2 class="text-2xl font-bold text-primary-600 dark:text-primary-400">{{ name }}</h2>
            <p class="text-gray-500 dark:text-gray-300">{{ description }}</p>
        </div>
    </UCard>
</template>
