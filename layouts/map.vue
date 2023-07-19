<template>
    <div class="h-screen">
        <UiNavMenu class="absolute right-5 top-5" fontSize="sm" iconSize="1.5em" buttonClass="bg-white/60 dark:bg-black/60 rounded-lg p-2" :map="true" />
        <slot />
    </div>
</template>
