<script setup lang="ts">
const props = defineProps<{ title: string; icon: string }>();

const links = [{
    label: 'Dashboard',
    icon: 'mdi:view-dashboard',
    to: '/dashboard'
}, {
    label: props.title,
    icon: props.icon
}]
</script>

<template>
    <div class="p-4 flex flex-col gap-4 mx-auto max-w-screen-2xl text-center md:text-left">
        <UBreadcrumb :links="links" />
        <slot></slot>
    </div>
</template>
