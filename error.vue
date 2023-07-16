<script setup lang="ts">
defineProps<{ error: Object; }>();

import scream from 'static/images/emotes/scream.webp';
import dog from 'static/images/dog.png';

const handleErrors = () => clearError({ redirect: "/" });

const flashbang = ref(false);
const showDog = ref(true);

</script>

<template>
    <div class="flex flex-col items-center justify-center gap-4 p-4 h-screen">
        <img :src="scream" decoding="async" loading="lazy" alt="Scream" class="rounded-lg" />
        <div class="text-center z-10">
            <h1 class="text-3xl lg:text-6xl font-bold text-red-600 dark:text-red-500">BLACK HOLE ALERT</h1>
            <p class="text-lg text-gray-600 dark:text-gray-400">
                The universe is about to collapse due to an unexpected error!
                In case this keeps happening open an issue
                <a target="_blank" href="https://github.com/Tougrel/pestoverse/issues"
                    class="text-green-700 dark:text-green-400">here</a>.
            </p>
        </div>
        <code
            class="bg-gray-300 dark:bg-navigation/40 border-2 border-navigation p-2 rounded-lg max-w-screen-2xl w-full max-h-30 overflow-y-scroll z-10">{{ error }}</code>
        <button @click="handleErrors"
            class="border-2 border-green-700 px-4 py-2 rounded-lg transition-all hover:bg-green-300 hover:dark:bg-green-900 hover:scale-105 duration-300 z-10">
            Try to restore the Universe
        </button>
        <img :src="dog" v-if="showDog" class="fixed bottom-0 left-0 opacity-5 grayscale z-0 animate-[scalein_30s_ease-in-out_forwards]" draggable="false" @animationend="flashbang = true" />
        <div :class="{'opacity-100': flashbang, 'opacity-0': !flashbang, 'delay-1000': !flashbang, 'duration-100': flashbang, 'duration-1000': !flashbang}" class="pointer-events-none transition ease-linear absolute z-50 h-screen w-screen bg-white" @transitionend="flashbang = false; showDog = false"></div>
    </div>
</template>
  