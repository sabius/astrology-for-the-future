// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://sabius.github.io/astrology-for-the-future',
  base: process.env.BASE_URL || '/astrology-for-the-future',
  vite: {
    css: {
      transformer: 'lightningcss', // optional; you can try removing if still broken
    },
    plugins: [tailwindcss()],
  },
});
