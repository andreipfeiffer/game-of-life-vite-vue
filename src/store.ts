import { reactive, shallowRef } from "vue";
import { DEFAULT_SIZE, LifetimeValues } from "./constants";
import { getInitialState, getNextPopulation } from "./utils";
import { Grid, Preset } from "./types";

export const population = shallowRef<Grid>(getInitialState([], 1, 1))

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

  updateNextPopulation() {
    population.value = getNextPopulation(population.value);
  }
});
