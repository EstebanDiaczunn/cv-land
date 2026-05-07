---
name: design-tokens
description: Mantener consistencia del sistema visual de cv-land — paleta, tipografía, spacing, motion, sombras. Usar SIEMPRE que se proponga un cambio visual, se ajuste un color/font/spacing, se agregue un componente nuevo, o se traiga inspiración de otro sitio. Bloquea hardcodeos de color/tamaño fuera de los tokens definidos en `src/styles/global.css`.
---

# design-tokens

## Trigger

Activá esta skill cuando el usuario pida algo como:
- "cambiá el color de X", "más oscuro", "más spacing", "otra fuente"
- "agregá un componente Y" (necesita usar tokens existentes)
- "esto se ve apagado/duro/desalineado"
- "que se parezca más a [sitio referencia]"

## Fuente de verdad

`src/styles/global.css` bajo `@theme { ... }`. Si necesitás un token nuevo, agrégalo ahí y úsalo via `var(--color-*)` o utilidades Tailwind v4 (`text-[var(--color-text)]`).

## Tokens actuales

| Categoría     | Token                          | Valor       | Uso                              |
| ------------- | ------------------------------ | ----------- | -------------------------------- |
| Background    | `--color-bg`                   | `#0b0b0d`   | body base                        |
| Background    | `--color-bg-elev`              | `#131316`   | cards, modal, command palette    |
| Background    | `--color-bg-chip`              | `#1c1c21`   | pills, badges                    |
| Background    | `--color-bg-chip-hover`        | `#26262d`   | pill hover                       |
| Border        | `--color-border`               | `#26262d`   | dividers, chips                  |
| Border        | `--color-border-strong`        | `#3a3a44`   | modal, avatar ring               |
| Text          | `--color-text`                 | `#ededf0`   | headings, primary                |
| Text          | `--color-text-dim`             | `#a1a1aa`   | body                             |
| Text          | `--color-text-muted`           | `#71717a`   | meta (dates, hints)              |
| Accent        | `--color-success`              | `#4ade80`   | "Remote" pill únicamente         |
| Font          | `--font-sans` / `--font-mono`  | Inter / JBM | sans=headings, mono=body+UI      |

## Reglas

1. **Nunca** uses colores hex/rgb hardcodeados en componentes. Si no existe el token, agrégalo a `@theme`.
2. **Mono para body**, **sans para headings**. Names/section titles = sans. Descripción + metadata = mono.
3. **Sizing**: títulos 14-22px, body mono 12-13px, meta 11px. No mayúsculas salvo group labels (uppercase tracking-wider 10-11px).
4. **Spacing rítmico**: `mt-1 / mt-2 / mt-3 / mt-4 / mt-8 / mt-16`. Usá `space-y-*` en listas.
5. **Motion**: solo `anim-fade-up` (definido en global.css) con delays 60/120/180/240/300. Nada de framer/GSAP.
6. **Hover**: `opacity 0.7` en links, `bg-chip-hover` en pills/buttons. Transiciones 150ms.
7. **Print**: cualquier UI no-CV (palette, trigger) lleva `no-print` o `class="no-print"`.

## Checklist antes de mergear cambios visuales

- [ ] ¿Todos los colores son `var(--color-*)`?
- [ ] ¿La tipografía respeta sans/mono según rol?
- [ ] ¿Los tamaños están en la grilla 11/12/13/14/15/22?
- [ ] ¿El nuevo componente tiene focus-visible accesible?
- [ ] ¿Renderiza bien en print (o excluido con `no-print`)?
- [ ] ¿Pasa `pnpm build` sin warnings?
