<script setup lang="ts">
const props = defineProps<{state: string}>()
const isOpen = useState<boolean>(props.state);
</script>

<template>
    <USlideover v-model="isOpen">
        <div class="flex flex-col justify-between gap-4 h-full p-4 overflow-scroll">
            <slot />
            <button class="lg:hidden text-lg font-bold bg-red-700 dark:bg-red-500 dark:text-white p-2 rounded-lg" @click="isOpen = false">CLOSE</button>
        </div>
    </USlideover>
</template>
