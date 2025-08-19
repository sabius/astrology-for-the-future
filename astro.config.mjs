// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  outDir: 'public',
  publicDir: 'static',
  vite: {
    css: {
      transformer: 'lightningcss', // optional; you can try removing if still broken
    },
    plugins: [tailwindcss()],
  },
});
