/**
 * Helpers para manejar `base` de Astro de forma transparente.
 *
 * En prod sin base (Fase 5 con dominio propio): BASE = "/" y los helpers
 * son no-ops. En GH Pages preview (BASE_PATH=/cv-land): BASE = "/cv-land/"
 * y los helpers prependen/strippean el segmento.
 */

const RAW = import.meta.env.BASE_URL || "/";
/** Base con trailing slash garantizado. "/" o "/cv-land/". */
export const BASE = RAW.endsWith("/") ? RAW : RAW + "/";
/** Base sin trailing slash. "" o "/cv-land". */
const STRIP = BASE.replace(/\/$/, "");

/** Saca el base de un pathname. `stripBase("/cv-land/en/") -> "/en/"`. */
export function stripBase(pathname: string): string {
  if (!STRIP) return pathname;
  if (pathname === STRIP || pathname === BASE) return "/";
  if (pathname.startsWith(BASE)) return "/" + pathname.slice(BASE.length);
  return pathname;
}

/** Prepende el base a un path que empieza con "/". `withBase("/en/") -> "/cv-land/en/"`. */
export function withBase(pathname: string): string {
  if (pathname === "/") return BASE;
  if (pathname.startsWith("/")) return STRIP + pathname;
  return BASE + pathname;
}
