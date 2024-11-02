<template>
  <div>
    Preset: 
    <select v-model="store.preset" @change="loadPreset(store.preset)">
      <option value="">Select a preset</option>
      <option v-for="preset in presets" :key="preset.id" :value="preset.id">
        {{ preset.description }}
      </option>
    </select>
    <select v-model="store.renderer" style="margin-left: -1px;">
      <option value="html">HTML</option>
      <option value="canvas">Canvas</option>
    </select>
    <br />
    <br />
    Grid: 
    <input
      type="number"
      :value="store.width"
      maxlength="3"
      class="input"
    />
    &times; 
    <input
      type="number"
      :value="store.height"
      maxlength="3"
      class="input"
    />
    Cell: 
    <input
      type="number"
      :value="store.size"
      maxlength="3"
      class="input"
    />
    <br />
    <br />
    <div style="display: flex; align-items: center;">
      <button @click="store.updateNextPopulation()">Next</button>
      &nbsp;
      <button @click="store.togglePlay()">{{ store.play ? "Stop" : "Play" }}</button>
      <button v-if="store.preset" @click="reloadPreset" style="margin-left: -1px;">
        ↺
      </button>
      <input
        type="range"
        :value="store.lifetime"
        min="1"
        v-bind:max="Object.keys(LifetimeValues).length"
        list="lifetime-options"
        style="margin: 0 1em;"
      />
      <datalist id="lifetime-options">
        <option v-for="(value, key) in LifetimeValues" :key="key" :value="key" :label="value.label"></option>
      </datalist>
      <div>{{ LifetimeValues[store.lifetime].label }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
// import { getInitialState } from '../utils';
import { LifetimeValues } from '../constants';
import { defineProps } from 'vue';
import { store } from '../store';
import { Preset } from '../types';

// Define Props
const props = defineProps<{
  presets: Preset[]
}>();

// Watch props and sync state
onMounted(() => {
  const initialPreset = window.localStorage.getItem('presetId') || '';
  if (initialPreset) loadPreset(initialPreset);
});

function loadPreset(id: string) {
  const newPreset = props.presets.find((p) => p.id === id);

  if (!newPreset) {
    throw new Error(`Cannot find preset with id ${id}`);
  }

  window.localStorage.setItem('presetId', id);
  store.changePreset(newPreset);
}

function reloadPreset() {
  loadPreset(store.preset);
}
</script>

<style scoped>
.input {
  width: 4em;
}
</style>