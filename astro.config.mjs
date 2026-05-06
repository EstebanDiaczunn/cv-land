// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// Single source of truth for the production domain.
// Replace TODO_DOMAIN when the owner buys the domain.
const SITE_URL = "https://TODO_DOMAIN";

export default defineConfig({
  site: SITE_URL,
  output: "static",
  vite: {
    plugins: [tailwindcss()],
  },
});
