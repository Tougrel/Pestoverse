<script setup lang="ts">
import type { LangIDs } from "~/utils/i18n";
import { changeLangID } from "~/utils/i18n";

const langID = useState<LangIDs>("lang_id");
const modal = ref(false);

defineProps<{ size: string; buttonClass?: string }>();
</script>

<template>
    <button class="hover:text-primary-700 hover:dark:text-primary-400 flex items-center gap-2 transition-colors" :class="buttonClass" @click="modal = !modal">
        <Icon :name="ICONS.LANGUAGE" :size="size" class="text-primary-700 dark:text-primary-400" />
    </button>

    <UModal v-model="modal">
        <div class="flex flex-row flex-wrap items-center gap-2 p-2">
            <button
                v-for="lang in LangData"
                class="flex flex-row items-center gap-1 rounded-lg px-1"
                :class="{ 'bg-gray-800': lang.id === langID }"
                @click="changeLangID(lang.id)"
            >
                <UTooltip :text="lang.name">
                    <Icon :name="lang.flag" size="3em" />
                </UTooltip>
            </button>
        </div>
    </UModal>
</template>
