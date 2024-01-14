<script setup lang="ts">
const { signIn, signOut, status, session } = useAuth();
const menu = [
    [
        {
            label: "Profile",
            icon: "i-mdi-account",
            disabled: true,
        },
        {
            label: "Settings",
            icon: "i-mdi-cog",
            disabled: true,
        },
    ],
    [
        {
            label: "Sign out",
            icon: "i-mdi-logout",
            click: () => signOut(),
        },
    ],
];
</script>

<template>
    <button v-if="status !== 'authenticated'" class="flex flex-row items-center gap-2" @click="signIn('discord')">
        <UAvatar icon="i-mdi-account" size="xs" />
        <span class="font-medium">Sign In</span>
    </button>
    <UDropdown v-else :items="menu" :popper="{ placement: 'bottom-start' }">
        <button class="flex flex-row items-center gap-2">
            <UAvatar :src="session?.profile.image_url" icon="i-mdi-account" size="xs" />
            <span class="font-medium">{{ session?.profile.global_name }}</span>
        </button>
    </UDropdown>
</template>
