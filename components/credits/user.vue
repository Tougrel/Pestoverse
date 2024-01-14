<script setup lang="ts">
defineProps<{ name: string; description: string; iconPath: string }>();
</script>

<template>
    <UCard>
        <template #header>
            <div class="flex flex-col items-center gap-2">
                <img :src="iconPath" loading="lazy" decoding="async" class="h-32 rounded-full" />
                <h2 class="text-primary-600 dark:text-primary-400 text-2xl font-bold">{{ name }}</h2>
            </div>
        </template>

        <p class="text-center text-gray-500 dark:text-gray-300">{{ description }}</p>
    </UCard>
</template>
