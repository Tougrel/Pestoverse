<template>
  <div class="flex flex-col items-center justify-between h-screen p-8">
    <UiNav />

    <div class="flex flex-col items-center gap-4">
      <div class="text-center">
        <span class="text-xl text-gray-600 dark:text-gray-400 font-medium">Welcome to the</span>
        <h1 class="text-6xl text-green-700 font-bold">Pestoverse</h1>
      </div>
      <NuxtLink to="/map"
        class="border-2 border-green-700 dark:border-green-400 px-4 py-2 rounded-lg transition-all hover:bg-green-300 hover:dark:bg-green-900 hover:scale-105 duration-300">
        Start exploring!
      </NuxtLink>
    </div>

    <div class="flex flex-col items-center">
      <p class="text-gray-600 dark:text-gray-300">
        Made with <span class="animate-pulse">❤️</span> by the
        <a href="https://github.com/Tougrel/pestoverse"
          class="relative font-bold text-green-700 dark:text-green-400 before:absolute before:top-5 before:w-0 before:hover:w-full before:transition-[width] before:duration-300 before:h-0.5 before:rounded-lg before:bg-gradient-to-r before:from-green-300 before:to-pink-300">pesto
          community</a>!
      </p>
      <p class="text-gray-700 dark:text-gray-300">
        Some of the work is done by some amazing pesties that you can find in the
        <NuxtLink to="/credits"
          class="relative text-green-700 dark:text-green-400 hover:text-green-800 hover:dark:text-green-500 before:absolute before:top-5 before:w-0 before:hover:w-full before:transition-[width] before:duration-300 before:h-0.5 before:rounded-lg before:bg-gradient-to-r before:from-green-300 before:to-pink-300">
          Credits
        </NuxtLink> page!
      </p>
    </div>
  </div>
</template>
