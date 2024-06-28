<template>
  <div>
    <h1>Game of Life, using Vue</h1>
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
import { watch } from 'vue';
import { LifetimeValues } from '../constants';

const presets = getPresets();

let timeoutId: number;

watch(
  [() => store.play, () => store.lifetime],
  ([play, lifetime]) => {
    const msDelay = play ? LifetimeValues[+lifetime].value : 0;

    window.clearTimeout(timeoutId);
    window.cancelAnimationFrame(timeoutId);

    function loop() {
      store.updateNextPopulation();
      
      if (msDelay > 0) {
        timeoutId =
        msDelay < 16
        ? window.requestAnimationFrame(loop)
        : +window.setTimeout(loop, msDelay);
      }
    }
    
    if (play) {
      if (msDelay > 0) {
        loop();
      }
    } else {
      (msDelay < 16) ? window.cancelAnimationFrame(timeoutId) : window.clearTimeout(timeoutId)
    }
  }, {onTrigger: (e) => console.log(e)});
</script>

<style>
input,
select,
button,
textarea,
body {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  padding: 2rem;
}

html {
  font-size: 14px;
}

input:not([type="range"]):not([type="checkbox"]),
label,
select,
button,
textarea {
  margin: 0;
  border: 1px solid black;
  padding: 0;
  display: inline-block;
  vertical-align: middle;
  white-space: normal;
  background: none;
  appearance: none;

  border-radius: 0;
  font-size: 1rem;
  padding: 0.5rem 0.75rem;
  font-weight: bold;

  box-sizing: content-box;
}

.input {
  width: 4em;
}

hr {
  border: none;
  height: 1px;
  background-color: black;
  margin: 2em 0;
}

.playing {
  pointer-events: none;
}

button.secondary {
  font-weight: normal;
  border-color: #666666;
  color: #666666;
}

h1 {
  font-size: 1.5rem;
  margin-top: 0;
}
</style>