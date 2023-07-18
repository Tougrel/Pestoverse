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

        <div class="z-10 flex flex-col items-center">
            <p class="text-gray-600 dark:text-gray-300">
                Made with <span class="animate-pulse">❤️</span> by the
                <a
                    href="https://github.com/Tougrel/pestoverse"
                    class="text-primary-700 dark:text-primary-400 before:from-primary-300 relative font-bold before:absolute before:top-5 before:h-0.5 before:w-0 before:rounded-lg before:bg-gradient-to-r before:to-pink-300 before:transition-[width] before:duration-300 before:hover:w-full"
                    >pesto community</a
                >!
            </p>
            <p class="text-gray-700 dark:text-gray-300">
                Some of the work is done by some amazing pesties that you can find in the
                <NuxtLink
                    to="/credits"
                    class="text-primary-700 dark:text-primary-400 hover:text-primary-800 hover:dark:text-primary-500 before:from-primary-300 relative before:absolute before:top-5 before:h-0.5 before:w-0 before:rounded-lg before:bg-gradient-to-r before:to-pink-300 before:transition-[width] before:duration-300 before:hover:w-full"
                >
                    Credits
                </NuxtLink>
                page!
            </p>
        </div>
        <EasterEggOrbit />
        <EasterEggConfetti />
    </NuxtLayout>
</template>
