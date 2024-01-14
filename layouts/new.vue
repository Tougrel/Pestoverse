<script setup lang="ts">
const slide = ref(false);
</script>

<template>
    <div class="flex h-screen flex-row">
        <UButton icon="i-mdi-menu" size="lg" class="flex lg:hidden fixed bottom-0 left-0 m-2 z-10" @click="slide = true"/>
        <USlideover v-model="slide" side="left" :ui="{ base: '!flex-none', width: '!w-fit' }">
            <UiNavigation class="h-full" />
        </USlideover>
        <UiNavigation class="hidden lg:flex" />
        <main class="w-full overflow-y-auto">
            <slot />
        </main>
    </div>
</template>
