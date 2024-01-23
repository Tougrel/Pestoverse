<script setup lang="ts">
const props = defineProps<{ title: string }>();

const links = [
    {
        label: "Dashboard",
        to: "/dashboard",
    },
    {
        label: props.title,
    },
];
</script>

<template>
    <div class="mx-auto flex max-w-screen-2xl flex-col gap-4 p-4 text-center md:text-left">
        <UBreadcrumb :links="links" />
        <slot></slot>
    </div>
</template>
