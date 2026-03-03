// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // You might want to update this to your new production URL for SEO
  site: 'https://astrology-for-the-future.pages.dev',
  base: '/', // Always deploy to the root
  vite: {
    css: {
      transformer: 'lightningcss',
    },
    plugins: [tailwindcss()],
  },
});
