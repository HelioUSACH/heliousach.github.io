# Content Audit — Issues to Fix

> Generated: 2026-08-14
> Status: Pending — these are content issues that also need fixing in the tenure dossier / CV.
> Source of truth: `~/hermes/myself/victor_pinto_profile.md`

---

## Team Page — Classification Errors

### 1. Paula Reyes misclassified as graduate (CRITICAL)

**Where:** `src/pages/equipo.astro` and `src/pages/en/team.astro`

**Issue:** Paula Reyes is listed under "Graduados recientes" / "Recent graduates" with label "(en curso)" / "(current)". She is NOT a graduate — she's an active Master's student at UdeChile.

**Fix:** Move her from the "Graduados recientes" section to the "Estudiantes de magíster" / "Current students" section.

**Also check tenure dossier:** Verify Paula Reyes is listed as active student, not graduated, in `evidencia/mentoring_activo/2020-Paula-Reyes/`.

---

### 2. Dafhne Muñoz Reyes listed under "Estudiantes de magíster" on Spanish team page

**Where:** `src/pages/equipo.astro`

**Issue:** On the Spanish team page, Dafhne Muñoz Reyes appears in the "Estudiantes de magíster" section. Your CV profile says she is "Ing. Astrofísica, USACH" (undergraduate). The English version correctly labels her as "Astrophysics Engineering, USACH" and the home page hero card is also correct.

**Fix:** Move her out of the "Estudiantes de magíster" section on the Spanish team page, or rename the section header to include undergrads (e.g., "Estudiantes de magíster y pregrado").

---

### 3. Missing graduated students

**Issue:** The following graduated undergrads are not listed on the team page, despite being in your CV:

| Student | Program | Year | Evidence |
|---------|---------|------|----------|
| Guillermo Caro Lillo | Ing. Física | 2025 | `mentoring_pregrado/2024-2025-Guillermo-Caro/` |
| Javier Ruiz Pineda | Ing. Física | 2024 | `mentoring_pregrado/2023-2024-Javier-Ruiz/` |
| Fernando Castillo | Ing. Física | 2022 | `mentoring_pregrado/2022-Fernando_Castillo/` |
| Javiera Paterakis | Ing. Física | 2022 | `mentoring_pregrado/2022-Javiera-Paterakis/` |
| Taylor Couture | Physics (visiting, UNH) | 2022 | `mentoring_pregrado/2022-Taylor-Couture/` |

**Fix:** Add these to the "Graduados recientes" / "Recent graduates" section.

---

## Research Page — Date Errors

### 4. NASA LWS project dates (FIXED in code, verify in CV)

**Issue:** Both research pages listed NASA LWS as "2023-2027", but your CV profile says "2022-2027".

**Status:** FIXED in website code. Verify in tenure dossier that the correct start year is 2022.

---

## Home Page — Sensitive Data Leaks (FIXED in code)

### 5. FONDEQUIP grant ID exposed (FIXED in code)

**Issue:** The FONDEQUIP grant tracking number "EQM230160" was displayed on the home page project cards and lab section. Per the website-management skill's sensitive data rules, internal grant IDs should not be published.

**Status:** FIXED — replaced with "FONDEQUIP 2023" everywhere.

---

## Data Source Inconsistency

### 6. MMS satellite mentioned on home page but not on Lab page

**Issue:** The home page says "We process satellite data from Van Allen Probes, THEMIS, GOES and MMS" (both ES/EN). The Lab page data sources section only lists "Van Allen Probes, THEMIS, GOES, OMNI" — no MMS.

**Decision needed:** Either remove MMS from the home page (if it's incidental) or add MMS to the Lab page data sources.

---

## Van Allen Probes Status

### 7. Van Allen Probes presented as current data source

**Issue:** Van Allen Probes were decommissioned in 2019. The site lists them as a primary data source without noting they are historical archives. Not technically wrong (you use archived data), but worth being clear.

**Suggestion:** Add a note like "(archived data)" next to Van Allen Probes on the Lab page.

---

## Missing Publications on Website

### 8. 2023 Coughlan et al. (Space Weather) not listed

**Issue:** "Probabilistic Forecasting of Ground Magnetic Perturbation Spikes at Mid-Latitude Stations" (Space Weather, 2023) is not in the recent publications on either research page. Notable because it's from the journal you edit for.

**Fix:** Add to the selected recent publications on both research pages.

---

## Items to Verify in Tenure Dossier / CV

Cross-check the following against the website content:

1. **Paula Reyes status** — is she listed as active or graduated in `mentoring_activo/` vs `mentoring_postgrado/`? The website had her as graduate which is wrong.

2. **NASA LWS start year** — website had 2023, CV says 2022. Verify which is correct in `evidencia/grants/grants_NASA_LWS/`.

3. **DICYT grant consolidation** — the website collapses all DICYT projects into one generic card. The CV lists 7+ distinct DICYT projects. Consider if the website should be more specific or if the current approach is fine.

4. **Graduated student count** — CV says 6 undergrads graduated. Website only shows 1 (Yerko Jelcic). The missing 5 are listed above.

5. **Active student count** — CV says 7 active undergrads. Website only shows 2 by name (Dafhne, Camila) plus the line "+4 more". Consider listing them or confirming the count is accurate.