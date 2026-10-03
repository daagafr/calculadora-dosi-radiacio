# 02 — Fonts: exposicions mèdiques (radiologia, TC, intervencionisme, medicina nuclear, dental)

Research notes for rebuilding the "Radiació mèdica" section of the calculator (`index.html` + `js/medrad.js` `multiplierMap`).
Research date: 2026-10-03. Scope: diagnostic radiology, CT, interventional, nuclear medicine, dental, and the pregnancy/fetus sections.

**Conventions**
- Numbers in tables use a decimal **point** (same as `multiplierMap`). The Catalan UI texts (section 7) use a decimal **comma**.
- "mSv" = effective dose to the adult patient (ICRP 103 tissue weighting unless the source says otherwise). "mGy" = absorbed dose (used only for the embryo/fetus).
- `[n]` = reference number in the bibliography (section 8). Every reference states whether its URL was actually fetched during this research.
- Confidence: **high** = Spanish national survey and/or several authoritative sources agree; **medium** = one authoritative source, or sources disagree by more than about 2x; **low** = value built by us, or a catch-all with very wide variability.
- "≈ natural background" uses 2.4 mSv/year (CSN [19]: average natural dose for the Spanish population, taken from the UNSCEAR world average), so 1 day ≈ 0.0066 mSv. **If the natural-radiation module of the app ends up using a different figure, these comparisons must be recomputed so the whole app stays consistent** (see Open questions).

---

## 0. Summary of the most important findings

1. **Spain has its own recent national data, and they should be the primary source.**
   - DOPOES II (CSN–Universitat de Màlaga–Ministeri de Sanitat, report 2022, data 2017) gives the mean effective dose for the 20 X-ray/CT/interventional exams that contribute most to the population dose (the European "Top 20") [1].
   - DOMNES (CSN–Ministeri de Sanitat–SEMNIM, 2014, data 2011) does the same for nuclear medicine [2].
   - The European report EC RP 180 [3] and Mettler et al. 2008 [5] serve as cross-checks.
2. **Several current values are clearly wrong:**
   - Hepatobiliary scan 0.05 → about 3.1 mSv (about 60x too low).
   - Renogram DTPA 3.63 / MAG3 5.2 → about 1.1 mSv.
   - Mammography 0.13 → 0.25.
   - Coronary angiography 4.6 → 7.6.
   - "PTCA (estudi del cor)" 7.5 → 17. It is also mislabelled: PTCA is a treatment (angioplasty), not a study.
   - Barium meal/follow-through 3 → 4.7 / 9.3.
   - Thoracic spine series 1.4 → 0.3.
   - Extremities 0.06 → 0.005.
   - "Cor – Tc pertechnetate 14.3": no source supports this item.
   - Tumour Ga-67 10: sources give 15–23, and the exam is now largely obsolete.
3. **Code bugs** (section 3.3):
   - The IVU multiplier is `0.06` while its label says 2.5 mSv.
   - The fetal lung-ventilation multiplier is `7` while its label says 0.54.
   - Per-view items plus "series" items for the same body region allow double counting.
4. **The two pregnancy/fetus groups must be removed from the annual-dose sum** (section 4). Their numbers are absorbed doses to the embryo/fetus in mGy (taken from fetal-dose tables such as Russell et al. 1997), not effective doses to the user. Adding them to the user's mSv total is a category error. Keep them, at most, as an informative panel with ICRP 84 context.
5. **Context numbers:**
   - Spain: radiodiagnostic about 1.19 mSv per person per year (2017) [1] plus nuclear medicine about 0.07 mSv (2011) [2], so about 1.2–1.3 mSv per person per year.
   - Europe: about 1.1 mSv [3][4].
   - World: about 0.57 mSv [7][8].
   - CT accounts for more than half of the medical collective dose [4][7].
   - Doses for the same exam vary 3–40 times between countries or hospitals [3][10].

---

## 1. Method: how each recommended value was chosen

Values are listed in order of priority. For each item the recommended value comes from the highest available source in this list, and the other sources are shown as cross-checks.

1. **Spanish national surveys (CSN)**
   - DOPOES II [1]: Table 4.1, "D. Efectiva Media (mSv)" per Top-20 group, Spain 2017.
   - DOMNES [2]: Table 9, effective dose per nuclear-medicine study, Spain 2011, computed with ICRP 53/80/106/128 coefficients.
   - Values are rounded to 2 significant figures.
2. **EC Radiation Protection 180 (2014/2015)** [3]: typical effective dose per exam in 36 European countries (Spain row, European mean, min–max). Tables 5.10–5.13 and 5.33.
3. **Mettler et al. 2008 catalog** [5]: average effective dose and the range reported in the literature (Tables 1–5).
4. **Modern exams not covered by 1–3**:
   - PET-TC: Spanish single-centre study [9].
   - CT coronary angiography: PROTECTION VI registry [10].
   - Low-dose lung CT: ESTI/ESR practice recommendations [11].
   - Dental: ADA/JADA 2024 [12] and the Ludlow 2015 CBCT meta-analysis [13].
   - RadiologyInfo.org (ACR/RSNA, reviewed April 2025) [6] as the public-facing cross-check.

**Important caveat to show in the app.** Effective dose is an age- and sex-averaged quantity for a reference adult.
- It is suitable for comparing exams with each other and with natural background.
- It must not be used to estimate an individual's personal cancer risk [5, p. 255; 16].
- Mettler et al. note an uncertainty of about 40% for a reference patient. Reported values usually vary by about ±50%, and much more for fluoroscopy and interventional procedures [5, pp. 256–258].

---

## 2. Proposed exam list

### 2.1 Core list (30 items, recommended for the main UI)

"Range" = spread reported in the cited sources: between-country min–max from RP 180 [3] and/or the literature range from Mettler [5]. Patient-to-patient and hospital-to-hospital variation can be larger.

| # | Group (UI) | id suggestion | Catalan label (Spanish/common name) | Recommended mSv | Typical range (mSv) | ≈ natural background | Source values (ref, table/page) | Conf. |
|---|---|---|---|---|---|---|---|---|
| 1 | Radiografia convencional | `rxTorax` | Radiografia de tòrax (placa de tórax, 1 o 2 projeccions) | **0.04** | 0.01–0.26 | ~6 dies | [1] T4.1: 0.04 ± 0.01 · [3] T5.10: ES 0.06, EU mean 0.10 (0.01–0.26) · [5] T1: PA 0.02; PA+lat 0.1 · [6] 0.1 | high |
| 2 | Radiografia convencional | `rxColumnaCervicalDorsal` | Radiografia de columna cervical o dorsal | **0.2** | 0.02–2.0 | ~1 mes | [1] T4.1: cervical 0.17 ± 0.02; dorsal 0.27 ± 0.05 (frequency-weighted mean 0.22) · [3] T5.10: EU cervical 0.19, dorsal 0.64 · [5] T1: 0.2 / 1.0 | medium |
| 3 | Radiografia convencional | `rxColumnaLumbar` | Radiografia de columna lumbar | **1.8** | 0.29–3.15 | ~9 mesos | [1] T4.1: 1.76 ± 0.42 · [3] T5.10: ES 0.89, EU 1.23 (0.29–3.15) · [5] T1: 1.5 (0.5–1.8) · [6] 1.4 | high |
| 4 | Radiografia convencional | `rxAbdomen` | Radiografia d'abdomen | **0.8** | 0.11–2.9 | ~4 mesos | [1] T4.1: 0.79 ± 0.12 · [3] T5.10: ES 0.69, EU 0.90 (0.11–2.93) · [5] T1: 0.7 | high |
| 5 | Radiografia convencional | `rxPelvisMaluc` | Radiografia de pelvis o maluc (cadera) | **0.4** | 0.2–2.7 | ~2 mesos | [1] T4.1: 0.43 ± 0.12 · [3] T5.10: ES 0.55, EU 0.71 (0.21–2.0) · [5] T1: pelvis 0.6, hip 0.7 (0.18–2.71) | high |
| 6 | Radiografia convencional | `rxExtremitats` | Radiografia d'extremitats (mà, peu, genoll, espatlla…) | **0.005** | <0.001–0.01 | <1 dia | [5] T1: shoulder 0.01, knee 0.005, other extremities 0.001 (0.0002–0.1) · [6] <0.001 | medium |
| 7 | Mamografia i densitometria | `mamografia` | Mamografia (cribratge, 2 projeccions per mama; també tomosíntesi) | **0.25** | 0.02–0.6 | ~5 setmanes | [1] T4.1: 0.25 ± 0.04 · [3] T5.10: ES 0.28, EU 0.27 (0.02–0.60) · [6] digital 0.28, tomosynthesis 0.34 · [5] T1: 0.4 (0.10–0.60) | high |
| 8 | Mamografia i densitometria | `densitometria` | Densitometria òssia (DXA / DEXA) | **0.001** | 0.001–0.035 | ~4 hores | [5] T1: 0.001 (0.001–0.035) · [6] 0.001 | high |
| 9 | Radiologia dental | `dentalIntraoral` | Radiografia dental intraoral (periapical o d'aleta de mossegada / *bitewing*) | **0.005** | 0.0003–0.01 | <1 dia | [5] T4: 0.005 (0.0002–0.010) · [6] 0.005 · [12] T1: 4 bitewings 3.4–5.0 µSv | high |
| 10 | Radiologia dental | `dentalPanoramica` | Ortopantomografia (radiografia panoràmica dental) | **0.02** | 0.007–0.09 | ~3 dies | [12] T1: panoramic CCD 14–30 µSv, PSP 19–75 µSv · [5] T4: 0.01 (0.007–0.090) · [6] 0.025 | medium–high |
| 11 | Radiologia dental | `dentalCbct` | TC de feix cònic dental (CBCT, «TAC dental» 3D) | **0.1** | 0.005–1.1 | ~2 setmanes | [13] mean adult standard protocol: small FOV 84 µSv, medium 177 µSv, large 212 µSv; full ranges 5–1073 µSv · [12] T1: small FOV 19–652 µSv · [6] 0.18 | medium |
| 12 | Proves amb contrast (fluoroscòpia) | `fluoroEsofagogastroduodenal` | Trànsit esofagogastroduodenal amb bari (esofagograma, «papilla de bario») | **4.7** | 0.8–15 | ~2 anys | [1] T4.1 "Gastro-duodenal": 4.7 ± 1.5 · [3] T5.11 Ba meal: ES 4.9, EU 6.2 (0.8–15) · [5] T1 UGI: 6 (1.5–12) · [6] 6 | medium–high |
| 13 | Proves amb contrast (fluoroscòpia) | `fluoroTransitIntestinal` | Trànsit intestinal amb bari | **9.3** | 0.6–25 | ~4 anys | [1] T4.1: 9.3 ± 2.8 · [3] T5.11 Ba follow-through: ES 7.7, EU 7.2 (0.63–24.5) · [5] T1 small bowel: 5 (3.0–7.8) | medium |
| 14 | Proves amb contrast (fluoroscòpia) | `fluoroEnemaOpac` | Ènema opac (enema de bario) | **8.5** | 2.2–25 | ~3,5 anys | [1] T4.1: 8.5 ± 2.7 · [3] T5.11: ES 8.3, EU 8.5 (2.2–25.2) · [5] T1: 8 (2.0–18.0) · [6] 6 | high |
| 15 | Proves amb contrast (fluoroscòpia) | `fluoroUrografia` | Urografia intravenosa (UIV, pielografia) | **1.9** | 0.4–5.6 | ~10 mesos | [1] T4.1: 1.9 ± 0.6 · [3] T5.11: ES 2.5, EU 2.9 (0.43–5.63) · [5] T1: 3 (0.7–3.7) · [6] 3 | medium–high |
| 16 | TC (escàner) | `tcCap` | TC de cap (TAC cranial) | **2.0** | 0.3–4 | ~10 mesos | [1] T4.1: 2.0 ± 0.3 · [3] T5.12: ES 2.0, EU 1.9 (0.28–3.98) · [5] T2: 2 (0.9–4.0) · [6] 1.6 | high |
| 17 | TC (escàner) | `tcTorax` | TC de tòrax | **8.0** | 2–20 | ~3,3 anys | [1] T4.1: 8.0 ± 1.8 · [3] T5.12: ES 4.4, EU 6.6 (2.0–20.4) · [5] T2: 7 (4.0–18.0) · [6] 6.1 | high |
| 18 | TC (escàner) | `tcToraxBaixaDosi` | TC de tòrax de baixa dosi (cribratge de càncer de pulmó) | **1** | ≤1–1.5 | ~5 mesos | [11] ESTI target: effective dose "below 1 mSv" · [6] 1.5 | medium |
| 19 | TC (escàner) | `tcAbdomen` | TC d'abdomen o d'abdomen i pelvis | **14** | 2.6–29 | ~6 anys | [1] T4.1: 13.8 ± 2.5 · [3] T5.12: ES 10.0, EU 11.3 (2.6–28.7) · [5] T2: 8 (3.5–25) · [6] abd+pelvis 7.7; with and without contrast 15.4 | medium (see note a) |
| 20 | TC (escàner) | `tcToracoabdominal` | TC de tòrax, abdomen i pelvis (TC «de tronc», seguiment oncològic) | **16** | 2.4–50 | ~6,5 anys | [1] T4.1 "TC tronco": 15.8 ± 3.6 · [3] T5.12 CT trunk: ES 15.8, EU 14.8 (2.4–50.5) | medium–high |
| 21 | TC (escàner) | `tcColumna` | TC de columna | **11** | 1.5–16 | ~4,5 anys | [1] T4.1: 11.1 ± 2.2 · [3] T5.12: ES 8.9, EU 7.7 (2.4–16.3) · [5] T2: 6 (1.5–10) · [6] 8.8 | medium |
| 22 | TC (escàner) | `tcCoronari` | Angio-TC coronària (TAC de coronàries) | **4** | ~1.5–9 | ~1,7 anys | [10] median DLP 195 mGy·cm (IQR 110–338); 37-fold variation between hospitals; converted with k = 0.014–0.026 mSv/(mGy·cm) → 2.7–5.1 mSv (see note b) · [6] 8.7 (US) · [5] T2: 16 (2008 scanners) | medium |
| 23 | Intervencionisme | `intCoronariografia` | Coronariografia diagnòstica (cateterisme cardíac) | **7.6** | 2–16 | ~3 anys | [1] T4.1 "Angiografía cardíaca": 7.6 ± 2.6 · [3] T5.11: ES 4.9, EU 7.7 (3.3–11.3) · [5] T3: 7 (2.0–15.8) | medium–high |
| 24 | Intervencionisme | `intAngioplastia` | Angioplàstia coronària amb stent (ACTP, «cateterisme amb stent») | **17** | 4–57 | ~7 anys | [1] T4.1 PTCA: 16.8 ± 5.7 · [3] T5.11: ES 19.0, EU 15.2 (4.0–29.0) · [5] T3: 15 (6.9–57) | medium |
| 25 | Medicina nuclear | `nmOssia` | Gammagrafia òssia (gammagrafía ósea) | **4.4** | 3–6.3 | ~1,8 anys | [2] T9: 4.4 (5.7×10⁻³ mSv/MBq) · [3] T5.33: EU 3.8 · [5] T5: 6.3 | high |
| 26 | Medicina nuclear | `nmPerfusioMiocardica` | Gammagrafia de perfusió miocàrdica (SPECT cardíac, repòs i esforç) | **11** | 9–13 (Tc-99m) | ~4,5 anys | [2] T9: sestamibi rest 7.2 + stress 5.7 = 12.9; tetrofosmin 5.6 + 4.9 = 10.5 · [5] T5: sestamibi 1-day 9.4, 2-day 12.8, tetrofosmin 11.4 (Tl-201 stress–rest 40.7, see note c) | medium |
| 27 | Medicina nuclear | `nmPetTc` | PET-TC amb FDG (PET-TAC) | **16** | 5–35 | ~6,5 anys | [9] Spain (CUN), torso FDG protocol 16.5 ± 4.5 mSv (6.1 PET + 10.3 CT); CT part ranged 5.3–34.9 · [2] T9: FDG PET part only 6.4 · [6] 22.7 (US whole-body protocol) | medium |
| 28 | Medicina nuclear | `nmTiroide` | Gammagrafia de tiroide (Tc-99m) | **2.8** | 2–4.8 | ~1,2 anys | [2] T9: 2.8 · [3] T5.33: EU 2.0 · [5] T5: 4.8 (370 MBq) | medium–high |
| 29 | Medicina nuclear | `nmPulmonar` | Gammagrafia pulmonar de perfusió, amb o sense ventilació (gammagrafía V/Q) | **2.5** | 1.8–3 | ~1 any | [2] T9: perfusion (MAA) 2.3 · [3] T5.33: EU perfusion 1.8 · [5] T5: perfusion 2.0 + ventilation 0.2 (DTPA aerosol) / 0.5 (Xe-133) | medium |
| 30 | Medicina nuclear | `nmRenal` | Estudi renal isotòpic (renograma MAG3/DTPA o gammagrafia DMSA) | **1.2** | 0.8–3.3 | ~6 mesos | [2] T9: MAG3 1.1, DTPA 1.1, DMSA 1.2 · [3] T5.33: EU 0.8–1.2 · [5] T5: DTPA 1.8, MAG3 2.6, DMSA 3.3 | high |

Notes:
- **(a) CT abdomen.** The Spanish mean (13.8 mSv) is higher than the international single-phase figures (about 8–11 mSv). It reflects real Spanish practice, which includes multiphase contrast studies. Recommended because it is the best estimate for a user who "had an abdominal CT in Spain". Show the range.
- **(b) CT coronary angiography.** PROTECTION VI reports DLP, not effective dose. The conversion factor is our assumption, not taken from [10]:
  - 0.014 mSv/(mGy·cm) is the classic adult chest k-factor;
  - about 0.026 is the cardiac-specific factor proposed in the literature;
  - k-factor sources were not fetched during this research.
- **(c) Myocardial perfusion with thallium-201.** It gives much higher doses (Mettler 40.7 mSv; RP 180 EU mean 13.8 mSv for Tl-201 in T5.33) but is rarely used in Spain now. We suggest not listing it separately, and mentioning it in the info text.

### 2.2 Optional extension (include only if the UI can afford it)

| Group | id suggestion | Catalan label | mSv | Source values | Conf. |
|---|---|---|---|---|---|
| Radiografia convencional | `rxCrani` | Radiografia de crani o sins paranasals | 0.1 | [5] T1: skull 0.1 (0.03–0.22) · [19] chart: cranium 0.07 (UNSCEAR HCL-I) | medium |
| TC | `tcColl` | TC de coll | 3.5 | [1] T4.1: 3.5 ± 0.6 · [3] EU 2.5 (0.42–5.38) · [5] T2: 3 | medium–high |
| TC | `tcPelvis` | TC de pelvis | 8.8 | [1] T4.1: 8.8 ± 1.8 · [3] EU 7.3 (0.8–14.5) · [5] T2: 6 (3.3–10) | medium |
| Intervencionisme | `intAltres` | Altres procediments intervencionistes (arteriografia, embolització, drenatge biliar…) | 7 | [1] T4.1 "Otros RI": 7.07 ± 3.5 · [5] T3: 5–70 (abdominal angiography 12, TIPS 70, pelvic vein embolization 60) | **low** |
| Medicina nuclear | `nmParatiroides` | Gammagrafia de paratiroides (MIBI) | 6.3 | [2] T9: 6.3 · [5] T5: 6.7 | medium–high |
| Medicina nuclear | `nmCervell` | SPECT cerebral (DaTSCAN o perfusió cerebral) | 5 | [2] T9: DaTSCAN 4.5; HMPAO perfusion 6.8 · [5] T5: HMPAO 6.9, ECD 5.7 | medium |
| Medicina nuclear | `nmGangliSentinella` | Limfogammagrafia / detecció del gangli sentinella | 0.9 | [2] T9: sentinel node 0.9; lymphoscintigraphy 1.1 | medium |
| Medicina nuclear | `nmLeucocits` | Gammagrafia amb leucòcits marcats (infecció) | 4.1 | [2] T9: Tc-99m leucocytes 4.1 · [5] T5: Tc-WBC 8.1; In-111 WBC 6.7 | medium |
| Medicina nuclear | `nmVentriculografia` | Ventriculografia isotòpica (MUGA) | 5.5 | [2] T9: 5.5 · [5] T5: 7.8 | medium |
| Medicina nuclear | `nmHepatobiliar` | Gammagrafia hepatobiliar (HIDA) | 3.1 | [5] T5: 3.1 (185 MBq, 0.017 mSv/MBq) | medium |
| — | `altraProvaDosi` | Altra prova: introdueix la dosi que consta a l'informe (mSv) | user value | [20] RD 601/2019 art. 15.2: in radiology and nuclear medicine the patient-exposure information must be recorded in a dosimetric report that forms part of the clinical record | — |

Not recommended:
- Gallium-67 citrate (15–23 mSv [5][2]): largely replaced by PET.
- In-111 DTPA cisternography ("hidrocefàlia").
- Separate per-view (AP/PA/lateral) radiographs: users do not know how many views they had, and these items invite double counting.
- "TC cap i tòrax" as a combined item: the user should select both CT items instead.

### 2.3 Paediatric note

All values are for a reference **adult**. Children receive different doses (generally lower in mSv, but they are more radiosensitive). Image Gently [22] campaigns for child-sized protocols. Recommend a one-line disclaimer that the calculator assumes an adult.

---

## 3. Old values vs new values

### 3.1 Comparison table (all current items in `index.html` / `multiplierMap`)

Verdicts: ✅ acceptable · ⚠️ outdated, imprecise or mislabelled · ❌ wrong (factor >2 or unsupported) · 🔁 merge or remove.

**Group "Radiografia"**

| Current id | Current label | Current mSv | New item → mSv | Verdict / comment |
|---|---|---|---|---|
| `skull1` | Crani (AP o PA) | 0.03 | `rxCrani` (optional) → 0.1 per exam | 🔁 Per-view value, plausible but not verified. Replace with a per-exam item [5]. |
| `skull2` | Crani (lateral) | 0.01 | `rxCrani` → 0.1 | 🔁 Merge (same as above). |
| `chest1` | Tòrax (PA) | 0.02 | `rxTorax` → 0.04 | ✅ Matches Mettler PA 0.02 [5]. Merge. |
| `chest2` | Tòrax (lateral) | 0.04 | `rxTorax` → 0.04 | 🔁 Merge. |
| `chest3` | Tòrax (PA i lateral) | 0.06 | `rxTorax` → 0.04 | ✅ Equals RP 180 Spain 0.06 [3]. Merge. |
| `dor1` | Vèrtebres dorsals (AP) | 0.4 | `rxColumnaCervicalDorsal` → 0.2 | 🔁 Per-view. AP + lateral = 0.7, which is higher than Spain's 0.27 per exam [1]. |
| `dor2` | Vèrtebres dorsals (lateral) | 0.3 | same | 🔁 Merge. |
| `lumb1` | Vèrtebres lumbars (AP) | 0.7 | `rxColumnaLumbar` → 1.8 | 🔁 Per-view. Double counting with `lumb3`. |
| `lumb2` | Vèrtebres lumbars (lateral) | 0.3 | same | 🔁 Merge. |
| `ab1` | Abdomen (AP) | 0.7 | `rxAbdomen` → 0.8 | ✅ |
| `ab2` | Abdomen | 0.53 | `rxAbdomen` | 🔁 Duplicate of `ab1`. 0.53 is the UNSCEAR value shown in the 2010 CSN leaflet [19]. |
| `pelv1` | Pelvis (lateral) | 0.7 | `rxPelvisMaluc` → 0.4 | ⚠️ The label is odd (a lateral pelvis is rarely done; probably meant AP). Value within range. |
| `pelv2` | Pelvis o malucs | 0.83 | `rxPelvisMaluc` → 0.4 | ⚠️ 0.83 is the UNSCEAR value in the CSN leaflet [19]. Spain 2017 = 0.43 [1]. |
| `bite` | Pel·lícula dental de Bitewing | 0.004 (4 µSv) | `dentalIntraoral` → 0.005 | ✅ Correct for a 4-image bitewing set (3.4–5.0 µSv [12]). |
| `joints` | Extremitats i articulacions | 0.06 | `rxExtremitats` → 0.005 | ❌ About 10x too high compared with modern estimates (0.001–0.01 [5]; <0.001 [6]). Same as the old CSN/UNSCEAR leaflet value [19]. |

**Group "Procediment de raigs X"**

| Current id | Current label | Current mSv | New item → mSv | Verdict / comment |
|---|---|---|---|---|
| `piv` | Pielografia intravenosa (label 2.5 mSv) | **0.06 in JS** | `fluoroUrografia` → 1.9 | ❌ **BUG**: the label says 2.5 but the multiplier is 0.06. The label value is close to sources (1.9–3 [1][3][5]). |
| `eso` | Trànsit esofàgic (esofagograma) | 1.5 | `fluoroEsofagogastroduodenal` → 4.7 | ⚠️ Probably the 1990s UK/EC RP 118 "barium swallow" value [25, not verified]. Merged into the upper-GI item, Spain 4.7 [1]. |
| `far` | Farina de bari (barium meal) | 3 | `fluoroEsofagogastroduodenal` → 4.7 | ❌ Low. Spain 4.7, EU 6.2, Mettler 6 [1][3][5]. Label translation: in Catalan use «trànsit esofagogastroduodenal», not "farina". |
| `far2` | Seguiment de bari (follow-through) | 3 | `fluoroTransitIntestinal` → 9.3 | ❌ 2–3x low. Spain 9.3, EU 7.2, Mettler 5. |
| `en` | Ènema de bari | 7 | `fluoroEnemaOpac` → 8.5 | ⚠️ Slightly low. Spain 8.5, EU 8.5, Mettler 8. |
| `ctcap` | CT cap | 2 | `tcCap` → 2.0 | ✅ |
| `cttor` | CT tòrax | 8 | `tcTorax` → 8.0 | ✅ Matches Spain 2017 [1]. International values are 6–7. |
| `ctab` | CT abdomen | 10 | `tcAbdomen` → 14 | ⚠️ Within the international range (8–11 [3][5]). Spain 2017 = 13.8 [1]. |
| `ctpel` | CT pelvis | 10 | `tcPelvis` (optional) → 8.8 | ⚠️ Slightly high. Spain 8.8, EU 7.3, Mettler 6. |
| `ctcaptor` | CT cap i tòrax | 11 | select `tcCap` + `tcTorax` | 🔁 Unusual combination. Remove. |
| `ptca` | PTCA (estudi del cor) | 7.5 | `intAngioplastia` → 17 | ❌ Mislabelled (PTCA = angioplasty, a treatment) and about 2x low. Spain 16.8, EU 15.2, Mettler 15. |
| `ang` | Angiografia coronària | 4.6 | `intCoronariografia` → 7.6 | ❌ Low. Spain 7.6, EU 7.7, Mettler 7. |
| `mam` | Mamografia | 0.13 | `mamografia` → 0.25 | ❌ About 2x low. Spain 0.25, EU 0.27, RadiologyInfo 0.28, Mettler 0.4. Probably an older value calculated with the ICRP 60 breast weighting factor (0.05; ICRP 103 uses 0.12). |
| `lumb3` | Espina lumbar (sèrie) | 1.8 | `rxColumnaLumbar` → 1.8 | ✅ Same value as the CSN leaflet chart "Columna (1,8)" [19] and Spain 2017 (1.76) [1]. Keep as the only lumbar item. |
| `tora` | Columna toràcica (sèrie) | 1.4 | `rxColumnaCervicalDorsal` → 0.2 | ❌ High. Spain 0.27 [1], EU 0.64 [3], Mettler 1.0 [5]. |
| `cer` | Columna cervical (sèrie) | 0.27 | `rxColumnaCervicalDorsal` → 0.2 | ⚠️ Close. Spain 0.17, Mettler 0.2. |

**Group "Examen de medicina nuclear"**

| Current id | Current label | Current mSv | New item → mSv | Verdict / comment |
|---|---|---|---|---|
| `brain` | Cervell – Hidrocefàlia | 0.5 | remove (or `nmCervell` 5 for brain SPECT) | ❌ No source found. Cisternography is rare. |
| `hep` | Imatges hepatobiliars | 0.05 | `nmHepatobiliar` (optional) → 3.1 | ❌ About 60x too low. Mettler 3.1 [5]. |
| `os` | Os | 4.22 | `nmOssia` → 4.4 | ✅ Spain 4.4 [2]. |
| `gpvp` | Perfusió/ventilació pulmonar | 2.3 | `nmPulmonar` → 2.5 | ✅ |
| `ren1` | Renograma – Tc DTPA | 3.63 | `nmRenal` → 1.2 | ❌ About 3x high. Spain 1.1 [2], Mettler 1.8 [5]. |
| `ren2` | Renograma – Tc MAG3 | 5.2 | `nmRenal` → 1.2 | ❌ 2–5x high. Spain 1.1 [2], Mettler 2.6 [5]. |
| `tumga` | Tumor – Ga | 10 | remove (Ga-67 is obsolete) | ❌ Sources give 15 [5] and 23 [2]. The tooltip describes gallium metal, not the radiopharmaceutical. |
| `cor1` | Cor – Tc sestamibi | 9.9 | `nmPerfusioMiocardica` → 11 | ✅ Close (Mettler 1-day 9.4 / 2-day 12.8; Spain 12.9). Merge. |
| `cor2` | Cor – Tc pertechnetate | 14.3 | remove | ❌ Unsupported. Pertechnetate is used for thyroid scans (2.8 [2]); cardiac blood-pool imaging uses labelled red cells (5.5–7.8 [2][5]). |
| `cor3` | Cor – Clorur Tl | 10.36 | merge into `nmPerfusioMiocardica` (mention Tl in info text) | ❌ Low compared with ICRP 106-based estimates (Mettler 40.7; RP 180 EU 13.8). Rare today. |
| `cor4` | Cor – Tc tetrofosmin | 7.56 (label 7.59) | `nmPerfusioMiocardica` → 11 | ⚠️ Low for rest + stress (Spain 10.5 [2]; Mettler 11.4 [5]). JS and label disagree. |
| `div` | Diverses – F FDG | 7 | `nmPetTc` → 16 | ⚠️ About right for the PET part alone (Spain 6.4 [2]). Today almost all FDG studies are PET-TC, about 16 [9]. |

**Group "Examen de medicina nuclear per al fetus"**: all 14 items are **removed from the sum** (section 4)

| Current id | Label | Current value | What the number actually is | Verdict |
|---|---|---|---|---|
| `os2` | Os | 4.6 | Early-pregnancy conceptus absorbed dose, Tc-99m MDP about 750 MBq: 4.6–4.7 **mGy** [21] | ❌ Not an effective dose to the user. Remove from the sum. |
| `pp` | Perfusió pulmonar | 0.56 | Conceptus dose, MAA (Russell-type tables; HPS [21]) | ❌ Remove from the sum. |
| `tir` | Tiroide – NaI | 0.6 | Conceptus dose (source not verified) | ❌ Remove from the sum. |
| `tum` | Tumor | 18 | Conceptus dose, Ga-67 citrate 190 MBq: 14–18 mGy [21] | ❌ Remove from the sum. |
| `vp` | Ventilació pulmonar (label 0.54) | **7 in JS** | Conceptus dose; **BUG** (multiplier ≠ label) | ❌ Remove from the sum. |
| `cor5` | Cor | 5.3 | Conceptus dose, Tl-201 (HPS table) [21] | ❌ Remove from the sum. |
| `ren3` | Renograma MAG3 | 14 | Conceptus dose (bladder activity close to the uterus) | ❌ Remove from the sum. |
| `ren4` | Renograma DTPA | 9 | Conceptus dose, DTPA 750 MBq: 5.9–9.0 mGy [21] | ❌ Remove from the sum. |
| `fet` | Fetge | 6 | Conceptus dose (source not verified) | ❌ Remove from the sum. |
| `inf1` | Infecció – glòbuls blancs (Tc) | 0.76 | Conceptus dose | ❌ Remove from the sum. |
| `inf2` | Infecció – glòbuls blancs (In) | 2.6 | Conceptus dose | ❌ Remove from the sum. |
| `mel` | Fetge/Melsa | 0.54 | Conceptus dose | ❌ Remove from the sum. |
| `braintir` | Cervell o tiroide | 12 | Conceptus dose, pertechnetate high activity (HPS: 400 MBq → 3.2–4.4 mGy) | ❌ Remove from the sum. |
| `flux` | Flux de sang/cor | 6 | Conceptus dose, Tc-RBC | ❌ Remove from the sum. |

**Group "Examen de raigs X durant l'embaràs"**: all 8 items are **removed from the sum**

| Current id | Label | Current value | Comment |
|---|---|---|---|
| `pelv3` / `pelv4` / `pelv5` | Pelvis AP / PA / lateral | 1.44 / 0.4 / 0.53 | These appear to be conceptus doses per radiograph (mGy). Provenance not verified (probably US tables of the Wagner et al. 1997 type). The HPA 2009 table [14] places pelvis/hip in the 0.1–1 mGy band. |
| `dor3` / `dor4` / `dor5` | Dorsal AP wide / narrow / lateral | 0.018 / 0.012 / 0.006 | The HPA table places thoracic spine in the 0.001–0.01 mGy band [14]. |
| `lumb4` / `lumb5` | Lumbar AP / lateral | 2.25 / 1.13 | Lumbar spine radiography is in the 1–10 mGy band [14]. |

### 3.2 Probable provenance of the old values

These findings help explain the old values and do not need to be cited in the app.
- Several "Radiografia" values (pelvis/hips 0.83, abdomen 0.53, spine series 1.8, extremities 0.06) match the bar chart in the CSN leaflet *Dosis de radiación* (2010) [19]. That chart reproduces UNSCEAR health-care-level-I averages from the 2000s, with other bars such as CT 8.8, GI tract 6.4, urography 3.7, mammography 0.51, chest 0.14, skull 0.07 and dental 0.016.
- Per-view radiography values and the CT values 2 / 8 / 10 / 10, barium swallow 1.5 and barium enema 7 resemble the 1990s UK NRPB table reproduced in EC RP 118 *Referral guidelines for imaging* [25]. **URL not verified** (HTTP 403).
- Fetus values match early-pregnancy conceptus dose tables adapted from Russell, Stabin, Sparks et al. 1997, as reproduced by the Health Physics Society [21] (bone 4.6, Ga-67 18, Tl-201 5.3, MAA 0.56, DTPA 9). They are in **mGy (or mrem/100)**, not mSv to the user.

### 3.3 Code issues noticed in `js/medrad.js` / `index.html`

Reported only; nothing was modified.
1. `pivnum: 0.06`, but the label says "(2,5 mSv)".
2. `vpnum: 7`, but the label says "(0,54 mSv)".
3. `cor4num: 7.56`, but the label says "(7,59 mSv)".
4. Keys `hepnum` and `osnum` are repeated 6 times in the object literal. This is harmless (the last value wins) but sloppy.
5. Per-view items plus "series" items for the same region (`lumb1`/`lumb2` + `lumb3`; `dor1`/`dor2` + `tora`; `cer`) make double counting likely.
6. Every input is labelled "a l'any", including the fetal items, which are not doses to the user.
7. As already documented in `CLAUDE.md`, `getMedRad()` is incremental, so unchecking an exam does not subtract its dose. The rebuild should recompute `medrads` from scratch: Σ(count × mSv) over the checked items.

---

## 4. Pregnancy / fetus sections: recommendation

### 4.1 Is it correct to add fetal doses to the user's annual effective dose? **No.**

1. **Different quantity.**
   - The calculator total is an *effective dose* (mSv): a risk-weighted sum of organ doses for the person who uses the calculator.
   - The fetal values are *absorbed doses to the conceptus* (mGy) for a typical activity or radiograph in early pregnancy (see 3.1).
   - Adding a mGy figure for one organism to a mSv figure for another is physically and conceptually meaningless.
2. **Different person.**
   - The mother's own exposure from that exam is already captured when she selects the exam in the normal list.
   - Adding the fetal value as well either double counts it or replaces it with the wrong quantity. For a non-pregnant user it adds a dose that never happened.
3. **Different purpose and risk model.**
   - ICRP 84 [15] and HPA/RCR/CoR 2009 [14] discuss fetal exposure in terms of absorbed dose bands and childhood-cancer risk per mGy (about 1 in 13,000 per mGy; natural childhood-cancer risk about 1 in 500) [14, pp. 6–8].
   - This is not the adult effective-dose framework.
   - The Spanish regulation also treats it separately: RD 601/2019 art. 5.4 requires an *in-utero dose estimate* to be recorded in the clinical record for pelvic–abdominal procedures in pregnant patients [20].
4. **Labels in mSv "a l'any" are misleading** and could cause unnecessary anxiety. ICRP 84 itself notes that lack of knowledge leads to great anxiety and probably unnecessary pregnancy terminations [15].

### 4.2 What to do

- **Remove both groups** ("Examen de medicina nuclear per al fetus" and "Examen de raigs X durant l'embaràs") from the form and from `multiplierMap`.
- A pregnant user who had an exam simply selects it in the normal list. That counts *her own* effective dose correctly.
- Optionally, replace the groups with an **informative panel "Embaràs i proves amb radiació"** (Catalan text in 7.8) containing:
  - **The HPA/RCR/CoR 2009 dose bands** [14, table p. 8], as qualitative bands rather than per-user numbers:

    | Typical early-pregnancy fetal dose | Example exams | Childhood-cancer risk per exam |
    |---|---|---|
    | 0.001–0.01 mGy | Skull, teeth, chest, thoracic spine, mammography, CT head/neck | < 1 in 1,000,000 |
    | 0.1–1 mGy | Abdomen, pelvis, hip, barium meal; Tc-99m lung perfusion, thyroid, renal (MAG3/DMSA) | 1 in 100,000 to 1 in 10,000 |
    | 1–10 mGy | Barium enema, IVU, lumbar spine; CT abdomen, CT lumbar spine; bone scan, myocardial scan, FDG PET | 1 in 10,000 to 1 in 1,000 |
    | 10–50 mGy | CT pelvis, CT abdomen–pelvis, CT chest–abdomen–pelvis; FDG PET-CT whole body; Tc-99m myocardial SPECT rest–exercise | 1 in 1,000 to 1 in 200 |

    The natural childhood-cancer risk is about 1 in 500. The intermediate 0.01–0.1 mGy band also exists in the source but its exam list is hard to read in the PDF text, so it is omitted here.
  - **Key statements**, high confidence:
    - Normal diagnostic exposures should never give fetal doses above 100 mGy [14, pp. 6–7].
    - Deterministic effects (malformation etc.) are not expected below at least 100 mGy [14, citing ICRP].
    - Fetal doses below 100 mGy are not a reason to terminate a pregnancy [15]. The icrp.org page was fetched; the exact wording comes from secondary sources ([23] and others), since the ICRP PDF itself returned HTTP 403.
    - For exams giving up to about 1 mGy, the risks are "certainly not sufficient to justify termination of the pregnancy" [14, summary p. 3 and p. 9].
  - **Practical advice**: always tell staff if you are or might be pregnant. This is mandatory under RD 601/2019 art. 5.1 [20]. The hospital's medical physics / radiation protection service can estimate the fetal dose for a specific exam.
- **Do not compute a per-user fetal dose.** Real fetal dose depends on gestational age, technique and maternal size, and needs an individual estimate by a medical physicist.

---

## 5. Context numbers for the public

| Statement | Value | Source (table/page) | Conf. |
|---|---|---|---|
| Spain: radiodiagnostic (X-ray, CT, interventional; excludes nuclear medicine), per caput, 2017 | **1.19 ± 0.43 mSv/year** | [1] DOPOES II, p. 33 (Table 4.1, p. 32) | high |
| Spain: diagnostic nuclear medicine, per caput, 2011 | **0.07 mSv/year** (629,000 exams; 69.6 Sv per million inhabitants) | [2] DOMNES, executive summary and p. 31 | high |
| Spain: all medical imaging, per caput, about 2010 (DDM2) | **1.146 mSv/year** (X-ray 1.081 + NM 0.065; NM = 5.7 %) | [3] RP 180, Table 5.38, p. 86 | high |
| Europe (36 countries), per caput, 2007–2010 | **about 1.1 mSv/year**; country range about 0.27 (Moldova) to about 1.94 (Luxembourg) | [3] Tables 5.37–5.38, pp. 85–86; [4] Foreword | high |
| EU-27 + 3 EFTA | X-ray 1.07 + NM 0.06 mSv per head | [24] | high |
| Contribution of CT in Europe | **more than half** of the medical collective dose; NM about 5 % | [4] Foreword | high |
| World, 2009–2018 | about 4.2 billion exams/year; **0.56–0.57 mSv per caput**; CT about 62 % of the collective dose (0.35 of 0.56 mSv) | [7] Table 1 (from UNSCEAR 2020/2021 Annex A [8]) | high |
| USA, 2016 | **2.2 mSv per caput** | [7] (NCRP Report 184) | high |
| Spain: average dose from all sources (CSN leaflet) | **3.7 mSv/year**, of which natural 2.4 mSv; medical uses **31 %** (≈1.15 mSv) | [19] p. 4 (2010; based on UNSCEAR health-care-level-I estimates of 1.28 mSv) | medium (dated) |
| Updated medical share for Spain | (1.19 + 0.07) / (2.4 + 1.26) ≈ **one third** of the average annual dose | our calculation from [1][2][19] | medium |
| Justification principle | A medical exposure must give a sufficient net benefit compared with the individual detriment it may cause | [20] RD 601/2019 art. 3.2; [16] ICRP 103; [17] ICRP 105 | high |
| Dose limits do not apply to patients | Patient doses are managed through justification, optimisation and diagnostic reference levels, not dose limits | [17] ICRP 105 | high |
| Variation between countries (same exam, typical dose, RP 180 max/min) | chest 18.6×; lumbar spine 10.9×; mammography 35×; barium follow-through 38.9×; CT abdomen 11×; CT trunk 21.5×; PTCA 7.3× | [3] Tables 5.10–5.12, pp. 52–54 | high |
| Variation between hospitals | Coronary CT angiography: **37-fold** variability in median DLP between 61 hospitals (median 195 mGy·cm, range 57–2090) | [10] | high |
| Typical spread within the literature | Usually about ±50 % for radiography/CT, much wider for fluoroscopy and interventional procedures; effective dose itself has about 40 % uncertainty for a reference patient | [5] pp. 256–258 | high |
| Effective dose and individual risk | Effective dose "should not be used retrospectively to determine individual risk" | [5] p. 255 | high |
| Patient's own dose record (Spain) | Patient-exposure information must be recorded in a dosimetric report that forms part of the clinical record (radiology and nuclear medicine) | [20] RD 601/2019 art. 15.2 | high |

Suggested public message on variability: *"La mateixa prova pot donar dosis diverses vegades més altes o més baixes segons l'hospital, l'equip i la persona; les xifres de la calculadora són valors típics per a un adult."*

---

## 6. Recommended `multiplierMap` (for the developer)

These values are already justified in section 2. They are kept here in code form for convenience.

```js
// mSv per exam (adult). Sources: docs/fonts/02-fonts-mediques.md
const MEDICAL_EXAMS = {
  // Radiografia convencional
  rxTorax: 0.04, rxColumnaCervicalDorsal: 0.2, rxColumnaLumbar: 1.8,
  rxAbdomen: 0.8, rxPelvisMaluc: 0.4, rxExtremitats: 0.005,
  // Mamografia i densitometria
  mamografia: 0.25, densitometria: 0.001,
  // Dental
  dentalIntraoral: 0.005, dentalPanoramica: 0.02, dentalCbct: 0.1,
  // Fluoroscòpia amb contrast
  fluoroEsofagogastroduodenal: 4.7, fluoroTransitIntestinal: 9.3,
  fluoroEnemaOpac: 8.5, fluoroUrografia: 1.9,
  // TC
  tcCap: 2.0, tcTorax: 8.0, tcToraxBaixaDosi: 1, tcAbdomen: 14,
  tcToracoabdominal: 16, tcColumna: 11, tcCoronari: 4,
  // Intervencionisme
  intCoronariografia: 7.6, intAngioplastia: 17,
  // Medicina nuclear
  nmOssia: 4.4, nmPerfusioMiocardica: 11, nmPetTc: 16, nmTiroide: 2.8,
  nmPulmonar: 2.5, nmRenal: 1.2,
  // Optional extension
  rxCrani: 0.1, tcColl: 3.5, tcPelvis: 8.8, intAltres: 7, nmParatiroides: 6.3,
  nmCervell: 5, nmGangliSentinella: 0.9, nmLeucocits: 4.1, nmVentriculografia: 5.5,
  nmHepatobiliar: 3.1,
};
```

---

## 7. «Més informació» texts (Catalan, one per group)

Comparisons use 2.4 mSv/year of natural background (≈ 0,0066 mSv per day) [19]. If the natural-radiation module uses another value, adjust the comparisons.

### 7.0 Text general de la secció «Radiació mèdica»
Les xifres d'aquesta secció són la **dosi efectiva típica** d'una prova en una persona adulta, segons estudis del Consell de Seguretat Nuclear i d'organismes internacionals. Serveixen per comparar proves entre si i amb la radiació natural, però no per calcular el risc personal de cap persona. La dosi real pot variar bastant segons l'hospital, l'equip i la persona. Una prova indicada pel metge aporta un benefici diagnòstic molt més gran que el petit risc de la radiació.

### 7.1 Radiografia convencional
Una radiografia fa passar un feix breu de raigs X a través d'una part del cos per obtenir-ne una imatge, com una «fotografia» dels ossos i dels òrgans. La dosi depèn sobretot de la zona i del gruix de cos que travessa: una radiografia de tòrax (uns 0,04 mSv) equival a uns 6 dies de radiació natural, mentre que una de columna lumbar (uns 1,8 mSv) en suposa uns 9 mesos. Els valors són típics per a un adult; poden variar segons l'equip i la complexió de cada persona. Quan una radiografia està ben indicada, el benefici d'un bon diagnòstic és molt més gran que el risc, que és molt petit.

### 7.2 Mamografia i densitometria
La mamografia utilitza raigs X de baixa energia per detectar el càncer de mama en fases inicials. Una mamografia de cribratge (dues imatges de cada mama) suposa uns 0,25 mSv, semblant a unes 5 setmanes de radiació natural. La densitometria òssia (DXA), que mesura la densitat dels ossos, té una dosi molt baixa: uns 0,001 mSv, comparable a unes poques hores de radiació natural. En els programes de cribratge, el benefici de detectar un càncer a temps supera clarament el risc de la radiació.

### 7.3 Radiologia dental
Les radiografies dentals intraorals (periapicals o d'aleta de mossegada) són de les proves amb menys dosi: uns 0,005 mSv, menys que un dia de radiació natural. La radiografia panoràmica (ortopantomografia) suposa uns 0,02 mSv (uns 3 dies). El TC dental de feix cònic (CBCT o «TAC dental» en 3D) suposa uns 0,1 mSv (unes 2 setmanes), però pot variar molt segons l'aparell i la mida de la zona explorada. El dentista només les demana quan la informació és útil per al diagnòstic o el tractament.

### 7.4 Proves amb contrast i fluoroscòpia
En aquestes proves es beu o s'injecta un contrast (bari o iode) i se'n segueix el recorregut amb raigs X en temps real (fluoroscòpia), per estudiar l'esòfag, l'estómac, l'intestí o les vies urinàries. Com que la imatge s'obté durant uns minuts, la dosi és més alta que en una radiografia i depèn molt de la durada de l'exploració. Una urografia suposa uns 2 mSv (uns 10 mesos de radiació natural) i un ènema opac uns 8,5 mSv (uns 3 anys i mig). Avui moltes d'aquestes proves s'han substituït per endoscòpies, ecografies o TC, i quan es fan és perquè aporten informació necessària.

### 7.5 TC (escàner o TAC)
La tomografia computada (TC, TAC o «escàner») fa moltes imatges amb raigs X des de diferents angles i en reconstrueix talls del cos amb gran detall. És una de les eines diagnòstiques més valuoses, però també la que aporta més dosi a la població. Un TC de cap suposa uns 2 mSv (uns 10 mesos de radiació natural) i un de tòrax, abdomen i pelvis, uns 16 mSv (uns 6 anys i mig). La dosi depèn de la zona, del nombre de fases amb contrast, de la mida del pacient i de l'equip, i pot variar diverses vegades d'un hospital a un altre. Les tècniques de baixa dosi, com el TC de cribratge de càncer de pulmó (1 mSv o menys), la redueixen molt. Quan un TC està justificat, el benefici de diagnosticar a temps una malaltia greu és molt superior al risc.

### 7.6 Radiologia i cardiologia intervencionistes
En aquests procediments el metge introdueix catèters pels vasos sanguinis guiant-se amb raigs X, per diagnosticar o tractar: per exemple, per desobstruir una artèria del cor i col·locar-hi un stent. La dosi depèn molt de la complexitat i la durada del procediment. Una coronariografia diagnòstica suposa uns 7–8 mSv i una angioplàstia amb stent uns 17 mSv (uns 7 anys de radiació natural), amb grans diferències d'un cas a un altre. Sovint aquests procediments eviten una operació oberta o tracten un infart, de manera que el benefici és molt més gran que el risc de la radiació.

### 7.7 Medicina nuclear (gammagrafies i PET)
En medicina nuclear s'administra una quantitat petita d'un medicament lleugerament radioactiu (radiofàrmac) que es concentra en un òrgan. Una gammacàmera o un equip PET el detecta per veure com funcionen els ossos, el cor, la tiroide, els ronyons, els pulmons o un tumor. La dosi depèn del radiofàrmac i de l'activitat administrada, ajustada a cada pacient, i en el PET-TC també del TC que l'acompanya. Va des d'uns 1,2 mSv en un estudi renal (uns 6 mesos de radiació natural) fins a uns 16 mSv en un PET-TC (uns 6 anys i mig). La radioactivitat desapareix sola en poques hores o dies. Aquestes proves donen informació sobre el funcionament dels òrgans que sovint no es pot obtenir d'una altra manera.

### 7.8 Panell informatiu «Embaràs i proves amb radiació» (substitueix les seccions de fetus i embaràs; **no suma dosi**)
Si estàs embarassada o creus que podries estar-ho, digues-ho sempre abans d'una prova amb radiació: l'hospital t'ho ha de preguntar i, si cal, adaptarà o canviarà la prova. La gran majoria de proves diagnòstiques donen dosis molt baixes a l'embrió o fetus. Les radiografies de tòrax o dentals, la mamografia o el TC de cap li donen una fracció petitíssima d'un mil·ligray (mGy). Un TC d'abdomen o una gammagrafia òssia en donen pocs mil·ligrays, i només algunes proves, com el TC de pelvis o el PET-TC, poden arribar a algunes desenes. Segons la Comissió Internacional de Protecció Radiològica (ICRP), una dosi al fetus inferior a 100 mGy no és motiu per interrompre un embaràs, i les proves diagnòstiques habituals queden per sota d'aquest valor. Aquesta dosi és la del fetus, no la de la mare, i per això no se suma al teu resultat. Si tens dubtes sobre una prova concreta, el servei de radiofísica o de protecció radiològica de l'hospital pot fer-ne una estimació.

---

## 8. Bibliography

"Verified" = the URL was fetched during this research and its content was checked against the numbers quoted.

1. **DOPOES II.** Pastor Vega JM, Cañete Hidalgo S, Pérez Martínez M, Pola Gallego de Guzmán A, de la Cruz Cruz MA, Priego Amo I, Gordo Puertas E, Doña Fernández J, Julián Manzano F, Almansa López J, Sendra Portero F, Ruiz Cruces R. *Niveles de referencia de dosis (NRD) y estimación de Dosis Poblacional en España. Proyecto DOPOES II – Informe ejecutivo.* Consejo de Seguridad Nuclear – Universidad de Málaga, with the support of the Ministerio de Sanidad; PDF dated Feb 2022; data year 2017. Table 4.1 (p. 32); per caput 1.19 ± 0.43 mSv (p. 33).
   URL: https://www.csn.es/documents/10182/2399922/Niveles%20de%20referencia%20de%20dosis%20(NRD)%20y%20%20estimaci%C3%B3n%20de%20Dosis%20Poblacional%20en%20%20Espa%C3%B1a%20(DOPOES%20II%20-%20Resumen%20ejecutivo) — **verified** (note the double spaces in the file name). The full report is at the same path with "Informe completo" (not fetched).
2. **DOMNES.** Consejo de Seguridad Nuclear, Ministerio de Sanidad, Servicios Sociales e Igualdad, SEMNIM. *Proyecto DOMNES. Prospección nacional de procedimientos de diagnóstico en medicina nuclear utilizados en los centros sanitarios españoles. Estimación de dosis recibidas por los pacientes y la población.* CSN, PDF dated Dec 2014; data year 2011. Table 9 "Dosis efectiva por estudio en España, DDM2 y UNSCEAR" (p. 22); per caput 0.07 mSv (executive summary; p. 31).
   URL: https://www.csn.es/documents/10182/1006281/Proyecto%20DOMNES.%20Prospecci%C3%B3n%20nacional%20de%20procedimientos%20de%20diagn%C3%B3stico%20en%20medicina%20nuclear%20utilizados%20en%20los%20centros%20sanitarios%20espa%C3%B1oles.%20Estimaci%C3%B3n%20de%20dosis%20recibidas%20por%20los%20pacientes%20y%20la%20poblaci%C3%B3n — **verified**.
3. **EC RP 180 Part 1.** European Commission, DG Energy. *Radiation Protection No 180: Medical Radiation Exposure of the European Population, Part 1/2.* Luxembourg, 2014 (published 2015). Tables 5.10–5.14 (pp. 52–55), 5.32–5.33 (pp. 79–80), 5.37–5.38 (pp. 85–86).
   URL: https://www.eurosafeimaging.org/wp/wp-content/uploads/2015/05/Radiation-Protection-180.pdf — **verified**. Official record: https://op.europa.eu/en/publication-detail/-/publication/d2c4b535-1d96-4d8c-b715-2d03fc927fc9 (verified; no direct PDF link visible).
4. **EC RP 180 Part 2.** European Commission. *Radiation Protection No 180: Diagnostic Reference Levels in Thirty-six European Countries, Part 2/2.* 2014. The Foreword states the per caput figure of about 1.1 mSv, that CT accounts for more than half, and that NM is about 5 %.
   URL: https://eurosafeimaging.org/wp/wp-content/uploads/2015/05/Radiation-protection-180-part2.pdf — **verified**.
5. **Mettler FA Jr, Huda W, Yoshizumi TT, Mahesh M.** Effective doses in radiology and diagnostic nuclear medicine: a catalog. *Radiology* 2008;248(1):254–263. doi:10.1148/radiol.2481071451. Tables 1–2 (p. 256), Tables 3–5 (p. 257); discussion pp. 255–258.
   URL: https://www2.rsna.org/timssnet/radiologyselect/dose/PDF%20Files/category%202/V521.pdf — **verified** (full text). The publisher page https://pubs.rsna.org/doi/10.1148/radiol.2481071451 returned HTTP 403.
6. **RadiologyInfo.org (ACR/RSNA).** *Radiation Dose* (patient safety: effective dose of X-ray, CT and nuclear medicine exams). Last reviewed 15 Apr 2025.
   URL: https://www.radiologyinfo.org/en/info/safety-xray — **verified**.
7. **Mahesh M, Ansari AJ, Mettler FA Jr.** Patient exposure from radiologic and nuclear medicine procedures in the United States and worldwide: 2009–2018. *Radiology* 2023;307(1):e221263 (online 2022). doi:10.1148/radiol.221263. Abstract and Table 1.
   URL: https://radiology.jp/content/files/PatExp-Rad-NucMed%20Proc%20inUSvsWorldwide-2009-2018-MM-AA-FM-Radiology2022.pdf — **verified**.
8. **UNSCEAR.** *Sources, Effects and Risks of Ionizing Radiation. UNSCEAR 2020/2021 Report, Vol. I, Annex A: Evaluation of medical exposure to ionizing radiation.* United Nations, New York, 2022.
   URL: https://www.unscear.org/unscear/en/publications/2020_2021_1.html — **URL not verified** (HTTP 403). The figures are taken through [7].
9. **Martí-Climent JM, Prieto E, Morán V, Sancho L, Rodríguez-Fraile M, Arbizu J, García-Velloso MJ, Richter JA.** Effective dose estimation for oncological and neurological PET/CT procedures. *EJNMMI Res* 2017;7:37. doi:10.1186/s13550-017-0272-5 (Clínica Universidad de Navarra, Spain).
   URL: https://www.ebi.ac.uk/europepmc/webservices/rest/PMC5403773/fullTextXML — **verified** (full text). Human-readable page: https://europepmc.org/article/PMC/PMC5403773 (not fetched).
10. **Stocker TJ, Deseive S, Leipsic J, … Hausleiter J.** Reduction in radiation exposure in cardiovascular computed tomography imaging: results from the PROTECTION VI registry. *Eur Heart J* 2018;39(41):3715–3723. doi:10.1093/eurheartj/ehy546.
    URL: https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=PMCID:PMC6455904&resultType=core&format=json — **verified** (abstract). Full text: https://pmc.ncbi.nlm.nih.gov/articles/PMC6455904 (not fetched).
11. **Revel MP, Biederer J, Nair A, … Larici AR (European Society of Thoracic Imaging).** ESR Essentials: lung cancer screening with low-dose CT – practice recommendations by the European Society of Thoracic Imaging. *Eur Radiol* 2026 (online 2025). doi:10.1007/s00330-025-11910-9.
    URL: https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:10.1007/s00330-025-11910-9&resultType=core&format=json — **verified** (abstract).
12. **Benavides E, Krecioch JR, Connolly RT, et al. (ADA).** Optimizing radiation safety in dentistry. *J Am Dent Assoc* 2024;155(4):280–293.e4. doi:10.1016/j.adaj.2023.12.002. Table 1 (p. 281).
    URL (copy): https://willamettedental.com/wp-content/uploads/2025/03/PIIS0002817723007341.pdf — **verified**. In the extracted text the column header reads "mSv", but the values are clearly µSv (e.g. full-mouth series 34.9; panoramic 14.2–30.0). We read them as µSv.
13. **Ludlow JB, Timothy R, Walker C, Hunter R, Benavides E, Samuelson DB, Scheske MJ.** Effective dose of dental CBCT – a meta analysis of published data and additional data for nine CBCT units. *Dentomaxillofac Radiol* 2015;44(1):20140197. doi:10.1259/dmfr.20140197.
    URL: https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:25224586%20AND%20SRC:MED&resultType=core&format=json — **verified** (abstract).
14. **Health Protection Agency, The Royal College of Radiologists, College of Radiographers.** *Protection of Pregnant Patients during Diagnostic Medical Exposures to Ionising Radiation* (RCE-9). March 2009. Table "Typical fetal doses and risks of childhood cancer…" (p. 8); summary of advice p. 3; risk statements pp. 6–9.
    URL: https://www.ipem.ac.uk/media/0ympgwl2/protection-of-pregnant-patients.pdf — **verified**.
15. **ICRP, 2000.** *Pregnancy and Medical Radiation.* ICRP Publication 84. Ann. ICRP 30(1).
    URL: http://www.icrp.org/publication.asp?id=ICRP%20Publication%2084 — **verified** (citation and abstract page). The free PDF https://journals.sagepub.com/doi/pdf/10.1177/ANIB_30_1 returned HTTP 403, so the "<100 mGy is not a reason for termination" wording was confirmed only through secondary sources.
16. **ICRP, 2007.** *The 2007 Recommendations of the International Commission on Radiological Protection.* ICRP Publication 103. Ann. ICRP 37(2–4).
    URL: http://www.icrp.org/publication.asp?id=ICRP%20Publication%20103 — **verified** (abstract page).
17. **ICRP, 2007.** *Radiological Protection in Medicine.* ICRP Publication 105. Ann. ICRP 37(6).
    URL: http://www.icrp.org/publication.asp?id=ICRP%20Publication%20105 — **verified** (abstract page: dose limits are not appropriate for patients; justification; DRLs).
18. **ICRP, 2015.** *Radiation Dose to Patients from Radiopharmaceuticals: A Compendium of Current Information Related to Frequently Used Substances.* ICRP Publication 128. Ann. ICRP 44(2S). Source of the mSv/MBq coefficients used by [2] and [3].
    URL: http://www.icrp.org/publication.asp?id=ICRP%20Publication%20128 — **verified** (abstract page).
19. **Consejo de Seguridad Nuclear.** *Dosis de radiación* (divulgative leaflet, ref. SDB-04.07). CSN, Madrid, 2010. p. 4: total 3.7 mSv, natural 2.4 mSv, medical 31 %; p. 5: per-exam bar chart and UNSCEAR health-care-level-I medical dose of 1.28 mSv.
    URL: https://www.csn.es/documents/10182/914805/Dosis%20de%20radiaci%C3%B3n — **verified**.
20. **Real Decreto 601/2019**, de 18 de octubre, sobre justificación y optimización del uso de las radiaciones ionizantes para la protección radiológica de las personas con ocasión de exposiciones médicas. BOE-A-2019-15604. Arts. 3.2 (justification: "beneficio neto suficiente"), 5.1 and 5.4 (pregnancy), 15.2 (dosimetric report in the clinical record).
    URL: https://www.boe.es/buscar/act.php?id=BOE-A-2019-15604 — **verified**.
21. **Health Physics Society.** *Nuclear medicine and the pregnant patient – Q&A* (fetal-dose table adapted from Russell, Stabin, Sparks et al. 1997; Wagner et al. 1997; ICRP 53; ICRP 80).
    URL: https://hps.org/physicians/nuclear_medicine_pregnant_patient_qa/ — **verified**. Used only to identify the provenance of the old fetus values.
22. **Image Wisely** (ACR, RSNA, ASRT, AAPM): https://www.imagewisely.org/ — **verified**. **Image Gently** (SPR, ACR, ASRT, AAPM; paediatric imaging): https://www.imagegently.org/ — **verified**.
23. **IAEA Radiation Protection of Patients (RPOP).** *Radiation protection of pregnant women in radiology.*
    URL: https://www.iaea.org/resources/rpop/health-professionals/radiology/pregnant-women — **URL not verified** (HTTP 402). Content seen only in search-result snippets.
24. **BfS (archived).** *Dose Datamed 2* project page (EU-27 + 3 EFTA: 1.07 mSv X-ray / 0.06 mSv NM per head).
    URL: https://www.bge.de/archiv/www.asse.bund.de/EN/bfs/we/international/dose-datamed-2.html — **verified**.
25. **European Commission.** *Radiation Protection 118: Referral guidelines for imaging.* 2000/2001. Used only as the probable provenance of old values.
    URL: https://sahha.gov.mt/wp-content/uploads/2023/04/Radiation_Protection_118_Referral_Guidelines_for_Imaging_EN%E2%80%8B.pdf — **URL not verified** (HTTP 403).
26. **Russell JR, Stabin MG, Sparks RB, Watson E.** Radiation absorbed dose to the embryo/fetus from radiopharmaceuticals. *Health Phys* 1997;73(5):756–769. **URL not verified.** Cited through [21].

---

## 9. Open questions / decisions for the team

1. **Spain-first rule.** Do we accept DOPOES II (2017) as the primary source even where it is higher than the international averages? The main cases are CT abdomen (14 vs 8–11), CT spine (11 vs 6–9) and small-bowel transit (9.3 vs 5–7). The alternative is rounded "international typical" values with Spain shown as a cross-check.
2. **Natural-background reference.** These comparisons use 2.4 mSv/year (CSN leaflet, UNSCEAR world average). The natural-radiation module may use a Spain-specific value. DOMNES quotes 1.6 mSv/year natural (range 0.6–19.1) excluding some components, which was not verified in detail. Pick one value for the whole app.
3. **Merging cervical and dorsal spine** into one 0.2 mSv item is a simplification (dorsal alone is 0.27 in Spain and 0.6–1.0 internationally). Keep them separate if the UI allows.
4. **CT coronary angiography.** The 4 mSv value depends on the DLP-to-dose factor we chose. Consider fetching a European cardiac-CT dose survey or the Trattner et al. 2014 conversion-factor paper to firm it up.
5. **PET-TC.** The 16 mSv value comes from one Spanish centre [9] with a diagnostic-quality CT. Centres using low-dose CT would be about 8–10 mSv. A multicentre Spanish figure would be better; we did not find one.
6. **UNSCEAR 2020/2021 Annex A** could not be fetched directly (403). Ideally download it and cite the table and page for the 0.57 mSv and CT share figures.
7. **ICRP 84 PDF** (SAGE, free) returned 403. Ideally confirm the exact "<100 mGy" wording and page in the original.
8. **Free-text "dose from my report" field.** RD 601/2019 art. 15.2 means many Spanish patients can get their dose from the dosimetric report in their clinical record. Decide whether to add the field, and in what units: reports often give DLP/DAP or mGy, not mSv, so we may need a short explanation.
9. **Ambiguity of the word «sèrie».** For multi-view radiographs the values are per exam (all views). Make this explicit in the UI ("nombre de proves", not "nombre d'imatges").
10. **Children / Image Gently.** Do we restrict the calculator to adults, or add a paediatric disclaimer?
11. **Information in the existing tooltips** (e.g. gallium described as a metal; AP/PA tooltips that always say "tòrax") should be rewritten together with the new list.
