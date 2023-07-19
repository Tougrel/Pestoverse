<template>
    <NuxtLayout name="default" class="justify-between">
        <div class="z-10 flex flex-col items-center gap-4">
            <div class="text-center">
                <span class="text-xl font-medium text-gray-600 dark:text-gray-400">Welcome to the</span>
                <h1 class="text-primary-700 text-6xl font-bold">Pestoverse</h1>
            </div>
            <NuxtLink
                to="/map"
                class="border-primary-700 dark:border-primary-400 hover:bg-primary-300 hover:dark:bg-primary-900 rounded-lg border-2 px-4 py-2 transition-all duration-300 hover:scale-105"
            >
                Start exploring!
            </NuxtLink>
        </div>

        <EasterEggOrbit />
        <EasterEggConfetti />
    </NuxtLayout>
</template>
