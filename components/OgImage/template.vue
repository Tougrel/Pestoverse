<script setup lang="ts">
import doggess from "static/images/doggess.png";
import yesPesto from "static/images/emotes/yesPesto.png";

defineProps<{ title: String; description: String }>();
</script>

<template>
    <div class="flex h-full w-full flex-col justify-between bg-slate-200 p-12 text-slate-700">
        <img :src="doggess" alt="Yunii" class="absolute -bottom-10 -left-20 z-0 opacity-25" :style="{ filter: 'blur(4px)' }" />
        <div class="absolute bottom-0 left-0 flex h-1 w-[75rem] bg-pink-200"></div>
        <div class="z-40 flex flex-row justify-between gap-6">
            <div class="flex flex-col">
                <h1 class="text-6xl">{{ title }}</h1>
                <p class="text-3xl leading-10 text-slate-700">{{ description }}</p>
            </div>

            <img :src="yesPesto" alt="Certified Pesto" class="h-32 w-32" />
        </div>
        <p class="self-end text-5xl font-bold bg-gradient-to-r from-green-700 via-neutral-300 to-red-800 text-transparent bg-clip-text">
            HAPPY BIRTHDAY YUNI
        </p>
    </div>
</template>
