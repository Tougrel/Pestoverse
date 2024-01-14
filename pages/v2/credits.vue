<script setup lang="ts">
import yuniiho from "static/images/credits/yuniiho.webp";
import tougrel from "static/images/credits/tougrel.webp";
import ikanexus from "static/images/credits/ikanexus.webp";
import bootfighter from "static/images/credits/bootfighter.webp";
import dhoru from "static/images/credits/dhoru.webp";
import yoclesh from "static/images/credits/yoclesh.webp";
import vihilsta from "static/images/credits/vihilsta.webp";
import phantasma from "static/images/credits/phantasma.webp";

const users = [
    {
        name: "Yuniiho",
        description: "For the amazing emotes",
        icon_path: yuniiho,
    },
    {
        name: "Tougrel",
        description: "Website idea & maintainer",
        icon_path: tougrel,
    },
    {
        name: "Ikanexus",
        description: "Ideas & code",
        icon_path: ikanexus,
    },
    {
        name: "Bootfighter",
        description: "For the amazing emotes",
        icon_path: bootfighter,
    },
    {
        name: "Dhoru",
        description: "For the amazing emotes",
        icon_path: dhoru,
    },
    {
        name: "Yoclesh",
        description: "For the amazing emotes",
        icon_path: yoclesh,
    },
    {
        name: "Vihilsta",
        description: "Ideas",
        icon_path: vihilsta,
    },
    {
        name: "Phantasma",
        description: "Gallery updates",
        icon_path: phantasma,
    },
];
</script>

<template>
    <NuxtLayout name="new">
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 p-4">
            <CreditsUser v-for="user in users" :name="user.name" :description="user.description" :iconPath="user.icon_path" />
        </div>
    </NuxtLayout>
</template>
