# Website Fixes Summary — 2026-08-17

## What was done (deployed)

### Images (all now local, never break again)
- All 4 NASA SVS images were returning 404 (their server restructured URLs)
- Replaced with local gradient images in `public/images/`:
  - `hero-bg.jpg` — deep space hero background
  - `radiation-belts.jpg` — blue/purple card image
  - `ulf-waves.jpg` — teal/green card image
  - `space-weather.jpg` — amber/warm card image
  - `magnetosphere.jpg` — blue card for featured project
- `og:image` meta tag now points to local `hero-bg.jpg` instead of broken NASA URL

### CSS / Layout (global.css rewrite)
- **Day theme background**: changed from `--bg: #0a0e17` (dark) to `--surface: #ffffff` (white)
- **Navbar overlap fixed**: `header` is `position: sticky; top: 0` with proper `padding-top` on body; hero uses `margin-top: -5.25rem` to create visual attachment without z-index collision
- **Footer background**: `footer` now has `background: var(--surface-alt)` — light gray in day mode, dark in night mode
- **Section alternation**: added `.hp-section-alt` wrapper class — Projects and Publications sections now have alternating background color for clear visual breaks
- **Hero**: `100vw` full-bleed with proper negative margins, `min-height: 80vh`, gradient scrim overlay for text readability
- **Team cards**: 4-column grid (3 on tablet, 2 on mobile) with overlay bios on hover
- **Research cards**: 3-column grid with image + body, hover lift effect
- **Project cards**: horizontal layout (image left, content right), featured card gets accent border

### Navigation / Routing
- Fixed `#anchor` links that broke on sub-pages (e.g., `/investigacion#contacto` did nothing)
- Nav now links to home page sections when on sub-pages: `href="/#contacto"` instead of `#contacto`
- `hreflang` ES/EN/x-default tags added for bilingual SEO
- `og:locale` fixed from `en_US` to `en`
- Combined Google Fonts into single request (was 2 separate — Inter + JetBrains Mono, then Bebas Neue + Poppins + Roboto)
- Theme toggle `aria-pressed` now reflects actual state on load

### Cleanup
- Removed `commit_err.log` from repo
- Removed dead `src/i18n/ui.ts` (never imported by any page)
- Updated `.gitignore` to include `commit_err.log`
- Updated `README.md` to remove dead i18n reference, reflect actual file structure

### Content (factual corrections already deployed)
- FONDEQUIP grant ID `EQM230160` removed from all pages (replaced with `FONDEQUIP 2023`)
- FONDECYT grant ID `11251905` removed from all pages (replaced with `FONDECYT Iniciación 2025`)
- FONDEF grant ID `ID25I10556` removed from all pages (replaced with `FONDEF IDEA I+D`)
- NASA LWS dates fixed from `2023-2027` to `2022-2027`

## What still needs to be done (content issues in `CONTENT_AUDIT.md`)

These are for your manual review — they affect both the website and your tenure dossier:

1. **Paula Reyes misclassified** — listed as undergraduate but holds Master's degree
2. **Missing graduated students** — Yulissa Espitia (Master's thesis defense pending), Sebastián Contreras (Astrophysics Engineering), Fernando Salinas (Astrophysics Engineering), Yael Kirshtein (Physics Engineering)
3. **MMS spacecraft inconsistency** — listed as NASA-only but is a NASA/JAXA/CAS/ESA international mission
4. **Missing publications** — at least 2-3 papers from your Google Scholar profile are not on the website
5. **Missing collaborators** — several external co-authors (J.M. Ruohoniemi, D.G. Sibeck, G. Duberstein, A. Keesee, R. Millan, R. Hajra, C. Nieves-Chinchilla) not on team or collaborators page

## Deployment

- Source code pushed to `main` branch at `HelioUSACH/heliousach.github.io`
- GitHub Actions CI build: **success** (38s)
- Site deployed to `https://heliousach.github.io`
- Commit: `95ea575`

## Troubleshooting notes

- "Equipo completo leads to older version" — likely browser cache. The page is serving the current deployed version with all team members and new CSS.
- If changes don't appear, hard refresh: `Ctrl+Shift+R` (or `Cmd+Shift+R` on Mac)