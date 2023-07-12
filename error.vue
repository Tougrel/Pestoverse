<script setup lang="ts">
defineProps<{ error: Object; }>();

const handleErrors = () => clearError({ redirect: "/" });
</script>

<template>
    <div class="flex flex-col items-center justify-center gap-4 p-4 h-screen">
        <img src="static/images/emotes/scream.webp" decoding="async" loading="lazy" alt="Scream" class="rounded-lg" />
        <div class="text-center">
            <h1 class="text-3xl lg:text-6xl font-bold text-red-600 dark:text-red-500">BLACK HOLE ALERT</h1>
            <p class="text-lg text-gray-600 dark:text-gray-400">
                The universe is about to collapse due to an unexpected error!
                In case this keeps happening open an issue
                <a target="_blank" href="https://github.com/Tougrel/pestoverse/issues"
                    class="text-green-700 dark:text-green-400">here</a>.
            </p>
        </div>
        <code
            class="bg-gray-300 dark:bg-navigation/40 border-2 border-navigation p-2 rounded-lg max-w-screen-2xl w-full">{{ error }}</code>
        <button @click="handleErrors"
            class="border-2 border-green-700 px-4 py-2 rounded-lg transition-all hover:bg-green-300 hover:dark:bg-green-900 hover:scale-105 duration-300">
            Try to restore the Universe
        </button>
    </div>
</template>
  