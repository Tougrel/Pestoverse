<script setup lang="ts">
</script>

<template>
    <NuxtLayout name="default">
        <div class="flex flex-col items-center gap-6">
            <div class="flex flex-col items-center">
                <Icon name="line-md:coffee-half-empty-twotone-loop" size="6em" class="text-green-600 dark:text-green-400" />
                <h1 class="text-4xl text-green-600 dark:text-green-400 font-bold">Made by these amazing people</h1>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <CreditsUser v-for="user in CREDIT_USERS" :name="user.name" :description="user.description" :iconPath="user.icon_path" />
            </div>
        </div>
    </NuxtLayout>
</template>