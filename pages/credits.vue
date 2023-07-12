<script setup lang="ts">
import yuniiho from 'static/images/credits/yuniiho.webp';
import tougrel from 'static/images/credits/tougrel.webp';
import ikanexus from 'static/images/credits/ikanexus.webp';
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
                <CreditsUser name="Yuniiho" description="For the amazing emotes" :iconPath="yuniiho" />
                <CreditsUser name="Tougrel" description="Website idea & maintainer" :iconPath="tougrel" />
                <CreditsUser name="Ikanexus" description="Ideas" :iconPath="ikanexus" />
            </div>
        </div>
    </div>
</template>