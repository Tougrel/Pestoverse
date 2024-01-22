<script setup lang="ts">
definePageMeta({
    middleware: ["devs-only"],
    devs_only: true,
});
</script>
<template>
    <NuxtLayout name="default">
        <DashboardContent title="Awards"> </DashboardContent>
    </NuxtLayout>
</template>
