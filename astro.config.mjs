// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://sabius.github.io/github-website',
  base: '/github-website',
  vite: {
    css: {
      transformer: 'lightningcss', // optional; you can try removing if still broken
    },
    plugins: [tailwindcss()],
  },
});
