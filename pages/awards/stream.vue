<script setup lang="ts">
const { data: winners } = await useFetch("/api/votes/winners");
</script>

<template>
    <NuxtLayout name="default">
        <DevOnly>
            <code> Winners: {{ winners }} </code>
        </DevOnly>
        <div class="relative flex flex-col gap-4">
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
                <div v-for="(winner, category) in winners">
                    <VueFlip active-click width="277px" height="277px">
                        <template #front>
                            <UCard class="w-full h-full text-center max-w-md">
                                <template #header>
                                    <h2 class="text-primary-700 dark:text-primary-500 font-medium">{{ category }}</h2>
                                </template>

                                <div class="flex flex-col items-center gap-2">
                                    Click to reveal!
                                </div>
                            </UCard>
                        </template>
                        <template #back>
                            <UCard class="w-full text-center max-w-md">
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
        </div>
    </NuxtLayout>
</template>
