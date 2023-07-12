<script setup lang="ts">
  import { MarkerProps } from 'types/marker';

  const { data } = await useFetch('/api/markers');

  const markers = data as unknown as MarkerProps[];

</script>

<template>
  <div class="flex flex-col items-center gap-8 h-screen">
    <ClientOnly>
      <MapView :markers="markers" />
    </ClientOnly>
    <UiNav class="absolute top-5 right-5" fontSize="sm" iconSize="1.5em" buttonClass="bg-white dark:bg-navigation"/>
  </div>
</template>
