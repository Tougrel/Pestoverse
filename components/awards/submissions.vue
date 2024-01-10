<script setup lang="ts">
const { status } = useAuth();

defineProps<{ categories: any[]; state: { [key: number]: string }; names: any; }>();
</script>

<template>
    <div class="grid grid-cols-1 gap-x-2 gap-y-4 lg:grid-cols-2 2xl:grid-cols-3">
        <UFormGroup v-for="item in categories" :label="item.name" :description="item.description || 'N/A'"
                    :name="'' + item.id">
            <UInput color="gray" v-model="state[item.id]" :disabled="status !== 'authenticated'" />
        </UFormGroup>
    </div>
    <UDivider icon="i-mdi-creation" :ui="{ border: { base: 'border-primary-700 dark:border-primary-500' } }" />
    <div class="flex flex-col gap-2 p-4">
        <p class="text-primary-700 dark:text-primary-500 text-lg font-bold">Suggestions</p>
        <div class="grid max-h-[272px] grid-cols-1 gap-2 overflow-y-auto md:grid-cols-4 lg:grid-cols-6">
            <UBadge v-for="name in names" color="gray" size="lg" :label="name" />
        </div>
    </div>
</template>
