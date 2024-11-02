<template>
  <span :class="`cell ${alive ? 'cell-alive' : ''}`"></span>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
  alive: boolean,
}>();
</script>

<style>
.cell {
  display: inline-block;
  background-color: white;
  box-shadow: inset 0 0 0 1px#00000022;
  padding: 0;
  width: var(--size);
  height: var(--size);
}
.cell-alive {
  background-color: black;
}
.small-size .cell {
  box-shadow: none;
  margin: 0;
}
</style>
