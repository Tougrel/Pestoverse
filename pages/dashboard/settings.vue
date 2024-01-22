<script setup lang="ts">
definePageMeta({
    middleware: ["devs-only"],
    devs_only: true,
});

const cardConfig = ref({
    'header': { 'padding': 'flex-none' },
    'body': { 'padding': 'flex-1' },
    'footer': { 'padding': 'flex-none' }
})

const awards = ref({
    'nominations_start': '2023-12-29T00:00',
    'nominations_end': '2024-01-12T00:00',
    'voting_start': '2024-01-12T00:00',
    'voting_end': '2024-01-19T00:00',
});
const toggles = ref({
    'toggle1': true,
});

</script>
<template>
    <NuxtLayout name="default">
        <DashboardContent title="Settings">
            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                <UCard class="flex flex-col justify-between" :ui="cardConfig">
                    <template #header>
                        Awards
                    </template>
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
                    <template #header>
                        Toggles
                    </template>
                    <UForm :state="toggles" class="flex flex-col gap-4">
                        <UFormGroup label="Toggle 1" class="flex flex-row justify-between">
                            <UToggle v-model="toggles['toggle1']" />
                        </UFormGroup>
                        <UFormGroup label="Toggle 2" class="flex flex-row justify-between">
                            <UToggle v-model="toggles['toggle2']" />
                        </UFormGroup>
                        <UFormGroup label="Toggle 3" class="flex flex-row justify-between">
                            <UToggle v-model="toggles['toggle3']" />
                        </UFormGroup>
                    </UForm>
                    <template #footer>
                        <UButton class="w-full justify-center">Save</UButton>
                    </template>
                </UCard>
            </div>
        </DashboardContent>
    </NuxtLayout>
</template>
