<script setup lang="ts">
defineProps<{ winners: any; }>();
</script>

<template>
    <div class="flex flex-row flex-wrap gap-8">
        <UCard v-for="(winner, category) in winners" class="w-full text-center max-w-xs">
            <template #header>
                <h2 class="text-primary-700 dark:text-primary-500 font-medium">{{ category }}</h2>
            </template>

            <div class="flex flex-col items-center gap-2">
                <img src="/static/images/emotes/luckyPesto.webp" />
                <h3 class="text-xl font-bold">{{ winner.name }}</h3>
            </div>
        </UCard>
    </div>
</template>
