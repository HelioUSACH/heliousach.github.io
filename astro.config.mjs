import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://heliousach.github.io',
  output: 'static',
  // Inline all CSS into each page (no external _astro/*.css requests).
  build: { inlineStylesheets: 'always' },
  integrations: [sitemap()],
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
