<script setup lang="ts">
import nya from "static/audio/nya.mp3";

const playNya = () => {
    const audio = new Audio(nya);
    audio.volume = 0.5;
    audio.play();
};

const CAT_ICON: Ref<typeof ICONS.PAW | typeof ICONS.CAT> = ref(ICONS.PAW);
</script>

<template>
    <button
        class="fixed bottom-0 left-0 mb-2 ml-2 opacity-20 hover:opacity-60"
        @mouseover="CAT_ICON = ICONS.CAT"
        @mouseout="CAT_ICON = ICONS.PAW"
        @click="playNya"
    >
        <Icon :name="CAT_ICON" size="2em" />
    </button>
</template>
