<script setup lang="ts">
const currentDate = new Date().getTime();
const data = await queryContent("announcement").sort({ date: -1 }).find();

const activeAnnouncements = data.filter((announcement) => {
    const isAfterStart = new Date(announcement.start).getTime() < currentDate;
    const isBeforeEnd = new Date(announcement.end).getTime() > currentDate;
    return isAfterStart && isBeforeEnd;
});

const hasActiveAnnouncement = activeAnnouncements.length > 0;
let hasActiveHero = false;
if (hasActiveAnnouncement) {
    hasActiveHero = activeAnnouncements[0].hero;
}
</script>

<template>
    <div class="absolute top-1/4 break-all font-semibold drop-shadow-md motion-safe:md:animate-[scalein_1s_ease-in-out_forwards]">
        <ContentRenderer
            v-if="hasActiveHero"
            :value="activeAnnouncements[0]"
            class="bg-gradient-to-r from-italygreen via-neutral-300 to-italyred bg-clip-text text-transparent dark:via-white dark:to-italyred"
        />
    </div>
    <EasterEggConfetti v-if="hasActiveAnnouncement" :mode="activeAnnouncements[0].mode" />
</template>
