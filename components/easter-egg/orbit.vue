<script setup lang="ts">
import pestoroll from 'static/images/emotes/pestoroll.webp';

const pesties = 6;
const angle = 360 / pesties;

const getPosition = (index: number) => {
    const degreesAngle = index * angle
    const radiansAngle = degreesAngle * (Math.PI / 180);
    const radius = 32 / 2 // 32rem / 2;
    const x = Math.cos(radiansAngle) * radius;
    const y = Math.sin(radiansAngle) * radius;

    // Get some randomness so it's not a uniform rotating circle
    const randomData = Math.floor(Math.random() * 6);

    const bottomValue = (radius - y) + randomData - 2;
    const rightValue = (radius - x) + randomData - 2;

    return `bottom: ${bottomValue}rem; right: ${rightValue}rem`;
} 

</script>

<template>
    <div class="fixed opacity-50 top-1/4 pointer-events-none h-full w-full bg-gradient-radial from-black via-transparent to-transparent rounded-full">
        <!-- Sun -->
        <div class="absolute h-48 w-48 top-1/2 left-1/2 -ml-24 -mt-24 rounded-full bg-gradient-radial from-pink-400 to-pink-600 z-4 animate-[sunfire_4s_infinite_alternate]"></div>
        <!-- Pestie Orbit -->
        <div class="absolute h-128 w-128 top-1/2 left-1/2 -mt-64 -ml-64 border-full animate-[rotation_30s_linear_infinite]">
            <div class="relative h-full w-full">
                <!-- Pestie -->
                <img v-for="index in pesties" :key="index" class="absolute h-16 -ml-8 animate-[rotation_3s_linear_infinite] saturate-150 dark:saturate-100" :style="`${getPosition(index)}`" :src="pestoroll" alt="Pestie" />
            </div>
        </div>

    </div>
</template>
