# DESIGN_SYSTEM.md — Sistema de diseno cv-land

> Documento de referencia para el sombrero **DESIGNER**. Lee esto cuando vayas a tocar tokens, tipografia, animaciones, layout, o accesibilidad.
>
> Para el catalogo de componentes y reglas de composicion, ver `skills/nerv-style/SKILL.md`.
> Para la paleta exacta de tokens, la fuente de verdad es `SPEC.md §6.1` — este documento la expande.

---

## 1. Tokens

### 1.1. Colores

Paleta NERV clasico (D4). Fuente: `SPEC.md §6.1`.

```css
/* src/styles/tokens.css */
:root {
  /* --- Fondos --- */
  --bg-void: #0a0a0a;        /* Fondo global. Negro casi absoluto. No usar #000 puro. */
  --bg-panel: #141414;       /* Contenedores de paneles y cards. */
  --bg-elevated: #1c1c1c;    /* Elementos encima de paneles: inputs, hover states. */

  /* --- Bordes --- */
  --border-subtle: #2a2a2a;  /* Separadores de baja jerarquia, hex grid. */
  --border-strong: #3d3d3d;  /* Bordes de paneles, dividers. */

  /* --- Identidad NERV (acentos) --- */
  --accent-amber: #ff6600;       /* Accent principal. Headers, labels, fills activos. */
  --accent-amber-soft: #cc5200;  /* Hover state de amber en fondos oscuros. */
  --accent-amber-glow: #ff661a;  /* Para box-shadow / glow de elementos amber. */
  --alarm-red: #d62121;          /* Solo alertas, CLASSIFIED, clearance bajo. Usar con cautela. */
  --alarm-red-glow: #ff3030;     /* Glow de alarm-red para badges criticos. */

  /* --- Texto --- */
  --text-primary: #f5f5f5;   /* Prosa del CV, contenido principal. No #fff puro. */
  --text-secondary: #a8a8a8; /* Fechas, sublabels, metadata secundaria. */
  --text-muted: #6e6e6e;     /* Notas, hints, stack chips. Evitar en texto de cuerpo chico. */
  --text-amber: #ff8800;     /* Labels de status, nombres de seccion en contexto de datos. */

  /* --- Especiales --- */
  --magi-green: #00ff88;              /* Terminales secundarios, STATUS: ONLINE, boot lines. */
  --scan-overlay: rgba(255,102,0,.03);/* Overlay de scan lines CRT. */
}
```

**Notas de uso por rol:**

| Token | Usar para | No usar para |
| --- | --- | --- |
| `--accent-amber` | Headers de componentes, fills, borders de foco, badges nominales | Texto de cuerpo largo (fatiga visual) |
| `--alarm-red` | CLASSIFIED, error, clearance 1-2 | Decoracion, textos secundarios |
| `--magi-green` | Boot progress, STATUS: ONLINE, readouts de datos | Mezclar en el mismo panel con amber prominente |
| `--text-muted` | Stack chips, hints, timestamps | Texto de cuerpo (ratio de contraste bajo para texto chico) |
| `--bg-elevated` | Hover states, inputs, elementos interactivos encima de paneles | Fondo global |

### 1.2. Escala de spacing (base 8px)

```
--space-1:  4px   /* micro — separacion entre icono y label */
--space-2:  8px   /* base — padding interno de chips */
--space-3:  12px
--space-4:  16px  /* padding base de componentes */
--space-5:  20px
--space-6:  24px  /* gap entre elementos de un panel */
--space-8:  32px  /* separacion entre secciones internas */
--space-10: 40px
--space-12: 48px  /* margin entre secciones de pagina */
--space-16: 64px
--space-20: 80px  /* padding de secciones grandes */
--space-24: 96px
```

### 1.3. Border radius

NERV es sharp. La regla default es `border-radius: 0`.

```
--radius-none: 0px    /* Default para paneles, cards, botones */
--radius-chip: 2px    /* UNICA excepcion: chips de stack y badges pequenos */
--radius-sm:   4px    /* Reservado — usar solo si el dueno aprueba explicitamente */
```

No usar `rounded-lg`, `rounded-xl` de Tailwind en ningun componente NERV.

### 1.4. Z-index scale

```
--z-hex-grid:    0   /* HexGrid background */
--z-content:     1   /* Contenido normal de pagina */
--z-elevated:    10  /* Cards hovereadas, tooltips */
--z-sticky:      20  /* StatusHeader sticky top */
--z-overlay:     50  /* ScanLines overlay */
--z-boot:        100 /* BootSequence — encima de todo durante el inicio */
```

### 1.5. Escala de opacidad para decoracion japonesa

```
--opacity-jp-min: 0.04  /* Minimo para que sea visible */
--opacity-jp-max: 0.08  /* Maximo — si se ve demasiado, bajar */
```

Nunca usar Noto Sans JP con opacidad mayor a 0.10.

---

## 2. Escala tipografica

### 2.1. Familias y roles

```
Display (headers, codenames, section titles):
  font-family: 'Oswald', sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;  /* tracking amplio para all-caps */

Body (prosa del CV, descripciones):
  font-family: 'Inter', sans-serif;
  font-weight: 400;  /* o 500 para enfasis */
  letter-spacing: 0;

Mono (terminal, readouts, status, timestamps, stack chips):
  font-family: 'JetBrains Mono', monospace;
  font-weight: 400;  /* o 600 para headers de terminal */

Decoracion japonesa (kanji/katakana de fondo):
  font-family: 'Noto Sans JP', sans-serif;
  font-weight: 900;
  opacity: var(--opacity-jp-min);  /* 0.04-0.08 maximo */
  user-select: none;
  pointer-events: none;
  position: absolute;
  z-index: 0;
```

Self-hosted: todos los archivos WOFF2 en `public/fonts/`. `@font-face` declarado en `src/styles/globals.css`. `font-display: swap` siempre.

### 2.2. Ramp de tamanos

Usar `clamp()` para fluidez entre mobile y desktop. Base: 16px.

```css
/* Titulos de display */
--text-hero:   clamp(2.5rem, 6vw, 4.5rem);    /* ESTEBAN DIACZUNN en hero */
--text-h1:     clamp(2rem, 4.5vw, 3rem);      /* Titulos de seccion principales */
--text-h2:     clamp(1.5rem, 3vw, 2rem);      /* Subtitulos de seccion */
--text-h3:     clamp(1.25rem, 2.5vw, 1.5rem); /* Titulos de card / panel header */
--text-h4:     clamp(1rem, 2vw, 1.25rem);
--text-h5:     1rem;
--text-h6:     0.875rem;

/* Body */
--text-base:   1rem;      /* 16px — prosa del CV */
--text-sm:     0.875rem;  /* 14px — metadata secundaria */
--text-xs:     0.75rem;   /* 12px — timestamps, stack chips */
--text-xxs:    0.6875rem; /* 11px — StatusHeader ambient text */

/* Line heights */
--leading-tight:  1.2;   /* Para headers en all-caps */
--leading-normal: 1.5;   /* Para body text */
--leading-relaxed:1.6;   /* Para prosa larga del CV */
```

### 2.3. Tracking recomendado

```
Headers Oswald (all-caps):    letter-spacing: 0.08em  (o hasta 0.12em en hero)
Body Inter:                   letter-spacing: 0        (normal)
Mono JetBrains:               letter-spacing: 0.02em   (leve, mejora legibilidad)
```

---

## 3. Tokens de movimiento

### 3.1. Duraciones y easings

```css
:root {
  --duration-instant:  0ms;
  --duration-fast:     150ms;   /* hover, focus transitions */
  --duration-medium:   300ms;   /* transiciones de estado de componentes */
  --duration-slow:     600ms;   /* SyncBar fill animation */
  --duration-boot-max: 5000ms;  /* maximo del BootSequence */

  --ease-out:       cubic-bezier(0.0, 0.0, 0.2, 1);
  --ease-in-out:    cubic-bezier(0.4, 0.0, 0.2, 1);
  --ease-terminal:  steps(1, end);   /* typewriter effect */
}
```

### 3.2. Boot sequence timeline

Duracion total: 3-5 segundos. Skippable en cualquier momento con click o tecla ESC.

```
T+0ms    Fondo void. Silencio.
T+200ms  Aparece header "NERV SYSTEM BOOT v2.x" — fade in 150ms, amber.
T+600ms  Primera linea de boot: "> Initializing neural interface..." — typewriter.
T+1400ms Segunda linea: "> Loading operative profile... OK" — typewriter.
T+2000ms Tercera linea: "> Synchronization check... 92%" — typewriter.
T+2600ms Cuarta linea: "> Establishing secure channel... OK" — typewriter.
T+3000ms Hint de skip pulsa: "[ PRESS ANY KEY TO SKIP ]".
T+3500ms Boot completo. Fade-out del overlay en 300ms. Contenido principal aparece.
```

Con `prefers-reduced-motion`: fade-in de 200ms directo al contenido, sin animacion intermedia.

### 3.3. Otras animaciones declaradas

```
Hover en MissionCard:  border-color a --accent-amber, 150ms ease-out.
SyncBar fill:          width de 0 a rate%, 600ms ease-out, delay por orden de aparicion.
Glitch effect:         SOLO en 1-2 elementos. Keyframe con transform: skewX + opacity flicker.
                       Duracion: 200ms, triggered por hover o segun tiempo. No loop continuo.
Katakana dividers:     opacity: 0 → var(--opacity-jp-max) en 800ms, una sola vez al entrar en viewport.
```

---

## 4. Layout grid

### 4.1. Grid principal

12 columnas. Max-width de contenido: 1280px. Padding lateral fluido.

```css
.page-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--space-6);          /* 24px entre columnas */
  max-width: 1280px;
  margin-inline: auto;
  padding-inline: clamp(var(--space-4), 4vw, var(--space-12));
}
```

**Breakpoints recomendados (mobile-first):**
```
sm:  640px   — layout 4 cols
md:  768px   — layout 8 cols
lg:  1024px  — layout 12 cols full
xl:  1280px  — max-width cap
```

### 4.2. Chrome elements — estructura de pagina

```
+--------------------------------------------------------+
| StatusHeader (sticky, 32px alto, z-20)                 |
+--------------------------------------------------------+
|                                                        |
|  [HexGrid background, z-0]                             |
|                                                        |
|  [BootSequence overlay, z-100 — solo en inicio]        |
|                                                        |
|  nav — LangToggle (z-1, sticky o inline en hero)       |
|                                                        |
|  Hero — ESTEBAN DIACZUNN + CODENAME: NAIKI             |
|                                                        |
|  [-- katakana divider --]                              |
|  Seccion: OPERATIVE PROFILE / About                    |
|                                                        |
|  [-- katakana divider --]                              |
|  Seccion: OPERATIONAL TENURE / Experience              |
|                                                        |
|  [-- katakana divider --]                              |
|  Seccion: MISSION LOG / Projects                       |
|                                                        |
|  [-- katakana divider --]                              |
|  Seccion: COMBAT PROFICIENCY / Skills — MagiPanel      |
|                                                        |
|  [-- katakana divider --]                              |
|  Seccion: TRAINING DOSSIER / Education                 |
|                                                        |
|  [-- katakana divider --]                              |
|  Seccion: SECURE CHANNEL / Contact                     |
|                                                        |
+--------------------------------------------------------+
| Footer: build hash · STATUS indicator · ScanLines toggle|
+--------------------------------------------------------+
```

### 4.3. Corner brackets (chrome decorativo)

Los paneles y cards pueden tener corner brackets ASCII/SVG en sus esquinas:

```
+-- CODENAME: SENTINEL ------------------+
|                                        |
|  [contenido]                           |
|                                        |
+----------------------------------------+
```

Implementar con `::before` / `::after` o SVG inline de 2x2 lineas. Color: `--border-strong`. No agregar border-radius; los brackets son la marca de esquina.

---

## 5. Accessibility

### 5.1. Ratios de contraste

Ver tabla completa en `skills/nerv-style/SKILL.md` — seccion Accessibility.

Resumen critico:
- `--alarm-red` (#d62121) sobre `--bg-void` (#0a0a0a) alcanza ~3.3:1. Cumple AA solo para texto grande (>=18px normal o >=14px bold). **No usar para texto de cuerpo chico.**
- `--text-muted` (#6e6e6e) sobre `--bg-void` alcanza ~3.0:1. Mismo limite. Solo para texto decorativo o >=18px.
- Todo el texto funcional importante debe usar `--text-primary` o `--text-secondary`.

### 5.2. Focus ring

```css
:focus-visible {
  outline: 2px solid var(--accent-amber);
  outline-offset: 2px;
  border-radius: 0;
}

/* Para elementos en fondo amber — usar el fondo como contraste */
.on-amber-bg:focus-visible {
  outline-color: var(--bg-void);
}
```

Nunca `outline: none` sin replacement. El ring ambarino es coherente con la estetica.

### 5.3. Keyboard navigation requirements

- Tab order logico: StatusHeader → nav/LangToggle → Hero → secciones en orden de aparicion → Footer.
- BootSequence: ESC o cualquier tecla lo salta. Implementar listener `keydown` con `{ once: true }`.
- ScanLines toggle: `<button aria-pressed="false|true">SCAN LINES</button>`.
- Links de repositorio en MissionCard: `<a href="..." target="_blank" rel="noopener noreferrer">`.
- Kanji decorativo: `aria-hidden="true"` siempre.

### 5.4. Screen readers

- Todos los elementos decorativos (HexGrid, ScanLines, kanji) llevan `aria-hidden="true"`.
- StatusHeader: puede llevar `aria-live="off"` — es ambient, no critico.
- SyncBar: incluir el porcentaje como texto visible (`<span>92%</span>`) y como `aria-valuenow`.
- BootSequence: el overlay lleva `role="status"` con las lineas de boot como contenido del live region, o bien se puede `aria-live="polite"` en el contenedor de lineas.

---

## 6. Iconografia

### Principios

Iconografia minima. No instalar ninguna icon library como dependencia. SVG inline preferido.

### Elementos geometricos propios

```
Hexagono (AT Field):   SVG <polygon> de 6 puntos. Usado en HexGrid y como bullet opcional.
Corner bracket:        Dos lineas en L. SVG 12x12 o CSS puro con border parcial.
Chevron simple:        > o < en JetBrains Mono. Para navegacion y indicadores.
Punto de status:       Circulo SVG 6px. Verde = ACTIVE, rojo = CLASSIFIED, muted = ARCHIVED.
```

### Iconos de contacto / social

Preferir SVG inline minimalista para:
- GitHub: logo simple (96x96 viewBox → inline a 20x20).
- LinkedIn: logo simple.
- Email: sobre esquematico.

No usar ningun sprite externo. Cada SVG va inline en el componente que lo usa. Si pesa mas de 1KB optimizado, revisar.

---

## 7. Empty states y error states

Mantener en tema. Breves. Sin imagenes de stock.

### SIGNAL LOST (404)

```
+---------------------------------+
| NERV SYSTEMS                    |
| ERROR CODE: 404                 |
| SIGNAL LOST                     |
|                                 |
| La ruta solicitada no existe    |
| en la base de datos de NERV.    |
|                                 |
| [VOLVER AL INICIO]              |
+---------------------------------+
```

Tokens: `--alarm-red` para "SIGNAL LOST" y codigo, `--text-primary` para el mensaje, `--bg-panel` fondo. Boton de volver en amber.

### DATA CLASSIFIED (secciones en construccion)

```
+---------------------------------+
| [CLASSIFIED]                    |
| ACCESO DENEGADO                 |
|                                 |
| Este segmento del dossier       |
| esta en proceso de              |
| clasificacion.                  |
+---------------------------------+
```

Tokens: `--alarm-red` para el badge, `--text-secondary` para el mensaje.

### Uso

Estas pantallas van en `src/pages/404.astro` y en placeholders de secciones que aun no tienen contenido. No crear mas estados especiales sin autorizacion del dueno.

---

## 8. Performance budgets

Objetivos definidos en `SPEC.md §1`. Listados aqui como referencia para el DESIGNER al tomar decisiones:

| Metrica | Objetivo |
| --- | --- |
| TTI en 4G simulado | < 1.5 segundos |
| JS total en homepage (gzipped) | < 50 KB |
| CSS total (gzipped) | < 30 KB |
| Errores de consola | 0 |
| Lighthouse Performance | 95+ |
| Lighthouse Accessibility | 95+ |
| WCAG | AA minimo |

### Implicaciones de diseno

- **Fuentes**: cargar solo los pesos necesarios. Oswald 700, Inter 400+500, JetBrains Mono 400+600, Noto Sans JP 900. Subset si es posible (solo Latin + caracteres JP usados). `font-display: swap`.
- **CSS**: Tailwind v4 purge por defecto. `tokens.css` y `animations.css` cargados globalmente (~5-8KB combinados sin comprimir). No duplicar tokens en Tailwind config — usar CSS vars directamente.
- **Animaciones**: CSS animations son gratis en terminos de JS. `motion-one` solo si hace falta algo que CSS no puede. GSAP no.
- **HexGrid**: CSS-only con `repeating-linear-gradient` o SVG inline < 200 bytes. No imagen PNG/SVG externa.
- **BootSequence JS**: el script del boot debe ser < 2KB sin comprimir. Inline si es posible para evitar un round-trip extra.
- **ScanLines**: CSS puro con `::before`. 0 bytes de JS.
- **Three.js**: prohibido. Ver `SPEC.md §3` anti-stack.
