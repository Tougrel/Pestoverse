<script setup lang="ts">
import confetti from "canvas-confetti";

const finished = ref(false);

onMounted(() => {
    // Based on https://www.kirilv.com/canvas-confetti/ examples
    const schoolPrideConfettiCanvas = document.getElementById("schoolPrideConfetti");
    const schoolPrideConfetti = confetti.create(schoolPrideConfettiCanvas, { resize: true });
    const end = Date.now() + 5 * 1000;
    const colors = ["#008d44", "#ffffff", "#d0323d"];

    (() => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: colors,
        });
    })();

    (function deezNutsEski() {
        schoolPrideConfetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors,
        });

        schoolPrideConfetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors,
        });

        if (Date.now() < end) {
            requestAnimationFrame(deezNutsEski);
        } else {
            finished.value = true;
        }
    })();
});
</script>

<template>
    <Teleport to="body">
        <canvas v-if="!finished" id="schoolPrideConfetti" class="fixed inset-0 hidden h-full w-full lg:flex pointer-events-none" />
    </Teleport>
</template>
