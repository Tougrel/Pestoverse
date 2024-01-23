<script setup lang="ts">
import type { KVItemSettings, AwardsSettings, Settings, Toggle } from "@pestoverse/dashboard";

definePageMeta({
    middleware: ["devs-only"],
    devs_only: true,
});

const cardConfig = ref({
    header: { padding: "flex-none" },
    body: { padding: "flex-1" },
    footer: { padding: "flex-none" },
});

const { data: settings } = await useFetch<Settings>("/api/dashboard/settings");


const awards = ref<AwardsSettings>(settings.value?.awards || {} as AwardsSettings);
const toggles = ref<Record<string, Toggle>>(settings.value?.toggles || {});

const kvItems = ref<KVItemSettings[]>(settings.value?.kv_items || [] as KVItemSettings[]);
const kvColumns = [{ key: 'key', label: 'Key' }, { key: 'expiry', label: 'Expiry' }, { key: 'actions' }]
const kvPage = ref(1);
const kvPageCount = 5; // 5 items per pages
const kvRows = computed(() => {
    return kvItems.value.slice((kvPage.value - 1) * kvPageCount, (kvPage.value) * kvPageCount)
})
const kvActions = (row: KVItemSettings) => [
    [{
        label: 'Delete',
        icon: 'i-heroicons-trash-20-solid',
        click: async () => { console.log(row.key) }
    }]
]
</script>
<template>
    <NuxtLayout name="default">
        <DashboardContent title="Settings">
            <DevOnly>
                <code>Awards: {{ awards }}</code>
                <code>Toggles: {{ toggles }}</code>
                <code>KV Items: {{ kvItems }}</code>
            </DevOnly>
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                <UCard class="flex flex-col justify-between" :ui="cardConfig">
                    <template #header> Awards </template>
                    <UForm :state="awards" class="flex flex-col gap-4">
                        <UFormGroup label="Nominations Start Date">
                            <UInput type="datetime-local" v-model="awards['nominations_start']" />
                        </UFormGroup>
                        <UFormGroup label="Nominations End Date">
                            <UInput type="datetime-local" v-model="awards['nominations_end']" />
                        </UFormGroup>
                        <UFormGroup label="Voting Start Date">
                            <UInput type="datetime-local" v-model="awards['voting_start']" />
                        </UFormGroup>
                        <UFormGroup label="Voting End Date">
                            <UInput type="datetime-local" v-model="awards['voting_end']" />
                        </UFormGroup>
                    </UForm>
                    <template #footer>
                        <UButton class="w-full justify-center">Save</UButton>
                    </template>
                </UCard>
                <UCard class="flex flex-col justify-between" :ui="cardConfig">
                    <template #header> Toggles </template>
                    <UForm :state="toggles" class="flex flex-col gap-4">
                        <UFormGroup v-for="toggle, key in toggles" :label="toggle.name"
                            class="flex flex-row justify-between">
                            <UToggle v-model="toggles[key].value" />
                        </UFormGroup>
                    </UForm>
                    <template #footer>
                        <UButton class="w-full justify-center">Save</UButton>
                    </template>
                </UCard>
                <UCard class="flex flex-col justify-between" :ui="cardConfig">
                    <template #header> KV Items </template>
                    <UTable :rows="kvRows" :columns="kvColumns">
                        <template #actions-data="{ row }">
                            <UDropdown :items="kvActions(row)">
                                <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
                            </UDropdown>
                        </template>
                    </UTable>
                    <template #footer>
                        <div class="flex justify-end">
                            <UPagination v-model="kvPage" :total="kvItems.length" :page-count="kvPageCount" />
                        </div>
                    </template>
                </UCard>
            </div>
        </DashboardContent>
    </NuxtLayout>
</template>
