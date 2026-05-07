import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const about = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/about' }),
  schema: z.object({
    locale: z.enum(['es', 'en']),
  }),
});

const experience = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/experience' }),
  schema: z.object({
    locale: z.enum(['es', 'en']),
    company: z.string(),
    role: z.string(),
    location: z.string().optional(),
    remote: z.boolean().default(false),
    start: z.string(),
    end: z.string(),
    order: z.number(),
    stack: z.array(z.string()).default([]),
  }),
});

const education = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/education' }),
  schema: z.object({
    locale: z.enum(['es', 'en']),
    institution: z.string(),
    program: z.string(),
    period: z.string(),
    order: z.number(),
  }),
});

const skills = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/skills' }),
  schema: z.object({
    locale: z.enum(['es', 'en']),
    groups: z.array(
      z.object({
        title: z.string(),
        items: z.array(z.string()),
      })
    ),
  }),
});

const languages = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/languages' }),
  schema: z.object({
    locale: z.enum(['es', 'en']),
    items: z.array(
      z.object({
        name: z.string(),
        level: z.string(),
      })
    ),
  }),
});

export const collections = { about, experience, education, skills, languages };
