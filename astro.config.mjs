// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

const getBasePath = () => {
  // This environment variable is set by Cloudflare Pages.
  if (process.env.CF_PAGES) {
    return '/'; // Use root for all Cloudflare deployments (previews and production)
  }

  // This is for your existing GitHub Pages deployment.
  if (process.env.GITHUB_ACTIONS) {
    return '/astrology-for-the-future';
  }

  // This is for `npm run dev` locally.
  return '/';
};

export default defineConfig({
  site: 'https://sabius.github.io',
  base: getBasePath(), // Use the dynamic function here
  vite: {
    css: {
      transformer: 'lightningcss',
    },
    plugins: [tailwindcss()],
  },
});
