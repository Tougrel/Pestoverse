<script setup lang="ts">
const { status } = useAuth();
const { data: categories } = await useFetch("/api/submissions/categories");

type SubmissionState = { [key: number]: string };

const mode = ref<string>("votes");
const isAuthenticated = computed(() => status.value === "authenticated");

async function getState(mode: Ref<string>): Promise<SubmissionState> {
    let result = {};
    if (isAuthenticated.value) {
        const { data } = await useFetch<SubmissionState>(`/api/${mode.value}`);
        result = data.value || {};
    }
    return result;
}
async function getSecondary(mode: Ref<string>) {
    let result = [];
    switch (mode.value) {
        case "submissions":
            if (isAuthenticated.value) {
                const { data } = await useFetch("/api/submissions/names");
                result = data.value || [];
            }
            break;
        case "votes":
            const { data } = await useFetch("/api/votes/options");
            result = data.value || {};
            break;
    }
    return result;
}

let state = reactive<SubmissionState>(await getState(mode));
let secondary = reactive(await getSecondary(mode)); // TODO: rename this lmao

const toast = useToast();
const onSubmit = async () => {
    const result = await fetch(`/api/${mode.value}/submit`, {
        method: "POST",
        body: JSON.stringify(state),
    });
    if (result.ok) {
        toast.add({
            id: "submit-success",
            title: "Entries submitted successfully",
            description: "Your entries have been submitted successfully. Thank you for voting!",
            icon: "i-mdi-check",
            timeout: 20000,
        });
    } else {
        toast.add({
            id: "submit-error",
            title: "Submission failed",
            description: "Something went wrong. Please try again!",
            icon: "i-mdi-close",
            timeout: 20000,
        });
    }
};
</script>

<template>
    <NuxtLayout name="default">
        <DevOnly>
            <code> Submissions / Votes: {{ state }} </code>
            <code> Suggestions / Options: {{ secondary }} </code>
        </DevOnly>
        <UForm :state="state" @submit="onSubmit" class="relative flex flex-col gap-4">
            <div class="flex w-full flex-col gap-2">
                <UAlert
                    v-if="mode === 'submissions'"
                    icon="i-mdi-exclamation-bold"
                    title="Voting submissions"
                    description="Please check if the pestie you are voting for is in the suggested list first and use the same name!"
                />
                <UAlert v-if="!isAuthenticated" color="red" title="Authentication" description="You must login before you can vote!" />
            </div>
            <AwardsSubmissions v-if="mode === 'submissions'" :categories="categories" :state="state" :names="secondary" />
            <AwardsVotes v-if="mode === 'votes'" :categories="categories" :state="state" :options="secondary" />
            <UButton block type="submit" label="Submit" icon="i-mdi-check" size="lg" :disabled="!isAuthenticated" />
        </UForm>
    </NuxtLayout>
</template>
