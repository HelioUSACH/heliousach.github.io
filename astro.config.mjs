import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // Canonical host. GitHub Pages (heliousach.github.io) is a mirror whose
  // canonical URLs point here.
  site: 'https://helio.fisica.usach.cl',
  output: 'static',
  // Inline all CSS into each page (no external _astro/*.css requests).
  build: { inlineStylesheets: 'always' },
  integrations: [sitemap()],
  // Old URLs keep working.
  redirects: {
    '/laboratorio': '/infraestructura',
    '/en/lab': '/en/infrastructure',
  },
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
