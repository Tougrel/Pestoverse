<script setup lang="ts">
const { status } = useAuth();
const { data: categories } = await useFetch("/api/submissions/categories");
const { data: submissions } = await useFetch("/api/submissions");
// const { data: names } = await useFetch("/api/submissions/names");

type SubmissionState = { [key: number]: string };

const state = reactive<SubmissionState>(submissions.value as SubmissionState);

const onSubmit = async () => {
    await fetch("/api/submissions/submit", {
        method: "POST",
        body: JSON.stringify(state),
    });
    console.log(state);
};
</script>

<template>
    <NuxtLayout name="default">
        <UForm :state="state" @submit="onSubmit" v-if="status === 'authenticated'"
               class="flex flex-col relative gap-12">
            <div class="flex flex-col gap-2 w-full">
                <UAlert icon="i-mdi-exclamation-bold" title="Voting submissions"
                        description="Please check if the pestie you are voting for exists in the suggested list first!" />
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-x-2 gap-y-4">
                <UFormGroup v-for="item in categories" :label="item.name" :description="item.description || 'N/A'"
                            :name="'' + item.id">
                    <UInput color="gray" v-model="state[item.id]" />
                </UFormGroup>
            </div>
            <UButton block type="submit" label="Submit" icon="i-mdi-check" size="lg" />
        </UForm>
    </NuxtLayout>
</template>
