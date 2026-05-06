import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const localized = z.object({ es: z.string(), en: z.string() });

const identity = defineCollection({
  loader: glob({ pattern: "main.yaml", base: "./src/content/identity" }),
  schema: z.object({
    codename: z.string(),
    realName: z.string(),
    title: localized,
    summary: localized,
    status: z.enum(["ACTIVE", "STANDBY", "ARCHIVED"]),
    clearance: z.number().int().min(1).max(5),
    location: z.string(),
    languages: z.array(
      z.object({
        code: z.string(),
        level: z.string(),
        label: localized,
      })
    ),
    channels: z.object({
      email: z.string(),
      github: z.string().url().nullable(),
      linkedin: z.string().url().nullable(),
      website: z.string().nullable(),
    }),
  }),
});

const experience = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/experience" }),
  schema: z.object({
    codename: z.string(),
    realCompany: z.string(),
    role: localized,
    clearance: z.number().int().min(1).max(5),
    location: z.string(),
    startDate: z.string(),
    endDate: z.string().nullable(),
    current: z.boolean(),
    division: z.string().optional(),
    stack: z.array(z.string()),
    order: z.number().int(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    codename: z.string(),
    realName: z.string(),
    status: z.enum(["ACTIVE", "ARCHIVED", "CLASSIFIED", "DEPLOYED"]),
    division: z.string(),
    clearance: z.number().int().min(1).max(5),
    deployment: z.string(),
    stack: z.array(z.string()),
    repo: z.string().url().nullable(),
    demo: z.string().url().nullable(),
    featured: z.boolean().default(false),
    order: z.number().int(),
    synopsis: localized,
  }),
});

const skills = defineCollection({
  loader: glob({ pattern: "main.yaml", base: "./src/content/skills" }),
  schema: z.object({
    pendingOwnerReview: z.boolean().default(false),
    categories: z.array(
      z.object({
        id: z.string(),
        label: localized,
        items: z.array(
          z.object({
            name: z.string(),
            syncRate: z.number().int().min(0).max(100),
            years: z.number(),
          })
        ),
      })
    ),
  }),
});

const education = defineCollection({
  loader: glob({ pattern: "main.yaml", base: "./src/content/education" }),
  schema: z.object({
    entries: z.array(
      z.object({
        institution: z.string(),
        degree: localized,
        field: localized.optional(),
        startDate: z.string().nullable(),
        endDate: z.string().nullable(),
        status: z.enum(["COMPLETED", "IN_PROGRESS", "PAUSED"]),
        codename: z.string(),
        kind: z.enum(["DEGREE", "CERTIFICATION"]).default("DEGREE"),
        order: z.number().int(),
      })
    ),
  }),
});

export const collections = { identity, experience, projects, skills, education };
