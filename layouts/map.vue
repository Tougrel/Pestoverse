<template>
    <Meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1 user-scalable=no" />
    <div class="h-screen">
        <UiNavMenu class="absolute right-7 top-7" buttonClass="bg-white/60 dark:bg-black/60 rounded-lg p-2 -m-1" :map="true" />
        <slot />
    </div>
</template>
