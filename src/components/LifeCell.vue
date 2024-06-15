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
  border: 1px black solid;
  margin: 1px;
  padding: 0;
  width: var(--size);
  height: var(--size);
}
.cell-alive {
  background-color: black;
}
.small-size .cell {
  border: 0;
  margin: 0;
}
</style>
