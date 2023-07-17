<script setup lang="ts">
defineProps<{ title: string; description: string | null; icon: string; to: string; }>();
</script>

<template>
    <a :href="to"
        class="flex flex-row bg-gray-200 dark:bg-navigation p-4 gap-4 rounded-lg ring-2 ring-transparent hover:ring-primary-700 hover:dark:ring-primary-400 transition-all duration-300">
        <Icon :name="icon" size="3em" class="text-primary-700 dark:text-primary-400" />

        <div class="flex flex-col">
            <h2 class="text-xl font-bold">{{ title }}</h2>
            <p v-if="description" class="text-gray-500 dark:text-gray-300">{{ description }}</p>
            <span class="text-xs text-gray-700 dark:text-gray-500">
                {{ to.replace(/http(s)?\:\/\//, "") }}
            </span>
        </div>
    </a>
</template>
