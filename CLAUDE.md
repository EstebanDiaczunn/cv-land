# CLAUDE.md — cv-land

CV personal estático de **Esteban Nicolás Diaczun** (Backend Developer). Bilingüe ES/EN.

## Stack

- **Astro 5** (output estático) + **Tailwind CSS v4** (via `@tailwindcss/vite`)
- Vanilla JS para el command palette (sin React, sin frameworks JS)
- Fonts self-hosted: `@fontsource-variable/inter` (sans) + `@fontsource-variable/jetbrains-mono` (mono)
- Content Collections (MD + JSON), validación con Zod
- View Transitions (`ClientRouter`) para nav suave entre `/` y `/en`
- `pnpm` como package manager. Node `>=22.12.0`

## Estética

Inspirado en `celiz.vercel.app`: columna única centrada (`max-w-[640px]`), fondo casi negro, headers sans bold, body en monospace, pills oscuras para metadata. Detalles propios: micro-animaciones fade-up, command palette ⌘K con keyboard nav, grain sutil, view transitions.

Tokens en `src/styles/global.css` (`@theme`). NO inventar colores fuera de esos tokens.

## Estructura

```
src/
  components/    Hero, Section, ExperienceEntry, Pill, CommandPalette
  content/       about/, experience/, education/, skills/, languages/  (es+en)
  content.config.ts
  layouts/       BaseLayout (head, fonts, ClientRouter, main wrapper)
  lib/i18n.ts    locales, ui strings, profile data
  pages/         index.astro (es), en/index.astro
  styles/        global.css (tokens + utilidades)
public/
  Esteban_N_Diaczun.pdf, avatar.svg, favicon.svg
.claude/skills/  design-tokens, astro-builder, cv-content, perf-audit
```

## Reglas

1. **Contenido del CV**: texto literal del PDF. No reescribir/floritar. Cambios de copy → editar el `.md` correspondiente en ambos idiomas.
2. **Bilingüe**: toda entry/data debe existir en `es` y `en`. La key del `getEntry` (about, skills, languages) usa el `id` derivado del filename (`es`, `en`).
3. **No agregar dependencias** sin justificación clara. No React, no framer-motion, no UI libs.
4. **Tailwind v4**: usar tokens del `@theme` o utilidades arbitrarias `bg-[var(--color-*)]`. Sin `tailwind.config.js`.
5. **Performance**: build estático, fonts self-hosted, sin JS framework. Mantener bundle JS bajo 20kB gzip.
6. **i18n**: `defaultLocale: 'es'` sin prefijo, EN bajo `/en`. Strings de UI en `src/lib/i18n.ts`.
7. **Decisiones bloqueadas** (no reabrir sin aprobación del dueño):
   - D1: Stack Astro + Tailwind v4 + vanilla JS.
   - D2: Layout columna única, dark only.
   - D3: Mono = JetBrains Mono, Sans = Inter.
   - D4: Audiencia: recruiters primero, devs después.
   - D5: Dominio: `TODO_DOMAIN` hasta que se compre uno.

## Comandos

```sh
pnpm dev       # dev server
pnpm build     # build estático a dist/
pnpm preview   # servir dist/
```

## Skills disponibles (.claude/skills/)

- **design-tokens**: cambios coherentes en paleta/tipografía/spacing.
- **astro-builder**: patrones para componentes Astro, content layer, transitions.
- **cv-content**: extraer/sincronizar contenido del PDF a MDX/JSON bilingüe.
- **perf-audit**: chequeos de Lighthouse, fonts, images, JS budget.

## Ideas fuera de scope

Van a `docs/IDEAS_PARKING_LOT.md`. No implementar sin acordar.
