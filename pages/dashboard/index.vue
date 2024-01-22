<script setup lang="ts">
definePageMeta({
    middleware: ["devs-only"],
    devs_only: true,
});

const pages = ref([
    {
        label: "Gallery",
        icon: "heroicons:photo-solid",
        to: "/dashboard/gallery",
        // summary: 'gallery',
    },
    {
        label: "Awards",
        icon: "heroicons:trophy-solid",
        to: "/dashboard/awards",
        summary: "",
    },
    {
        label: "Credits",
        icon: "mdi:handshake",
        to: "/dashboard/credits",
        // summary: "credits",
    },
    {
        label: "Boards",
        icon: "i-heroicons-clipboard-document-list-solid",
        to: "/dashboard/boards",
        // summary: "boards",
    },
    {
        label: "Settings",
        icon: "mdi:settings",
        to: "/dashboard/settings",
    },
]);

const links = [{
    label: 'Dashboard',
    icon: 'mdi:view-dashboard',
}]
const summaries = {} as { [key: string]: any };
</script>
<template>
    <NuxtLayout name="default">
        <div class="mx-auto grid max-w-screen-2xl grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:grid-cols-3">
            <UBreadcrumb :links="links" class="col-span-full" />
            <NuxtLink v-for="page in pages" :to="page.to">
                <UCard>
                    <template #header>
                        <div class="flex flex-row justify-between">
                            <h1 class="inline-block">{{ page.label }}</h1>
                            <Icon :name="page.icon" />
                        </div>
                    </template>
                    <div class="h-44">
                        <component :is="summaries[page.summary]" v-if="page.summary" />
                        <div class="flex h-full flex-col items-center justify-center text-center" v-else>
                            <Icon name="i-heroicons-circle-stack-20-solid" class="mb-4 h-6 w-6" />
                            <p>No Data</p>
                        </div>
                    </div>
                </UCard>
            </NuxtLink>
        </div>
    </NuxtLayout>
</template>
