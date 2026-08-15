# HelioFísica USACH — group website

Source for the [HelioFísica y Clima Espacial USACH](https://heliousach.github.io) research group site, built with [Astro](https://astro.build). Bilingual (es/en), static output.

## Structure

```
src/
├── layouts/Layout.astro     # shared shell: nav, footer, meta tags, scripts
├── pages/                    # Spanish routes (default locale)
│   ├── index.astro
│   ├── investigacion.astro
│   ├── equipo.astro
│   ├── laboratorio.astro
│   └── en/                   # English routes
└── styles/global.css         # design tokens + shared styles
scripts/inline-css.py         # postbuild: inlines CSS into HTML (see below)
```

## Development

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # outputs to ./dist
npm run preview   # preview the production build
```

## Why the CSS is inlined

GitHub Pages runs a Jekyll processing pass by default, which ignores files and
folders that start with an underscore — including Astro's `_astro/` asset
directory. Since we're not enabling Jekyll's bypass file consistently across
deploys, `npm run build` runs `astro build` and then
`scripts/inline-css.py`, which inlines `src/styles/global.css` directly into
every built HTML file and strips the now-unnecessary `<link>` tags. A
`public/.nojekyll` file is also included as a second safeguard.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the
site and deploys the `dist/` output directly to GitHub Pages via
`actions/deploy-pages` (no build branch, no committing built HTML). Repo
Settings → Pages → Source must be set to **"GitHub Actions"** for this to
work.

## Content

Bio, project, and publication data live directly in the `.astro` page files
(no CMS/content collections) — edit the relevant page under `src/pages/`,
and its `en/` counterpart to keep translations in sync.
