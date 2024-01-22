<script setup lang="ts">
definePageMeta({
    middleware: ["devs-only"],
    devs_only: true,
});
</script>
<template>
    <NuxtLayout name="default">
        <DashboardContent title="Credits">
            <div class="w-full">
                <h1 class="text-center text-red-400">Work in Progress</h1>
            </div>
        </DashboardContent>
    </NuxtLayout>
</template>
