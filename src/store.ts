import { reactive, ref } from "vue";
import { DEFAULT_SIZE, LifetimeValues } from "./constants";
import { getInitialState, getNeighbors } from "./utils";
import { Grid, Preset } from "./types";

export const population = ref<Grid>(getInitialState([], 1, 1))

export const store = reactive({
  play: false,
  renderer: "html",
  lifetime: +Object.keys(LifetimeValues).reverse()[0],
  width: 20,
  height: 10,
  size: 30,
  preset: "",
  // population,

  togglePlay() {
    this.play = !this.play;
  },

  changePreset(newPreset: Preset) {
    const newWidth = newPreset?.width || store.width;
    const newHeight = newPreset?.height || store.height;
    const newSize = newPreset?.size || DEFAULT_SIZE;
  
    this.width = newWidth;
    this.height = newHeight;
    this.size = newSize;
    this.preset = newPreset.id;
    population.value = getInitialState(newPreset.grid, newWidth, newHeight);
  },

  setNextPopulation() {
    // window.performance.mark("setNextPopulationStart");

    const next: Grid = [];

    for (let row = 0; row < population.value.length; row += 1) {
      next[row] = [];
      for (let col = 0; col < population.value[row].length; col += 1) {
        const isAlive = !!population.value[row][col];
        const neighbors = getNeighbors(population.value, row, col);
        const liveNeighbors = neighbors.filter((cell) => !!cell);
  
        if (liveNeighbors.length === 3) {
          next[row][col] = true;
        } else if (liveNeighbors.length === 2 && isAlive) {
          next[row][col] = true;
        } else {
          next[row][col] = false;
        }
      }
    }

    population.value = next;

    // window.performance.mark("setNextPopulationEnd");
    // window.performance.measure(
    //   "🐌 setNextPopulation",
    //   "setNextPopulationStart",
    //   "setNextPopulationEnd"
    // );
  }
});
