# Heliofísica USACH — group website

Source for <https://heliousach.github.io>, built with [Astro](https://astro.build). Bilingual (Spanish default, English under `/en/`), static output, deployed by GitHub Actions.

**Editing content (news, people, publications)?** Read [`CONTENIDO.md`](CONTENIDO.md). No code needed.

## Layout of the repo

```
src/
  content/
    news/es/*.md, news/en/*.md   # one Markdown file per news item (EN optional, same file name)
    team/*.md                    # one file per person (front matter only)
  data/
    site.yaml                    # contact, social, affiliations, funders, hero, open call
    publications.yaml            # group publications
    projects.yaml                # active projects (featured ones go on the home page)
    research-lines.yaml          # research lines
  content.config.ts              # schemas for all of the above (build fails on bad data / missing images)
  lib/
    i18n.ts                      # all UI strings, routes, helpers (pick(), inlineMd(), initials())
    site.ts                      # loads + validates site.yaml
    content.ts                   # sorted getters (getTeam, getNews, ...)
  components/                    # PageHeader, SectionHead, ResearchCard, ProjectCard, Person, PubList, NewsCard
  views/                         # one template per page, takes `lang` (Home, Research, Team, NewsList, NewsArticle, Infrastructure)
  pages/                         # thin route files: each renders a view with lang="es" or "en"
  layouts/Layout.astro           # <head>, header/nav, footer
  styles/global.css              # the whole design system (tokens + components)
public/images/
  brand/          # emblem (day/white), horizontal logo
  illustrations/  # schematic SVGs (scripts/gen-illustrations.py)
  news/, team/    # uploaded photos
.pages.yml        # Pages CMS config (form editor for News and Team)
```

Bilingual fields use a suffix: `title` (Spanish) and `title_en` (English, optional, falls back to Spanish).

## Design system (`src/styles/global.css`)
- Fonts: Bebas Neue (`.display` headings), Poppins (UI, card titles), Roboto (body).
- Tokens at the top: colors per theme (day default, night toggle), type scale (`--fs-*`), spacing, one card radius (`--radius`).
- Image frames: `.frame` is 16:9 for every card; `.frame-portrait` is 3:4 for people. Only the home hero is full-bleed.
- Every subpage = `PageHeader` band + `.band` sections (alternate with `.band-alt`) + the same cards as the home page.
- Don't add inline `style=` attributes; add a class here instead.

## Commands
```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # validates content, builds to dist/
npm run preview
```

## Deploy
Push to `main` → `.github/workflows/deploy.yml` builds and publishes to GitHub Pages. Pull requests only build (a check that content and code are valid). Repo Settings → Pages → Source must be "GitHub Actions".

## History
Design/code audits and plans live outside the repo, in the `Web/docs/` folder.
