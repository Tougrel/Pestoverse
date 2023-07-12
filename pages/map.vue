<script setup lang="ts">
  import { LatLngExpression } from 'leaflet';

  type MarkerProps = {
    name: string,
    coords: LatLngExpression,
    images: string[]
}

  const markers = [
    {
      name: 'test',
      coords: [48.0367592,7.576856],
      images: ['https://placekitten.com/g/450/300', 'https://placekitten.com/g/450/400', 'https://placekitten.com/g/450/250', 'https://placekitten.com/g/450/375']
    }
  ] as MarkerProps[];

</script>

<template>
  <div class="flex flex-col items-center gap-8 h-screen">
    <ClientOnly>
      <MapView :markers="markers" />
    </ClientOnly>
    <UiNav class="absolute top-5 right-5" fontSize="sm" iconSize="1.5em" buttonClass="bg-white dark:bg-navigation"/>
  </div>
</template>
