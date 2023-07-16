<script setup lang="ts">
import cat from 'static/images/cat.webp';
import nya from 'static/audio/nya.mp3';

const playNya = () => {
    const audio = new Audio(nya);
    audio.volume = 0.5;
    audio.play();
} 
</script>

<template>
    <button @click="playNya" class="fixed bottom-0 left-0">
        <img :src="cat" loading="lazy" decoding="async" class="h-12 opacity-20 hover:opacity-60" />
    </button>
</template>