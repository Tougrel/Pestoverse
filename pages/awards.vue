<script setup lang="ts">
const { status } = useAuth();
const { data: categories } = await useFetch("/api/submissions/categories");

type SubmissionState = { [key: number]: string };

const mode = ref<string>("votes");
let state = reactive<SubmissionState>({});
let secondary = reactive([]); // TODO: rename this lmao
if (status.value === "authenticated") {
    if (mode.value === "suggestions") {
        const { data: submissions } = await useFetch<SubmissionState>("/api/submissions");
        const { data: names } = await useFetch("/api/submissions/names");

        state = submissions.value || {};
        secondary = names.value || [];
    } else if (mode.value === "votes") {
        const { data: votes } = await useFetch<SubmissionState>("/api/votes");
        const { data: options } = await useFetch("/api/votes/options");

        state = votes.value || {};
        secondary = options.value || {};
    }
}

const toast = useToast();
const onSubmit = async () => {
    const result = await fetch("/api/submissions/submit", {
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
            <code>
                Submissions / Votes: {{ state }}
            </code>
            <code>
                Suggestions / Options: {{ secondary }}
            </code>
        </DevOnly>
        <UForm :state="state" @submit="onSubmit" class="relative flex flex-col gap-4">
            <div class="flex w-full flex-col gap-2">
                <UAlert
                    icon="i-mdi-exclamation-bold"
                    title="Voting submissions"
                    description="Please check if the pestie you are voting for is in the suggested list first and use the same name!"
                />
                <UAlert v-if="status !== 'authenticated'" color="red" title="Authentication"
                        description="You must login before you can vote!" />
            </div>
            <AwardsSubmissions v-if="mode === 'submissions'" :categories="categories" :state="state"
                               :names="secondary" />
            <AwardsVotes v-if="mode === 'votes'" :categories="categories" :state="state" :options="secondary" />
            <UButton block type="submit" label="Submit" icon="i-mdi-check" size="lg"
                     :disabled="status !== 'authenticated'" />
        </UForm>
    </NuxtLayout>
</template>
