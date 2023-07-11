<script setup lang="ts">
  import { LatLngExpression } from 'leaflet';

  type MarkerProps = {
    name: string,
    coords: LatLngExpression,
    image: string
}

  const markers = [
    {
      name: 'test',
      coords: [48.0367592,7.576856],
      image: 'https://placekitten.com/g/300/200'
    }
  ] as MarkerProps[];

</script>

<template>
  <div class="flex flex-col items-center gap-8 h-screen pt-8">
    <UiNav />
    <ClientOnly>
      <MapView :markers="markers" />
    </ClientOnly>
  </div>
</template>
