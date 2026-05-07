import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// site/base son env-driven para soportar tres targets sin tocar config:
//   - dev local:        http://localhost:4321  (default Astro)
//   - GH Pages preview: SITE_URL=https://estebandiaczunn.github.io BASE_PATH=/cv-land
//   - prod (futuro):    SITE_URL=https://<DOMAIN> sin BASE_PATH (D5 abierto)
const SITE_URL = process.env.SITE_URL ?? 'https://TODO_DOMAIN';
const BASE_PATH = process.env.BASE_PATH ?? undefined;

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  trailingSlash: 'never',
  build: {
    inlineStylesheets: 'auto',
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: { es: 'es-AR', en: 'en' },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
