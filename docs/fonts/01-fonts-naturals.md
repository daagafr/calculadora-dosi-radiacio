# 01 — Natural background sources: values, sources and corrections

Scope: natural sources of ionizing radiation for a person living in Spain. This covers cosmic radiation, terrestrial gamma radiation by province, internal irradiation (excluding radon), radon (and thoron), and the reference totals used for comparison.
Prepared: 2026-10-04. Every URL marked "fetched" was downloaded and read while preparing this document. "URL not verified" means the page could not be retrieved (blocked or rate-limited), so the citation rests on a secondary confirmation.

Current values are in `index.html` and `js/script.js`. The cosmic values, the internal value of 0.4 and the "porcelain crowns" item were confirmed to be copied from the **American Nuclear Society (ANS) Radiation Dose Calculator** [26]. That calculator is US-specific and is based on old NCRP data. The provincial terrestrial values do come from the CSN MARNA report [7], but they were converted with an inappropriate factor (see §2).

---

## 0. Summary table of recommended values

| Item | Current value in app | **Recommended value** | Key assumptions | Main source | Confidence |
|---|---|---|---|---|---|
| Cosmic, sea level | 0.26 mSv (ANS, US) | **0.30 mSv/yr** (0.24 ionizing + 0.065 neutrons) | Indoor occupancy 0.8, building shielding 0.8, latitude 40–50° | UNSCEAR 2000 Annex A §47–49 [1]; Annex B §20–30 [2]; EANR ch. 8 [13] | High |
| Cosmic vs altitude | ANS bands converted from feet, 0.26…0.96 | **Formula** E(z) = 240·[0.21e^(−1.649z)+0.79e^(0.4528z)] + 65·e^(0.00721·(1033−p(z))) µSv, with p(z) = ((44.34−z)/11.86)^(1/0.19) g/cm², z in km. Band table in §1 (0.31 … 1.11 mSv) | As above | UNSCEAR 2000 Annex A eq. 12–13 [1] | High (method); medium (±15 % absolute) |
| Terrestrial gamma (province) | MARNA µR/h × 0.0876 (≈ ambient dose equivalent at 100 % outdoor occupancy) | **E = X(µR/h) × 0.0704 mSv/yr** → table of 52 entries in §2 (0.32 Múrcia … 1.20 Pontevedra) | 1 µR/h = 8.7 nGy/h; 0.7 Sv/Gy; 0.2 outdoors / 0.8 indoors; indoor/outdoor ratio 1.4 (Spain) | MARNA Table 4.37 [7]; UNSCEAR 2000 Annex A §55–59 and Annex B Table 7 [1][2] | High (peninsula); medium (Canaries); low (Balears, Ceuta, Melilla) |
| Terrestrial, Spain average | — | 0.61 mSv/yr (MARNA mean 8.7 µR/h); 0.63 (UNSCEAR Spain data); 0.53 (EANR, population-weighted) | — | [7][8][2][13] | High |
| Internal (food and water; K-40, U/Th series, Po-210…) | Shown 0.29, **but the code uses 0.4** | **0.29 mSv/yr** (K-40 0.17 + U/Th series 0.12) | Adult, world-average diet | UNSCEAR 2000 Annex B Table 31 [2]; UNSCEAR 2008 Vol. I Table 1 [3]; CSN SDB-04.07 [23] | High |
| Cosmogenic (C-14, etc.) | not included | **0.01 mSv/yr** (fixed; can be added to "internal" → 0.30) | — | UNSCEAR 2000 Table 31 [2]; EANR Table 9-2 [13] | High |
| Porcelain crowns / false teeth | +0.0007 mSv (ANS 0.07 mrem) | **Remove** (or keep only as a curiosity "< 0.001 mSv") | Uranium was added to dental porcelain only until the mid-1980s (US) | NCRP 95 via HPS [27] and ORAU [28] | Medium |
| Radon, conversion from measured concentration | C × 0.06 mSv | **C (Bq/m³) × 0.025 mSv/yr** (UNSCEAR). Alternative: ×0.047 (ICRP 137) | 9 nSv per Bq·h·m⁻³ EEC; F = 0.4; 7000 h/yr indoors | UNSCEAR 2019 Annex B §190–191 [5]; UNSCEAR 2000 Annex B [2] | High (UNSCEAR convention); factor-of-2 scientific uncertainty |
| Radon, from the CSN map class (P90) | class mean × 0.00745 | **Same factor 0.025** applied to the CSN class means 38 / 67 / 93 / 117 / 219 Bq/m³ → 0.96 / 1.69 / 2.34 / 2.95 / 5.52 mSv/yr | The means refer to ground or first floor | CSN INT-04.41 Table 3 [9] | High (means); medium (dose) |
| Radon, default when unknown | **0 mSv** (empty option) | **≈1.8 mSv/yr** (Spain population-weighted mean, about 70 Bq/m³) | Ground-floor assumption, so probably an upper bound | EANR Table 9-2 [13]; UNSCEAR 2000 Table 24 (AM 86 Bq/m³) [2] | Medium |
| Thoron (Rn-220) | not included | **0.10 mSv/yr** (fixed) | World average | UNSCEAR 2000 Table 31 [2]; EANR [13] | Medium |
| Reference level for radon | — | **300 Bq/m³** (annual average; homes, public buildings and workplaces) | — | RD 1029/2022 art. 72(a) [19]; Directive 2013/59/Euratom art. 54 and 74 [20]; CTE DB HS6 [21] | High |
| World natural average | 2.4 mSv | **2.4 mSv/yr** | — | UNSCEAR 2000 Table 31; UNSCEAR 2008 Vol. I Table 1 [2][3] | High |
| World total incl. medical | — | **≈3.0 mSv/yr** (2.4 + 0.57 medical) | — | UNSCEAR 2020/2021 Vol. I §47–48 [6]; UNSCEAR 2008 Vol. I §41 [3] | High |
| Spain total | 3.7 mSv | Keep **3.7** only as "CSN estimate (2010)". Note: its natural part (2.4) is the UNSCEAR **world** average, not a Spanish figure. The Spain-specific natural total is **≈3.1 mSv/yr** (EANR 2019) | — | CSN SDB-04.07 [23]; EANR Table 9-2 [13] | Medium |

### Most important corrections (flags)

1. **Radon: the two code paths are inconsistent and both are wrong.**
   - Measured path: `× 0.06` gives 6 mSv for 100 Bq/m³. That is 2.4× the UNSCEAR value and about 1.3× ICRP 137 at 7000 h. It only matches ICRP 137 if 8760 h/yr is assumed. No source was found.
   - Map path: `× 0.00745` is 8× smaller than the measured path and 3.4× smaller than UNSCEAR.
   - Default: if nothing is selected, radon is **0 mSv**. Radon is the largest natural source, so this is the biggest error in the app.
2. **Internal: the label shows 0.29 but `getInternalRad()` uses 0.4.** 0.4 is the ANS (US) figure of 40 mrem. Use 0.29 (UNSCEAR/CSN).
3. **Terrestrial: every provincial value is about 20 % too high.** The MARNA µR/h means were multiplied by 0.01 µSv/h per µR/h × 8760 h (the MARNA leaflet's rule of thumb [8]). That gives ambient dose equivalent for someone outdoors 24 h a day, not effective dose. The UNSCEAR-consistent factor is 0.0704 instead of 0.0876 mSv/yr per µR/h. Balears, Las Palmas, Santa Cruz de Tenerife, Ceuta and Melilla were missing. Several provinces were lumped together (Sevilla + Granada; Burgos + Palencia; the three Valencian provinces). The MARNA table gives them separately.
4. **Cosmic: values copied from the ANS (US) calculator.** They are 14–19 % below the UNSCEAR method for Spain. The 1500–1800 m band also has a typo: 0.55 instead of ANS's 0.52.
5. **Porcelain crowns item**: US-specific (NCRP 95, 1987), the practice ended in the mid-1980s, and the dose is negligible (< 0.001 mSv). Recommend removing it.
6. **Radon map link**: the ArcGIS "SimpleViewer" link (appid a3a435cf…) now loads Esri's "Item Replacement" page, and the item metadata returns HTTP 403. Use the CSN landing page instead (§4b).
7. **"Spain 3.7 mSv"**: this is a 2010 CSN leaflet figure. It is built from UNSCEAR 2000 **world** natural averages plus UNSCEAR's medical estimate for health-care level I countries. It is not a Spain-specific measurement, and the leaflet's own pie chart is internally inconsistent (§5).

---

## 1. Cosmic radiation

### 1.1 Sea level at Spain's latitude

- **Directly ionizing and photon component (muons, electrons):** 32 nGy/h ≈ 31–32 nSv/h outdoors at sea level. With a building shielding factor of 0.8 and indoor occupancy of 0.8, this gives an **annual effective dose of 240 µSv at sea level**. The value varies by about 10 % with latitude, which is negligible for Spain. Source: UNSCEAR 2000 Annex A §47 and eq. 12 [1]; Annex B §20 [2]. Confidence: high.
- **Neutron component:** fluence rate 0.013 cm⁻² s⁻¹ × 720 nSv/h per n·cm⁻²·s⁻¹ = 9 nSv/h at about 50°N. After applying the 0.8 shielding and 0.8 occupancy factors, this gives **65 µSv/yr at sea level "at geographic latitudes between about 40° and 50°"** (UNSCEAR 2000 Annex A §48–49 [1]).
  - The neutron component depends on geomagnetic latitude. Latitude coefficient k: 1.0 at 90°, 0.8 at 47°, 0.6 at 42°, 0.4 at 35°, 0.2 at the equator (Annex A eq. 14 [1]).
  - Peninsular Spain lies at about 39–46° geomagnetic latitude (my own dipole calculation; Madrid ≈ 43°). So 65 µSv is appropriate for the peninsula and the Balearics.
  - For the Canary Islands (≈ 33° geomagnetic), the neutron term would be about half, i.e. −0.03 mSv. This is negligible; see the open questions.
- **Total at sea level: 240 + 65 ≈ 305 µSv ≈ 0.30 mSv/yr.** The EANR uses the same method and obtains a minimum of 301 µSv at European sea level (EANR ch. 8, §8.1.3 [13]).
- The current app value of **0.26 mSv** is the ANS/US figure of "sea level (26 mrem)" [26]. It reflects older US neutron estimates; UNSCEAR raised the neutron estimate in 2000 after including high-energy neutrons (Annex A §49 [1]). **Flag: replace.**

### 1.2 Altitude dependence (formula)

UNSCEAR 2000 Annex A [1] (Bouville and Lowder). The same method is used by the EANR (ch. 8, eqs. 8-1 and 8-2 [13]).

- Ionizing component: **E_I(z) = 240 µSv × [0.21·e^(−1.649·z) + 0.79·e^(0.4528·z)]**, with z in km (eq. 12).
- Neutron component:
  - **E_N(z) = 65 µSv × exp[0.00721·(p₀ − p(z))]**
  - The atmospheric depth is obtained by inverting eq. 13, h = 44.34 − 11.86·p^0.19: **p(z) = ((44.34 − z)/11.86)^(1/0.19)** g/cm².
  - p₀ = p(0) ≈ 1033 g/cm².
  - The attenuation e^(−0.00721·p) is from Annex A §48 [1].
- Check: at 900 m the formulas give ionizing ×1.24 and neutrons ×2.1. UNSCEAR 2000 Annex B §26 [2] quotes "1.25 times" and "a factor of 2.1 between sea level and 900 m". ✔
- Cross-check: the EANR population-weighted cosmic dose for **Spain is 0.36 mSv/yr** (Table 9-2 [13]). That corresponds to about 450–500 m in the formula, which is consistent with Spain's population distribution.

Point values computed with the formula (mSv = µSv/1000):

| Altitude (m) | Ionizing (µSv/yr) | Neutron (µSv/yr) | Total (µSv/yr) |
|---|---|---|---|
| 0 | 240 | 65 | 305 |
| 250 | 246 | 81 | 327 |
| 500 | 260 | 100 | 360 |
| 750 | 281 | 123 | 404 |
| 1000 | 308 | 151 | 459 |
| 1250 | 340 | 184 | 524 |
| 1500 | 378 | 223 | 602 |
| 1750 | 422 | 270 | 691 |
| 2000 | 471 | 324 | 795 |
| 2500 | 589 | 462 | 1051 |
| 3000 | 738 | 647 | 1385 |

### 1.3 Check of the current bands (recommended replacement values)

Band means were integrated with the formula above. Recommendation:

- **Best:** replace the radio buttons with a numeric "altitud (m)" input and compute E(z) directly.
- **Minimum:** keep the bands and use the right-hand column.

| Current band | Current value (mSv) | UNSCEAR range at band limits (mSv) | **Recommended band mean (mSv)** | Change |
|---|---|---|---|---|
| 0–50 m | 0.26 | 0.30–0.31 | **0.31** | +18 % |
| 50–300 m | 0.28 | 0.31–0.33 | **0.32** | +14 % |
| 300–600 m | 0.31 | 0.33–0.38 | **0.35** | +14 % |
| 600–900 m | 0.35 | 0.38–0.44 | **0.40** | +16 % |
| 900–1200 m | 0.41 | 0.44–0.51 | **0.47** | +15 % |
| 1200–1500 m | 0.47 | 0.51–0.60 | **0.55** | +18 % |
| 1500–1800 m | 0.55 (ANS has 0.52: typo) | 0.60–0.71 | **0.65** | +19 % |
| 1800–2100 m | 0.66 | 0.71–0.84 | **0.77** | +17 % |
| 2100–2400 m | 0.79 | 0.84–0.99 | **0.92** | +16 % |
| > 2400 m (computed for 2400–2800) | 0.96 | 0.99–1.24 | **1.11** | +16 % |

Notes:

- **Do not add the band value to a "base" of 0.26** as `getCosmicRad()` does today (`valorPredCos + value`). Store the absolute value per band, or compute it from the formula.
- The highest permanently inhabited places in Spain are below about 2100 m, so the last two bands are mostly for completeness.
- Uncertainty:
  - Cosmic dose at ground level varies by about ±10 % over the 11-year solar cycle (Annex B §20 [2]).
  - The simple model differs by < 15 % from EXPACS/CARI-6 (EANR ch. 8 [13]).

Confidence: high for the method; ±15 % for absolute values.

---

## 2. Terrestrial gamma radiation by province

### 2.1 Where the provincial data come from

- **Primary source:** CSN & ENUSA (2000), *Proyecto MARNA. Mapa de radiación gamma natural*, Colección Informes Técnicos INT-04.02 [7].
  - **Table 4.37 (printed p. 76)** lists the *"Tasa de exposición media correspondiente a diferentes provincias"* in µR/h for the **47 peninsular provinces**.
  - It was compiled from all the exposure-rate data behind the 1:1,000,000 map (1998), about 1.5 million measurements. The national mean is 8.7 µR/h (CSN fact sheet FDE-02.01 [8]).
- MARNA measurements are NaI scintillometer readings (0.4–2.8 MeV). They are **corrected for cosmic radiation**, aircraft height, system background and Compton scattering (MARNA p. 65–67 [7]). They therefore represent terrestrial gamma only and do not double-count the cosmic component.
- **I verified that every current provincial value in the app equals MARNA µR/h × 0.0876.**
  - Examples: Barcelona 7.08 → 0.62; Madrid 12.74 → 1.12; Pontevedra 17.06 → 1.50; Múrcia 4.56 → 0.40.
  - 0.0876 = 0.01 µSv/h per µR/h × 8760 h. This is the conversion printed in the MARNA leaflet [8] and in MARNA Table 3.34 footnote [7].
  - It yields **ambient dose equivalent for a person outdoors 24 h/day, 365 days/yr**. It is not annual effective dose as defined by UNSCEAR.
- **Coverage gaps.** MARNA does not cover the Balearic or Canary Islands, Ceuta or Melilla. The CSN MARNA web page states the data cover "todo el territorio nacional excepto de ambos archipiélagos, Ceuta y Melilla" [32]. Alternative sources were used for these (see 2.3).

### 2.2 Correct conversion (UNSCEAR)

Annual effective dose:

E (mSv/yr) = D_out × 8760 h × 0.7 Sv/Gy × (0.2 + 0.8 × R) × 10⁻⁶, with D_out in nGy/h.

- **D_out = 8.7 × X**, where X is the MARNA exposure rate in µR/h. 1 R = 0.0087 Gy (air kerma), so 1 µR/h = 8.7 nGy/h (MARNA Table 3.34 [7]).
- **0.7 Sv/Gy** converts absorbed dose in air to effective dose for adults (UNSCEAR 2000 Annex A §58 [1]).
- **0.2 / 0.8** are the outdoor/indoor occupancy factors (Annex A §59 [1]).
- **R = 1.4** is the indoor/outdoor dose-rate ratio for **Spain** (UNSCEAR 2000 Annex B Table 7, Spain row [Q1, Q2]: outdoors 76 nGy/h, indoors 110 nGy/h, ratio 1.4 [2]). The EANR uses the same 0.8 occupancy and 1.4 factor (EANR ch. 9 §9.2.2 [13]).

**Result: E = 0.0704 × X (mSv/yr per µR/h).** This is 0.80× the factor currently used, so all current provincial values drop by about 20 %.

Consistency checks:

- MARNA national mean 8.7 µR/h → 0.61 mSv/yr.
- UNSCEAR Spain data (76/110 nGy/h) → 0.63 mSv/yr.
- EANR population-weighted value for Spain → 0.53 mSv/yr (Table 9-2 [13]).
- World average → 0.48 mSv/yr (UNSCEAR [2]).

Spain is somewhat above the world average because of the granite areas of Galicia, the Sistema Central and Extremadura.

Indoor doses depend on building materials as well as on local geology. Applying a national ratio of 1.4 to every province is a simplification. It is still the standard UNSCEAR/EANR approach, and building materials are often sourced locally (for example, granite in Galicia).

### 2.3 Full table: 50 provinces + Ceuta + Melilla

Columns:
- Exposure rate X is the MARNA area mean. For non-MARNA rows an "equivalent" X = D/8.7 is shown.
- D_out = 8.7·X.
- Recommended E = 0.0704·X, rounded to 0.01 mSv.

The current-value column shows what the app uses today. Lumped entries in the app (Sevilla + Granada, Burgos + Palencia, Castelló + València + Alacant) are now split.

| # | Autonomous community | Province (Catalan name) | Source; confidence | Mean exposure rate (µR/h) | Outdoor air dose rate (nGy/h) | **Recommended annual effective dose (mSv/yr)** | Current app value (mSv) | Change |
|---|---|---|---|---|---|---|---|---|
| 1 | Andalusia | Almeria | MARNA T4.37 [7]; high | 6.09 | 53 | **0.43** | 0.53 | -19 % |
| 2 | Andalusia | Cadis | MARNA T4.37 [7]; high | 5.40 | 47 | **0.38** | 0.47 | -19 % |
| 3 | Andalusia | Còrdova | MARNA T4.37 [7]; high | 9.09 | 79 | **0.64** | 0.80 | -20 % |
| 4 | Andalusia | Granada | MARNA T4.37 [7]; high | 6.79 | 59 | **0.48** | 0.60 | -20 % |
| 5 | Andalusia | Huelva | MARNA T4.37 [7]; high | 7.49 | 65 | **0.53** | 0.66 | -20 % |
| 6 | Andalusia | Jaén | MARNA T4.37 [7]; high | 7.94 | 69 | **0.56** | 0.70 | -20 % |
| 7 | Andalusia | Màlaga | MARNA T4.37 [7]; high | 7.20 | 63 | **0.51** | 0.63 | -20 % |
| 8 | Andalusia | Sevilla | MARNA T4.37 [7]; high | 6.83 | 59 | **0.48** | 0.60 | -20 % |
| 9 | Aragó | Osca | MARNA T4.37 [7]; high | 7.81 | 68 | **0.55** | 0.68 | -19 % |
| 10 | Aragó | Saragossa | MARNA T4.37 [7]; high | 7.38 | 64 | **0.52** | 0.65 | -20 % |
| 11 | Aragó | Terol | MARNA T4.37 [7]; high | 6.67 | 58 | **0.47** | 0.58 | -19 % |
| 12 | Astúries | Astúries | MARNA T4.37 [7]; high | 9.95 | 87 | **0.70** | 0.87 | -19 % |
| 13 | Illes Balears | Illes Balears | MARNA T2.27 soils (Mallorca, n=11) × UNSCEAR coeffs [7][2]; low | ≈5.8 (equiv.) | 50 | **0.41** | — (missing) | new |
| 14 | Canàries | Las Palmas | Eastern islands area mean, Martín Luis 2021 [12] citing Arnedo 2017 [11]; medium | ≈4.9 (equiv.) | 43 | **0.35** | — (missing) | new |
| 15 | Canàries | Santa Cruz de Tenerife | Western islands mean, Martín Luis 2021 [12]; medium | ≈8.2 (equiv.) | 71 | **0.58** | — (missing) | new |
| 16 | Cantàbria | Cantàbria | MARNA T4.37 [7]; high | 6.57 | 57 | **0.46** | 0.58 | -20 % |
| 17 | Castella i Lleó | Àvila | MARNA T4.37 [7]; high | 15.12 | 132 | **1.06** | 1.33 | -20 % |
| 18 | Castella i Lleó | Burgos | MARNA T4.37 [7]; high | 6.79 | 59 | **0.48** | 0.60 | -20 % |
| 19 | Castella i Lleó | Lleó | MARNA T4.37 [7]; high | 8.94 | 78 | **0.63** | 0.78 | -19 % |
| 20 | Castella i Lleó | Palència | MARNA T4.37 [7]; high | 6.81 | 59 | **0.48** | 0.60 | -20 % |
| 21 | Castella i Lleó | Salamanca | MARNA T4.37 [7]; high | 12.31 | 107 | **0.87** | 1.08 | -20 % |
| 22 | Castella i Lleó | Segòvia | MARNA T4.37 [7]; high | 10.20 | 89 | **0.72** | 0.89 | -19 % |
| 23 | Castella i Lleó | Sòria | MARNA T4.37 [7]; high | 6.72 | 58 | **0.47** | 0.59 | -20 % |
| 24 | Castella i Lleó | Valladolid | MARNA T4.37 [7]; high | 9.11 | 79 | **0.64** | 0.80 | -20 % |
| 25 | Castella i Lleó | Zamora | MARNA T4.37 [7]; high | 9.82 | 85 | **0.69** | 0.86 | -20 % |
| 26 | Castella-la Manxa | Albacete | MARNA T4.37 [7]; high | 5.30 | 46 | **0.37** | 0.46 | -19 % |
| 27 | Castella-la Manxa | Ciudad Real | MARNA T4.37 [7]; high | 7.87 | 68 | **0.55** | 0.69 | -20 % |
| 28 | Castella-la Manxa | Conca | MARNA T4.37 [7]; high | 6.27 | 55 | **0.44** | 0.55 | -20 % |
| 29 | Castella-la Manxa | Guadalajara | MARNA T4.37 [7]; high | 6.90 | 60 | **0.49** | 0.60 | -19 % |
| 30 | Castella-la Manxa | Toledo | MARNA T4.37 [7]; high | 12.44 | 108 | **0.88** | 1.09 | -20 % |
| 31 | Catalunya | Barcelona | MARNA T4.37 [7]; high | 7.08 | 62 | **0.50** | 0.62 | -20 % |
| 32 | Catalunya | Girona | MARNA T4.37 [7]; high | 9.28 | 81 | **0.65** | 0.80 | -18 % |
| 33 | Catalunya | Lleida | MARNA T4.37 [7]; high | 7.95 | 69 | **0.56** | 0.70 | -20 % |
| 34 | Catalunya | Tarragona | MARNA T4.37 [7]; high | 5.96 | 52 | **0.42** | 0.52 | -19 % |
| 35 | Comunitat Valenciana | Alacant | MARNA T4.37 [7]; high | 4.94 | 43 | **0.35** | 0.43 | -19 % |
| 36 | Comunitat Valenciana | Castelló | MARNA T4.37 [7]; high | 4.85 | 42 | **0.34** | 0.43 | -21 % |
| 37 | Comunitat Valenciana | València | MARNA T4.37 [7]; high | 4.93 | 43 | **0.35** | 0.43 | -19 % |
| 38 | Extremadura | Badajoz | MARNA T4.37 [7]; high | 10.44 | 91 | **0.74** | 0.92 | -20 % |
| 39 | Extremadura | Càceres | MARNA T4.37 [7]; high | 13.00 | 113 | **0.92** | 1.14 | -20 % |
| 40 | Galícia | la Corunya | MARNA T4.37 [7]; high | 10.95 | 95 | **0.77** | 0.96 | -20 % |
| 41 | Galícia | Lugo | MARNA T4.37 [7]; high | 13.61 | 118 | **0.96** | 1.19 | -19 % |
| 42 | Galícia | Ourense | MARNA T4.37 [7]; high | 14.37 | 125 | **1.01** | 1.26 | -20 % |
| 43 | Galícia | Pontevedra | MARNA T4.37 [7]; high | 17.06 | 148 | **1.20** | 1.50 | -20 % |
| 44 | Comunitat de Madrid | Madrid | MARNA T4.37 [7]; high | 12.74 | 111 | **0.90** | 1.12 | -20 % |
| 45 | Regió de Múrcia | Múrcia | MARNA T4.37 [7]; high | 4.56 | 40 | **0.32** | 0.40 | -20 % |
| 46 | Navarra | Navarra | MARNA T4.37 [7]; high | 7.76 | 68 | **0.55** | 0.68 | -20 % |
| 47 | País Basc | Àlaba | MARNA T4.37 [7]; high | 6.91 | 60 | **0.49** | 0.61 | -20 % |
| 48 | País Basc | Biscaia | MARNA T4.37 [7]; high | 8.32 | 72 | **0.59** | 0.73 | -20 % |
| 49 | País Basc | Guipúscoa | MARNA T4.37 [7]; high | 10.64 | 93 | **0.75** | 0.93 | -19 % |
| 50 | La Rioja | La Rioja | MARNA T4.37 [7]; high | 7.29 | 63 | **0.51** | 0.64 | -20 % |
| 51 | Ceuta | Ceuta | read off radiometric map, CSN INT-04.41 fig. 13 [9]; low | ≈14 | 122 | **0.99** | — (missing) | new |
| 52 | Melilla | Melilla | read off radiometric map, CSN INT-04.41 fig. 13 [9]; low | ≈8 | 70 | **0.56** | — (missing) | new |

Notes on the non-MARNA rows:

- **Illes Balears (low confidence).**
  - No MARNA map exists. The only CSN data found are soil activity concentrations for Mallorca in MARNA Table 2.27 (printed p. 50 [7], 11 samples): Ra-226 34.5, Th-232 31.2, K-40 367 Bq/kg.
  - These were converted with the UNSCEAR coefficients 0.462 / 0.604 / 0.0417 nGy/h per Bq/kg (UNSCEAR 2000 Annex B, table of dose coefficients for soil [2]), giving 50 nGy/h → 0.41 mSv/yr.
  - For comparison, the same method applied to the peninsula-wide soil means gives 67 nGy/h, against 76 measured. Soil-derived values therefore tend to be slightly low.
  - Menorca, Eivissa and Formentera are not covered by any data.
- **Las Palmas (medium).**
  - Arnedo et al. 2017 [11] measured 350 soil samples. Outdoor gamma dose rates at 1 m were **Gran Canaria 73, Fuerteventura 32, Lanzarote 25 nGy/h** (abstract, via [11]). Martín Luis et al. 2021 [12] cite **43 nGy/h** as the eastern-islands mean.
  - 43 nGy/h is an area mean (consistent with MARNA, which also gives area means) and gives 0.35 mSv/yr.
  - A population-weighted value would be about 62 nGy/h → 0.50 mSv/yr, because most residents live on Gran Canaria.
  - **Better option:** offer per-island choices: Gran Canària 0.59, Fuerteventura 0.26, Lanzarote 0.20 mSv/yr.
- **Santa Cruz de Tenerife (medium).** Martín Luis et al. 2021 [12] give a mean terrestrial absorbed dose rate of **71.4 nGy/h** for the western islands (Tenerife, La Palma, La Gomera, El Hierro), giving 0.58 mSv/yr.
  - Island-level studies give Tenerife about 89 nGy/h → 0.72 and La Palma GM 102.7 nGy/h (search-result abstracts; full texts not verified).
- **Ceuta and Melilla (low).**
  - The only data are the radiometric maps (exposure rate, µR/h) in CSN INT-04.41, Figure 13 [9]. The Ceuta map was produced under the MARNA extension with the Universidad de La Laguna; the Melilla map was provided by the Universidad de Las Palmas de Gran Canaria.
  - Ceuta isolines run roughly from 11 to 17+ µR/h; ≈14 µR/h → 0.99 mSv/yr. This is consistent with CSN's statement that the whole of Ceuta is a potential radon priority zone because of its gamma levels.
  - Melilla runs from 4 (north) to 16 µR/h (south, Gurugú volcanics); ≈8 µR/h → 0.56 mSv/yr.
  - These values were read by eye from a figure. Treat them as indicative and say so in the UI.
- **Fallback if a simpler UI is preferred:**
  - Use five bands with a link to the CSN MARNA map page [32]: < 0.40 / 0.40–0.55 / 0.55–0.75 / 0.75–1.0 / > 1.0 mSv.
  - Or use the national mean of 0.61 mSv/yr for anyone unsure.

Confidence: high for the 47 MARNA provinces (data and method are both primary). The ±20 % absolute uncertainty comes from the occupancy and indoor/outdoor assumptions; individual homes vary much more, because a granite house in a granite area can easily double the dose.

---

## 3. Internal irradiation (ingestion and inhalation, excluding radon and thoron)

### 3.1 Value

UNSCEAR 2000 Annex B, **Table 31** "Average worldwide exposure to natural radiation sources" [2]. Annual effective doses in mSv:

| Component | Average | Typical range |
|---|---|---|
| Ingestion, K-40 | 0.17 | — |
| Ingestion, U and Th series (incl. Po-210, Pb-210, Ra-226, Ra-228) | 0.12 | — |
| **Total ingestion** | **0.29** | 0.2–0.8 |
| Inhalation, U and Th series (dust, excluding radon/thoron) | 0.006 | — |
| Cosmogenic radionuclides (mainly C-14) | 0.01 | listed under cosmic in Table 31 |

- UNSCEAR 2008 Vol. I, Table 1 (Report to the General Assembly) repeats **ingestion 0.29 mSv** (typical range 0.2–1) [3].
- CSN SDB-04.07 (2010) gives a diet dose of 0.29 mSv/yr, of which 0.17 is from K-40, with a range of 0.2–0.8. It also notes that heavy shellfish consumers can receive up to 50 % more [23].
- The EANR uses 0.29 (ingestion) + 0.01 (cosmogenic) as fixed values for every European country, including Spain (Table 9-2 [13]).

**Decision: 0.29 mSv/yr, not 0.4.**

- The 0.4 in `getInternalRad()` is the ANS calculator's fixed "From food (Carbon-14 and Potassium-40) and from water (radon dissolved in water)" = **40 mrem** [26]. It is a US figure from the older NCRP era. It also includes radon dissolved in water, which UNSCEAR accounts for under radon.
- 0.29 is the international (UNSCEAR) and Spanish (CSN) reference. The app already *displays* 0.29, so only the code needs fixing.
- If the app wants its natural total to add up like UNSCEAR's 2.4, either:
  - add a fixed 0.01 mSv for cosmogenic radionuclides (internal shown as 0.30 mSv), or
  - add it to the cosmic line.
- The 0.006 mSv from dust inhalation is negligible and can be ignored.

Confidence: high. No Spain-specific dietary dose assessment was found. K-40 is under homeostatic control, so its dose is nearly constant (MARNA §3.4 [7]).

### 3.2 "Porcelain crowns or false teeth" (+0.0007 mSv)

- **Origin.** This is the ANS calculator item "I have porcelain crowns or false teeth (0.07 mrem)" [26]. ANS footnote: the dose is to the mouth, and the figure is the effective-dose equivalent.
- **Underlying source.** NCRP Report No. 95 (1987), *Radiation Exposure of the U.S. Population from Consumer Products and Miscellaneous Sources*.
  - From the 1940s until the mid-1980s, manufacturers added small amounts of uranium to dental porcelain for colour and fluorescence. "Manufacturers had stopped adding uranium to porcelain dentures by 1986 or so" (ORAU Health Physics Museum, citing NCRP 95 [28]).
  - The Health Physics Society reports a population-average beta dose of about 1.3 mSv/yr to the oral mucosa. That corresponds to an effective dose of about **0.00013 mSv/yr** (HPS "Ask the Experts" Q8568 [27]).
- **Assessment:**
  - US-specific and historical: it applies only to porcelain made before about 1986.
  - Below 0.001 mSv, which is invisible at the app's two-decimal display.
  - The two US sources disagree by a factor of 5 (0.0007 vs 0.00013).
- **Recommendation:** remove the item. If kept as an educational curiosity, label it "dosi menyspreable (< 0,001 mSv); només pròtesis anteriors als anys 80" and cite NCRP 95 via [27][28]. Confidence: medium. NCRP 95 itself was not fetched.

---

## 4. Radon (Rn-222) and thoron (Rn-220)

### 4.1 (a) Dose conversion from indoor concentration to annual effective dose

General form: E = C_Rn × F × t × DCF.

| Convention | DCF per unit EEC exposure | Per unit radon-gas exposure (F = 0.4) | Annual dose per 1 Bq/m³ (t = 7000 h) | 100 Bq/m³ | 300 Bq/m³ |
|---|---|---|---|---|---|
| **UNSCEAR** (2000; reaffirmed 2008 and 2019) [2][4][5] | 9 nSv per Bq·h·m⁻³ EEC (= 1.6 mSv per mJ·h·m⁻³ = 5.7 mSv/WLM) | 3.6 nSv per Bq·h·m⁻³ | **0.025 mSv** | 2.5 mSv | 7.6 mSv |
| **ICRP 137** (2017) [17][18] | 3 mSv per mJ·h·m⁻³ (≈10 mSv/WLM) for homes and most workplaces | ≈6.7 nSv per Bq·h·m⁻³ (ICRPaedia quotes 6.9) | **0.047 mSv** | 4.7 mSv | 14 mSv |
| ICRP 126 (2014), statement | — | — | — | — | "approximately 10 mSv" for 300 Bq/m³ in homes [16] |
| **Current app (measured path)** | — | — | 0.06 mSv | 6.0 mSv | 18 mSv |
| **Current app (map path)** | — | — | 0.00745 mSv | 0.75 mSv | 2.2 mSv |

Sources and assumptions:

- **UNSCEAR 2019 Annex B §190–191** [5] recommends "the general dose conversion factor of 9 nSv (h Bq m⁻³)⁻¹ EEC of ²²²Rn, which corresponds to 1.6 mSv (mJ h m⁻³)⁻¹ (5.7 mSv WLM⁻¹)". With default equilibrium factors of 0.4 indoors and 0.6 outdoors, this gives "3.6 nSv (h Bq m⁻³)⁻¹ indoors". The Committee "concluded that there is no reason to change the established dose conversion factor".
- UNSCEAR 2008 Annex B §37 [4] keeps the same 9 nSv value.
- The indoor occupancy of 7000 h/yr (0.8 × 8760) and F = 0.4 are UNSCEAR defaults (2000 Annex B [2]).
- ICRP 115 (2010) [15] doubled the lung-cancer risk coefficient to 5 × 10⁻⁴ per WLM. It stated that dose coefficients "will be larger by about a factor of two or more" when computed with ICRP dosimetric models. ICRP 137 then set 3 mSv per mJ·h·m⁻³. The 6.7 nSv figure follows from 3 mSv/(mJ·h·m⁻³) × 5.56 × 10⁻⁶ mJ·m⁻³ per Bq·m⁻³ EEC × 0.4. ICRPaedia [18] quotes 6.9 × 10⁻⁶ mSv per Bq·h·m⁻³.
- RD 1029/2022 does not give a numerical radon dose coefficient. Annex III delegates internal dose coefficients to the CSN, based on ICRP 103-era publications [19].

**Recommendation: E_radon (mSv/yr) = C (Bq/m³) × 0.025** (UNSCEAR: 9 nSv/(Bq·h·m⁻³) EEC, F = 0.4, 7000 h indoors). Reasons:

1. It is the convention behind every comparison number shown in the app: UNSCEAR world 2.4 mSv, the CSN 2010 figures, and EANR Spain 3.1 mSv. Using ICRP 137 for the user but UNSCEAR for the benchmarks would bias the comparison by about 1.9× for radon.
2. UNSCEAR re-examined the question and kept the factor in 2019 [5].
3. It is the non-alarmist central estimate for a public calculator.

Also show a note in "Més informació" that ICRP's newer coefficients (ICRP 137) would give about twice the radon dose. That ratio is the honest scientific uncertainty.

**Flags:**
- Replace `× 0.06` and `× 0.00745` with a single constant of 0.025. With 0.025, the measured-value path and the map path become consistent.
- The 0.06 factor is unsourced. It would equal ICRP 137 only with 8760 h/yr indoors.

### 4.2 (b) CSN radon potential map: URL, categories and representative concentrations

- **Official page (fetched 2026-10-03, working):** https://www.csn.es/mapa-del-potencial-de-radon-en-espana [10].
  - It embeds a public ArcGIS web map, item `ff5b8854417b4816a022d5dff6155e96`, "Mapa del potencial de radón de España". Its description covers the peninsula, Balearics, Ceuta, Melilla and the Canary Islands, and access is "public".
  - CSN asks that the map be cited as **"Mapa del Potencial de Radón de España CSN, 2017"**.
  - A shapefile download is offered on the same page.
- **The link currently used in the app** (`arcgis.com/apps/SimpleViewer/index.html?appid=a3a435cfb6114e21ad03a5ac2961d8a8`) now serves Esri's "Item Replacement" page. Querying the item returns HTTP 403, so it should be considered **dead**. CSN's own "Ver mapa más grande" link still points to it. **Replace it with the CSN page above.**
  - Possible deep link to the public web map: `https://www.arcgis.com/apps/mapviewer/index.html?webmap=ff5b8854417b4816a022d5dff6155e96`. This URL was constructed from the item id and not verified to render.
- **Municipal zoning page:** https://www.csn.es/mapa-de-zonificacion-por-municipio [30]. It shows the priority-action municipalities defined by **CSN Instruction IS-47 (9 April 2025)** [22].
- **What the map shows.** The *radon potential* of an area is the **90th percentile (P90)** of indoor radon concentrations measured on the ground or first floor of buildings in that area. It is based on more than 12,000 dwelling measurements combined with MARNA and the IGME 1:200,000 lithostratigraphic map (CSN INT-04.41, 2019 [9]).
  - The map **replaced the 2013 "Mapa predictivo de exposición al radón"**, which was based only on MARNA.
  - The legend has **five P90 classes**: < 100, 101–200, 201–300, 301–400, > 400 Bq/m³.
- **Representative concentration per class.** CSN INT-04.41 **Table 3** (p. 33; I checked the rendered table) gives the arithmetic mean radon concentration of each mapped class:

| P90 class (Bq/m³) | Arithmetic mean C_Rn (Bq/m³) | App option value (current) | Dose, recommended (×0.025) | Dose, ICRP 137 (×0.047) | Dose, current app (×0.00745) |
|---|---|---|---|---|---|
| < 100 | 38 | 38 ✔ | **0.96 mSv** | 1.8 | 0.28 |
| 101–200 | 67 | 67 ✔ | **1.69 mSv** | 3.1 | 0.50 |
| 201–300 | 93 | 93 ✔ | **2.34 mSv** | 4.3 | 0.69 |
| 301–400 | 117 | 117 ✔ | **2.95 mSv** | 5.5 | 0.87 |
| > 400 | 219 | 219 ✔ | **5.52 mSv** | 10.2 | 1.63 |

- The current option values (219/117/93/67/38) **are correctly sourced** from this table; only the multiplier is wrong. Cite CSN INT-04.41 Table 3 in the UI.
  - Typo in the UI: "entre 101 **y** 200" should read "entre 101 **i** 200".
- **Priority-action zones** are P90 > 300 Bq/m³, covering 88,314 km² of 504,944 km² (about 17 %) [9].
- **CTE DB HS6 zones** (municipal classification for new buildings, INT-04.41 §7.2 [9]; RD 732/2019, DB HS6 Appendix B [21]):
  - **Zone II:** more than 5 % of the urban fabric lies on areas with P90 > 300 Bq/m³.
  - **Zone I:** not Zone II, and either up to 5 % of the urban fabric lies on P90 > 300 areas, or more than 5 % lies on P90 200–300 areas.
  - These zones are a construction-regulation tool and are not suitable as a concentration input for the calculator. Use the five P90 classes.
- **Floor correction (optional, medium-low confidence).**
  - The class means refer to ground or first floors. CSN states that concentrations decrease by "un 20 % por planta" on upper floors (INT-04.41, preamble [9]). The CSN FAQ says that above the second floor it is "muy improbable" to exceed 300 Bq/m³ [29].
  - Suggested UI question: "Vius en planta baixa o primera, o més amunt?" For floor n ≥ 2, multiply by 0.8^(n−1).
  - Basements are higher than the class means.
- **Default when the user knows nothing.** Currently the empty option gives 0 mSv, which must be fixed. Two Spain-specific references, both using the UNSCEAR coefficient:
  - **EANR Table 9-2:** radon dose for Spain = **1.79 mSv/yr** (population-weighted, ground-floor data, 0.8 indoor occupancy) [13]. This implies about 71 Bq/m³. EANR flags it as possibly overestimated because of the ground-floor assumption.
  - **UNSCEAR 2000 Table 24:** Spain indoor radon AM **86 Bq/m³**, GM 42, GSD 3.7, max 15,400 (national survey by Quindós et al.) [2]. This gives 2.2 mSv.
  - **Recommendation:** add a "No ho sé" option defaulting to ≈ 70 Bq/m³ → **1.8 mSv/yr**, labelled "mitjana estimada per a Espanya (Atles Europeu de Radiació Natural, 2019)". Confidence: medium.
- **Thoron:** no Spanish data. Add a fixed **0.10 mSv/yr** (UNSCEAR 2000 Table 31 [2]; EANR [13]), either as part of the radon line ("radó i torò") or as a separate fixed line.

### 4.3 (c) Reference level 300 Bq/m³: where it is legislated

- **Real Decreto 1029/2022**, de 20 de diciembre, *Reglamento sobre protección de la salud contra los riesgos derivados de la exposición a las radiaciones ionizantes* (BOE-A-2022-21682) [19].
  - **Art. 72(a)**: "Para la exposición al radón en recintos cerrados, 300 Bq/m³, en términos del promedio anual de concentración de radón en aire, tanto para las viviendas o los edificios de acceso público como para los lugares de trabajo."
  - Art. 72(b) sets 1 mSv/yr for gamma from building materials.
  - Art. 75 covers workplace measurements.
  - Workers who may exceed 6 mSv/yr from radon are classified as exposed workers.
- **Directive 2013/59/Euratom** [20]:
  - **Art. 74(1)**: national reference levels for indoor radon "no superarán los 300 Bq m⁻³" (annual average).
  - **Art. 54(1)**: the same applies to workplaces.
  - **Art. 103**: national radon action plan. Spain's *Plan Nacional contra el Radón* was approved by the Council of Ministers on 9 January 2024 [31].
- **CTE DB HS6** (Real Decreto 732/2019, BOE-A-2019-18528) [21]: new buildings must limit indoor radon to a reference level of 300 Bq/m³ (annual average), with construction solutions according to Zone I/II municipalities. Mandatory since 24 September 2020.
- **CSN IS-47** (9 April 2025) [22]: list of priority-action municipalities and rules for workplace measurements.
- ICRP 126 [16] recommends an upper derived reference level of 300 Bq/m³ for dwellings.
- **WHO** [24] recommends a national reference level of **100 Bq/m³**, and no more than 300 Bq/m³ where 100 is not achievable.
- A reference level is **not a limit**: it is a value "que se recomienda no superar" (CSN FAQ [29]).

Confidence: high.

### 4.4 (d) Health relevance

- **WHO fact sheet "Radon"** (25 January 2023) [24]:
  - "Radon is estimated to cause between 3% to 14% of all lung cancers in a country, depending on the national average radon level and smoking prevalence."
  - "The risk of lung cancer increases by about 16% per 100 Bq/m³ increase in long time average radon concentration."
  - Smokers are about 25 times more at risk from radon than non-smokers.
- **CSN INT-04.41 (2019)** [9], Spanish primary source:
  - Radon has been classified by IARC as a Group 1 human carcinogen since 1988.
  - "en muchos países representa actualmente la segunda causa de cáncer de pulmón, después del tabaco".
  - "El radón es, no obstante, la primera causa de muerte por cáncer de pulmón en no fumadores".
  - About 9 % of lung-cancer deaths in Europe are attributable to radon (Darby et al. 2005).
- **UNSCEAR 2019 Annex B** [5]: radon and its progeny are established lung carcinogens. One analysis attributed 16.5 % of lung cancer cases in 66 countries (2012) to residential radon.
- The **WHO Handbook on Indoor Radon: A Public Health Perspective** (2009, ISBN 978-92-4-154767-3) is the usual source of the "second leading cause after smoking" wording. **URL not verified** (rate limit); for the "second cause" and "first cause in never-smokers" statements, cite CSN INT-04.41 [9].

Confidence: high.

---

## 5. Reference totals

### 5.1 World averages

- **Natural background: 2.4 mSv/yr** (typical range 1–10 mSv; "sizeable population groups receive 10–20 mSv"). Breakdown:

  | Component | mSv/yr |
  |---|---|
  | Cosmic | 0.39 (ionizing 0.28 + neutrons 0.10 + cosmogenic 0.01) |
  | External terrestrial | 0.48 (outdoors 0.07 + indoors 0.41) |
  | Inhalation | 1.26 (radon 1.15 + thoron 0.10 + U/Th dust 0.006) |
  | Ingestion | 0.29 |

  Sources: UNSCEAR 2000 Annex B Table 31 [2]; UNSCEAR 2008 Vol. I, Table 1 [3]. Confidence: high.
- **Total including medical: ≈3.0 mSv/yr.**
  - UNSCEAR 2008 Vol. I §41 [3]: natural is "just less than 80% of the total per caput effective dose of about 3 mSv". Table 5 gives 3.1 (natural 2.4 + diagnostic medical 0.62 + nuclear medicine 0.031 + fallout 0.005).
  - UNSCEAR 2020/2021 Vol. I §47–48 [6] updated the medical per caput dose to **0.57 mSv** for 2009–2018, giving 2.4 + 0.57 ≈ **3.0 mSv/yr**.
  - High-income countries: medical **1.71 mSv** per caput (Table 3 of that annex).
  - Confidence: high.
- The app currently shows "mitjana anual mundial 2,4 mSv". That is correct for *natural* sources; the UI should say so explicitly ("de fonts naturals").

### 5.2 Spain: the 3.7 mSv figure

- **Source:** CSN (2010), *Dosis de radiación*, SDB-04.07, p. 4 [23]: "la dosis media, para la población española, se ha estimado en un total de 3,7 mSv … De ellos 2,4 mSv (valor medio mundial según el UNSCEAR) se deben a la radiación natural". Verified, so the 3.7 figure **is** a citable CSN statement.
- **But it is not a Spain-specific natural assessment.** The component values in the text are exactly the UNSCEAR 2000 world averages:

  | Component | mSv/yr |
  |---|---|
  | Radon | 1.15 |
  | Cosmic | 0.39 |
  | Terrestrial gamma | 0.48 |
  | Diet | 0.29 |
  | Thoron | 0.10 |
  | Medical (UNSCEAR 2000, health-care level I) | 1.28 |
  | Other | ≈ 0.01 |
  | **Sum** | **3.70** |

- **The leaflet's pie chart is internally inconsistent.** I checked the rendered figure:
  - Slices: medical 35.1 %, radon 31.0 %, terrestrial 12.8 %, cosmic 10.4 %, "alimentos y bebidas" **3.7 %**, thoron 2.7 %, other 0.3 %.
  - The slices sum to 96 %, and 3.7 % of 3.7 mSv = 0.14 mSv contradicts the 0.29 mSv in the text (which would be 7.8 %).
  - **Do not reuse the leaflet's percentages. Use the mSv values in the text.**
- **Best Spain-specific natural total found:** *European Atlas of Natural Radiation* (EC JRC, 2019/2020), **Table 9-2**, population-weighted annual effective dose for **Spain** [13]:

  | Component | mSv/yr |
  |---|---|
  | Cosmic | **0.36** |
  | Terrestrial external | **0.53** |
  | Cosmogenic | 0.01 |
  | Ingestion/inhalation (non-radon) | 0.29 |
  | Radon | **1.79** |
  | Thoron | 0.10 |
  | **Total natural** | **3.08 ≈ 3.1** |

  - The European mean is 3.20 and the world mean 2.41.
  - Radon uses the UNSCEAR coefficient and assumes everyone lives on the ground floor, which EANR flags as a possible overestimate. Cosmogenic, ingestion and thoron are fixed UNSCEAR values.
  - Confidence: medium (the best available, but the radon term is probably an upper bound).
- **Recommendation for consistency with the medical research** (which uses CSN 2.4 natural / 3.7 total):
  - **Option A (minimal change):** keep "Espanya: 3,7 mSv (estimació del CSN, 2010)". Note in "Més informació" that its natural part (2.4) is the world average applied to Spain, and the rest is medical exposure (1.28).
  - **Option B (more accurate):** show "Espanya, fonts naturals: ≈3,1 mSv (Atles Europeu de Radiació Natural, 2019)" plus the medical per caput figure for Spain from the medical research, and give their sum as the Spain total.
    - With CSN's 1.28 medical, the total would be ≈ 4.4 mSv.
    - With UNSCEAR 2020/21's high-income value of 1.71, it would be ≈ 4.8 mSv.
  - **Do not mix** "3.1 natural" and "3.7 total" in the same UI. That would imply only 0.6 mSv medical, which neither source says.
- A user filling in the calculator with the recommended natural values and Spain-typical answers gets ≈ 0.35 + 0.6 + 0.30 + 1.8 + 0.1 ≈ **3.1 mSv** natural. This agrees with EANR 3.08, a good internal-consistency check.

---

## 6. Catalan text for the "Més informació" panels

**Radiació còsmica**
> La radiació còsmica està formada per partícules de molt alta energia que arriben de l'espai i que, en xocar amb l'atmosfera, produeixen una pluja de partícules secundàries (sobretot muons i neutrons), que són les que ens arriben a terra. L'aire ens fa d'escut: al nivell del mar rebem uns 0,3 mSv l'any, i com més amunt vivim, menys aire tenim a sobre i més dosi rebem; a 2.000 m és aproximadament 2,5 vegades la de la costa. Per exemple, viure a Madrid (uns 650 m) suposa només uns 0,1 mSv més l'any que viure a Barcelona, una diferència petita comparada amb el total anual.
> *Font: UNSCEAR 2000, Annex A i B.*

**Radiació terrestre**
> El sòl i les roques contenen, des que es va formar la Terra, petites quantitats d'elements radioactius naturals (urani, tori i potassi-40) que emeten raigs gamma. La dosi depèn de la geologia: les zones granítiques (Galícia, el Sistema Central, Extremadura) en donen més que les zones calcàries i sedimentàries de la costa mediterrània, i com que els materials de construcció surten de la mateixa terra, a dins de casa la dosi sol ser una mica més alta que a fora. La mitjana a Espanya és d'uns 0,6 mSv l'any; a Pontevedra (1,2 mSv) és gairebé quatre vegades la de Múrcia (0,3 mSv), i totes dues són situacions completament normals.
> *Font: CSN, Projecte MARNA (2000); UNSCEAR 2000.*

**Radiació interna (aliments i aigua)**
> El nostre cos conté de manera natural elements radioactius que incorporem amb el menjar i l'aigua: sobretot potassi-40 (una petita part de tot el potassi, un element imprescindible per a la vida) i, en menor mesura, elements de les famílies de l'urani i el tori, com el poloni-210, a més del carboni-14. El cos regula la quantitat de potassi que conté, de manera que aquesta dosi és pràcticament igual per a tothom: uns 0,3 mSv l'any. Per això menjar més plàtans (rics en potassi) no augmenta la dosi: el cos n'elimina l'excés.
> *Font: UNSCEAR 2000, Annex B, taula 31; CSN (2010).*

**Radó**
> El radó és un gas radioactiu natural, sense olor ni color, que es forma a partir de l'urani present al sòl i a les roques. A l'aire lliure es dilueix, però pot acumular-se dins dels edificis, sobretot a plantes baixes i soterranis mal ventilats i en zones granítiques; per això és la font natural que més dosi aporta, aproximadament la meitat del total natural. Segons el Consell de Seguretat Nuclear, és la segona causa de càncer de pulmó després del tabac i la primera en persones que no fumen, i el risc és molt més gran si es fuma. La bona notícia és que es pot mesurar fàcilment amb un detector durant uns mesos i, si cal, reduir-lo ventilant o amb solucions constructives; a Espanya el nivell de referència és de 300 Bq/m³ de mitjana anual.
> *Fonts: CSN, Cartografía del potencial de radón de España (2019); OMS (2023); RD 1029/2022, art. 72.*

**Mapa del potencial de radó (com triar l'opció)**
> El mapa del CSN classifica cada zona segons el seu "potencial de radó": el valor que només supera el 10 % dels edificis de la zona (mesurat a planta baixa o primera). Tria la categoria de la teva zona i la calculadora farà servir la concentració mitjana dels edificis d'aquella categoria. Si vius en un pis alt, el radó sol ser més baix (aproximadament un 20 % menys per cada planta), i l'única manera de saber el valor real de casa teva és mesurar-lo.
> *Font: CSN INT-04.41 (2019), taula 3.*

**Valors de referència (comparació)**
> Tothom rep radiació de fonts naturals: la mitjana mundial és de 2,4 mSv l'any i, si hi afegim les proves mèdiques, d'uns 3 mSv. A Espanya la dosi natural és una mica més alta que la mitjana mundial (al voltant de 3 mSv l'any), sobretot pel radó i per les zones granítiques. Hi ha regions del món on grups importants de població reben de manera natural entre 10 i 20 mSv l'any.
> *Fonts: UNSCEAR 2008 i 2020/2021; Atles Europeu de Radiació Natural (2019).*

**(Només si es manté l'opció) Corones de porcellana o dents falses**
> Fins a mitjan anys 80, alguns fabricants afegien quantitats molt petites d'urani a la porcellana dental perquè s'assemblés més a les dents naturals. La dosi que això suposa per a tot el cos és menyspreable (menys de 0,001 mSv l'any) i les pròtesis actuals ja no en porten.
> *Font: NCRP Report 95 (1987), segons la Health Physics Society.*

**Errors in the current descriptive texts (flags):**
- Cosmic: "Les partícules primàries són les que constitueixen la major part de la dosi" is **incorrect**. At ground level, the dose comes mainly from *secondary* particles (muons ~80 % of the ionizing component, plus neutrons) (UNSCEAR 2000 Annex B §19 [2]).
- Internal: "El potassi-40 emet radiació gamma quan es desintegra" is incomplete. K-40 decays mostly by beta emission (~89 %); only ~11 % of decays emit a gamma ray. The internal dose is mostly from the beta particles.
- Radon: "Això fa que el radó sigui més perillós que qualsevol altra font de radiació natural" is better phrased as "és la font natural que més contribueix a la dosi".

---

## 7. Bibliography (numbered; "fetched" = downloaded and read on 2026-10-03/04)

1. UNSCEAR (2000). *Sources and Effects of Ionizing Radiation. UNSCEAR 2000 Report, Vol. I, Annex A: Dose assessment methodologies.* United Nations, New York. §45–59 (eq. 12–14; 0.7 Sv/Gy; occupancy 0.8). https://www.unscear.org/unscear/uploads/documents/publications/UNSCEAR_2000_Annex-A.pdf (fetched)
2. UNSCEAR (2000). *UNSCEAR 2000 Report, Vol. I, Annex B: Exposures from natural radiation sources.* §17–31 (cosmic); Table 7 (Spain 76/110 nGy/h, ratio 1.4); Table 24 (Spain radon AM 86, GM 42 Bq/m³); Table 31 (world averages); soil-to-dose coefficients 0.462/0.604/0.0417 nGy/h per Bq/kg. https://www.unscear.org/unscear/uploads/documents/publications/UNSCEAR_2000_Annex-B.pdf (fetched)
3. UNSCEAR (2010). *Sources and Effects of Ionizing Radiation. UNSCEAR 2008 Report, Vol. I* (Report to the General Assembly, Table 1; Annex A §41 and Table 5). https://www.unscear.org/unscear/uploads/documents/unscear-reports/UNSCEAR_2008_Report_Vol.I-CORR.pdf (fetched)
4. UNSCEAR (2010). *UNSCEAR 2008 Report, Vol. I, Annex B: Exposures of the public and workers from various sources of radiation*, §36–37. https://www.unscear.org/unscear/uploads/documents/publications/UNSCEAR_2008_Annex-B-CORR2.pdf (fetched)
5. UNSCEAR (2020). *Sources, Effects and Risks of Ionizing Radiation. UNSCEAR 2019 Report, Annex B: Lung cancer from exposure to radon*, §1–3, §182, §190–191 (pp. 257–259). https://www.unscear.org/unscear/uploads/documents/publications/UNSCEAR_2019_Annex-B.pdf (fetched)
6. UNSCEAR (2022). *UNSCEAR 2020/2021 Report, Vol. I, Annex A: Evaluation of medical exposure to ionizing radiation*, §47–48 and Table 3 (0.57 mSv global; 1.71 mSv high-income). https://www.unscear.org/unscear/uploads/documents/unscear-reports/UNSCEAR_2020_21_Report_Vol.I.pdf (fetched)
7. Suárez Mahou, E. (CSN), Fernández Amigot, J.Á. (ENUSA), Baeza Espasa, A. (Univ. Extremadura), Moro Benito, M.C. (Univ. Salamanca), et al. (2000). *Proyecto MARNA. Mapa de radiación gamma natural.* CSN, Colección Informes Técnicos, ref. INT-04.02. Table 2.27 (soils by region, p. 50); Table 3.34 (units, p. 56); Table 3.35 (p. 57); measurement corrections (pp. 65–67); **Table 4.37 (provincial means, p. 76)**. https://www.csn.es/documents/10182/27786/INT-04-02+Proyecto+Marna.+Mapa+de+radiaci%C3%B3n+gamma+natural/6185a9df-6c24-4ac1-8d8d-197003e09401 (fetched; scanned PDF, read visually, including the title-page author list)
8. CSN. *FDE-02.01 — MARNA. Mapa de radiación gamma natural de España* (fact sheet; mean 8.7 µR/h; "1 µR/h = 0,01 µSv/h"). https://www.csn.es/documents/10182/914801/FDE-02.01%20-%20MARNA%20Mapa%20de%20radiaci%C3%B3n%20gamma%20natural%20de%20Espa%C3%B1a (fetched)
9. García-Talavera San Miguel, M., López Acevedo, F.J. (2019). *Cartografía del potencial de radón de España.* CSN, Colección Informes Técnicos 51.2019, ref. INT-04.41. Preamble; §1; §4–5 (P90 definition; Canary Islands; Ceuta and Melilla, fig. 13); §6 **Table 3** (p. 33); §7.2 (Zone I/II). https://www.csn.es/documents/10182/27786/INT-04.41+Cartograf%C3%ADa+del+potencial+de+rad%C3%B3n+de+Espa%C3%B1a (fetched)
10. CSN. *Mapa del potencial de radón en España* (web page with embedded public ArcGIS web map, item ff5b8854417b4816a022d5dff6155e96; cite as "Mapa del Potencial de Radón de España CSN, 2017"). https://www.csn.es/mapa-del-potencial-de-radon-en-espana (fetched). Item metadata: https://www.arcgis.com/sharing/rest/content/items/ff5b8854417b4816a022d5dff6155e96?f=json (fetched, public). The old SimpleViewer link https://www.arcgis.com/apps/SimpleViewer/index.html?appid=a3a435cfb6114e21ad03a5ac2961d8a8 was fetched and now returns Esri's "Item Replacement" page; the item returns 403.
11. Arnedo, M.A., Rubiano, J.G., Alonso, H., Tejera, A., González, A., González, J., Gil, J.M., Rodríguez, R., Martel, P., Bolívar, J.P. (2017). Mapping natural radioactivity of soils in the eastern Canary Islands. *Journal of Environmental Radioactivity* 166: 242–258. doi:10.1016/j.jenvrad.2016.07.010. Metadata: https://produccioncientifica.uhu.es/documentos/6038cf3b8bf77e384d5b44a8 (fetched). Abstract with per-island dose rates: https://redi.cedia.edu.ec/document/346022 (fetched). Full text not verified.
12. Martín Luis, M.C., López Pérez, M., Hernández, F., Liger, E., Fernández Aldecoa, J.C., Lorenzo Salazar, J.M., Hernández Armas, J., Salazar Carballo, P.A. (2021). Natural and artificial gamma-emitting radionuclides in volcanic soils of the Western Canary Islands. *Journal of Geochemical Exploration* 229: 106840. doi:10.1016/j.gexplo.2021.106840. https://riull.ull.es/xmlui/handle/915/35724?show=full (fetched, abstract)
13. Cinelli, G., De Cort, M., Tollefsen, T. (eds.) (2019; online edition 2020). *European Atlas of Natural Radiation.* Publications Office of the European Union, Luxembourg. ISBN 978-92-76-08259-0, doi:10.2760/520053. Chapter 8 (cosmic, eqs. 8-1/8-2, §8.1.3); Chapter 9, **Table 9-2** (Spain row). Chapter PDFs: https://remon.jrc.ec.europa.eu/About/Atlas-of-Natural-Radiation/Download-page (fetched; ch. 8 and 9 downloaded). Repository record: https://publications.jrc.ec.europa.eu/repository/handle/JRC116795 (fetched)
14. Cinelli, G., Gruber, V., De Felice, L., Bossew, P., Hernández-Ceballos, M.A., Tollefsen, T., Mundigl, S., De Cort, M. (2017). European annual cosmic-ray dose: estimation of population exposure. *Journal of Maps* 13(2): 812–821. doi:10.1080/17445647.2017.1384934. https://www.tandfonline.com/doi/full/10.1080/17445647.2017.1384934 (URL not verified: HTTP 403; content cross-checked through EANR ch. 8 [13])
15. ICRP (2010). *Lung Cancer Risk from Radon and Progeny and Statement on Radon.* ICRP Publication 115. Ann. ICRP 40(1). https://www.icrp.org/publication.asp?id=ICRP%20Publication%20115 (fetched, abstract)
16. ICRP (2014). *Radiological Protection against Radon Exposure.* ICRP Publication 126. Ann. ICRP 43(3). https://www.icrp.org/publication.asp?id=ICRP%20Publication%20126 (fetched, abstract)
17. ICRP (2017). *Occupational Intakes of Radionuclides: Part 3.* ICRP Publication 137. Ann. ICRP 46(3/4). https://www.icrp.org/publication.asp?id=ICRP%20Publication%20137 (fetched; the abstract does not state the coefficient, which was taken from [18])
18. ICRPaedia. *Calculating Radon Doses* (quotes ICRP 137: 3 mSv per mJ·h·m⁻³; 6.9 × 10⁻⁶ mSv per Bq·h·m⁻³ with F = 0.4). https://icrpaedia.org/Calculating_Radon_Doses (fetched)
19. Real Decreto 1029/2022, de 20 de diciembre, por el que se aprueba el Reglamento sobre protección de la salud contra los riesgos derivados de la exposición a las radiaciones ionizantes. BOE-A-2022-21682. Art. 72, 75; Anexo III. https://www.boe.es/buscar/act.php?id=BOE-A-2022-21682 (fetched)
20. Directiva 2013/59/Euratom del Consejo, de 5 de diciembre de 2013 (normas de seguridad básicas). DOUE L 13, 17.1.2014. Art. 54(1), 74(1), 103. Official: https://eur-lex.europa.eu/eli/dir/2013/59/oj (URL not verified: blocked to automated access). Text verified on https://noticias.juridicas.com/base_datos/Admin/520923-directiva-2013-59-euratom-de-5-dic-normas-seguridad-basicas-para-proteccion.html (fetched)
21. Real Decreto 732/2019, de 20 de diciembre, por el que se modifica el Código Técnico de la Edificación (new DB HS6 "Protección frente a la exposición al radón"; Appendix B municipalities). BOE-A-2019-18528. https://www.boe.es/buscar/act.php?id=BOE-A-2019-18528 (fetched)
22. CSN. Instrucción IS-47, de 9 de abril de 2025, por la que se aprueba el listado de términos municipales de actuación prioritaria contra el radón… https://www.boe.es/eli/es/ins/2025/04/09/is47 (fetched)
23. CSN (2010). *Dosis de radiación.* Serie divulgativa, ref. SDB-04.07. Pp. 4–10. https://www.csn.es/documents/10182/914805/Dosis%20de%20radiaci%C3%B3n (fetched)
24. WHO (2023, 25 January). *Radon* (fact sheet). https://www.who.int/news-room/fact-sheets/detail/radon-and-health (fetched)
25. WHO (2009). *WHO Handbook on Indoor Radon: A Public Health Perspective.* ISBN 978-92-4-154767-3. https://www.who.int/publications/i/item/9789241547673 (URL not verified: rate limit)
26. American Nuclear Society. *Radiation Dose Calculator* (origin of the app's cosmic bands 26–96 mrem, food 40 mrem, radon 200 mrem, crowns 0.07 mrem). https://www.ans.org/nuclear/dosechart/ (fetched)
27. Health Physics Society. *Ask the Experts*, Q8568 (dental porcelain; NCRP 95). https://hps.org/publicinformation/ate/q8568.html (fetched)
28. ORAU Health Physics Museum. *Uranium Containing Dentures (ca. 1960s, 1970s).* https://orau.org/health-physics-museum/collection/consumer/ceramics/uranium-containing-dentures.html (fetched)
29. CSN. *Preguntas frecuentes sobre el radón en viviendas.* https://www.csn.es/preguntas-frecuentes-sobre-el-radon-en-viviendas (fetched)
30. CSN. *Mapa de zonificación por municipio de radón.* https://www.csn.es/mapa-de-zonificacion-por-municipio (fetched)
31. Ministerio de Sanidad (2024, 9 January). *El Consejo de ministros aprueba el Plan Nacional contra el Radón* (press note). https://www.sanidad.gob.es/gabinete/notasPrensa.do?id=6317 (fetched; the plan PDF links found were 404)
32. CSN. *Mapa de radiación gamma natural en España (MARNA)* (web page; coverage excludes both archipelagos, Ceuta and Melilla). https://www.csn.es/mapa-de-radiacion-gamma-natural-en-espana-marna (fetched)

---

## 8. Open questions and uncertainties

1. **Radon coefficient (editorial decision).** UNSCEAR's 0.025 mSv per Bq/m³ is recommended for consistency with all benchmarks. ICRP 137 gives about 1.9× more. Decide whether the UI should show only UNSCEAR (with a note) or both. The scientific uncertainty is about a factor of 2 either way (UNSCEAR 2019 reviewed dosimetric DCFs of 7–34 nSv per Bq·h·m⁻³ EEC).
2. **Radon default (≈1.8 mSv).** Based on EANR's ground-floor assumption, so probably an upper bound for a population that mostly lives in flats. A floor question (×0.8 per floor above the first) would improve it. Alternatively use the UNSCEAR 2000 GM of 42 Bq/m³ (→ 1.1 mSv) as a "typical" value instead of the AM.
3. **CSN class means (38–219 Bq/m³)** refer to ground/first floors and to measurements of at least 3 months outside summer, which may slightly overestimate annual means. CSN says the map will be updated periodically. The current public version is labelled 2017 (report 2019); check for a newer edition before release.
4. **Outdoor radon** (UNSCEAR ≈ 0.1 mSv) is not included; **thoron** is added as a fixed 0.1 mSv. Both are world defaults; there are no Spanish data.
5. **Balears terrestrial (0.41 mSv)** is low confidence: it is based on 11 Mallorca soil samples and nothing for the other islands. Improvement: extract province means from the EANR terrestrial gamma dose rate raster (10 km cells, REMON) or ask the CSN.
6. **Ceuta (≈0.99) and Melilla (≈0.56)** were read by eye from a map figure. They are indicative only.
7. **Las Palmas**: the area mean (0.35) and the population-weighted mean (≈0.50) differ substantially. Per-island options are recommended. The Tenerife (~89 nGy/h) and La Palma (102.7 nGy/h) values come from search abstracts, not verified full texts.
8. **MARNA provincial values are area means, not population-weighted.** Example: Madrid province 12.74 µR/h includes the granitic Sierra; the city on sediments is probably lower. A future version could use municipality-level data (CSN radon/MARNA shapefile).
9. **Indoor/outdoor ratio 1.4** is a national value. Granite houses (Galicia) or wooden or light houses would differ. Individual variation is about ±50 % or more.
10. **Cosmic latitude effect**: using 65 µSv neutrons slightly overestimates the dose for the Canary Islands (≈ −0.03 mSv) and southern Andalusia (≈ −0.01). This is negligible but could be added as a correction for the Canaries.
11. **Internal 0.29** is the world average. Spain's high seafood consumption (Po-210) could raise it; CSN mentions up to +50 % for heavy shellfish consumers. No Spain-specific dietary dose assessment was found.
12. **Spain total (3.7)**: needs a joint decision with the medical research (see §5.2, options A/B).
13. **Sources not fully verified:**
    - WHO Handbook 2009 URL (rate limit).
    - Cinelli et al. 2017 (HTTP 403; covered by EANR).
    - EUR-Lex official text (blocked; verified on a mirror).
    - NCRP 95 itself (cited via HPS/ORAU).
    - ICRP 137 coefficient taken from ICRPaedia (6.9) and my calculation (6.7), not from the ICRP PDF.
14. **Code-level issues to fix alongside the values** (not changed here; out of scope):
    - `getCosmicRad()` adds the band value to a base of 0.26.
    - `getInternalRad()` uses 0.4.
    - The radon empty option gives 0.
    - The two radon factors are inconsistent.
    - The "provincia (peninsular)" wording excludes the islands.
