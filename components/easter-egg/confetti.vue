<script setup lang="ts">
import confetti from 'canvas-confetti';

onMounted(() => {
    // Based on https://www.kirilv.com/canvas-confetti/ Fireworks example
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti({ 
            particleCount, 
            origin: {
                x: randomInRange(0.1, 0.3),
                y: Math.random() - 0.2
            },
            ...defaults
        });
        confetti({
            particleCount,
            origin: {
                x: randomInRange(0.7, 0.9),
                y: Math.random() - 0.2
            },
            ...defaults
        });
    }, 250);
})
</script>