<script setup lang="ts">
const props = defineProps<{ state: string }>();
const isOpen = useState<boolean>(props.state);
const lang = useState("lang");
const langID = useState("lang_id");
</script>

<template>
    <USlideover v-model="isOpen">
        <div class="flex h-full flex-col justify-between gap-4 overflow-scroll p-4">
            <slot />
            <button class="rounded-lg bg-red-700 p-2 text-lg font-bold uppercase dark:bg-red-500 dark:text-white lg:hidden" @click="isOpen = false">
                {{ lang.get(langID)?.get("close") }}
            </button>
        </div>
    </USlideover>
</template>