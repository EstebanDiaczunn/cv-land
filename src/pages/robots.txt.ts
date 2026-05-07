import type { APIRoute } from 'astro';

// Dinamico: el host del Sitemap sale del `site` resuelto en build (env-driven
// en astro.config.mjs). Asi no quedan TODO_DOMAIN hardcodeados en el preview
// de GH Pages.
export const GET: APIRoute = ({ site }) => {
  // BASE_URL termina en '/'; lo respetamos porque new URL ignora paths
  // absolutos sin slash final cuando el resolved tiene path.
  const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');
  const sitemapUrl = new URL(`${base}sitemap-index.xml`, site).toString();
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${sitemapUrl}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
