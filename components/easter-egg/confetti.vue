<script setup lang="ts">
const props = defineProps<{ mode: string }>();
import confetti from "canvas-confetti";

import { useRafFn } from "@vueuse/core";

const fireworks = (customConfetti: confetti.CreateTypes, end: number) => {
    const colors = ["#008d44", "#ffffff", "#d0323d"];

    customConfetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: colors,
    });

    (function deezNutsEski() {
        customConfetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors,
        });

        customConfetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors,
        });

        if (Date.now() < end) requestAnimationFrame(deezNutsEski);
    })();
};

const snow = (customConfetti: confetti.CreateTypes, end: number) => {
    const colors = ["#ffffff"];
    const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
    };
    const duration = end - Date.now();
    let skew = 1;
    const { pause } = useRafFn(() => {
        const timeLeft = end - Date.now();
        const ticks = Math.max(200, 500 * (timeLeft / duration));
        skew = Math.max(0.8, skew - 0.001);
        customConfetti({
            particleCount: 1,
            startVelocity: 0,
            ticks: ticks,
            origin: {
                x: Math.random(),
                y: Math.random() * skew - 0.2,
            },
            colors: colors,
            shapes: ["circle"],
            gravity: randomInRange(0.4, 0.6),
            scalar: randomInRange(0.4, 1),
            drift: randomInRange(-0.4, 0.4),
        });
        if (timeLeft <= 0) {
            pause();
        }
    });
};

onMounted(() => {
    // Based on https://www.kirilv.com/canvas-confetti/ examples
    const confettiCanvas = document.getElementById("confetti");
    // @ts-ignore
    const customConfetti = confetti.create(confettiCanvas, { resize: true, disableForReducedMotion: true });
    const end = Date.now() + 5 * 1000;
    switch (props.mode) {
        case "snow":
            snow(customConfetti, end + 5 * 1000);
            break;
        case "fireworks":
            fireworks(customConfetti, end);
            break;
    }
});
</script>

<template>
    <Teleport to="body">
        <canvas id="confetti" class="pointer-events-none fixed inset-0 hidden h-full w-full lg:flex" />
    </Teleport>
</template>
