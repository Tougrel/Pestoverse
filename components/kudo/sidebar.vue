<script setup lang="ts">
const isOpen = useState<boolean>("kudo-slideover");
</script>

<template>
    <USlideover v-model="isOpen">
        <div class="flex flex-col gap-4 p-4">
            <button class="text-lg font-bold bg-red-700 dark:bg-red-500 p-2 rounded-lg" @click="isOpen = false">CLOSE</button>

            <KudoCard v-for="kudo in KUDO_BOARDS" :title="kudo.title" :description="kudo.description" :icon="kudo.icon"
                :to="kudo.to" />
        </div>
    </USlideover>
</template>
