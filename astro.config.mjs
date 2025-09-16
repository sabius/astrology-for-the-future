// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Determine the base path based on the environment
const getBasePath = () => {
  if (process.env.GITHUB_ACTIONS) {
    const prNumber = process.env.GITHUB_REF?.split('/')[2];
    if (prNumber) {
      return `/astrology-for-the-future/pr-preview/pr-${prNumber}`;
    }
    return '/astrology-for-the-future'; // For your main branch deployments
  }
  return '/'; // For local development
};

export default defineConfig({
  site: 'https://sabius.github.io',
  base: getBasePath(),
  vite: {
    css: {
      transformer: 'lightningcss',
    },
    plugins: [tailwindcss()],
  },
});
