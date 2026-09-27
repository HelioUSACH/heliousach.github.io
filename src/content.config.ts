// Content schemas. Every file under src/content/ and src/data/ is validated
// here at build time: a missing field, a bad date or an image path that
// doesn't exist in public/ stops the build with a clear error message.
import { defineCollection, z } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { existsSync } from 'node:fs';

const imageExists = (p: string, ctx: z.RefinementCtx) => {
  if (!p.startsWith('/')) {
    ctx.addIssue({ code: 'custom', message: `"${p}": image paths start with "/" (e.g. /images/news/foto.jpg)` });
  } else if (!existsSync(`public${decodeURI(p)}`)) {
    ctx.addIssue({ code: 'custom', message: `Image not found: public${p} — check the file name and folder` });
  }
};

/** Path of a file inside public/, e.g. "/images/news/foto.jpg". Must exist. */
export const publicImage = () => z.string().superRefine(imageExists);

/** Empty string or missing = no photo; otherwise the file must exist. */
const optionalImage = () =>
  z.string().superRefine((p, ctx) => { if (p !== '') imageExists(p, ctx); }).optional();

// ---------- News: src/content/news/es/*.md and src/content/news/en/*.md ----------
const news = defineCollection({
  loader: glob({ pattern: '{es,en}/**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    image: optionalImage(),
    imageAlt: z.string().optional(),
    link: z.string().url().optional(), // external link (press article, paper)
    draft: z.boolean().default(false),
  }),
});

// ---------- People: src/content/team/*.md (one file per person) ----------
const team = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/team' }),
  schema: z.object({
    name: z.string(),
    name_en: z.string().optional(),
    group: z.enum(['investigadores', 'postdoc', 'estudiantes', 'colaboradores', 'ex-miembros']),
    order: z.number().default(100),
    role: z.string(),
    role_en: z.string().optional(),
    affiliation: z.string().optional(),
    affiliation_en: z.string().optional(),
    topic: z.string().optional(),
    topic_en: z.string().optional(),
    year: z.number().optional(), // graduation year (ex-miembros)
    bio: z.string().optional(),
    bio_en: z.string().optional(),
    photo: optionalImage(),
    initials: z.string().max(3).optional(), // override the automatic initials (shown when there is no photo)
    links: z
      .object({
        site: z.string().url().optional(),
        scholar: z.string().url().optional(),
        orcid: z.string().url().optional(),
        anid: z.string().url().optional(),
        github: z.string().url().optional(),
      })
      .optional(),
  }),
});

// ---------- Publications: src/data/publications.yaml ----------
const publications = defineCollection({
  loader: file('src/data/publications.yaml'),
  schema: z.object({
    id: z.string(),
    year: z.number(),
    authors: z.string(), // **negrita** = miembros del grupo
    title: z.string(),
    journal: z.string(),
    doi: z.string().url().optional(),
    inPress: z.boolean().default(false),
  }),
});

// ---------- Research lines: src/data/research-lines.yaml ----------
const researchLines = defineCollection({
  loader: file('src/data/research-lines.yaml'),
  schema: z.object({
    id: z.string(),
    order: z.number().default(0),
    tag: z.string(),
    tag_en: z.string().optional(),
    title: z.string(),
    title_en: z.string().optional(),
    shortTitle: z.string().optional(),
    shortTitle_en: z.string().optional(),
    summary: z.string(),
    summary_en: z.string().optional(),
    description: z.string(),
    description_en: z.string().optional(),
    data: z.string().optional(),
    data_en: z.string().optional(),
    image: publicImage(),
    imageAlt: z.string(),
    imageAlt_en: z.string().optional(),
  }),
});

// ---------- Projects: src/data/projects.yaml ----------
const projects = defineCollection({
  loader: file('src/data/projects.yaml'),
  schema: z.object({
    id: z.string(),
    order: z.number().default(0),
    grant: z.string(),
    grant_en: z.string().optional(),
    title: z.string(),
    title_en: z.string().optional(),
    summary: z.string(),
    summary_en: z.string().optional(),
    people: z.string(),
    people_en: z.string().optional(),
    years: z.string(),
    funder: z.string(),
    featured: z.number().optional(),
    image: publicImage().optional(),
    imageAlt: z.string().optional(),
    imageAlt_en: z.string().optional(),
    tags: z.array(z.string()).optional(),
    tags_en: z.array(z.string()).optional(),
  }),
});

// ---------- Infrastructure: src/data/infrastructure.yaml ----------
const infrastructure = defineCollection({
  loader: file('src/data/infrastructure.yaml'),
  schema: z.object({
    id: z.string(),
    order: z.number().default(0),
    title: z.string(),
    title_en: z.string().optional(),
    text: z.string(),
    text_en: z.string().optional(),
    link: z.string().url().optional(),
    linkLabel: z.string().optional(),
    linkLabel_en: z.string().optional(),
  }),
});

export const collections = { news, team, publications, researchLines, projects, infrastructure };
