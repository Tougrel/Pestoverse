<script setup lang="ts">
defineProps<{ error: Object }>();

import scream from "static/images/emotes/scream.webp";
import dog from "static/images/dog.png";

const handleErrors = () => clearError({ redirect: "/" });

const flashbang = ref(false);
const showDog = ref(true);
const animationFinished = ref(false);
</script>

<template>
    <div class="flex h-screen flex-col items-center justify-center gap-4 p-4">
        <img :src="scream" decoding="async" loading="lazy" alt="Scream" class="rounded-lg" />
        <div class="z-10 text-center">
            <h1 class="text-3xl font-bold text-red-600 dark:text-red-500 lg:text-6xl">BLACK HOLE ALERT</h1>
            <p class="text-lg text-gray-600 dark:text-gray-400">
                The universe is about to collapse due to an unexpected error! In case this keeps happening open an issue
                <a target="_blank" href="https://github.com/Tougrel/pestoverse/issues" class="text-primary-700 dark:text-primary-400">here</a>.
            </p>
        </div>
        <code class="max-h-30 z-10 w-full max-w-screen-2xl overflow-y-scroll rounded-lg border-2 border-navigation bg-gray-300 p-2 dark:bg-navigation/40">{{
            error
        }}</code>
        <button
            @click="handleErrors"
            class="border-primary-700 hover:bg-primary-300 hover:dark:bg-primary-900 z-10 rounded-lg border-2 px-4 py-2 transition-all duration-300 hover:scale-105"
            @mouseenter="
                () => {
                    if (animationFinished) showDog = true;
                }
            "
            @mouseleave="
                () => {
                    if (animationFinished) showDog = false;
                }
            "
        >
            Try to restore the Universe
        </button>
        <img
            :src="dog"
            :class="{ 'opacity-5': showDog, 'opacity-0': !showDog }"
            class="fixed bottom-0 left-0 z-0 animate-[scalein_30s_ease-in-out_forwards] grayscale transition ease-linear"
            draggable="false"
            @animationend="flashbang = true"
        />
        <div
            :class="{ 'opacity-100': flashbang, 'opacity-0': !flashbang, 'delay-1000': !flashbang, 'duration-100': flashbang, 'duration-1000': !flashbang }"
            class="pointer-events-none absolute z-50 h-screen w-screen bg-white transition ease-linear"
            @transitionend="
                flashbang = false;
                showDog = false;
                animationFinished = true;
            "
        ></div>
    </div>
</template>
