<script setup lang="ts">
import cat from 'static/images/cat.webp';
import nya from 'static/audio/nya.mp3';

const playNya = () => {
    const audio = new Audio(nya);
    audio.play();
} 

</script>

<template>
    <button @click="playNya">
        <img :src="cat" loading="lazy" decoding="async" class="fixed bottom-0 left-0 h-10 opacity-10 hover:opacity-60" />
    </button>
</template>