# Notes for AI coding agents

- Read `README.md` (architecture) and `CONTENIDO.md` (content model) first.
- Content lives in `src/content/` and `src/data/`, validated by `src/content.config.ts`. Never hardcode facts (people, projects, publications, dates) in `.astro` files.
- One view per page in `src/views/` with a `lang` prop; `src/pages/*` only wrap views. Don't duplicate templates per language. UI strings go in `src/lib/i18n.ts`.
- Styling: only `src/styles/global.css` tokens and classes. No inline `style=`. Reuse components (`Person`, `ProjectCard`, `ResearchCard`, `PubList`, `NewsCard`, `PageHeader`, `SectionHead`) rather than new one-off markup.
- Content rules: facts must be verifiable (tenure dossier is the source of truth); never publish projects under evaluation or internal grant IDs; prefer actions over unverified counts.
- Put audits/plans/reports in `Web/docs/` (outside this repo), not in the repo root.
- Verify with `npm run build` (content validation) before committing.

## Dev server
Use background mode: `astro dev --background`; manage with `astro dev stop|status|logs`.
