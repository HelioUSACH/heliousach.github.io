// Helpers to read collections in display order.
import { getCollection } from 'astro:content';
import type { Lang } from './i18n';

export async function getTeam() {
  return (await getCollection('team')).sort((a, b) => a.data.order - b.data.order || a.data.name.localeCompare(b.data.name));
}

export async function getPublications() {
  const all = await getCollection('publications');
  return all.map((p, i) => ({ ...p.data, _i: i })).sort((a, b) => b.year - a.year || a._i - b._i);
}

export async function getResearchLines() {
  return (await getCollection('researchLines')).map((r) => r.data).sort((a, b) => a.order - b.order);
}

export async function getProjects() {
  return (await getCollection('projects')).map((p) => p.data).sort((a, b) => a.order - b.order);
}

/**
 * News for one language. Each item is identified by its file name (slug).
 * English list = English files + Spanish items that have no translation
 * (flagged `fallback: true` so the page can mark them "In Spanish").
 */
export async function getNews(lang: Lang) {
  const all = (await getCollection('news', (n) => !n.data.draft || import.meta.env.DEV));
  const byLang = (l: Lang) => all.filter((n) => n.id.startsWith(`${l}/`));
  const slug = (id: string) => id.replace(/^(es|en)\//, '');
  const es = byLang('es').map((n) => ({ entry: n, slug: slug(n.id), fallback: false }));
  let items = es;
  if (lang === 'en') {
    const en = byLang('en').map((n) => ({ entry: n, slug: slug(n.id), fallback: false }));
    const translated = new Set(en.map((n) => n.slug));
    items = [...en, ...es.filter((n) => !translated.has(n.slug)).map((n) => ({ ...n, fallback: true }))];
  }
  return items.sort((a, b) => b.entry.data.date.valueOf() - a.entry.data.date.valueOf());
}
