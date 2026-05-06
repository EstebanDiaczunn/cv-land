// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// SITE_URL: origen sin path (https://example.com).
// BASE_PATH: path bajo el cual vive el sitio (ej "/cv-land" para GH Pages
// en estebandiaczunn.github.io/cv-land/). Vacio o no seteado para Fase 5
// con dominio propio sirviendo en root.
//
// Defaults preservan el comportamiento previo: TODO_DOMAIN sin base.
// Reemplazar TODO_DOMAIN cuando el dueno compre el dominio.
const SITE_URL = process.env.SITE_URL || "https://TODO_DOMAIN";
const BASE_PATH = process.env.BASE_PATH || undefined;

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  output: "static",
  vite: {
    plugins: [tailwindcss()],
  },
});
