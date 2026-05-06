# IDEAS_PARKING_LOT

Cementerio de ideas que aparecen durante el desarrollo y **no entran en el scope actual**. No se descartan: se anotan acá y se vuelve a la fase en curso.

Reglas:

1. Cuando el dueño o un agente proponen algo que cae fuera del SPEC vigente (especialmente §9 Anti-patterns), se agrega acá con fecha, contexto, y razón por la que se posterga.
2. No se discute la idea acá. Se anota y se sigue.
3. Periódicamente (entre fases), el dueño puede revisar la lista y promover ideas a un `SPEC_v2.md` o descartarlas explícitamente.
4. Si una idea aparece **dos veces** desde fuentes distintas, marcarla con `[recurrent]` — señal de que vale la pena considerarla en serio en una próxima iteración.

---

## Formato

```markdown
### YYYY-MM-DD — Nombre corto de la idea

- **Fuente**: dueño / agente / referencia externa
- **Contexto**: en qué momento apareció, en qué fase
- **Idea**: descripción de 1-3 líneas
- **Razón para postergar**: por qué no entra ahora (referencia a §9 si aplica)
- **Si en algún momento sí**: condiciones bajo las cuales reconsiderar
```

---

## Ideas postergadas

> _Vacío. Las ideas se agregan abajo en orden cronológico inverso (más nuevas arriba)._

---

## Anti-patterns explícitos del SPEC §9 (referencia rápida)

Si una propuesta cae en una de estas, va directo al parking lot sin discusión:

- Convertir el sitio en template para vender a otros devs.
- Agregar blog en v1.
- Terminal interactivo con comandos (rechazado explícitamente en discusión previa).
- Integración en vivo con la API de GitHub.
- Chat con LLM con la personalidad del dueño.
- Migración a Next.js / SSR / server components.
- Agregar headless CMS (Sanity/Contentful/Strapi).
- Base de datos / backend / auth.
- Modo claro.

---

**Última actualización**: 2026-05-06 (creación del archivo).
