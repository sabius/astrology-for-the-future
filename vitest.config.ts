import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{js,ts,tsx,astro}'],
      exclude: [
        'src/**/*.{test,spec}.{js,ts,tsx}',
        'src/**/__tests__/**',
        'node_modules/**',
        'dist/**'
      ]
    }
  }
});