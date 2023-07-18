<script setup lang="ts">
import pestoroll from "static/images/emotes/pestoroll.webp";

const pesties = 6;
const angle = 360 / pesties;

const getPosition = (index: number) => {
    const degreesAngle = index * angle;
    const radiansAngle = degreesAngle * (Math.PI / 180);
    const radius = 32 / 2; // 32rem / 2;
    const x = Math.cos(radiansAngle) * radius;
    const y = Math.sin(radiansAngle) * radius;

    // Get some randomness so it's not a uniform rotating circle
    const randomData = Math.floor(Math.random() * 6);

    const bottomValue = radius - y + randomData - 2;
    const rightValue = radius - x + randomData - 2;

    return `bottom: ${bottomValue}rem; right: ${rightValue}rem`;
};
</script>

<template>
    <div class="pointer-events-none fixed top-1/4 h-full w-full rounded-full bg-gradient-radial from-black via-transparent to-transparent opacity-50">
        <!-- Sun -->
        <div
            class="z-4 absolute left-1/2 top-1/2 -ml-24 -mt-24 h-48 w-48 animate-[sunfire_4s_infinite_alternate] rounded-full bg-gradient-radial from-pink-400 to-pink-600"
        ></div>
        <!-- Pestie Orbit -->
        <div class="border-full absolute left-1/2 top-1/2 -ml-64 -mt-64 h-128 w-128 animate-[rotation_30s_linear_infinite]">
            <div class="relative h-full w-full">
                <!-- Pestie -->
                <img
                    v-for="index in pesties"
                    :key="index"
                    class="absolute -ml-8 h-16 animate-[rotation_3s_linear_infinite] saturate-150 dark:saturate-100"
                    :style="`${getPosition(index)}`"
                    :src="pestoroll"
                    alt="Pestie"
                />
            </div>
        </div>
    </div>
</template>
