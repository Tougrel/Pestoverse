<script setup lang="ts">
const { status } = useAuth();
const { data: categories } = await useFetch("/api/submissions/categories");
const { data: submissions } = await useFetch("/api/submissions");
const { data: names } = await useFetch("/api/submissions/names");

type SubmissionState = { [key: number]: string };

const state = reactive<SubmissionState>(submissions.value as SubmissionState);
const items_to_show = 20;
const page = ref(1);

const onSubmit = async () => {
    await fetch("/api/submissions/submit", {
        method: "POST",
        body: JSON.stringify(state),
    });
    // console.log(state);
};
</script>

<template>
    <NuxtLayout name="default">
        <UForm :state="state" @submit="onSubmit" v-if="status === 'authenticated'" class="relative flex flex-col gap-4">
            <div class="flex w-full flex-col gap-2">
                <UAlert
                    icon="i-mdi-exclamation-bold"
                    title="Voting submissions"
                    description="Please check if the pestie you are voting for is in the suggested list first and use the same name!"
                />
            </div>
            <div class="grid grid-cols-1 gap-x-2 gap-y-4 lg:grid-cols-2 2xl:grid-cols-3">
                <UFormGroup v-for="item in categories" :label="item.name" :description="item.description || 'N/A'" :name="'' + item.id">
                    <UInput color="gray" v-model="state[item.id]" />
                </UFormGroup>
            </div>
            <UDivider icon="i-mdi-creation" :ui="{ border: { base: 'border-primary-700 dark:border-primary-500' } }" />
            <div class="flex flex-col gap-2 p-4">
                <p class="text-primary-700 dark:text-primary-500 text-lg font-bold">Suggestions</p>
                <div class="flex flex-row gap-2">
                    <UBadge
                        v-for="name in names.slice((page - 1) * items_to_show, (page - 1) * items_to_show + items_to_show)"
                        color="gray"
                        size="lg"
                        :label="name"
                    />
                </div>
                <UPagination v-model="page" :page-count="items_to_show" :total="names.length" />
            </div>
            <UButton block type="submit" label="Submit" icon="i-mdi-check" size="lg" />
        </UForm>
        <UAlert v-else color="red" title="Authentication" description="Please sign in to continue!" class="mb-auto" />
    </NuxtLayout>
</template>
