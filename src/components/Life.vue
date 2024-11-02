<template>
  <div :class="`life ${size < SIZE_THRESHOLD ? 'small-size' : ''}`" :style="style">
    <LifeRow v-for="(row, y) in population" :key="y" :row="row" />
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';
import LifeRow from './LifeRow.vue';
import { Grid } from '../types';

const props = defineProps<{
  population: Grid,
  size: number,
}>();

const SIZE_THRESHOLD = 15;

const style = computed(() => ({ '--size': `${props.size}px` }));
</script>

<style>
.life {
  border-collapse: collapse;
  font-size: 0;
  display: flex;
  flex-direction: column;
  width: fit-content;
  box-shadow: 0 0 0 1px#00000022;
}
.life.small-size {
  border: 1px black solid;
  box-shadow: none;
}
</style>
