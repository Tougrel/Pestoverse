<script setup lang="ts">
import confetti from "canvas-confetti";

onMounted(() => {
    // Based on https://www.kirilv.com/canvas-confetti/ examples
    const schoolPrideConfettiCanvas = document.getElementById("schoolPrideConfetti");
    const schoolPrideConfetti = confetti.create(schoolPrideConfettiCanvas, { resize: true });
    const end = Date.now() + (5 * 1000);
    const colors = ["#008d44", "#ffffff", "#d0323d"];

    (() => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: colors
        });
    })();

    (function deezNutsEski() {
        schoolPrideConfetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors
        });

        schoolPrideConfetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors
        });

        if (Date.now() < end)
            requestAnimationFrame(deezNutsEski);
    })();
});
</script>

<template>
    <Teleport to="body">
        <canvas id="schoolPrideConfetti" class="hidden lg:flex fixed inset-0 w-full h-full" />
    </Teleport>
</template>
