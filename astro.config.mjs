// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://sabius.github.io/astrology-for-the-future',
  base: '/astrology-for-the-future',
  outDir: 'public',
  publicDir: 'static',
  vite: {
    css: {
      transformer: 'lightningcss', // optional; you can try removing if still broken
    },
    plugins: [tailwindcss()],
  },
});
