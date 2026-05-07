---
name: perf-audit
description: Auditar performance, bundle size, fonts, imágenes y accesibilidad de cv-land antes de deploy o cuando se agreguen features. Usar cuando se sume una dependencia, se cambie el layout, se agreguen imágenes, o el usuario pida "está rápido?", "audita performance", "lighthouse".
---

# perf-audit

## Trigger

- "audita performance / accesibilidad / lighthouse"
- "antes de deploy"
- "agregué X, está bien?"
- nuevas dependencias en `package.json`

## Budget actual

| Métrica          | Target              | Cómo medir                                |
| ---------------- | ------------------- | ----------------------------------------- |
| JS bundle (gzip) | < 20 kB             | `pnpm build` y leer output de vite        |
| CSS (gzip)       | < 15 kB             | idem                                      |
| LCP              | < 1.5 s             | Lighthouse / WebPageTest                  |
| CLS              | < 0.05              | Lighthouse                                |
| TBT              | < 100 ms            | Lighthouse                                |
| Lighthouse Perf  | ≥ 98                | `npx lighthouse http://localhost:4321`    |
| Lighthouse A11y  | 100                 | idem                                      |

## Checklist

### Build size

```sh
pnpm build
# revisar output: ningún chunk debería pasar 30kB sin gzip
ls -lh dist/_astro/*.js dist/_astro/*.css
```

### Fonts

- Self-hosted via `@fontsource-variable/*`. Nada de Google Fonts CDN.
- Solo Inter Variable + JetBrains Mono Variable. No agregar variantes adicionales.
- Verificar `font-display: swap` (default de fontsource, ok).

### Imágenes

- SVG > raster. Si necesitás raster, usar Astro `<Image>` (sharp instalado).
- `public/avatar.svg`, `public/favicon.svg` actuales son SVG inline-friendly.
- PDF (`Esteban_N_Diaczun.pdf`) en `public/` se sirve directo, no se procesa.

### JS

- Solo el ClientRouter (~5.3kB gzip) + el script inline del CommandPalette deberían existir.
- `pgrep "@astrojs"` no debe devolver integraciones JS (react, vue, svelte).
- Cualquier nuevo island debe ser vanilla JS dentro de `<script>` del componente Astro.

### Accesibilidad

- `<html lang>` correcto por página (es / en).
- Iconos sin texto → `aria-label`.
- `focus-visible` outline definido en `global.css`.
- Contraste: dim sobre bg cumple AA (verificar si bajás `--color-text-dim`).
- `prefers-reduced-motion`: TODO — agregar `@media (prefers-reduced-motion)` que desactive `anim-fade-up`.

### SEO

- `<title>` por página, descriptivo.
- `og:title`, `og:description`, `og:type=profile` presentes.
- TODO: `og:image` cuando exista dominio.
- `sitemap`: agregar `@astrojs/sitemap` cuando dominio sea real.

## Flujo recomendado

```sh
pnpm build
pnpm preview &
npx lighthouse http://localhost:4321 --only-categories=performance,accessibility,best-practices,seo --chrome-flags="--headless" --output=html --output-path=/tmp/lh-es.html
npx lighthouse http://localhost:4321/en --only-categories=performance,accessibility,best-practices,seo --chrome-flags="--headless" --output=html --output-path=/tmp/lh-en.html
kill %1
```

Reportar al usuario: scores, top issues, y propuestas concretas.
