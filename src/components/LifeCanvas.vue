<template>
  <canvas ref="canvas" class="canvas" :width="canvasWidth" :height="canvasHeight"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import { defineProps } from 'vue';
import { Grid } from '../types';

const props = defineProps<{
  population: Grid,
  size: number,
}>();

const canvas = ref<HTMLCanvasElement | null>(null);

const canvasWidth = computed(() => props.population[0].length * props.size);
const canvasHeight = computed(() => props.population.length * props.size);

function drawCanvas() {
  const ctx = canvas.value?.getContext('2d');

  if (!ctx) {
    return;
  }

  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvasWidth.value, canvasHeight.value);

  ctx.fillStyle = 'black';
  for (let row = 0; row < props.population.length; row++) {
    for (let col = 0; col < props.population[row].length; col++) {
      const cell = props.population[row][col];
      if (cell) {
        ctx.fillRect(col * props.size, row * props.size, props.size, props.size);
      }
    }
  }
}

onMounted(() => {
  drawCanvas();
});

watch([() => props.population, () => props.size], drawCanvas);
</script>

<style scoped>
.canvas {
  border: 1px solid black;
}
</style>