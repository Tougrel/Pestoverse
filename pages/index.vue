<template>
    <NuxtLayout name="default" class="justify-between">
        <div class="flex flex-col items-center gap-4">
            <EasterEggSun />
        </div>

        <div class="flex flex-col items-center">
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
        <!-- <EasterEggConfetti /> -->
    </NuxtLayout>
</template>
