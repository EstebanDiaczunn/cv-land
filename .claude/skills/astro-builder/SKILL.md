---
name: astro-builder
description: Patrones idiomáticos para construir/modificar componentes Astro 5 en cv-land — content collections, View Transitions, Tailwind v4, partial hydration via vanilla JS islands. Usar cuando se cree un componente nuevo, se modifique el content layer, se agregue una página, o se toque `astro.config.mjs` / `content.config.ts`.
---

# astro-builder

## Trigger

- "agregá un componente/sección/página"
- "el contenido bilingüe no se carga"
- "agregá un nuevo entry de experiencia/educación"
- cambios en `content.config.ts`, `astro.config.mjs`, `layouts/`

## Convenciones del repo

### Content Collections

- Definidas en `src/content.config.ts` con `glob` loader y schemas Zod estrictos.
- **Bilingüe**: toda entry vive como `name.es.md` + `name.en.md` (o `es.md`/`en.md`/`es.json`/`en.json` para singletons como `about`, `skills`, `languages`).
- **`locale`** es campo obligatorio en frontmatter. Filtrar con `getCollection('coll', e => e.data.locale === locale)`.
- **`order`** numérico para sort estable en `experience`/`education`.
- Para singletons: `getEntry('skills', 'es')` (id = filename sin extensión).
- **Cuidado con YAML**: campos como `period: 2025` se parsean como número. Si el schema espera string, comillalos: `period: "2025"`.

### Componentes

- **Una responsabilidad por archivo**. Props tipadas con `interface Props { ... }`.
- **Slots** para contenido (vs prop string) cuando viene de MDX render.
- Para listas con `await` adentro del JSX: usar `{items.map(async (e) => { ... return (<X />) })}` — Astro lo maneja nativo.
- Render de markdown body: `const { Content } = await render(entry); <Content />`.

### Páginas

- ES en `src/pages/index.astro`, EN en `src/pages/en/index.astro`. Mismo shape.
- Pasar `altPath` al `Hero` y `CommandPalette` para el toggle de idioma.
- `BaseLayout` provee `<html lang>`, fonts, ClientRouter, container.

### View Transitions

- `ClientRouter` ya está en `BaseLayout`. Los islands JS deben re-inicializarse en `astro:page-load`:

```ts
function init() { /* ... */ }
init();
document.addEventListener('astro:page-load', init);
```

### Tailwind v4

- Sin `tailwind.config.js`. Tokens en `@theme` dentro de `global.css`.
- Usá utilidades arbitrarias para tokens: `bg-[var(--color-bg-chip)]`.
- Combiná con utilidades estándar (`flex`, `gap-2`, `rounded-md`).

### Performance

- Mantener bundle JS bajo 20kB gzip (actual: ~5.3kB ClientRouter).
- No agregar integraciones (`@astrojs/react`, etc.) sin justificación.
- Imágenes en `public/` directo si son SVG. Para raster, considerar Astro `<Image>` (sharp ya está disponible).

## Cómo agregar un entry de experiencia nuevo

1. Crear `src/content/experience/<slug>.es.md` y `.en.md` con el frontmatter completo (locale, company, role, remote, start, end, order, stack).
2. Body en bullets `- ...` (texto literal del CV, sin floritura).
3. `pnpm build` para validar el schema.
4. No tocar el componente — el render es automático por `order`.

## Cómo agregar una sección nueva

1. ¿Es contenido bilingüe? → nueva collection en `content.config.ts` + archivos es/en.
2. Importar y renderizar en **ambas** páginas (`index.astro` y `en/index.astro`).
3. Sumar entry al command palette (`labels.goto.<id>`) en `i18n.ts` y `CommandPalette.astro`.
4. Usar `<Section id="..." title={t.sections.<key>} delay={N}>` para mantener ritmo de animaciones.
