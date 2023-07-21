<script setup lang="ts">
import nya from "static/audio/nya.mp3";

const playNya = () => {
    const audio = new Audio(nya);
    audio.volume = 0.5;
    audio.play();
};

const CAT_ICON = ref<string>(ICONS.PAW);
</script>

<template>
    <button @click="playNya" class="fixed bottom-0 left-0 pb-2 pl-2">
        <Icon :name="CAT_ICON" size="2em" class="opacity-20 hover:opacity-60" @mouseover="CAT_ICON = ICONS.CAT" @mouseout="CAT_ICON = ICONS.PAW" />
    </button>
</template>
