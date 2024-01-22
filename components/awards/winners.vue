<script setup lang="ts">
defineProps<{ winners: any; }>();

type ReleaseStatus = {
    released: boolean;
}

const { data: released } = await useFetch<ReleaseStatus>("/api/votes/released");

</script>

<template>
    <div class="flex w-full flex-col gap-2">
        <UAlert icon="i-mdi-heart" title="THANK YOU!" color="primary"
                description="Thanks for participating in the pesto awards 2023! We would love to see you again in the same place next year!" />
    </div>
    <div class="flex flex-row flex-wrap gap-8" v-if="released?.released">
        <UCard v-for="(winner, category) in winners" class="w-full text-center max-w-xs">
            <template #header>
                <h2 class="text-primary-700 dark:text-primary-500 font-medium">{{ category }}</h2>
            </template>

            <div class="flex flex-col items-center gap-2">
                <img src="/static/images/emotes/luckyPesto.webp" />
                <h3 class="text-xl font-bold">{{ winner.name }}</h3>
            </div>
        </UCard>
    </div>
</template>
