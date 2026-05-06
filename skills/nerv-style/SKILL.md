# SKILL.md — nerv-style

<!--
  NOTA DE GENERACION: Este archivo fue escrito desde cero usando SPEC.md §6 como fuente
  primaria. Se intentó fetch de https://raw.githubusercontent.com/TheGreatGildo/nerv-ui/main/SKILL.md
  pero el repositorio no expone un SKILL.md estructurado en formato de skill — el repo contiene
  documentacion de componentes HTML/CSS. El contenido de nerv-ui v2 (TheGreatGildo) se tomó como
  referencia de filosofia de diseno (black void default, clinical precision, CRT effects) pero
  los tokens y componentes de este skill corresponden a cv-land y sus decisiones D1-D6.
-->

---
name: nerv-style
description: >
  Sistema visual NERV/Evangelion para cv-land. Define tokens de color, tipografia y movimiento;
  catalogo de componentes Astro; reglas de composicion; y anti-patterns. Invocar este skill
  antes de cualquier trabajo de diseno o construccion de componentes visuales.
version: "1.0.0"
tags:
  - astro
  - tailwind-v4
  - nerv
  - evangelion
  - design-system
  - cv-land
---

## Cuando usar este skill

Invocar este skill cuando el agente va a:

- Crear o modificar un componente Astro en `src/components/`.
- Definir o cambiar tokens CSS en `src/styles/tokens.css`.
- Agregar animaciones en `src/styles/animations.css`.
- Tomar decisiones sobre paleta, tipografia, spacing o motion.
- Revisar si un elemento visual cumple con las reglas de composicion del proyecto.

No invocar para tareas de contenido (MDX, YAML), build config, o deploy. Esos tienen sus propios sombreros.

Referencia ampliada: `docs/DESIGN_SYSTEM.md`.

---

## Quick reference

### Paleta de tokens (SPEC §6.1 — verbatim)

```css
/* src/styles/tokens.css */
:root {
  /* base */
  --bg-void: #0a0a0a;          /* negro casi absoluto, no #000 puro */
  --bg-panel: #141414;         /* paneles ligeramente mas claros */
  --bg-elevated: #1c1c1c;
  --border-subtle: #2a2a2a;
  --border-strong: #3d3d3d;

  /* identidad NERV */
  --accent-amber: #ff6600;     /* el naranja iconico */
  --accent-amber-soft: #cc5200;
  --accent-amber-glow: #ff661a;
  --alarm-red: #d62121;        /* rojo de alerta — usar con cautela */
  --alarm-red-glow: #ff3030;

  /* texto */
  --text-primary: #f5f5f5;     /* casi blanco, no #fff puro */
  --text-secondary: #a8a8a8;
  --text-muted: #6e6e6e;
  --text-amber: #ff8800;       /* para labels y status */

  /* especiales */
  --magi-green: #00ff88;       /* verde MAGI para terminales secundarios */
  --scan-overlay: rgba(255, 102, 0, 0.03);
}
```

**Regla de uso por color:**
- `--accent-amber` / `--text-amber`: accent default. Headers, labels, borders de paneles activos, fill de sync bars.
- `--alarm-red`: SOLO para estados de error, advertencia critica, badges CLASSIFIED. Maximo 1-2 elementos visibles a la vez.
- `--magi-green`: terminales secundarios, readouts de datos, estado "nominal". No mezclar con amber en el mismo panel.
- `--bg-void` a `--bg-elevated`: jerarquia de profundidad. Void = fondo. Panel = contenedor. Elevated = elemento interactivo encima.

### Stack tipografico

```
Display / Headers:   Oswald 700 — condensed, all-caps, tracking amplio
Body:                Inter 400/500 — legible, neutro, para prosa del CV
Mono / Terminal:     JetBrains Mono — readouts, status, codigo, timestamps
Decoracion japonesa: Noto Sans JP 900 — SOLO decorativo, opacidad baja (0.04-0.08)
```

Self-hosted en `public/fonts/` con `font-display: swap`. No CDN externo.

### Tokens de movimiento

```
--duration-instant:  0ms      /* para prefers-reduced-motion */
--duration-fast:     150ms    /* hover transitions */
--duration-medium:   300ms    /* transiciones de estado */
--duration-boot:     3000ms   /* boot sequence total (hasta 5000ms) */

--ease-out:     cubic-bezier(0.0, 0.0, 0.2, 1)
--ease-in-out:  cubic-bezier(0.4, 0.0, 0.2, 1)
--ease-terminal: steps(1, end)   /* para efecto typewriter */
```

`prefers-reduced-motion`: boot sequence colapsa a fade-in de 200ms. Todas las animaciones decorativas se desactivan. Ver seccion Accessibility mas abajo.

---

## Core components

### BootSequence

**Proposito**: Animacion de inicio al cargar el sitio. Imita secuencia de arranque de computadora NERV. Se ejecuta una vez; skippable con click o ESC.

**Duracion**: 3-5 segundos maximos. Con `prefers-reduced-motion`: fade-in de 200ms.

**Implementacion**: Vanilla JS en un Astro island (`client:load`). CSS animations para el texto linea a linea. No Three.js, no GSAP pesado.

**Slots / props**:
- `skipLabel` (string, default: "[ PRESS ANY KEY TO SKIP ]") — label del hint de skip
- `lines` (string[], optional) — lineas de texto del boot, override del default

**Esquema de layout**:
```
+------------------------------------------+
|  NERV SYSTEM BOOT v2.x                   |  <- amber, mono
|  > Initializing neural interface...      |  <- green, mono, typewriter
|  > Loading operative profile... OK       |
|  > Synchronization check... 92%          |
|  > [ PRESS ANY KEY TO SKIP ]             |  <- muted, fade pulse
+------------------------------------------+
```

**Tokens clave**: `--magi-green` para lineas de progreso, `--accent-amber` para header, `JetBrains Mono` para todo el texto, `--bg-void` como fondo.

---

### MagiPanel

**Proposito**: Contenedor de paneles estilo MAGI (tres columnas: Melchior / Balthasar / Casper). Usado para Skills/SyncRates, Experience summary, o cualquier seccion de 3 columnas. El nombre del componente preserva la metafora MAGI como elemento UI interno (D5).

**Props**:
- `panels` (array de `{ id: string, label: string, sublabel?: string, content: slot }`)
- `variant`: `"default"` | `"compact"` | `"featured"`

**Slots**: un slot por panel, named por `id`.

**Esquema de layout**:
```
+----------------+------------------+----------------+
| MAGI-01        | MAGI-02          | MAGI-03        |  <- amber label, mono
| MELCHIOR       | BALTHASAR        | CASPER         |  <- sublabel, muted
|----------------|------------------|----------------|
|                |                  |                |
|   [content]    |   [content]      |   [content]    |
|                |                  |                |
+----------------+------------------+----------------+
```

**Tokens clave**: `--bg-panel` fondo, `--border-strong` bordes, `--accent-amber` header del panel, `--text-secondary` sublabel.

---

### SyncBar

**Proposito**: Barra de progreso horizontal para skills. Muestra nombre, porcentaje ("SYNC RATE"), y un fill con glow ambarino.

**Props**:
- `label` (string) — nombre del skill
- `rate` (number, 0-100) — porcentaje de sync
- `years` (number, optional) — anos de experiencia, mostrado como texto secundario

**Esquema de layout**:
```
PHP / Laravel                              92%
[===========================================--] 
anos: 3
```

**Tokens clave**: `--accent-amber` para el fill y el porcentaje, `--bg-elevated` para el track vacio, `box-shadow` con `--accent-amber-glow` al 40% de opacidad en el fill. Animacion: fill crece de 0% al valor final en 600ms `ease-out`, solo si no hay `prefers-reduced-motion`.

---

### MissionCard

**Proposito**: Card para proyectos en la seccion "MISSION LOG / OPERATION RECORDS". Muestra datos estructurados del frontmatter + synopsis corto.

**Props** (del frontmatter MDX del proyecto):
- `codename` (string) — nombre NERV del proyecto
- `realName` (string) — nombre real legible
- `status` ("ACTIVE" | "ARCHIVED" | "CLASSIFIED")
- `stack` (string[])
- `synopsis` ({ es: string, en: string })
- `featured` (boolean) — si true, card mas grande / destacada
- `clearance` (number, 1-5) — afecta el color del badge

**Esquema de layout**:
```
+------------------------------------------+
| [STATUS: ACTIVE]          [CLEARANCE: 3] |  <- badges amber / red segun clearance
| CODENAME: SENTINEL                       |  <- amber, Oswald, prominente
| Sentinel                                 |  <- realName, text-secondary
|------------------------------------------|
| Synopsis corto del proyecto (2 oraciones)|  <- Inter, text-primary
|------------------------------------------|
| Stack: Claude Code · Python · Hooks API  |  <- mono, muted
| [Ver repo]                [Ver demo]     |  <- links opcionales
+------------------------------------------+
```

**Tokens clave**: `--bg-panel` fondo, `--accent-amber` codename y badges nominales, `--alarm-red` para CLEARANCE 1-2 o status CLASSIFIED, `--magi-green` para STATUS: ACTIVE en terminales de datos.

---

### LangToggle

**Proposito**: Toggle ES/EN. Unica isla con JS real ademas del BootSequence. Minimal: dos labels, sin dropdown.

**Props**: `currentLang` ("es" | "en"), `altHref` (string — URL de la pagina en el otro idioma)

**Comportamiento**: Link directo a la pagina alternativa (`/` para ES, `/en/` para EN). No state management — Astro genera las dos rutas estaticamente.

**Esquema de layout**:
```
ES | EN
```
Label activo: `--accent-amber`. Inactivo: `--text-muted`. Separador: `--border-subtle`. Todo en `JetBrains Mono`.

---

### HexGrid

**Proposito**: Patron hexagonal de fondo decorativo (AT Field). CSS-only. Sin JS.

**Implementacion**: `repeating-linear-gradient` o SVG inline en `<pattern>`. Opacidad muy baja (3-5%). Color: `--border-subtle` o `--accent-amber` al 5%.

**Props**:
- `opacity` (number, default: 0.04)
- `size` (number px, default: 40) — tamano del hexagono

**Regla de uso**: Solo como background de secciones grandes. No sobrecargar. Si la pagina ya tiene ScanLines activo, reducir `opacity` de HexGrid a 0.02.

---

### ScanLines

**Proposito**: Overlay CRT opcional. Off por default. Toggle en el footer.

**Implementacion**: `::before` pseudo-element con `repeating-linear-gradient` de lineas horizontales de 1px cada 2px, opacidad 0.03. Position fixed, pointer-events none, z-index maximo.

**Props**: `enabled` (boolean, default: false) — controlado por estado JS en el footer.

**Color del overlay**: `--scan-overlay` (`rgba(255, 102, 0, 0.03)`).

**Con `prefers-reduced-motion`**: ScanLines se desactiva globalmente y el toggle se oculta.

---

### StatusHeader

**Proposito**: Barra superior fija. Atmosfera ambiente. Timestamp en vivo, "STATUS: ONLINE", coordenadas falsas.

**Implementacion**: HTML estatico para el string base; un Astro island minimo (`client:idle`) para el timestamp en vivo con `setInterval`. JS total: menos de 200 bytes.

**Esquema de layout**:
```
NERV SYSTEMS   STATUS: ONLINE   35.6762N 139.6503E   2026-05-06 03:14:07 JST
```

**Tokens**: `--bg-panel` fondo, `--magi-green` para STATUS: ONLINE, `--text-muted` para el resto, `JetBrains Mono`, font-size: 11px.

---

## Reglas de composicion

### Jerarquia de atencion

1. **Identidad** (Hero): `ESTEBAN DIACZUNN` en Oswald 700, grande. `CODENAME: NAIKI` debajo, amber, menor tamano.
2. **Chrome de seccion**: headers de seccion en Oswald 700 all-caps, `--accent-amber`. Kanji decorativo al fondo, opacidad 0.05-0.08, Noto Sans JP 900.
3. **Contenido**: prosa del CV en Inter 400, `--text-primary`. Empresa/rol/fechas en posicion visual prominente (primera lectura del recruiter).
4. **Datos secundarios**: stack, repo links, sync rates — `--text-secondary` o `--text-muted`.

### Cuando usar rojo

`--alarm-red` y `--alarm-red-glow` se reservan para:
- Badges de status CLASSIFIED.
- Clearance nivel 1-2 (proyectos mas sensibles / archivados con restriccion).
- Estados de error genuinos.
- Maximo 1-2 elementos visibles a la vez en el viewport. Si hay mas, usar amber en su lugar.

### Cuando usar amber

Default accent. Aplica a:
- Todos los headers de componentes (MagiPanel, StatusHeader).
- Fill de SyncBars.
- Labels de badges nominales (ACTIVE, DEPLOYED).
- Borders de elementos en focus o hover.
- Texto de status positivo.

### Cuando usar magi-green

Terminales de datos secundarios. Aplica a:
- Lineas de progreso en BootSequence.
- STATUS: ONLINE en StatusHeader.
- Readouts de datos en paneles de metricas si se agregan.
- No usar en el mismo panel visual donde ya hay amber prominente.

### Katakana / kanji decorativo

- Solo en `font-family: 'Noto Sans JP'`, weight 900.
- Opacidad: 0.04-0.08 maximo. Si se ve demasiado, bajar.
- Posicion: `position: absolute`, `z-index: 0`, detras del contenido (`z-index: 1`).
- Nunca en texto funcional, nunca con opacidad mayor a 0.10, nunca interactivo.

---

## Anti-patterns

- **Gradientes pastel o coloridos**: prohibidos. El sistema es oscuro y monocromatico con acentos puntuales.
- **Modo claro**: no existe. NERV siempre es sala de control oscura.
- **Glitch everywhere**: glitch solo en 1-2 elementos maximos. Glitch ubicuo es ruido, no estetica.
- **Japones en texto funcional**: violacion de D2. El japones es decoracion grafica, nunca label, boton, o nav.
- **React o framer-motion**: stack cerrado. Vanilla JS o Solid.js para islands. CSS animations para motion decorativo. motion-one si hace falta algo mas complejo.
- **Fuentes de CDN externo**: todas self-hosted en `public/fonts/`. No Google Fonts CDN.
- **`#000` puro o `#fff` puro**: usar `--bg-void` (#0a0a0a) y `--text-primary` (#f5f5f5) respectivamente.
- **Icon libraries externas**: iconografia minima, SVG inline. No FontAwesome, no Heroicons como dependencia.
- **Animaciones sin `prefers-reduced-motion`**: todas las animaciones no triviales deben respetar la media query.
- **Purple / pink / colores de otras unidades EVA**: la paleta es NERV clasico (D4). Si el dueno quiere una variante Unit-01 (purpura), es una decision nueva que requiere autorizacion.

Ver tambien: `SPEC.md §9` para anti-patterns de scope/features.

---

## Accessibility

### Contraste WCAG AA (minimo requerido: 4.5:1 para texto normal, 3:1 para texto grande)

| Par de colores                              | Ratio aproximado | Cumple AA |
| ------------------------------------------- | ---------------- | --------- |
| `--text-primary` (#f5f5f5) sobre `--bg-void` (#0a0a0a)  | ~19:1  | Si        |
| `--accent-amber` (#ff6600) sobre `--bg-void` (#0a0a0a)  | ~5.7:1 | Si        |
| `--text-amber` (#ff8800) sobre `--bg-void` (#0a0a0a)    | ~6.9:1 | Si        |
| `--magi-green` (#00ff88) sobre `--bg-void` (#0a0a0a)    | ~12:1  | Si        |
| `--alarm-red` (#d62121) sobre `--bg-void` (#0a0a0a)     | ~3.3:1 | Solo para texto grande (>=18px) |
| `--text-secondary` (#a8a8a8) sobre `--bg-void`          | ~6.2:1 | Si        |
| `--text-muted` (#6e6e6e) sobre `--bg-void`              | ~3.0:1 | Solo texto grande — evitar para texto de cuerpo |

**Consecuencia**: `--alarm-red` no debe usarse para texto de cuerpo pequeño. Solo para badges grandes, iconos, o texto >=18px.

### Focus states

```css
:focus-visible {
  outline: 2px solid var(--accent-amber);
  outline-offset: 2px;
  border-radius: 0; /* NERV es sharp */
}
```

Nunca `outline: none` sin un replacement visible. El ring ambarino es coherente con la estetica y cumple visibilidad.

### prefers-reduced-motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  /* BootSequence JS tambien debe detectar esta media query y colapsar a fade */
  /* ScanLines se desactiva globalmente */
}
```

El BootSequence debe detectar `prefers-reduced-motion` en JS con `window.matchMedia('(prefers-reduced-motion: reduce)').matches` y saltear la animacion directamente al estado final con un fade de 200ms.

### Keyboard navigation

- Todos los elementos interactivos (LangToggle, links de cards, repo links, skip del boot) deben ser focusables con Tab.
- BootSequence: tecla ESC o cualquier tecla salta la animacion.
- ScanLines toggle: debe ser un `<button>` accesible con `aria-pressed`.
- MissionCard: si tiene link a repo, el card entero puede ser un link o tener un link prominente — no `div` clickeable sin rol.
