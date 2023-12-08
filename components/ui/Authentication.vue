<script setup lang="ts">
const { signIn, signOut, status, session } = useAuth();
const menu = (s: string) => [
    [
        {
            slot: "account",
            disabled: true,
        },
    ],
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
            label: s === "authenticated" ? "Sign out" : "Sign In",
            icon: s === "authenticated" ? "i-mdi-logout" : "i-mdi-login",
            click: () => (s === "authenticated" ? signOut() : signIn("discord")),
        },
    ],
];

defineProps<{ size: string; buttonClass?: string }>();
</script>

<template>
    <UDropdown :items="menu(status)" :popper="{ placement: 'bottom' }">
        <div class="flex items-center gap-2" :class="buttonClass">
            <Icon
                :name="ICONS.ACCOUNT"
                :size="size"
                class="text-primary-700 dark:text-primary-400 hover:text-primary-800 hover:dark:text-primary-500 transition-colors"
            />
        </div>

        <template #account>
            <div v-if="status === 'authenticated'" class="flex flex-row items-center gap-2">
                <UAvatar :src="session.profile.image_url" :alt="session.profile?.global_name" icon="i-mdi-account" size="md" />
                <h1 class="text-primary-700 dark:text-primary-400 text-lg font-bold">{{ session.profile?.global_name }}</h1>
            </div>
            <p v-else class="italics">You are not signed in!</p>
        </template>
    </UDropdown>
</template>
