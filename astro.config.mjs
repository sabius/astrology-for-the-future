// astro.config.mjs
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import lit from "@astrojs/lit";

export default defineConfig({
  // You might want to update this to your new production URL for SEO
  site: "https://glendaferreira.com",
  base: "/", // Always deploy to the root
  integrations: [
    lit(),
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
        if (pathname.includes("/404") || pathname.includes("/docs")) return false;
        // Exclude duplicate /en/ prefix paths so sitemap strictly contains primary canonical URLs
        if (pathname.startsWith("/en/") || pathname === "/en") return false;
        return true;
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

