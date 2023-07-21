<template>
    <div class="flex h-screen flex-col items-center gap-8 p-8">
        <UiNavMenu />
        <slot />
        <UiFooter />
        <EasterEggButton />
    </div>
</template>
