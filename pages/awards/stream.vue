<script setup lang="ts">
type Winners = { [category: string]: { name: string; votes: number } };
const { data: winners } = await useFetch<Winners>("/api/votes/winners");

const flipped = ref({} as { [category: string]: boolean });
const allFlipped = computed(() => {
    const winnersCount = Object.keys(winners.value).length;
    const totalFlipped = Object.values(flipped.value).filter((value) => value === true).length;
    return winnersCount === totalFlipped;
});

const released = ref(false);

const release = async () => {
    await useFetch("/api/votes/release", { method: "POST" });
    released.value = true;
};

definePageMeta({
    description: "",
    layout: "default",
});
</script>

<template>
    <DevOnly>
        <code> Winners: {{ winners }} </code>
    </DevOnly>
    <div class="relative flex flex-col gap-4">
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
            <div v-for="(winner, category) in winners">
                <VueFlip active-click width="277px" height="277px" class="cursor-pointer" v-model="flipped[category]">
                    <template #front>
                        <UCard class="h-full w-full max-w-md text-center">
                            <template #header>
                                <h2 class="text-primary-700 dark:text-primary-500 font-medium">{{ category }}</h2>
                            </template>

                            <div class="flex flex-col items-center gap-2">Click to reveal!</div>
                        </UCard>
                    </template>
                    <template #back>
                        <UCard class="w-full max-w-md text-center">
                            <template #header>
                                <h2 class="text-primary-700 dark:text-primary-500 font-medium">{{ category }}</h2>
                            </template>

                            <div class="flex flex-col items-center gap-2">
                                <img src="/static/images/emotes/luckyPesto.webp" />
                                <h3 class="text-xl font-bold">{{ winner.name }}</h3>
                            </div>
                        </UCard>
                    </template>
                </VueFlip>
            </div>
        </div>
        <UButton
            size="xl"
            v-if="allFlipped && !released"
            class="bg-red text-center"
            label="Click here Yuyu to Release the results to everyone!!"
            @click="release"
        />
    </div>
</template>
