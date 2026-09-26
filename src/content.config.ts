import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';

// Bilingual text field: { es: '...', en: '...' }
const bilingual = z.object({ es: z.string(), en: z.string() });

const team = defineCollection({
  loader: file('src/data/team.yaml'),
  schema: z.object({
    id: z.string(),
    name: bilingual,
    status: z.enum(['pi', 'postdoc', 'current-student', 'former-member', 'collaborator']),
    order: z.number().default(0),

    // Subtitle line shown on the full team page (title/degree/affiliation).
    role: bilingual,
    // PI-only: extra department/title text appended after role, e.g. "Departamento de Física, USACH".
    department: bilingual.optional(),
    // Former members: year shown in parentheses after role (e.g. graduation year).
    year: z.number().optional(),
    // Students/former members/collaborators: one-line research topic (the "meta" line).
    topic: bilingual.optional(),
    // PIs only: full bio paragraph.
    bio: bilingual.optional(),

    // Optional overrides for the compact homepage teaser card.
    // Falls back to role/topic/bio if omitted.
    miniRole: bilingual.optional(),
    miniBio: bilingual.optional(),
    // Overrides the homepage card's link target (defaults to the team page).
    homeCardLink: z.string().url().optional(),

    initials: z.string().optional(),
    links: z
      .object({
        site: z.string().url().optional(),
        scholar: z.string().url().optional(),
        orcid: z.string().url().optional(),
        anid: z.string().url().optional(),
      })
      .optional(),
  }),
});

const publications = defineCollection({
  loader: file('src/data/publications.yaml'),
  schema: z.object({
    id: z.string(),
    year: z.number(),
    // Author list as plain text. Wrap a name in **double asterisks** to bold
    // it (e.g. group members) — rendered as <strong> on the research pages.
    authors: z.string(),
    title: z.string(),
    journal: z.string(),
    // Omit for accepted papers that don't have a DOI yet (set inPress: true).
    doi: z.string().url().optional(),
    inPress: z.boolean().default(false),
  }),
});

const researchLines = defineCollection({
  loader: file('src/data/research-lines.yaml'),
  schema: z.object({
    id: z.string(),
    order: z.number().default(0),
    badgeColor: z.enum(['green', 'orange']),
    tag: bilingual,
    title: bilingual,
    // Full paragraph shown on /investigacion and /en/research.
    description: bilingual,
    // "Datos: ..." / "Data: ..." (or "Herramientas:" / "Tools:") line on the full page.
    meta: bilingual,

    // Homepage teaser card: image + (usually) rewritten shorter copy.
    image: z.string(),
    imageAlt: bilingual,
    // Falls back to title/description if omitted (most lines reuse the same
    // title; one currently has a shortened homepage title).
    homeTitle: bilingual.optional(),
    homeDescription: bilingual.optional(),
  }),
});

const projects = defineCollection({
  loader: file('src/data/projects.yaml'),
  schema: z.object({
    id: z.string(),
    // Display order in the full /investigacion grid (all projects appear there).
    order: z.number().default(0),
    title: bilingual,
    // e.g. "**PI:** Dr. Victor Pinto · **Co-I:** ..." — **bold** marks the
    // role label, same convention as publications' authors field.
    attribution: bilingual,
    description: bilingual,
    // "2025-2028 · ANID" — years and funder aren't translated.
    meta: z.string(),

    // Only ~3 of the projects are "featured" on the homepage, with their own
    // image, tags, and rewritten marketing copy. `featured` is that card's
    // display order there; omit it entirely to keep a project off the homepage.
    featured: z.number().optional(),
    homeKicker: bilingual.optional(),
    homeTitle: bilingual.optional(),
    homeDescription: bilingual.optional(),
    homeImage: z.string().optional(),
    homeImageAlt: bilingual.optional(),
    homeTags: z.array(bilingual).optional(),
  }),
});

export const collections = { team, publications, researchLines, projects };
