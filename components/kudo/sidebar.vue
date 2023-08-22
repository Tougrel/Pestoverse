<template>
    <UiSlideOver state="kudo-slideover">
        <div class="flex flex-col gap-4">
            <KudoCard v-for="kudo in KUDO_BOARDS" :title="kudo.title" :description="kudo.description" :icon="kudo.icon" :to="kudo.to" />
        </div>
    </UiSlideOver>
</template>
