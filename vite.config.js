import { resolve } from 'node:path';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  plugins: [vue()],
  build: {
    rolldownOptions: {
      input: {
        angularjs: resolve(import.meta.dirname, 'index.html'),
        vue: resolve(import.meta.dirname, 'vue/index.html'),
      },
    },
  },
});
