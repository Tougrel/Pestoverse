<template>
    <NuxtLayout name="default">
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <CreditsUser v-for="user in CREDIT_USERS" :name="user.name" :description="user.description" :iconPath="user.icon_path" />
        </div>
    </NuxtLayout>
</template>
