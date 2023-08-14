<script setup lang="ts">
import {MarkerProps} from "types/marker";

defineProps<{markers: MarkerProps[], open: (entry: MarkerProps) => void}>()
</script>
<template>
    <ul>
        <li v-for="marker in markers">
            <button class="text-black" @click="open(marker)">{{ marker.name}}</button>
        </li>
    </ul>
</template>