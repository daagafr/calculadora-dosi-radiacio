# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static, single-page public-outreach web app that estimates a person's annual ionizing-radiation dose (mSv/year) for people living in Spain. All UI text is in **Catalan**; numbers use a decimal comma (`Intl.NumberFormat("ca-ES")`, see `public/js/format.js`). Hosted on Firebase Hosting at https://dosiradiacio.web.app; the original address (calculadora-dosi-de-radiacio.web.app) is a second site in the same project that only 301-redirects there. It started as a high-school research project; the original version is preserved in git as tag `v1-batxillerat`.

No build step and no runtime dependencies: plain ES modules, one stylesheet, self-hosted fonts. Only `public/` is deployed.

## Commands

- Run locally: `npm start` (runs `tools/dev-server.py`, serves `public/` on http://localhost:5510 with caching disabled — plain `python -m http.server` lets the browser cache stale ES modules).
- Tests: `npm test` (Node's built-in runner, `node --test "tests/*.test.js"`). Single file: `node --test tests/calc.test.js`.
- Deploy: `npm run deploy` (runs the tests, then `firebase deploy --only hosting`). `firebase.json` has two targets (mapped in `.firebaserc`): `main` → site `dosiradiacio` serves `public/`; `legacy` → site `calculadora-dosi-de-radiacio` redirects every path to the new address.
- Social-share image: edit `tools/og-image.html`, then `python tools/make-og-image.py` (headless Chrome/Edge → `public/images/og.png`, 1200×630).
- CI: `.github/workflows/tests.yml` runs the same tests with plain Node (no `npm install` needed).

## Architecture

The form, result panel and bibliography are generated at runtime from three layers that must stay in sync (`tests/model.test.js` checks this):

1. **Data** — `public/js/data/`
   - `categories/<id>.js`: one file per dose category (terrestrial, cosmic, radon, internal, medical, travel, other), ordered in `model.js`. Each category has `questions` whose `type` decides how they add dose: `fixed`, `choice` (option doses), `toggle`, `count` (× `perUnit`), `number` (× `factor` or `compute(n)`, `ifEmpty` fallback), `derived` (`compute(answers)` from several inputs, e.g. radon). `input: true` questions only feed a `derived` one; `when: {q, eq|in}` hides a question and excludes it from the sum; `group` puts medical exams into collapsible groups; `warn` shows threshold notices.
   - `references.js`: Spain/world averages, the vertical log reference scale, the result bands, banana dose.
   - `sources.js`: bibliography. Citations are numbered automatically by order of appearance (`public/js/sources.js`); only cited sources are listed.
2. **Texts** — `public/js/i18n/ca.js` (+ `ca-natural.js`, `ca-medical.js`, `ca-lifestyle.js`): every label, help, option label and "Més informació" HTML, keyed by category/question id. Translating = copying these files with another language code.
3. **Engine/UI** — `calc.js` (pure functions, no DOM; unit-tested), `main.js` (state, localStorage persistence, event delegation, visibility, warnings), `ui/form.js`, `ui/result.js` (SVG donut, vertical log ladder, bands), `ui/dialog.js` (info dialog; converts doses to "days of natural background" using the `spain-natural` reference).

`public/index.html` holds the static content (hero, primer, "Aprèn més" articles, methodology, and the footer with the author, David Galan, and a "last updated" `<time>` that should be bumped whenever published content changes, together with `lastmod` in `public/sitemap.xml`). Inline citations there are `<a class="cite" data-source="<sourceId>"></a>`, filled in by JS. Articles are `<details id="article-…">` and open automatically when linked by hash.

Each category id needs a matching colour token `--c-<id>` in `public/css/styles.css` (light and dark values). Adding a category: new data file + `model.js` entry + i18n texts + colour token.

## Data provenance

Every number comes from the research reports in `docs/fonts/` (01 natural sources, 02 medical, 03 lifestyle/occupational/reference levels), which give the source, table/page, assumptions and confidence for each value. Key conventions: natural sources follow UNSCEAR (80 % indoor occupancy; radon 0.025 mSv per Bq/m³) so the user's result is comparable with the Spain averages (EANR 2019 natural 3.1 mSv + CSN DOPOES II/DOMNES medical 1.26 mSv ≈ 4.3 mSv); medical doses prefer Spanish CSN surveys. When changing a value, update the report and the source references together, and run `npm test`.

## Analytics

Cookieless GoatCounter analytics is enabled in `public/index.html` (dashboard: https://calculadora-dosi.goatcounter.com).
