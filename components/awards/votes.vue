<script setup lang="ts">
const { status } = useAuth();

const setVote = (vote: string) => {

}

defineProps<{ categories: any[]; state: { [key: number]: string | number }; options: any; }>();
</script>

<template>
    <div class="grid grid-cols-1 gap-x-6 gap-y-4 2xl:grid-cols-2">
        <div v-for="item in categories" class="flex flex-col gap-4">
            <div class="flex flex-row justify-between">
                <div class="flex flex-col">
                    <label :for="'' + item.id" class="text-lg font-medium text-gray-700 dark:text-gray-200">{{ item.name }}</label>
                    <p class="text-base text-gray-500 dark:text-gray-400">{{ item.description || 'N/A' }}</p>
                </div>
                <UButton size="lg" color="red" @click="state[item.id] = ''" label="Clear" icon="i-mdi-trash" :disabled="status !== 'authenticated'" />
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-4">
                <UCard v-for="(option, key) in options[item.id]" :key="item.id" @click="status === 'authenticated' ? state[item.id] != key ? state[item.id] = key : state[item.id] = '' : undefined" :class="{ '!ring-primary-500': state[item.id] === key }" class="cursor-pointer">
                    <div class="flex flex-col items-center gap-2">
                        <img :src="getEmote()" :alt="option.label" class="w-16 h-16 object-cover rounded-md" />
                        <h2 class="text-lg font-bold text-primary-700 dark:text-primary-500">{{ option.label }}</h2>
                    </div>
                    <DevOnly>
                        {{ option }}
                    </DevOnly>
                </UCard>
            </div>
        </div>
    </div>
</template>
