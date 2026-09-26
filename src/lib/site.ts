// Loads and validates src/data/site.yaml (contact, social links, affiliations, hero).
import { readFileSync, existsSync } from 'node:fs';
import { load } from 'js-yaml';
import { z } from 'astro/zod';

const schema = z.object({
  name: z.string(),
  tagline: z.string(),
  tagline_en: z.string().optional(),
  description: z.string(),
  description_en: z.string().optional(),
  contact: z.object({
    name: z.string(),
    role: z.string(),
    role_en: z.string().optional(),
    email: z.string().email(),
    address: z.string(),
    address_en: z.string().optional(),
  }),
  social: z.array(z.object({ label: z.string(), url: z.string().url() })),
  affiliations: z.array(z.object({ name: z.string(), name_en: z.string().optional(), url: z.string().url() })),
  funders: z.array(z.string()),
  hero: z.object({
    image: z.string().superRefine((p, ctx) => {
      if (!existsSync(`public${p}`)) ctx.addIssue({ code: 'custom', message: `site.yaml hero image not found: public${p}` });
    }),
    alt: z.string(),
    alt_en: z.string().optional(),
    credit: z.string(),
    text: z.string(),
    text_en: z.string().optional(),
  }),
  openCall: z.object({ text: z.string(), text_en: z.string().optional() }),
});

export const site = schema.parse(load(readFileSync('src/data/site.yaml', 'utf8')));
