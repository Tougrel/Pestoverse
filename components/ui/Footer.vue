<template>
    <footer class="flex w-full flex-row flex-wrap items-center justify-center gap-4 p-2 lg:justify-between lg:p-4">
        <div class="flex flex-col items-center text-center lg:items-start lg:text-start">
            <p class="text-gray-600 dark:text-gray-300">
                Made with <span class="animate-pulse">❤️</span> by the
                <a
                    href="https://github.com/Tougrel/pestoverse"
                    class="text-primary-700 dark:text-primary-400 before:from-primary-300 relative font-bold before:absolute before:top-5 before:h-0.5 before:w-0 before:rounded-lg before:bg-gradient-to-r before:to-pink-300 before:transition-[width] before:duration-300 before:hover:w-full"
                >
                    pesto community </a
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
        <div class="flex flex-row items-center justify-between gap-2">
            <a href="https://github.com/Tougrel/Pestoverse" target="_blank" class="hover:text-primary-700 dark:hover:text-primary-500 transition-colors">
                <Icon :name="ICONS.GITHUB" size="2em" />
            </a>
        </div>
    </footer>
</template>
