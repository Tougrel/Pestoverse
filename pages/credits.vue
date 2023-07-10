<script setup lang="ts">
</script>

<template>
    <div class="flex flex-col items-center gap-8 h-screen p-8">
        <UiNav />

        <div class="flex flex-col items-center gap-6">
            <div class="flex flex-col items-center">
                <Icon name="line-md:coffee-half-empty-twotone-loop" size="6em" class="text-green-600 dark:text-green-400" />
                <h1 class="text-4xl text-green-600 dark:text-green-400 font-bold">Made by these amazing people</h1>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <CreditsUser name="Yuniiho" description="For the amazing emotes" iconPath="credits/yuniiho.webp" />
                <CreditsUser name="Tougrel" description="Website idea & maintainer" iconPath="credits/tougrel.webp" />
                <CreditsUser name="Ikanexus" description="Ideas" iconPath="credits/ikanexus.webp" />
            </div>
        </div>
    </div>
</template>