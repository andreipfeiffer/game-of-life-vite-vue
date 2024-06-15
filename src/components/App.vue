<template>
  <div>
    <Settings :presets="presets" />
    <hr />
    <div :class="{ playing: store.play }">
      <LifeCanvas v-if="store.renderer === 'canvas'" :population="population" :size="store.size" />
      <Life v-else :population="population" :size="store.size" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Settings from './Settings.vue';
import Life from './Life.vue';
import LifeCanvas from './LifeCanvas.vue';
import { getPresets } from '../presets';
import { store, population } from '../store';
import { watchEffect } from 'vue';
import { LifetimeValues } from '../constants';

const presets = getPresets();

let timeoutId: number;

watchEffect(() => {
  const msDelay = store.play ? LifetimeValues[store.lifetime].value : 0;

  clearTimeout(timeoutId);
  cancelAnimationFrame(timeoutId);

  if (store.play) {
    function loop() {
      store.updateNextPopulation();

      if (msDelay > 0) {
        timeoutId =
          msDelay < 16
            ? requestAnimationFrame(loop)
            : +setTimeout(loop, msDelay);
      }
    }

    if (msDelay > 0) {
      loop();
    }
  } else {
    (msDelay < 16) ? cancelAnimationFrame(timeoutId) : clearTimeout(timeoutId)
  }
});
</script>

<style>
.playing {
  pointer-events: none;
}
</style>