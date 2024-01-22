<script setup lang="ts">
const { status } = useAuth();
const { data: categories } = await useFetch("/api/submissions/categories");

type SubmissionState = { [key: number]: string };

const mode = computed<string>(() => {
    const currentDate = Date.now();
    const votesDate = Date.UTC(2024, 0, 12, 0, 0, 0);
    if (currentDate < votesDate) return "submissions";

    const winnersDate = Date.UTC(2024, 0, 20, 0, 0, 0);
    if (currentDate < winnersDate) return "votes";

    return "winners";
});

const votingOpen = computed<boolean>(() => {
    const currentTime = Date.now();
    const closingTime = Date.UTC(2024, 0, 20, 0, 0, 0);
    return currentTime < closingTime;
})

const isAuthenticated = computed(() => status.value === "authenticated");

async function getState(mode: Ref<string>): Promise<SubmissionState> {
    let result = {};

    if (mode.value === "winners") return result;
    if (isAuthenticated.value) {
        const { data } = await useFetch<SubmissionState>(`/api/${mode.value}`);
        result = data.value || {};
    }
    return result;
}
async function getSecondary(mode: Ref<string>): Promise<unknown> {
    let result = [];
    switch (mode.value) {
        case "submissions":
            if (isAuthenticated.value) {
                const { data: names } = await useFetch("/api/submissions/names");
                result = names.value || [];
            }
            break;
        case "votes":
            const { data: options } = await useFetch("/api/votes/options");
            result = options.value || {};
            break;
        case "winners":
            const { data: winners } = await useFetch("/api/votes/winners");
            console.log(winners);
            result = winners.value || {};
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
            <div class="flex flex-col p-4">
                <code> Submissions / Votes: {{ state }} </code>
                <code> Suggestions / Options: {{ secondary }} </code>
            </div>
        </DevOnly>
        <UForm :state="state" @submit="onSubmit" class="relative flex flex-col gap-4 w-full p-4">
            <div class="flex w-full flex-col gap-2">
                <UAlert v-if="mode === 'submissions'" icon="i-mdi-exclamation-bold" title="Voting submissions"
                    description="Please check if the pestie you are voting for is in the suggested list first and use the same name!" />
                <UAlert v-if="!isAuthenticated" color="red" title="Authentication"
                    description="You must login before you can vote!" />
                <UAlert v-if="!votingOpen && mode !== 'winners'" color="primary" title="Voting Closed"
                    description="Thank you for all of your submissions, voting is now closed!" />
            </div>
            <AwardsSubmissions v-if="mode === 'submissions'" :categories="categories" :state="state" :names="secondary" />
            <AwardsVotes v-if="mode === 'votes' && votingOpen" :categories="categories" :state="state"
                :options="secondary" />
            <AwardsWinners v-if="mode === 'winners' && !votingOpen" :winners="secondary" />
            <UButton v-if="mode !== 'winners'" block type="submit" label="Submit" icon="i-mdi-check" size="lg"
                :disabled="!isAuthenticated || !votingOpen" />
        </UForm>
    </NuxtLayout>
</template>
