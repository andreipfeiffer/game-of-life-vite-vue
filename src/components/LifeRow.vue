<template>
  <div class="row">
    <LifeCell v-for="(cell, x) in row" :key="x" :alive="cell" />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import LifeCell from './LifeCell.vue';

defineProps<{
  row: Array<boolean>,
}>();
</script>

<style scoped>
.row {
  display: flex;
}
</style>
