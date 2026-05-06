# CLAUDE.md — Punto de entrada para agentes

Documento corto. Lee esto primero, luego ve a `SPEC.md`.

**Codename del proyecto**: `cv-land`
**Dueno**: Esteban Diaczunn (NAIKI)
**Estado actual**: Pre-Fase 0 — docs siendo generados, no hay codigo todavia.

---

## Que es este proyecto

- Sitio CV personal estatico, estetica NERV / Evangelion, bilingue ES/EN.
- Stack: Astro 5 + Tailwind CSS v4 + vanilla JS / Solid.js (NO React). Deploy a VPS propio via nginx.
- Contenido en Astro Content Collections (MDX + YAML). No hay CMS, no hay BD, no hay backend.
- Build output 100% estatico. `pnpm` como package manager.
- Fuentes self-hosted en `public/fonts/`. No Google Fonts CDN.
- Documento canonico: `SPEC.md`. Leerlo completo antes de cualquier cambio estructural.

## Regla de contenido (leer con atencion)

- El **chrome de la UI** (headers de seccion, badges de status, nav, footer, tooltips) usa veneer NERV: "MISSION LOG", "OPERATIONAL TENURE", "SECURE CHANNEL", "SYNC RATE", etc.
- El **contenido bajo cada header** es el **texto literal del CV del dueno**, sin reescribir ni militarizar. El agente SCRIBE extrae texto verbatim del PDF y lo coloca en los MDX bodies.
- Frontmatter YAML guarda datos estructurados (fechas, stack, codename, clearance). Body MDX guarda la prosa real del CV.
- Referencia completa: `docs/CONTENT_TRANSLATION.md`.

## Decisiones bloqueadas (no reabrir sin autorizacion del dueno)

| ID  | Decision resuelta |
| --- | ----------------- |
| D1  | Hero: `ESTEBAN DIACZUNN` como identidad primaria, `CODENAME: NAIKI` debajo en menor jerarquia. Recruiters primero. |
| D2  | Japones SOLO como decoracion grafica: kanji opaco grande detras de section headers, katakana ornamental en divisores. NUNCA en texto funcional de UI. |
| D3  | Audiencia primaria: recruiters. Devs: secundario. Empresa/rol/fechas/stack son visualmente primarios; repo links accesibles pero no prominentes. |
| D4  | Paleta NERV clasico exacta: `#0a0a0a` base, `#ff6600` amber accent, `#d62121` alarm red, `#00ff88` magi green. Ver `SPEC.md §6.1`. |
| D5  | Codename del proyecto: `cv-land`. El metaforo MAGI (Melchior/Balthasar/Casper) vive SOLO como nombre de componente UI (`MagiPanel`). No usar "MAGI" como codename del proyecto. |
| D6  | Dominio: placeholder `TODO_DOMAIN` hasta que el dueno compre uno. Unica fuente de verdad: variable `site:` en `astro.config.mjs`. |

## Los 4 sombreros (modelo de roles)

Una sola sesion puede cambiar de sombrero segun la tarea. Ver `SPEC.md §5`.

| Sombrero     | Cuando se pone                                     | Documento de referencia        |
| ------------ | -------------------------------------------------- | ------------------------------ |
| **DESIGNER** | Tokens CSS, animaciones, paleta, tipografia        | `docs/DESIGN_SYSTEM.md`        |
| **SCRIBE**   | Labels de chrome ES/EN, extraccion de CV a MDX     | `docs/CONTENT_TRANSLATION.md`  |
| **BUILDER**  | Componentes Astro, layouts, config del build       | `SPEC.md §4` + Astro docs      |
| **DEPLOYER** | Scripts rsync, nginx config, performance audit     | `docs/DEPLOY.md`               |

Cuando recibas una tarea, identifica tu sombrero y lee el doc correspondiente antes de tocar codigo.

## Anti-patterns criticos (SPEC §9)

- No proponer blog, terminal interactivo real, chat con LLM, API de GitHub en vivo, o conversion a template vendible.
- No proponer Next.js / Remix / SvelteKit / React / headless CMS / Vercel / Netlify / analytics en v1.
- No usar React ni framer-motion. Motion: CSS animations + motion-one si hace falta.
- Toda idea fuera de scope va a `docs/IDEAS_PARKING_LOT.md`, no se implementa ni se ignora.

## Donde viven las ideas descartadas

`docs/IDEAS_PARKING_LOT.md` — registrar ahi cualquier idea interesante pero fuera del scope actual. Reconocer, anotar, volver a la fase.

## Si sos un agente nuevo, hace esto en orden

1. Lee este archivo (`CLAUDE.md`) completo.
2. Lee `SPEC.md` completo.
3. Lee el documento que corresponde a tu sombrero (tabla de sombreros arriba).
4. Confirma con el dueno antes de desviarte de cualquier decision bloqueada (D1-D6) o de cambiar el scope de la fase actual.
