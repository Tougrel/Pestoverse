<script setup lang="ts">
const currentDate = Date.now().valueOf();
const data = await queryContent('announcement').where({ hero: true }).sort({date: -1}).find();

const activeAnnouncements = data
    .filter(announcement => {
        const isAfterStart = new Date(announcement.start).valueOf() < currentDate;
        const isBeforeEnd = new Date(announcement.end).valueOf() > currentDate;
        return isAfterStart && isBeforeEnd;
    })

const hasActiveAnnouncement = activeAnnouncements.length > 0;

</script>

<template>
    <div class="absolute top-1/4 motion-safe:md:animate-[scalein_1s_ease-in-out_forwards] break-all">
        <ContentRenderer v-if="hasActiveAnnouncement" :value="activeAnnouncements[0]" />
    </div>
    <EasterEggConfetti v-if="hasActiveAnnouncement" />
</template>