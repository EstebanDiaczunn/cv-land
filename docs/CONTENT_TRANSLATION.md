# CONTENT_TRANSLATION.md — Guia del sombrero SCRIBE

> Documento de referencia para el sombrero **SCRIBE**. Lee esto cuando vayas a trabajar sobre `src/content/`, `src/content/i18n/`, o cualquier texto que aparece en la UI.

---

## 1. Regla de scope de contenido (leer primero)

**El chrome de la UI** (headers de seccion, badges de status, navegacion, footer, tooltips, labels de componentes) usa **veneer NERV**: terminologia militarizada, all-caps, clipped.

**El contenido bajo cada header** es el **texto literal del CV del dueno**. El agente SCRIBE NO reescribe, NO parafrasea, NO militariza la prosa del CV.

Cuando el dueno dropee su CV en `docs/source-cv.pdf`:
1. El agente extrae el texto verbatim.
2. Coloca ese texto en el body de los archivos MDX.
3. Los datos estructurados (fechas, empresa, stack, status) van en el frontmatter YAML.
4. El dueno revisa el PR y valida que su CV este representado con exactitud antes de mergear.

**Resumen en una linea**: el chrome habla NERV, el contenido habla Esteban Diaczunn.

Esta decision sobreescribe los ejemplos de SPEC §7.3 que mostraban headers como "## Operational Summary (EN)" y "## Resumen Operativo (ES)" en el body MDX. Esos headers de seccion forzados estan **eliminados** del body. El body es prosa libre tal como aparece en el CV.

---

## 2. Tabla de labels de chrome

Cada fila: label en espanol (ES) | label en ingles (EN) | donde aparece en la UI.

### 2.1. Headers de seccion

| CV tradicional | Chrome ES | Chrome EN | Donde aparece |
| --- | --- | --- | --- |
| Nombre / Identidad | PERFIL OPERATIVO | OPERATIVE PROFILE | Hero y seccion About |
| Experiencia laboral | HISTORIAL OPERACIONAL | OPERATIONAL TENURE | Seccion de experiencia |
| Proyectos | REGISTRO DE MISIONES | MISSION LOG | Seccion de proyectos |
| Skills / Habilidades | TASAS DE SINCRONIZACION | SYNCHRONIZATION RATES | Seccion de skills con SyncBars |
| Skills (alternativo) | ARMAMENTO / EQUIPAMIENTO | COMBAT PROFICIENCY | Encabezado de categoria en MagiPanel |
| Educacion | DOSSIER DE ENTRENAMIENTO | TRAINING DOSSIER | Seccion de educacion |
| Contacto | CANAL SEGURO | SECURE CHANNEL | Seccion de contacto |
| Contacto (alternativo) | LINEA DIRECTA | DIRECT LINE | Links de contacto |
| Idiomas hablados | CAPACIDAD LINGUISTICA | LINGUISTIC CAPABILITY | Subseccion de idiomas |
| GitHub | REPOSITORIO DE CODIGO | CODE REPOSITORY | Link / badge |
| LinkedIn | DOSSIER OFICIAL | OFFICIAL DOSSIER | Link / badge |

### 2.2. Badges de status

| Badge | ES | EN | Cuando usar |
| --- | --- | --- | --- |
| Proyecto activo | ACTIVO | ACTIVE | Proyecto en desarrollo actual o reciente |
| Proyecto archivado | ARCHIVADO | ARCHIVED | Proyecto finalizado, historico |
| Proyecto clasificado | CLASIFICADO | CLASSIFIED | Proyecto bajo NDA o privado |
| Proyecto deployado | DESPLEGADO | DEPLOYED | Proyecto en produccion |

Implementacion: el valor del frontmatter (`status: "ACTIVE"`) mapea al label localizado via `i18n/ui-es.json` y `i18n/ui-en.json`.

### 2.3. Clearance levels (niveles de autorizacion)

El campo `clearance` (1-5) en el frontmatter afecta el styling del badge y comunica jerarquia visual. Propuesta de mapeo (el dueno puede ajustar):

| Clearance | Significado sugerido | Color del badge |
| --- | --- | --- |
| 5 | Proyecto principal / actual / destacado | Amber prominente |
| 4 | Proyecto relevante reciente | Amber normal |
| 3 | Proyecto solido, historico reciente | Text-secondary |
| 2 | Proyecto antiguo o experimental | Muted |
| 1 | Archivado / obsoleto | Alarm-red o muted segun status |

El badge muestra: "CLEARANCE: [N]" o "NIVEL: [N]" segun idioma activo.

### 2.4. Labels de navegacion

| Elemento | ES | EN |
| --- | --- | --- |
| Link a seccion experiencia | HISTORIAL | TENURE |
| Link a seccion proyectos | MISIONES | MISSIONS |
| Link a seccion skills | SINCRONIZACION | SYNC |
| Link a seccion educacion | ENTRENAMIENTO | TRAINING |
| Link a seccion contacto | CANAL SEGURO | CHANNEL |
| Toggle de idioma | ES / EN | ES / EN |

### 2.5. Labels de footer

| Elemento | ES | EN |
| --- | --- | --- |
| Indicador de estado del sitio | ESTADO: EN LINEA | STATUS: ONLINE |
| Hash de build (mostrar 7 chars del commit hash) | BUILD: [hash] | BUILD: [hash] |
| Toggle de scan lines | LINEAS DE SCAN | SCAN LINES |
| Atribucion de tecnologia | Construido con Astro | Built with Astro |
| Copyright / credito | NAIKI — [anio] | NAIKI — [year] |

### 2.6. Textos del boot sequence

Lineas de boot (en ingles — el boot es monolingue EN por autenticidad del genero):

```
NERV SYSTEMS BOOT SEQUENCE v2.x
> Initializing neural interface...
> Loading operative profile... [OK]
> Authenticating clearance token... [OK]
> Synchronization check... 92%
> Establishing secure channel... [OK]
> System nominal. Welcome, OPERATIVE.
[ PRESS ANY KEY TO SKIP ]
```

El porcentaje "92%" es estatico / decorativo — no se calcula en tiempo real. El dueno puede ajustar el numero.

### 2.7. Etiquetas de identidad en hero

| Campo | Valor | Jerarquia |
| --- | --- | --- |
| Nombre real (D1) | ESTEBAN DIACZUNN | Principal — Oswald 700, grande |
| Codename (D1) | CODENAME: NAIKI | Secundario — amber, menor tamano |
| Status | STATUS: ACTIVE | Badge amber debajo del nombre |
| Rol | Desarrollador Backend / Software Architect | Texto secundario, Inter, prosa real del CV |

---

## 3. Tono del chrome (solo del chrome)

### Reglas generales

- All-caps en labels, headers, badges. Nunca mixed case en chrome.
- Frases cortas o sustantivos solos. Sin oraciones largas en el chrome.
- Registro militar, clipped, tecnico. Sin marketing copy, sin adjetivos de autoproclamacion.
- No usar signos de exclamacion, emojis, o lenguaje entusiasta en el chrome.

### Espanol (registro rioplatense, formal-clipped)

El chrome en ES usa vos/ustedes pero en modo imperativo tecnico, nunca coloquial. Ejemplos correctos:

```
ESTADO: ACTIVO          (no "En Activo" ni "Activo")
CANAL SEGURO            (no "Contactame" ni "Escribime")
DOSSIER DE ENTRENAMIENTO (no "Mi Educacion")
HISTORIAL OPERACIONAL   (no "Mi Experiencia")
```

### Ingles

Identico en registro. Clipped, military, technical. Ejemplos:

```
STATUS: ACTIVE          (no "Currently Active")
SECURE CHANNEL          (no "Contact Me")
TRAINING DOSSIER        (no "My Education")
OPERATIONAL TENURE      (no "Work Experience")
```

---

## 4. Plantilla MDX — Experiencia laboral

Archivo: `src/content/experience/[empresa-slug].mdx`

```mdx
---
codename: "HEALTHCARE INFORMATION DIVISION"   # Label NERV del trabajo — chrome
realCompany: "QTECH / Axonico"                # Nombre real de la empresa — siempre presente
role:
  es: "Backend Developer"                     # Titulo real del CV — verbatim
  en: "Backend Developer"
clearance: 3                                  # 1-5, ver tabla de clearance
location: "Buenos Aires, AR"
startDate: "2023-01"                          # ISO: YYYY-MM o YYYY-QN
endDate: null                                 # null = presente / current
current: true
division: "HEALTHCARE INFORMATION SYSTEMS"    # Label NERV de la division — opcional
stack: ["PHP", "Laravel", "NestJS", "TypeScript", "SQL Server"]
order: 1                                      # Orden de aparicion (1 = mas reciente)
---

<!-- INSTRUCCION PARA EL SCRIBE: el body de este archivo es texto verbatim del CV del dueno.
     NO reescribir. NO militarizar. NO agregar headers como "## Operational Summary".
     Copiar la prosa exactamente como aparece en el CV, formateada en markdown natural.
     El dueno valida el contenido antes de mergear el PR. -->

← VERBATIM DESDE EL CV — el agente SCRIBE coloca aqui la descripcion exacta del puesto
tal como aparece en el documento fuente. Sin reescritura.

Ejemplo de formato natural (el agente ajusta segun lo que diga el CV real):

Liderazgo de proyectos de integracion tecnica para sistemas de prescripcion electronica.
Desarrollo de APIs REST con Laravel y NestJS para integracion con proveedores externos.
Colaboracion con equipos de salud para relevamiento de requerimientos funcionales.
```

**Que va en frontmatter vs body:**

| Dato | Donde va | Razon |
| --- | --- | --- |
| Empresa, fechas, stack, clearance, current | Frontmatter | Datos estructurados, validados por Zod, usados en componentes |
| Prosa de descripcion del puesto | Body MDX | Texto libre, verbatim del CV, no necesita schema |
| Label NERV (codename, division) | Frontmatter | Dato de chrome, localizado via i18n |

---

## 5. Plantilla MDX — Proyectos

Archivo: `src/content/projects/[proyecto-slug].mdx`

```mdx
---
codename: "SENTINEL"                          # Nombre NERV del proyecto — chrome
realName: "Sentinel"                          # Nombre real del proyecto
status: "ACTIVE"                              # ACTIVE | ARCHIVED | CLASSIFIED | DEPLOYED
division: "AGENTIC OPERATIONS"                # Label NERV opcional
clearance: 3                                  # 1-5
deployment: "2025-Q3"                         # Cuándo arranco — YYYY-MM o YYYY-QN
stack: ["Claude Code", "Python", "Hooks API"]
repo: "https://github.com/EstebanDiaczunn/sentinel"  # null si no aplica
demo: null                                    # URL de demo opcional
featured: true                                # true = destacado en homepage
order: 1                                      # Orden manual
synopsis:
  es: "Sistema agéntico de monitoreo con hooks PostToolUse y circuit breaker."
  en: "Agentic monitoring system with PostToolUse hooks and circuit breaker."
  # El synopsis ES/EN es la UNICA parte del contenido que puede estar ligeramente
  # estilizada, porque se muestra en las cards como descripcion corta (max 2 oraciones).
  # El dueno lo aprueba igual.
---

<!-- INSTRUCCION PARA EL SCRIBE: igual que en experiencia — body verbatim del CV/repo.
     NO reescribir. NO forzar headers bilingues. El body es la descripcion extendida
     del proyecto tal como aparece en el CV o en el README del repo. -->

← VERBATIM DESDE EL CV O EL README DEL REPO — descripcion del proyecto sin reescritura.

El agente puede formatear en markdown natural (listas, parrafos) pero no cambia el contenido.
```

**Nota sobre `synopsis`**: es la unica excepcion a la regla verbatim. El synopsis es el texto de la card (max 2 oraciones por idioma) y puede estar lightly condensado si el CV tiene una descripcion muy larga. El dueno lo aprueba. El body MDX siempre es verbatim.

---

## 6. Plantilla YAML — Identity, Skills, Education

### Identity (`src/content/identity/main.yaml`)

```yaml
codename: "NAIKI"
realName: "Esteban Diaczunn"
title:
  es: "Desarrollador Backend / Aspirante a Arquitecto de Software"
  en: "Backend Developer / Software Architect-in-training"
  # verbatim del CV — el dueno confirma
status: "ACTIVE"
clearance: 3
location: "Berazategui, Buenos Aires, AR"
languages:
  - { code: "es", level: "NATIVE", label: { es: "Nativo", en: "Native" } }
  - { code: "en", level: "PROFESSIONAL", label: { es: "Profesional", en: "Professional" } }
channels:
  email: "TODO"           # el dueno completa
  github: "https://github.com/EstebanDiaczunn"
  linkedin: "TODO"        # el dueno completa
  website: "TODO_DOMAIN"  # D6 — placeholder hasta que el dueno compre dominio
```

### Skills (`src/content/skills/main.yaml`)

```yaml
# Los sync rates son estimaciones del agente basadas en el CV.
# El dueno DEBE revisar y ajustar antes de mergear.
categories:
  - id: "backend"
    label:
      es: "ARMAMENTO PRINCIPAL"
      en: "PRIMARY ARMAMENT"
    items:
      - { name: "PHP / Laravel", syncRate: 92, years: 3 }     # ajustar segun CV
      - { name: "TypeScript / NestJS", syncRate: 85, years: 2 }
      - { name: "SQL Server", syncRate: 80, years: 3 }
  - id: "tooling"
    label:
      es: "EQUIPAMIENTO TACTICO"
      en: "TACTICAL EQUIPMENT"
    items:
      - { name: "Claude Code / Agentic", syncRate: 90, years: 1 }
      - { name: "Go", syncRate: 55, years: 1 }
  # agregar categorias segun el CV real
```

### Education (`src/content/education/main.yaml`)

```yaml
entries:
  - institution: "TODO"          # nombre verbatim del CV
    degree:
      es: "TODO"                 # titulo verbatim del CV
      en: "TODO"
    field:
      es: "TODO"
      en: "TODO"
    startDate: "YYYY"
    endDate: "YYYY"              # o null si en curso
    status: "COMPLETED"         # COMPLETED | IN_PROGRESS
    codename: "TRAINING DOSSIER — PRIMARY"  # label NERV de chrome
    order: 1
  # un entry por titulo / institucion (licenciatura, ISTEA, ingles, etc.)
```

---

## 7. Strings de i18n

### Que va en `i18n/ui-es.json` y `i18n/ui-en.json`

Labels de chrome que son **globales y reutilizables** en toda la UI. No contenido especifico de una entidad.

Estructura ejemplo de `i18n/ui-es.json`:

```json
{
  "nav.experience": "HISTORIAL",
  "nav.projects": "MISIONES",
  "nav.skills": "SINCRONIZACION",
  "nav.education": "ENTRENAMIENTO",
  "nav.contact": "CANAL SEGURO",
  "section.experience": "HISTORIAL OPERACIONAL",
  "section.projects": "REGISTRO DE MISIONES",
  "section.skills": "TASAS DE SINCRONIZACION",
  "section.education": "DOSSIER DE ENTRENAMIENTO",
  "section.contact": "CANAL SEGURO",
  "section.about": "PERFIL OPERATIVO",
  "status.active": "ACTIVO",
  "status.archived": "ARCHIVADO",
  "status.classified": "CLASIFICADO",
  "status.deployed": "DESPLEGADO",
  "badge.clearance": "NIVEL",
  "badge.status": "ESTADO",
  "hero.codename": "NOMBRE CLAVE",
  "hero.status": "ESTADO",
  "contact.email": "CORREO SEGURO",
  "contact.github": "REPOSITORIO DE CODIGO",
  "contact.linkedin": "DOSSIER OFICIAL",
  "footer.status": "ESTADO: EN LINEA",
  "footer.build": "BUILD",
  "footer.scanlines": "LINEAS DE SCAN",
  "skill.syncrate": "TASA DE SINC.",
  "skill.years": "ANOS DE EXPERIENCIA",
  "boot.skip": "[ PRESIONA CUALQUIER TECLA PARA SALTAR ]"
}
```

Estructura ejemplo de `i18n/ui-en.json`:

```json
{
  "nav.experience": "TENURE",
  "nav.projects": "MISSIONS",
  "nav.skills": "SYNC",
  "nav.education": "TRAINING",
  "nav.contact": "CHANNEL",
  "section.experience": "OPERATIONAL TENURE",
  "section.projects": "MISSION LOG",
  "section.skills": "SYNCHRONIZATION RATES",
  "section.education": "TRAINING DOSSIER",
  "section.contact": "SECURE CHANNEL",
  "section.about": "OPERATIVE PROFILE",
  "status.active": "ACTIVE",
  "status.archived": "ARCHIVED",
  "status.classified": "CLASSIFIED",
  "status.deployed": "DEPLOYED",
  "badge.clearance": "CLEARANCE",
  "badge.status": "STATUS",
  "hero.codename": "CODENAME",
  "hero.status": "STATUS",
  "contact.email": "SECURE MAIL",
  "contact.github": "CODE REPOSITORY",
  "contact.linkedin": "OFFICIAL DOSSIER",
  "footer.status": "STATUS: ONLINE",
  "footer.build": "BUILD",
  "footer.scanlines": "SCAN LINES",
  "skill.syncrate": "SYNC RATE",
  "skill.years": "YEARS OF EXPERIENCE",
  "boot.skip": "[ PRESS ANY KEY TO SKIP ]"
}
```

### Que NO va en los archivos de i18n

- La prosa del CV (va en el body MDX de cada entidad).
- Los campos `role`, `title`, `synopsis`, `label` con sub-keys `es`/`en` en el frontmatter de las entidades — esos son strings localizados especificos de cada entidad, no globales.
- El texto de los `codename` NERV — esos son datos del frontmatter, no labels de UI.

### Patron de acceso en componentes Astro

```typescript
// src/lib/i18n.ts
export function useTranslations(lang: 'es' | 'en') {
  const strings = lang === 'es'
    ? import('../content/i18n/ui-es.json')
    : import('../content/i18n/ui-en.json');
  return (key: string) => strings[key] ?? key;
}
```

---

## 8. Workflow de extraccion del CV (Fase 2)

El workflow actualizado que aplica la regla de scope de contenido:

1. El dueno dropea su CV en `docs/source-cv.pdf` (o `.docx`).
2. El agente SCRIBE lee el CV con la skill de lectura de PDF apropiada.
3. El agente crea un mapa de entidades: puestos, proyectos, skills, educacion.
4. Por cada puesto en el CV:
   - Crea `src/content/experience/[slug].mdx`.
   - Frontmatter: datos estructurados (empresa, fechas, stack, clearance asignado, codename NERV).
   - Body MDX: **copia el texto de descripcion del puesto verbatim desde el CV**. Sin reescritura.
5. Por cada proyecto en el CV:
   - Crea `src/content/projects/[slug].mdx`.
   - Frontmatter: datos estructurados + `synopsis` en ES/EN (unico campo que puede ser condensado levemente).
   - Body MDX: **copia la descripcion verbatim desde el CV o el README del repo**.
6. Datos personales → `src/content/identity/main.yaml`. Titulo del CV verbatim.
7. Skills → `src/content/skills/main.yaml`. Sync rates estimados — marcar claramente como "PENDIENTE REVISION DEL DUENO".
8. Educacion → `src/content/education/main.yaml`. Instituciones y titulos verbatim.
9. **El agente abre un PR** con todos los archivos generados. El dueno revisa cada archivo y confirma que el contenido representa su CV con exactitud antes de mergear.

**Lo que el agente NO hace en este workflow:**
- No reescribe la prosa del CV en estilo NERV.
- No inventa informacion que no este en el CV.
- No agrega headers militares (`## Operational Summary`) dentro del body MDX.
- No parafrasea ni resume el contenido del puesto/proyecto.

**Lo que el agente SI hace:**
- Asigna codenames NERV en el frontmatter (capa de chrome, no contenido).
- Estima sync rates y los marca como pendientes de revision.
- Da formato markdown natural al texto si el CV viene en un formato que lo requiera.
- Sugiere clearance levels basados en la relevancia/antiguedad del puesto.
