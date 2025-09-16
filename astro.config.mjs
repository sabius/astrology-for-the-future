// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// This function is correct, no changes needed here.
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
    // --- ADD THIS ENTIRE 'build' BLOCK ---
    build: {
      rollupOptions: {
        output: {
          // This forces a consistent naming pattern for JS chunks
          chunkFileNames: 'assets/js/[name]-[hash].js',
          // This forces a consistent naming pattern for assets like CSS, images
          assetFileNames: 'assets/css/[name]-[hash].[ext]',
          // This forces a consistent naming pattern for entry files (main JS)
          entryFileNames: 'assets/js/[name]-[hash].js',
        },
      },
    },
  },
});
