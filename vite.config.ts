import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/game-of-life-vite-vue/",
  plugins: [vue()],
})
