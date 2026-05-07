---
name: cv-content
description: Sincronizar el contenido del CV (PDF fuente `Esteban_N_Diaczun.pdf`) con las content collections bilingües ES/EN. Usar cuando se actualice el PDF, se agregue/modifique experiencia, educación, skills o idiomas, o cuando el usuario diga "actualizá mi CV".
---

# cv-content

## Trigger

- "actualicé el PDF, sincronizá"
- "agregá esta experiencia / esta certificación"
- "cambiame el título / la bio"
- "traduje X, mete la versión inglesa"

## Reglas duras

1. **Texto literal del PDF**. Nada de embellecimientos, ni "lideré X iniciativa transformacional". Si el PDF dice "implementé conectores", eso va.
2. **Paridad ES/EN obligatoria**. Si tocás `qtech.es.md`, tocás `qtech.en.md`. Build falla si una entry no tiene su par del otro idioma referenciado por el código.
3. **Frontmatter estructurado, body en bullets**. Datos (fechas, stack, company) → frontmatter. Logros → body como `- ...`.
4. **Stack en frontmatter** = pills bajo la entry. Mantener nombres canónicos (Laravel, Node.js, SQL Server, etc.) consistentes con `src/content/skills/*.json`.

## Workflow para sincronizar PDF

```sh
# 1. Re-extraer texto
pdftotext -layout Esteban_N_Diaczun.pdf /tmp/cv.txt
cat /tmp/cv.txt

# 2. Diffear contra content actual mentalmente o con grep
grep -r "QTECH" src/content/

# 3. Editar los .md en pares es/en. Copiar PDF a public/ si cambió:
cp Esteban_N_Diaczun.pdf public/

# 4. Validar
pnpm build
```

## Mapeo PDF → collections

| Sección PDF             | Collection          | Archivos                          |
| ----------------------- | ------------------- | --------------------------------- |
| Header (nombre, email)  | `src/lib/i18n.ts`   | `profile` const                   |
| Resumen / about         | `about`             | `about/es.md`, `about/en.md`      |
| Experiencia laboral     | `experience`        | `experience/<slug>.{es,en}.md`    |
| Educación               | `education`         | `education/<slug>.{es,en}.md`     |
| Habilidades técnicas    | `skills`            | `skills/{es,en}.json`             |
| Idiomas                 | `languages`         | `languages/{es,en}.json`          |

## Schema enforcement

Los schemas viven en `src/content.config.ts`. Antes de pushear contenido nuevo:

- `locale` en frontmatter siempre.
- `order` numérico para `experience` y `education` (define el sort).
- `period`, `start`, `end` siempre **strings** (cuidar YAML auto-coerción de años a número).
- `remote: true|false` solo en `experience`.

## Traducciones

- Empezar SIEMPRE por ES (PDF es ES).
- Para EN: traducción profesional, no literal-Google. Mantener nombres propios (QTECH, OSDE, Farmalink, MSAL, etc.) sin traducir.
- "Receta electrónica" → "e-prescription". "HIS" → "HIS" (Healthcare Information System, ya es estándar).
