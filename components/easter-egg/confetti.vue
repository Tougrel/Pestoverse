<script setup lang="ts">
import confetti from "canvas-confetti";

onMounted(() => {
    // Based on https://www.kirilv.com/canvas-confetti/ examples
    const confettiCanvas = document.getElementById("confetti");
    const customConfetti = confetti.create(confettiCanvas, { resize: true, disableForReducedMotion: true });
    const end = Date.now() + 5 * 1000;
    const colors = ["#008d44", "#ffffff", "#d0323d"];

    customConfetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: colors,
        disableForReducedMotion: true
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
});

</script>

<template>
    <Teleport to="body">
        <canvas id="confetti" class="fixed inset-0 hidden h-full w-full lg:flex pointer-events-none" />
    </Teleport>
</template>
