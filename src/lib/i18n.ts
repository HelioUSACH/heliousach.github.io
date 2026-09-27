// All interface text and page routes, in both languages.
export type Lang = 'es' | 'en';

export const routes = {
  home: { es: '/', en: '/en/' },
  research: { es: '/investigacion/', en: '/en/research/' },
  team: { es: '/equipo/', en: '/en/team/' },
  news: { es: '/noticias/', en: '/en/news/' },
  publications: { es: '/publicaciones/', en: '/en/publications/' },
  infrastructure: { es: '/infraestructura/', en: '/en/infrastructure/' },
} as const;
export type RouteKey = keyof typeof routes;

/**
 * The site is a one-page scroller. On the home page every nav item scrolls to
 * its section (anchor id below); each section ends in "See full page".
 * On a full (detail) page the nav links go to the other full pages instead,
 * and "Contact" scrolls to the footer.
 * Order here = order on the home page = nav order = detail-page pager order.
 */
export const sections = [
  { id: 'research', nav: 'research' },
  { id: 'projects', nav: 'research' },
  { id: 'news', nav: 'news' },
  { id: 'team', nav: 'team' },
  { id: 'publications', nav: 'publications' },
  { id: 'infrastructure', nav: 'infrastructure' },
  { id: 'contact', nav: 'contact' },
] as const;
export type NavKey = 'research' | 'news' | 'team' | 'publications' | 'infrastructure' | 'contact';
export const navOrder: NavKey[] = ['research', 'news', 'team', 'publications', 'infrastructure', 'contact'];
/** Detail pages in reading order (for the "next" link at the bottom of each). */
export const detailOrder: RouteKey[] = ['research', 'news', 'team', 'publications', 'infrastructure'];

export const ui = {
  es: {
    nav: { home: 'Inicio', research: 'Investigación', team: 'Equipo', news: 'Noticias', publications: 'Publicaciones', infrastructure: 'Infraestructura', contact: 'Contacto' },
    navLabel: 'Navegación principal',
    themeToggle: 'Cambiar tema día/noche',
    menu: 'Menú',
    otherLang: 'EN',
    otherLangName: 'English',
    credit: 'Crédito',
    fullPage: 'Ver página completa',
    backHome: 'Inicio',
    next: 'Siguiente',
    backToTop: 'Volver al inicio',
    seeAll: 'Ver todo',
    research: { eyebrow: 'Investigación', title: 'Líneas de investigación', more: 'Ver líneas de investigación y proyectos' },
    projects: { eyebrow: 'Proyectos', title: 'Proyectos activos', more: 'Ver todos los proyectos', data: 'Datos' },
    team: { eyebrow: 'Equipo', title: 'Nuestro equipo', more: 'Ver equipo completo' },
    groups: {
      investigadores: 'Investigadores',
      postdoc: 'Postdoctorados',
      estudiantes: 'Estudiantes',
      colaboradores: 'Colaboradores',
      'ex-miembros': 'Ex-miembros',
    },
    pubs: { eyebrow: 'Publicaciones', title: 'Publicaciones recientes', titleAll: 'Publicaciones del grupo', more: 'Ver todas las publicaciones', inPress: 'en prensa', profiles: 'Listas completas' },
    news: { eyebrow: 'Noticias', title: 'Noticias', latest: 'Últimas noticias', more: 'Ver todas las noticias', back: 'Volver a noticias', readMore: 'Leer más', external: 'Ver fuente', otherLangNote: '', empty: 'Pronto publicaremos novedades del grupo.' },
    infra: { eyebrow: 'Infraestructura', title: 'Infraestructura y datos', more: 'Ver infraestructura y fuentes de datos' },
    contact: { eyebrow: 'Contacto', title: 'Convocatoria abierta', write: 'Escríbenos' },
    footer: {
      headline: 'Investigación en clima espacial en USACH.',
      body: 'Estamos abiertos a colaboraciones, memorias, tesis y consultas de prensa sobre heliofísica y clima espacial.',
      affiliations: 'Afiliaciones',
      funding: 'Financiamiento',
    },
    links: { site: 'Sitio personal', scholar: 'Google Scholar', orcid: 'ORCID', anid: 'ANID PDI', github: 'GitHub' },
    dateLocale: 'es-CL',
  },
  en: {
    nav: { home: 'Home', research: 'Research', team: 'Team', news: 'News', publications: 'Publications', infrastructure: 'Infrastructure', contact: 'Contact' },
    navLabel: 'Main navigation',
    themeToggle: 'Toggle day/night theme',
    menu: 'Menu',
    otherLang: 'ES',
    otherLangName: 'Español',
    credit: 'Credit',
    fullPage: 'See full page',
    backHome: 'Home',
    next: 'Next',
    backToTop: 'Back to home',
    seeAll: 'See all',
    research: { eyebrow: 'Research', title: 'Research lines', more: 'See research lines and projects' },
    projects: { eyebrow: 'Projects', title: 'Active projects', more: 'See all projects', data: 'Data' },
    team: { eyebrow: 'Team', title: 'Our team', more: 'See the full team' },
    groups: {
      investigadores: 'Researchers',
      postdoc: 'Postdoctoral researchers',
      estudiantes: 'Students',
      colaboradores: 'Collaborators',
      'ex-miembros': 'Former members',
    },
    pubs: { eyebrow: 'Publications', title: 'Recent publications', titleAll: 'Group publications', more: 'See all publications', inPress: 'in press', profiles: 'Full lists' },
    news: { eyebrow: 'News', title: 'News', latest: 'Latest news', more: 'See all news', back: 'Back to news', readMore: 'Read more', external: 'See source', otherLangNote: 'In Spanish', empty: 'Group news coming soon.' },
    infra: { eyebrow: 'Infrastructure', title: 'Infrastructure and data', more: 'See infrastructure and data sources' },
    contact: { eyebrow: 'Contact', title: 'Open positions', write: 'Write to us' },
    footer: {
      headline: 'Space weather research at USACH.',
      body: 'We welcome collaborations, thesis projects, and press inquiries about heliophysics and space weather.',
      affiliations: 'Affiliations',
      funding: 'Funding',
    },
    links: { site: 'Personal site', scholar: 'Google Scholar', orcid: 'ORCID', anid: 'ANID PDI', github: 'GitHub' },
    dateLocale: 'en-US',
  },
} as const;

/** Pick `field` (Spanish) or `field_en` (English, falls back to Spanish). */
export function pick<T extends Record<string, any>>(obj: T, field: string, lang: Lang): any {
  if (lang === 'en' && obj[`${field}_en`] !== undefined && obj[`${field}_en`] !== '') return obj[`${field}_en`];
  return obj[field];
}

/** Minimal inline markup for data files: **bold** and *italic*. */
export function inlineMd(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>');
}

export function formatDate(d: Date, lang: Lang) {
  return d.toLocaleDateString(ui[lang].dateLocale, { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
}

/** "Dr. Victor A. Pinto Abarzúa" -> "VP": first two words, skipping titles and single initials. */
export function initials(name: string) {
  return name
    .replace(/^(Dra?\.|Prof\.)\s+/i, '')
    .split(/\s+/)
    .filter((w) => /^[A-ZÁÉÍÓÚÑ]/.test(w) && w.replace('.', '').length > 1)
    .slice(0, 2)
    .map((w) => w[0])
    .join('');
}
