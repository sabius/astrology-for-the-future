// astro.config.mjs
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  // You might want to update this to your new production URL for SEO
  site: "https://glendaferreira.com",
  base: "/", // Always deploy to the root
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: {
          en: "en",
          es: "es",
        },
      },
      filter: (page) => {
        const pathname = new URL(page).pathname;
        if (pathname.includes("/404")) return false;
        return pathname.startsWith("/en/") || pathname.startsWith("/es/");
      },
    }),
  ],
  vite: {
    css: {
      transformer: "lightningcss",
    },
    plugins: [tailwindcss()],
  },
});

