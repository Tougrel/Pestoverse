<template>
    <div class="h-screen">
        <UiNavMenu class="absolute right-5 top-5" fontSize="sm" iconSize="1.5em" buttonClass="bg-white dark:bg-black/60" :map="true" />
        <slot />
    </div>
</template>
