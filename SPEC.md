# MAGI — NERV-Style CV Landing

> Codename propuesto: **MAGI** (override libremente: `nerv-cv`, `naiki-hq`, `tokyo-3`, etc.)
> Owner: Esteban Diaczunn (NAIKI)
> Estado: SPEC inicial — no hay código todavía.
> Documento canónico que el agente debe leer antes de tocar el repo.

---

## 0. Contexto rápido para el agente

Esto es un sitio web personal estático: una landing-CV con estética **NERV / Evangelion**, bilingüe (ES/EN), pensada como *palate cleanser* visual para el dueño y como pieza de marca para recruiters y comunidad dev.

**No es** un SaaS, no tiene backend, no tiene auth, no tiene CMS, no tiene base de datos, no tiene analytics en v1. Es un sitio estático generado por Astro y servido por nginx desde un VPS propio.

Si el agente se descubre proponiendo un microservicio, una BD, un panel admin, o "¿y si lo convertimos en plataforma para otros devs?", **frenar y releer esta sección**.

---

## 1. North Star

Cuando un recruiter o un dev abre el sitio, en los primeros 3 segundos debe pensar:

> "Esto no es un CV genérico. Esta persona tiene gusto y obsesión por el detalle."

Métricas de éxito subjetivas (no hay analytics):

- **El boot sequence se siente legítimo**, no un GIF de stock.
- **El contenido del CV sigue siendo legible y serio** debajo del tema. Un recruiter apurado puede saltearse la atmósfera y leer experiencia/skills/contacto en 30 segundos.
- **Performance impecable**: Lighthouse 95+ en performance, accessibility, best practices, SEO.
- **Funciona sin JS** para el contenido core (boot animation puede ser progressive enhancement).

Métricas objetivas:

- TTI < 1.5s en 4G simulado.
- JS total < 50KB gzipped en homepage.
- CSS total < 30KB gzipped.
- 0 errores de consola.
- WCAG AA mínimo.

---

## 2. Decisiones pendientes (DECISIONS PENDING)

Estas las tiene que confirmar el dueño. **Defaults recomendados** abajo. El agente puede arrancar con los defaults si el dueño no responde, pero debe marcar visiblemente cuáles asumió.

| ID  | Pregunta                                  | Default recomendado                                                       |
| --- | ----------------------------------------- | ------------------------------------------------------------------------- |
| D1  | Identidad principal en el sitio           | **NAIKI** como codename + "Esteban Diaczunn" debajo en menor jerarquía    |
| D2  | Uso de japonés                            | **Solo en headers/labels** (atmósfera sin alienar recruiters no-otaku)    |
| D3  | Audiencia primaria                        | **Ambas**: recruiters + comunidad dev (afecta el copy, no la estructura)  |
| D4  | Paleta                                    | **NERV clásico**: negro absoluto + naranja ámbar + acentos rojos          |
| D5  | Codename del proyecto                     | **MAGI**                                                                  |
| D6  | Dominio final                             | TBD — el dueño decide                                                     |

---

## 3. Stack técnico (CERRADO)

- **Framework**: Astro 5.x
- **Estilos**: Tailwind CSS v4 (con tokens custom — ver §6)
- **Componentes interactivos**: Astro islands con vanilla JS o Solid.js (NO React, no hace falta el peso). El toggle ES/EN y el boot sequence son las únicas islas.
- **Animación**: CSS animations + un toque de `motion-one` o `gsap-mini` si hace falta. **No** framer-motion (peso innecesario sin React).
- **Tipografías**: ver §6.
- **Build output**: 100% estático (`output: 'static'`).
- **Deploy**: VPS propio + nginx sirviendo `dist/` como static files. Script de deploy con `rsync` o `git pull && pnpm build`.
- **Package manager**: pnpm (más rápido, menos espacio en VPS).
- **Node**: 20 LTS para build (no se necesita en runtime).

**Anti-stack** (cosas que el agente NO debe proponer):

- ❌ Next.js / Remix / SvelteKit (overkill para estático)
- ❌ React (no aporta a este proyecto)
- ❌ Headless CMS (Sanity, Contentful, Strapi) — el contenido va en MDX en el repo
- ❌ Base de datos
- ❌ Vercel/Netlify (el dueño tiene VPS y prefiere dueño total del deploy)
- ❌ Webfonts pagos (Matisse EB es licenciado — usar alternativas libres, ver §6)

---

## 4. Estructura propuesta del repo

```
magi/
├── CLAUDE.md                    # entry point para Claude Code (lo genera el agente en step 1)
├── README.md                    # README humano
├── SPEC.md                      # este documento
├── docs/
│   ├── DESIGN_SYSTEM.md         # tokens, escala, animaciones (extraído de Gildo's SKILL.md + custom)
│   ├── CONTENT_TRANSLATION.md   # guía diegética CV → NERV (ver §7)
│   └── DEPLOY.md                # cómo desplegar al VPS
├── skills/
│   └── nerv-style/
│       └── SKILL.md             # estilo visual reutilizable (mismo formato que /mnt/skills/public/*)
├── public/
│   ├── fonts/                   # WOFF2 self-hosted (no Google Fonts CDN — privacy + performance)
│   └── favicon/                 # favicon NERV-style (logo de hoja de fig propio o variante)
├── src/
│   ├── content/
│   │   ├── config.ts            # schemas Zod para validar collections
│   │   ├── identity/
│   │   │   └── main.yaml        # datos personales: nombre, codename, contacto, links
│   │   ├── experience/
│   │   │   ├── qtech-axonico.mdx
│   │   │   ├── basisty-extendeal.mdx
│   │   │   └── ...              # un .mdx por puesto
│   │   ├── projects/
│   │   │   ├── sentinel.mdx
│   │   │   ├── naiki.mdx
│   │   │   ├── supra.mdx
│   │   │   ├── clara.mdx
│   │   │   └── ...              # un .mdx por proyecto
│   │   ├── skills/
│   │   │   └── main.yaml        # skills agrupados por categoría con sync rate
│   │   ├── education/
│   │   │   └── main.yaml        # licenciatura, ISTEA, instituto inglés
│   │   └── i18n/
│   │       ├── ui-es.json       # strings de UI (botones, labels, status)
│   │       └── ui-en.json
│   │
│   # NOTA para el agente: NO usar un cv.json monolítico.
│   # Una entidad = un archivo. El frontmatter YAML guarda datos estructurados
│   # (fechas, stack, status), el body MDX guarda prosa larga bilingüe.
│   # Astro valida el schema con Zod en config.ts — si falta un campo, build falla.
│   ├── components/
│   │   ├── BootSequence.astro   # la animación inicial
│   │   ├── MagiPanel.astro      # los tres paneles tipo MAGI
│   │   ├── SyncBar.astro        # barra de "synchronization rate" para skills
│   │   ├── MissionCard.astro    # card para projects
│   │   ├── LangToggle.astro     # toggle ES/EN (isla con JS)
│   │   ├── HexGrid.astro        # decorativo, AT field hexagonal
│   │   └── ScanLines.astro      # overlay CRT opcional
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro          # ES por default
│   │   └── en/
│   │       └── index.astro      # EN
│   ├── styles/
│   │   ├── globals.css
│   │   ├── tokens.css           # CSS variables (colors, spacing, typography)
│   │   └── animations.css       # @keyframes para boot, glitch, scan
│   └── lib/
│       ├── i18n.ts              # helper para traducciones
│       └── content.ts           # helpers para leer collections
├── scripts/
│   └── deploy.sh                # rsync al VPS
├── astro.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── pnpm-lock.yaml
└── .gitignore
```

**Notas para el agente:**

1. No crear archivos vacíos solo para que existan. Crear el archivo cuando hace falta el contenido.
2. La carpeta `skills/` espeja la convención de Anthropic (`/mnt/skills/public/<skill-name>/SKILL.md`). El dueño usa este patrón en NAIKI framework — respetarlo.
3. `CLAUDE.md` es la primera cosa que un agente nuevo debe leer al clonar el repo. Tiene que ser corto y apuntar a `SPEC.md` y `docs/`.

---

## 5. Arquitectura de agentes

El dueño corre múltiples sesiones de Claude Code en paralelo y tiene un framework propio de revisión (NAIKI). Esto **no necesita** sub-agentes elaborados — es un sitio estático chico. Pero sí se beneficia de **separación de roles** para que cada sesión tenga foco.

### Modelo recomendado: 1 agente principal + 4 sombreros

Una sesión principal de Claude Code ejecuta todo, pero **cambia de "sombrero" según la tarea**. Cada sombrero está documentado en su propio archivo de docs:

| Sombrero       | Cuándo se pone                                   | Archivo de referencia          |
| -------------- | ------------------------------------------------ | ------------------------------ |
| **DESIGNER**   | Tokens CSS, animaciones, paleta, tipografía      | `docs/DESIGN_SYSTEM.md`        |
| **SCRIBE**     | Copy ES/EN, traducción diegética CV→NERV         | `docs/CONTENT_TRANSLATION.md`  |
| **BUILDER**    | Componentes Astro, layouts, build config         | `SPEC.md` §4 + Astro docs      |
| **DEPLOYER**   | Scripts de deploy, nginx config, performance     | `docs/DEPLOY.md`               |

### Sub-agentes opcionales (solo si el dueño los quiere)

Si en algún momento se quiere paralelizar, estos son los splits naturales:

1. **`design-agent`**: trabaja sobre `src/styles/`, `src/components/Hex*`, `BootSequence`, animaciones. Lee `docs/DESIGN_SYSTEM.md` y `skills/nerv-style/SKILL.md` antes de cualquier cambio visual.
2. **`content-agent`**: trabaja sobre `src/content/` y `src/content/i18n/`. Nunca toca código de presentación. Lee `docs/CONTENT_TRANSLATION.md`.
3. **`build-agent`**: trabaja sobre `astro.config.mjs`, `tailwind.config.ts`, optimizaciones, build pipeline. No toca contenido ni estilos visuales.

**Regla de oro entre agentes**: si dos cambios son independientes, pueden hacerse en paralelo. Si tocan el mismo archivo o área, secuenciales. El dueño coordina.

### Hooks NAIKI / Sentinel

El dueño tiene Sentinel (PostToolUse hook con auditor LLM externo) y NAIKI (estándar de revisión de código). Sugerencia para este proyecto:

- Habilitar NAIKI sobre `src/components/*.astro` y `src/lib/*.ts`.
- **No** habilitar Sentinel para esto — overkill para un proyecto chico, agrega latencia. Sentinel se justifica en proyectos donde el costo de un error es alto (Clara, HIS). Acá no.

---

## 6. Sistema de diseño (resumen — el detalle va en `docs/DESIGN_SYSTEM.md`)

### 6.1. Paleta (default: NERV clásico — D4)

```css
/* tokens.css */
:root {
  /* base */
  --bg-void: #0a0a0a;          /* negro casi absoluto, no #000 puro */
  --bg-panel: #141414;         /* paneles ligeramente más claros */
  --bg-elevated: #1c1c1c;
  --border-subtle: #2a2a2a;
  --border-strong: #3d3d3d;

  /* identidad NERV */
  --accent-amber: #ff6600;     /* el naranja icónico */
  --accent-amber-soft: #cc5200;
  --accent-amber-glow: #ff661a;
  --alarm-red: #d62121;        /* rojo de alerta, USAR CON CAUSTELA */
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

**Anti-paleta**: nada de gradientes pastel, nada de purple/pink (excepto si el dueño elige Eva Unit-01 en D4), nada de "modo claro" (NERV no tiene modo claro, es siempre la sala de control).

### 6.2. Tipografía

Matisse EB es licenciada y japonesa — no se puede usar en web. Alternativas libres que dan el mismo *feel*:

- **Headers / display**: `Oswald` (condensed sans), `Bebas Neue`, o `BIZ UDPMincho` para algo más serif. Recomiendo **Oswald 700** para títulos en mayúsculas.
- **Body**: `Inter` o `Geist` (modernos, legibles).
- **Mono / terminal**: **`JetBrains Mono`** o **`Geist Mono`**. Indispensable para readouts, status, código.
- **Decoración japonesa** (si D2 = sí): **`Noto Sans JP`** weight 900, usado solo en headers como elemento gráfico.

**Self-host todas** en `public/fonts/` con `font-display: swap`. No usar Google Fonts CDN (privacy + 1 round-trip menos).

### 6.3. Tokens de movimiento

- Boot sequence: ~3-5 segundos máximo, **skippable** con click o tecla.
- Hover transitions: 150ms ease-out.
- Glitch effects: usar **muy** moderadamente, máximo en 1-2 elementos. Glitch everywhere = ruido.
- `prefers-reduced-motion`: respetarlo siempre. Boot sequence se reduce a fade-in instantáneo.

### 6.4. Componentes visuales clave

- **MAGI Panel**: tres columnas con borders, header con label en amber + ID alfanumérico (ej: "MAGI-01 / MELCHIOR"), contenido adentro. Usado para Skills/SyncRates, Experience, Mission Log.
- **Sync Bar**: barra horizontal con porcentaje, label, y un glow ambarino en el fill. Para skills.
- **Hex Grid**: patrón hexagonal sutil de fondo (AT Field). CSS-only con `repeating-linear-gradient` o SVG inline.
- **Scan Lines**: overlay CRT opcional, con toggle. Off por default (puede marear). Slider en footer para activarlo.
- **Status Header**: barra superior fija con timestamp en vivo, "STATUS: ONLINE", coordenadas falsas. Ambient atmosphere.

---

## 7. Modelo de contenido — Traducción diegética (CV → NERV)

Esto es lo que distingue un "CV con tema oscuro" de algo que se siente como sacado de Tokyo-3. El detalle completo va en `docs/CONTENT_TRANSLATION.md`. Acá los principios:

### 7.1. Patrones de traducción

| CV tradicional                 | NERV equivalent                                              |
| ------------------------------ | ------------------------------------------------------------ |
| Name                           | OPERATIVE / CODENAME                                         |
| Job title                      | OPERATIONAL ROLE / CLEARANCE                                 |
| Company                        | DIVISION / FACILITY                                          |
| Years of experience            | OPERATIONAL TENURE / FIELD HOURS                             |
| Skills                         | SYNCHRONIZATION RATES / COMBAT PROFICIENCY                   |
| Projects                       | MISSION LOG / OPERATION RECORDS                              |
| Education                      | TRAINING DOSSIER                                             |
| Contact                        | SECURE CHANNEL / DIRECT LINE                                 |
| GitHub                         | CODE REPOSITORY (CLASSIFIED ACCESS)                          |
| LinkedIn                       | OFFICIAL DOSSIER                                             |
| Languages spoken               | LINGUISTIC CAPABILITY                                        |

### 7.2. Tono

- **Inglés**: clipped, militar, all-caps en labels, frases cortas. Ej: "ASSIGNED: HEALTHCARE INFORMATION DIVISION. STATUS: ACTIVE. CLEARANCE: TIER 3."
- **Español**: mismo registro pero respetando el español rioplatense del dueño. "ASIGNADO A DIVISIÓN DE INFORMACIÓN MÉDICA. ESTADO: ACTIVO. AUTORIZACIÓN: NIVEL 3."
- **Atrás del estilo, info real**: el contenido tiene que ser preciso. Un recruiter tiene que poder leer "QTECH/Axonico — Healthcare Information System" debajo del label diegético.

### 7.3. Modelo de datos: Content Collections de Astro

**Decisión arquitectónica clave**: el contenido del CV NO va en un `cv.json` monolítico. Va en **Astro Content Collections**, una entidad por archivo, con frontmatter YAML para datos estructurados y body MDX para prosa bilingüe larga.

**Por qué**:
- Validación con Zod en `src/content/config.ts` — si falta un campo, el build falla.
- Type safety y autocompletado en componentes Astro.
- Diff de git limpio cuando se agrega/edita una entidad.
- MDX permite prosa larga legible (JSON con `\n` es horrible).
- Astro genera rutas dinámicas automáticamente si en algún momento querés `/projects/[slug]`.

**Workflow de extracción del CV**:

1. El dueño dropea su CV actual en `docs/source-cv.pdf` (o `.docx`).
2. El agente (en Fase 2) lee el CV con la skill apropiada y genera los archivos.
3. Para cada puesto en el CV → un `.mdx` en `src/content/experience/`.
4. Para cada proyecto en la sección "Projects" del CV → un `.mdx` en `src/content/projects/`.
5. Datos personales → `src/content/identity/main.yaml`.
6. Skills → `src/content/skills/main.yaml` con sync rates estimados (el dueño revisa).
7. Educación (licenciatura, ISTEA, inglés) → `src/content/education/main.yaml`.
8. **El agente abre PR con todo y el dueño revisa antes de mergear.** Es su CV, él valida.

**Plantilla — proyecto** (`src/content/projects/sentinel.mdx`):

```yaml
---
codename: "SENTINEL"
realName: "Sentinel"
status: "ACTIVE"              # ACTIVE | ARCHIVED | CLASSIFIED
division: "AGENTIC OPERATIONS"
clearance: 3                  # 1-5, afecta el styling del badge
deployment: "2025-Q3"         # cuándo arrancó
stack: ["Claude Code", "Python", "Hooks API"]
repo: "https://github.com/EstebanDiaczunn/sentinel"
demo: null                    # URL opcional de demo
featured: true                # aparece destacado en home
order: 1                      # orden manual en la lista
synopsis:
  es: "Sistema agentico de monitoreo con hooks PostToolUse y circuit breaker."
  en: "Agentic monitoring system with PostToolUse hooks and circuit breaker."
---

## Brief (EN)
Sentinel is an external auditor for Claude Code sessions...

## Brief (ES)
Sentinel es un auditor externo para sesiones de Claude Code...
```

**Plantilla — experiencia** (`src/content/experience/qtech-axonico.mdx`):

```yaml
---
codename: "HEALTHCARE INFORMATION DIVISION"
realCompany: "QTECH / Axonico"
role:
  es: "Backend Developer"
  en: "Backend Developer"
clearance: 3
location: "Buenos Aires, AR"
startDate: "2023-XX"          # ajustar según CV real
endDate: null                 # null = presente
current: true
stack: ["PHP", "Laravel", "NestJS", "TypeScript", "SQL Server"]
order: 1
---

## Operational Summary (EN)
Lead technical integration projects involving electronic prescriptions...

## Resumen Operativo (ES)
Liderazgo de proyectos de integración técnica que involucran recetas electrónicas...
```

**Plantilla — identity** (`src/content/identity/main.yaml`):

```yaml
codename: "NAIKI"
realName: "Esteban Diaczunn"
title:
  es: "Desarrollador Backend / Aspirante a Arquitecto de Software"
  en: "Backend Developer / Software Architect-in-training"
status: "ACTIVE"
clearance: 3
location: "Berazategui, Buenos Aires, AR"
languages:
  - { code: "es", level: "NATIVE" }
  - { code: "en", level: "PROFESSIONAL" }
channels:
  email: "..."                # el dueño lo completa
  github: "https://github.com/EstebanDiaczunn"
  linkedin: "..."
  website: "..."              # este sitio mismo
```

**Plantilla — skills** (`src/content/skills/main.yaml`):

```yaml
categories:
  - id: "backend"
    label:
      es: "ARMAMENTO PRINCIPAL"
      en: "PRIMARY ARMAMENT"
    items:
      - { name: "PHP / Laravel", syncRate: 92, years: 3 }
      - { name: "TypeScript / NestJS", syncRate: 85, years: 2 }
      - { name: "SQL Server", syncRate: 80, years: 3 }
  - id: "tooling"
    label:
      es: "EQUIPAMIENTO TÁCTICO"
      en: "TACTICAL EQUIPMENT"
    items:
      - { name: "Claude Code / Agentic", syncRate: 90, years: 1 }
      - { name: "Go", syncRate: 55, years: 1 }
```

**Schemas Zod** (en `src/content/config.ts` — el agente los genera en Fase 2):

```typescript
import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  type: "content",
  schema: z.object({
    codename: z.string(),
    realName: z.string(),
    status: z.enum(["ACTIVE", "ARCHIVED", "CLASSIFIED"]),
    division: z.string(),
    clearance: z.number().min(1).max(5),
    deployment: z.string(),
    stack: z.array(z.string()),
    repo: z.string().url().nullable(),
    demo: z.string().url().nullable(),
    featured: z.boolean().default(false),
    order: z.number(),
    synopsis: z.object({ es: z.string(), en: z.string() }),
  }),
});

// análogos para experience, skills, education, identity
export const collections = { projects /* , experience, skills, ... */ };
```

---

## 8. Roadmap por fases

Cada fase es un PR / commit cohesivo. **No mezclar fases en un solo commit**.

### Fase 0 — Setup (1 sesión corta)

- [ ] `pnpm create astro` con template mínimo
- [ ] Tailwind v4 instalado y configurado
- [ ] `tokens.css` con la paleta de §6.1
- [ ] Fuentes self-hosted en `public/fonts/`
- [ ] Layout base con `<Body>` en `bg-void`, texto `text-primary`
- [ ] CLAUDE.md generado apuntando a SPEC.md
- [ ] Deploy script básico al VPS
- [ ] **Hello world** rendereado en producción

### Fase 1 — Boot sequence + landing minimal (1 fin de semana)

- [ ] `BootSequence.astro` con animación de 3-5s
- [ ] Skippable con click o ESC
- [ ] Respeta `prefers-reduced-motion`
- [ ] Header MAGI con timestamp vivo
- [ ] Identidad principal renderizada (D1)
- [ ] Footer minimal

### Fase 2 — Contenido (1 fin de semana)

- [ ] Content collections configuradas
- [ ] 3 proyectos seed: Sentinel, NAIKI, Supra (o Clara si ya está pública)
- [ ] Sección de experience con QTECH/Axonico, Basisty/Extendeal
- [ ] Skills con SyncBars
- [ ] Sección de contacto con secure channel labels

### Fase 3 — Bilingüe (medio fin de semana)

- [ ] `i18n.ts` helper
- [ ] `/` y `/en/` rutas
- [ ] LangToggle component
- [ ] Strings movidos a `i18n/es.json` y `i18n/en.json`
- [ ] Frontmatter de proyectos tiene `_es` y `_en`

### Fase 4 — Polish (1 fin de semana)

- [ ] Hex grid background sutil
- [ ] Scan lines toggle
- [ ] Microinteractions (hover en cards, focus states accesibles)
- [ ] Optimizaciones de performance (audit con Lighthouse)
- [ ] Open Graph + favicon NERV-style
- [ ] Validación de WCAG AA

### Fase 5 — Deploy producción

- [ ] Dominio apuntado al VPS
- [ ] HTTPS con certbot
- [ ] nginx config con caching de assets
- [ ] Deploy automatizado (cron de `git pull && pnpm build` o GH Actions con ssh)

**Total estimado**: 4-5 fines de semana si el dueño está enfocado. Si se pasa de 6, **hay scope creep**.

---

## 9. Anti-patterns y trampas conocidas

El dueño tiene un patrón documentado de **parálisis por análisis** y **scope creep** (ver memoria: keyword "opus-saas"). Para este proyecto específicamente, vigilar:

- ❌ "¿Y si lo convierto en un template para vender?" → NO. Es personal.
- ❌ "¿Y si agrego un blog?" → No en v1. Eventualmente.
- ❌ "¿Y si agrego un terminal interactivo con comandos?" → Rechazado explícitamente en discusión previa con el dueño. El scope cerrado es boot + CV estilizado, no terminal real.
- ❌ "¿Y si lo conecto con la API de GitHub para mostrar commits en vivo?" → No en v1. Side quest infinita.
- ❌ "¿Y si agrego un chat con un LLM con mi personalidad?" → Otra side quest. Anota la idea, seguí.
- ❌ "Lo migro a Next.js para tener server components" → Razón inválida. El sitio es estático.

Cuando el dueño proponga una de estas, el agente debe:

1. Reconocer que es interesante.
2. Apuntarlo en `docs/IDEAS_PARKING_LOT.md`.
3. Volver a la fase actual.

---

## 10. Referencias de investigación

> El dueño compiló esta lista. El agente debe leerlas **cuando corresponda en cada fase**, no todas al principio.

### Bibliotecas / sistemas de diseño

| Recurso | URL | Cuándo leer |
| --- | --- | --- |
| **nerv-ui** (TheGreatGildo) — el más completo, con SKILL.md | https://github.com/TheGreatGildo/nerv-ui | **Fase 0**, antes de tokens. **Recomendado fork del SKILL.md como base de `skills/nerv-style/SKILL.md`** |
| NERV-UI (mdrbx) — repo | https://github.com/mdrbx/nerv-ui | Fase 1 — referencia de componentes |
| NERV-UI (mdrbx) — demo viva | https://mdrbx.github.io/nerv-ui/ | Fase 1 — ver `/examples/surveillance/` y `/examples/command-center/` |
| Show HN del autor de mdrbx | https://news.ycombinator.com/item?id=47424558 | Contexto y discusión, opcional |

### Estudios visuales fan-made

| Recurso | URL | Cuándo leer |
| --- | --- | --- |
| Pedro Fleming — Eva Screen Graphics (FUI/HUD) | https://www.pedrofleming.com/neongenesisevangelion | **Fase 1** — referencia obligada antes de animaciones |
| Solarsicom (SkyKrye) — thread EvaGeeks | https://forum.evageeks.org/viewtopic.php?t=21662 | Fase 4 — polish |

### Tipografía

| Recurso | URL | Cuándo leer |
| --- | --- | --- |
| Fonts In Use — Evangelion / análisis de Matisse EB | https://fontsinuse.com/uses/28760/neon-genesis-evangelion | **Fase 0** — antes de elegir alternativas libres |
| Sitio oficial Evangelion (referencia tipográfica) | https://www.evangelion.co.jp/final_bd_dvd.html | Fase 1 — referencia visual |

### Pozos de inspiración (browse, no copiar)

| Recurso | URL |
| --- | --- |
| GitHub topic `evangelion` | https://github.com/topics/evangelion |
| Behance "evangelion ui" | https://www.behance.net/search/projects/evangelion%20ui |
| Dribbble "nerv" | https://dribbble.com/tags/nerv |

### Caveat del dueño (importante)

> El dueño no fetcheó personalmente Solarsicom ni el portfolio de Pedro Fleming más allá del snippet del buscador. El agente debe **confirmar que los links funcionen y el contenido sea relevante** antes de citarlos o derivar decisiones de ahí. Gildo's repo sí está leído end-to-end — es la referencia más confiable para arrancar.

---

## 11. Lo primero que el agente debe hacer al recibir este spec

**Inputs que el dueño deja en el repo antes de invocar al agente:**

- `SPEC.md` (este documento)
- `docs/source-cv.pdf` (o `.docx`) — el CV actual del dueño, fuente de verdad para extracción
- (opcional) avatar / foto / logo si lo tiene listo, en `docs/assets/`

**Pasos del agente:**

1. Leer `SPEC.md` completo.
2. Leer `docs/source-cv.pdf` y armar un mapa mental del contenido a traducir.
3. Crear el repo (o cd a la carpeta si ya existe).
4. Generar `CLAUDE.md` corto que apunte a `SPEC.md`.
5. Hacer fork mental del `SKILL.md` de Gildo (https://github.com/TheGreatGildo/nerv-ui) y usarlo como punto de partida para `skills/nerv-style/SKILL.md`. Adaptarlo a las decisiones de §6.
6. Generar `docs/DESIGN_SYSTEM.md` con detalle de tokens, escala tipográfica, escala de espaciado, animaciones.
7. Generar `docs/CONTENT_TRANSLATION.md` con la tabla completa expandida de §7.1 y plantillas MDX/YAML de §7.3.
8. **Pedirle al dueño confirmación de DECISIONS PENDING (D1-D6)** explicando qué implica cada una. No asumir silenciosamente — preguntar y explicar el tradeoff. Si el dueño no responde en una sesión, registrar los defaults asumidos visiblemente en el commit.
9. Recién entonces, ejecutar Fase 0.

---

## 12. Glosario rápido

- **NERV**: la organización paramilitar en Evangelion. Logo de hoja de fig.
- **MAGI**: el supercomputador trino (Melchior, Balthasar, Casper).
- **AT Field**: barrera hexagonal característica.
- **EVA Unit**: los robots gigantes (00, 01, 02).
- **Tokyo-3**: la ciudad fortaleza donde transcurre la serie.
- **Sync Rate**: porcentaje de sincronización piloto-EVA. Lo usamos para skills.
- **Terminal Dogma**: la zona más profunda y clasificada. Buen nombre para una sección "easter egg" si surge.

---

**Fin del SPEC inicial.**

Cualquier cambio estructural a este documento se discute con el dueño antes. Refinamientos de detalle (typos, mejoras de redacción) son libres.
