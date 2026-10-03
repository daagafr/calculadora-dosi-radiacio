# 03 — Sources: travel, lifestyle/consumer products, occupational exposure and reference levels

Scope: items in the "Viatges" and "Altres fonts" sections of `index.html` (`travelTime`, `luggage`, `lantern`, `building`, `wristwatch`, `detector`, `nuclear`, `coal`, `sleep`, `workerRad`, `smokingRad`), the formulas in `js/script.js` (`getTravelRad`, `getOtherRad`), the result gauge in `js/gauge.js`, and the banana-equivalent-dose page `info/BED.html`.

Research date: 3–4 October 2026. Each number below gives its value, unit, assumptions, source number (see §6 Bibliography) and a confidence level. "Own calculation" means I derived the number from the cited inputs. Those numbers are flagged and should be checked before publication.

Conventions: 1 mSv = 1,000 µSv. Unless stated otherwise, all doses are **effective dose** (ICRP 103). Checkbox values in `index.html` are in mSv/year.

---

## 0. Executive summary: the most important corrections

1. **Origin of the current numbers.** Most "Altres fonts" and "Viatges" checkbox values match the US NRC "Personal Annual Radiation Dose Calculator" and the ANS calculator one-to-one: luggage 0.002 mrem, lantern 0.003 mrem, smoke detector 0.008 mrem, coal plant "within 50 miles" 0.03 mrem, brick/stone building 7 mrem [20][21]. The "80 km" in the coal item is just 50 miles converted. Two values are 10× off even from that US source: the wristwatch is 0.6 µSv in the app but 0.06 µSv (0.006 mrem) at NRC, and the nuclear plant is 0.09 µSv in the app but 0.009 µSv (0.0009 mrem) at NRC [20]. None of these values is Spanish, and most of them are negligible.
2. **Smoking is about 5× too high.** The app uses 0.245 µSv per cigarette, which gives 1.79 mSv/yr for 20 cigarettes a day. NCRP Report 160 (2009) gives an average of **18 µSv/yr per daily cigarette**. That is 0.049 µSv per cigarette, or about **0.36 mSv/yr for 20 a day** [17][18].
3. **"Building of stone/brick/concrete" (0.07 mSv) double-counts.** The province "Radiació terrestre" value already includes gamma rays from building materials. CSN explicitly describes the 0.48 mSv Spanish average as "rayos gamma procedentes de la tierra y de los edificios" [11]. Recommend removal.
4. **Airport luggage X-ray (0.02 µSv) should be removed.** The passenger is not irradiated; only the bag is. EU law allows only security scanners for people "which do not use ionising radiation" (Reg. (EU) 1147/2011, now Reg. (EU) 2015/1998) [19].
5. **Flights: 3 µSv/h is defensible for short/medium-haul.** UNSCEAR uses 3 µSv/h for short-haul and 4 µSv/h as a representative long-haul average [1]. Northern routes (North America, Asia) run at about 4–8 µSv/h. Recommend two inputs: short and long flights.
6. **Gauge "Perillositat: Baixa/Moderada/Alta/Molt alta" (10/100/1000 mSv/yr).** The thresholds and the word "Perillositat" (dangerousness) have no source. They mix annual chronic doses with acute-dose concepts and say nothing useful in the realistic range of 1–20 mSv. Replace with a sourced logarithmic **reference ladder** (§3).
7. **Occupational limits.** In Spain the worker limit is now **20 mSv per official year**, with no 5-year averaging (RD 1029/2022, art. 11.1) [7]. The "100 mSv/5 years, max. 50 mSv in one year" rule survives only for the **lens of the eye** (art. 11.2.a). The CSN brochure the app cites (2010) still shows the old 100/5 rule [11]. It is outdated on this point.
8. **Banana page (`info/BED.html`).** The arithmetic is roughly right: 0.1 µSv per banana, 365 bananas ≈ 0.036 mSv, 1 mSv ≈ 10,000 bananas. However, the page must say that eating bananas does **not** add a cumulative dose, because body potassium is under homeostatic control [1, para. 95]. "120,37 Bq/kg" is false precision; ≈110–125 Bq/kg is the honest figure.

---

## 1. Summary table

| # | Item (id) | Action | Recommended value | Unit | Source # | Confidence |
|---|---|---|---|---|---|---|
| 1 | Flight hours (`travelTime`) | **Update** (split into short and long) | 0.003 per hour for flights ≤ 4 h; 0.004 per hour for flights > 4 h (optional 0.006 for frequent N-America/Asia/polar flyers) | mSv/h | [1] para 68; [13][14][15][16][2] | High (order of magnitude), medium (exact per-route values) |
| 2 | Airport luggage X-ray (`luggage`) | **Remove** (move to myth-busting note) | 0 to the passenger | mSv | [19][20] | High |
| 3 | Gas camping lantern (`lantern`) | **Remove** (keep as a note) | Thorium-free mantles: 0. Thorium mantle, avid camper: 0.0005–0.06 mSv/yr (NUREG-1717 via ORAU); UNSCEAR upper estimate for camping-lantern users: 0.1 mSv/yr | mSv/yr | [22][1] para 233 | Medium |
| 4 | Cigarettes per day (`smokingRad`) | **Update** formula | 0.018 mSv/yr per daily cigarette (= 0.000049 mSv per cigarette); 20/day ≈ 0.36 mSv/yr (range ≈ 0.1–0.6) | mSv/yr per cig/day | [17][18] | Medium |
| 5 | Stone/brick/concrete building (`building`) | **Remove** (double counts terrestrial) | Already inside the province terrestrial value | — | [11][7] art. 72.b | High (that it double counts) |
| 6 | Luminous watch (`wristwatch`) | **Remove** or info-only | 0.00006 (NRC) to 0.01 (UNSCEAR/UK conservative, tritium) | mSv/yr | [20][1] Table 29 | Medium |
| 7 | Smoke detector (`detector`) | **Remove** or info-only | ≈ 0.00007 | mSv/yr | [1] para 226 | High |
| 8 | Living near a nuclear plant (`nuclear`) | **Keep as reassurance, update** | ≤ 0.001 (upper bound for the most exposed member of the public, Spain 2023) | mSv/yr | [10][11] | High |
| 9 | Living < 80 km from a coal plant (`coal`) | **Remove** | Spanish coal plants closed or no longer burning coal; the US value (0.0003 mSv) is negligible anyway | — | [20][30][37] | Medium |
| 10 | Sleeping next to someone (`sleep`) | **Update to ≈ 0.001 or info-only** | ≈ 0.001 (own calc., range 0.0005–0.002); current 0.01 = upper bound of US popular figures, no primary source found | mSv/yr | Own calc. from [1] para 95 | Low |
| 11 | Occupational dose (`workerRad`) | **Keep, improve UX** | User value from their official dosimetry record. Presets (Spain/EU averages): medical 0.6, nuclear power plant 1.2, aircrew 1.2–2.7 | mSv/yr | [10][12][2] | High |
| 12 | NEW (optional): days at high altitude | **Add as optional or info-only** | ≈ 0.002 per day at about 2,500 m (above sea level) | mSv/day | Own calc. from [3] | Medium-low |
| 13 | NEW: myth-busting panel (mobile/WiFi/microwaves/body scanners) | **Add (info only, 0 mSv)** | 0 ionising dose | — | [19][31][25] | High |
| 14 | Result gauge (`gauge.js`) | **Replace** | Logarithmic reference ladder, §3 | — | [1][4][7][10][23][24][26] | High |
| 15 | Banana equivalent dose (`bananaDose`, `info/BED.html`) | **Keep with caveat** | 0.1 µSv per banana (≈ 0.08 µSv computed) | µSv | [1] para 95; [6]; [34] | High |

---

## 2. Detail by item

### 2.1 Flights (`travelTime`, currently hours × 0.003 mSv)

**What drives the dose.** The dose rate depends on altitude, geomagnetic latitude and the solar cycle.
- **Altitude:** the dose rate doubles about every 1,830 m of extra altitude [1, para 68].
- **Latitude:** routes near the poles are much higher than routes near the equator.
- **Solar cycle:** at high latitudes, dose rates at solar minimum are about 50% higher than at solar maximum. At low latitudes (high geomagnetic shielding) the cycle barely matters [15, §3.1]. The Sun entered the Solar Cycle 25 maximum in October 2024 [35], so 2025–2027 doses sit at the low end. They will rise towards the next minimum (around 2030).

**Authoritative rates**

| Value | Conditions | Source | Conf. |
|---|---|---|---|
| **3 µSv/h** | Short-haul (7.5–10 km), including climb and descent | UNSCEAR 2008 Annex B, para 68 (p. 232) [1] | High |
| **4 µSv/h** | "May be used to represent the average dose rate for all long-haul (e.g. trans-Atlantic) flights" | Same [1] | High |
| 4–8 µSv/h | 9–12 km at about 50° latitude (northern Europe–North America) | Same [1] | High |
| 3.30 µSv/h (SD 1.81); 5.21 µSv/h (SD 0.94) | US domestic and US-carrier international flights (NCRP 160) | [17] slide 38 | Medium (US) |
| 3.29 ± 0.24 µSv/h (medium-haul, intra-Europe); 2.66 ± 0.33 µSv/h (long-haul) | Portuguese airline pilots. The Iberian long-haul mix (Latin America, Africa) is **lower** per hour than intra-European flying. | UNSCEAR 2020/21 Annex D, para 106 (p. 37) [2] | Medium-high, very relevant for Spain |
| ≈ 3.5 → 6.5 µSv/h (solar max.); 5 → 10 µSv/h (solar min.) | Low geomagnetic cut-off (polar), FL310 → FL390, code medians | EURADOS Report 2012-03, §3.1 (p. 25) [15] | High |

**Example routes (one way)**

These are published values for comparable routes. For the Spanish routes, the numbers in **bold** are my estimates based on those values; they are not CARI-7/SIEVERT runs.

| Route | Published comparable | Estimated dose | Confidence |
|---|---|---|---|
| Barcelona–Madrid (≈ 1 h 15 min block) | CARI-6: New Orleans–San Antonio, 1.3 block-h, 3.3 µSv [14] | **≈ 2–4 µSv (0.003 mSv)** | Medium |
| Barcelona–London (≈ 2 h 15 min) | Frankfurt–Rome 3–6 µSv [1, Table 50]. CSN: 1 µSv ≈ "1/10 of the dose of a jet flight between Spain and the UK" (i.e. ≈ 10 µSv) [11, p. 14] | **≈ 5–10 µSv** | Medium |
| Madrid–Gran Canaria (≈ 3 h) | Frankfurt–Gran Canaria 10–18 µSv (longer and further north) [1, Table 50] | **≈ 6–10 µSv** | Medium |
| Madrid–New York (≈ 8 h) | CARI-6: Lisbon–New York, 6.9 block-h, 28.9 µSv (4.2 µSv/h) [14, Table 2]; Frankfurt–New York 32–75 µSv [1, Table 50] | **≈ 30–50 µSv (0.04 mSv)** | Medium |
| Madrid–São Paulo/Buenos Aires (≈ 11–12 h) | SIEVERT: Paris–Rio de Janeiro, May 2001, mean 29 µSv [16]; Frankfurt–Rio 17–28 µSv [1, Table 50] | **≈ 25–40 µSv** | Medium |
| Madrid–Tokyo (≈ 14 h) | CARI-6: New York–Tokyo, 13.6 h, 75 µSv [14]; FAA: "more than 100 µSv for some" New York–Tokyo flights [13] | **≈ 60–100 µSv** | Low-medium (post-2022 routings avoid Russian airspace) |
| Polar / transpolar | Frankfurt–San Francisco 45–110 µSv [1, Table 50]; Paris–Fairbanks–Tokyo return 120 ± 11 µSv measured [16] | 6–10 µSv/h | Medium |

**Assessment of the current 0.003 mSv/h.** It equals the UNSCEAR short-haul rate, which is correct for most flights taken from Spain (domestic, Canaries, Europe). For North America or Asia it underestimates by about 25–50%. Because the app asks for hours, the error is modest. For context, frequent leisure flyers rarely exceed 0.1–0.3 mSv/yr. ICRP 132 calls exposure of occasional passengers negligible and only recommends self-assessment for frequent flyers [5].

**Recommendation.**
- Replace the single input with two inputs: "Hours on flights of ≤ 4 h" × 0.003 mSv/h, and "Hours on flights of > 4 h" × 0.004 mSv/h [1].
- Alternatively, add a third option "long flights to North America/Asia" × 0.005 mSv/h (justified by [1] 4–8 µSv/h at 50°N, [14], [17]).
- Show the route table above in the info panel, and label it as approximate.
- If more precision is wanted later, compute the Spanish routes with CARI-7A (FAA) or SIEVERT (DGAC/IRSN) and cite those runs (open question Q1).

### 2.2 Airport security (`luggage`, 0.00002 mSv)

- **Bag X-ray:** the X-ray beam goes through the bag inside a shielded tunnel. The passenger is not in the beam, so the passenger dose is effectively zero. The 0.002 mrem figure is a US calculator line item for "airport luggage inspection" [20][21].
- **Body scanners in the EU:** passengers may be screened only by "security scanners which do not use ionising radiation". This is Commission Implementing Regulation (EU) No 1147/2011, Annex point 4.1.1.2(d) [19], carried into Implementing Regulation (EU) 2015/1998 per the European Commission [19b]. EU airports therefore use millimetre-wave (non-ionising) scanners. The backscatter X-ray scanners once used in the USA are not allowed for passengers in the EU.
- **Action:** remove the checkbox. Mention it in the myth-busting panel ("airport scanners: 0").

Confidence: high.

### 2.3 Gas camping lantern (`lantern`, 0.00003 mSv; currently placed in "Viatges")

- **Source of the current value:** NRC calculator, "gas lantern mantles 0.003 mrem" [20].
- **What the sources say:**
  - NUREG-1717 (via ORAU): avid campers **0.05–6 mrem/yr (0.0005–0.06 mSv)**; one-time campers 0.002–0.06 mrem. The extreme case of 4 lanterns used as the only light source gives 200 mrem/yr (2 mSv) [22].
  - UNSCEAR 2008 (citing NRC): 0.1 mSv/yr for a user of portable camping lanterns and 2 mSv/yr for someone using only gas lanterns for light. These are conservative screening values. UNSCEAR also notes the trend to thorium-free mantles [1, para 233, p. 254].
- **Market status:** Coleman replaced thorium with yttrium around 1990 [22]. Thoriated mantles are still made by some manufacturers (ORAU: about half of US mantle sales around 2000) [22]. There is no Spain/EU market data (open question Q4).
- **Action:** remove it from the calculation, since it is negligible for normal use and the right value is uncertain. If kept, move it to "Altres fonts" and show "≤ 0.06 mSv/yr only if the mantles contain thorium".

Confidence: medium.

### 2.4 Smoking (`smokingRad`, currently cigarettes/day × 365 × 0.000245 mSv)

**Physics.** Tobacco contains Pb-210 and Po-210. Polonium is deposited and retained in the bronchial epithelium: about 50% of inhaled Po-210 is retained [18]. The dose to small regions of bronchial epithelium is therefore much larger than the **effective dose**, which weights the whole body. The calculator must use effective dose so that it is comparable with the other items.

**Sources**

| Value | Notes | Source | Conf. |
|---|---|---|---|
| **18 µSv/yr per daily cigarette** (overall average of studies; study range 5–35) | NCRP 160 table "Annual effective dose (µSv) for one cigarette per day" | [17] slide 34 (Kase et al., summary of NCRP 160 §5) | Medium |
| **0.32 mSv/yr** per male smoker (18 cig/day; range 0.09–0.6); **0.27 mSv/yr** per female smoker (15 cig/day; 0.08–0.5) | NCRP 160 | [17] slide 35 | Medium |
| "about 1 µSv" per pack; "360 µSv per year" for a pack a day | HPS expert answer, citing NCRP 160 | [18] | Medium |
| 18 mrem/yr (0.18 mSv) for ½ pack a day | ANS calculator (consistent with NCRP 160) | [21] | Medium |
| 10 µSv/yr ("210Po in tobacco") | UNSCEAR 2008 Table 29 (UK, "conservative estimates"). Much lower; possibly a per-caput or different-model value | [1] Table 29 (p. 347) | Low (unclear basis) |

**Recommended formula:** `otherRad += cigarettesPerDay * 0.018` (mSv/yr), which is the same as `cigarettesPerDay * 365 * 0.000049`. The current constant 0.000245 is 5× higher. With the new constant, 20/day gives 0.36 mSv/yr instead of 1.79 mSv/yr.

**Caveats for the info panel:**
1. Literature values span roughly a factor of 5 (brand and origin of the tobacco).
2. The effective dose understates the local dose to the bronchi.
3. Tobacco's health harm comes overwhelmingly from the chemical carcinogens in smoke, not from its radioactivity. This is general knowledge and is not quantified in the sources above. The text should say this without inventing a percentage.

### 2.5 Building of stone, brick or concrete (`building`, 0.07 mSv)

- **Origin:** NCRP 95/NRC "7 mrem" for living in a brick or masonry building [20]. NCRP 160 kept that assumption unchanged since the 1980s [17] slide 36.
- **Double counting:** UNSCEAR's terrestrial external dose already combines outdoor and indoor exposure, and indoor exposure includes gamma rays from building materials [1, para 79]. CSN's Spanish average of **0.48 mSv/yr** is explicitly "rayos gamma procedentes de la tierra y de los edificios" [11, p. 9]. The province values in the app (0.47–0.66 mSv) are the same kind of quantity, so the 0.07 mSv checkbox adds building materials a second time.
- **Legal context in Spain:**
  - Reference level for indoor gamma from building materials: **1 mSv/yr in addition to outdoor exposure** (RD 1029/2022, art. 72.b) [7].
  - Suppliers must check the activity-concentration index I < 1 (art. 80; Directive 2013/59/Euratom Annex VIII) [7][8].
  - Granite and some ceramics show the highest Ra-226 concentrations of common building materials [1, para 80].
- **Action:** remove the checkbox. If the terrestrial section is reworked, an optional *modifier* could be considered (e.g. traditional granite house in Galicia, Extremadura or the Sistema Central vs. a light timber or prefab house). That belongs to the terrestrial research, not here.

Confidence: high that it double counts.

### 2.6 Luminous watch (`wristwatch`, 0.0006 mSv)

- The app value is 10× the NRC figure (0.006 mrem = 0.00006 mSv, "LCD") [20].
- UNSCEAR Table 29 (UK, conservative) gives **0.3 µSv/yr** for a promethium-147 watch and **10 µSv/yr** for a tritium watch, the latter because tritium leaks and is taken into the body [1, Table 29 and para 225].
- Radium dials stopped being made "a few decades ago" [1, para 225]. Vintage radium watches are a separate, collector-only case and are not quantified here.
- **Action:** remove it, or make it info-only ("≤ 0.01 mSv/yr even in the worst case").

Confidence: medium.

### 2.7 Smoke detector (`detector`, 0.00008 mSv)

- **Dose:** an ionisation detector contains ≤ 40 kBq of Am-241. The dose rate at 2 m is 2.4 × 10⁻⁵ µSv/h. At 8 h/day at 2 m this gives **0.07 µSv/yr** [1, para 226, p. 253]. The app's 0.08 µSv comes from NRC's 0.008 mrem [20]. Both are negligible.
- **Market situation:** ionisation detectors are being phased out in Europe.
  - In Spain, a CSN inspection record states that one large distributor (UTC Fire & Security) stopped selling ionisation detectors in January 2013 "por motivos comerciales" [38].
  - France ordered all ionisation smoke detectors withdrawn, with deadlines up to 2021 (search result citing ASN; not fetched, see Q5).
  - Domestic detectors sold today are mostly optical (photoelectric). I found no Spanish market statistics.
- **Action:** remove.

Confidence: high that the dose is negligible; medium on the market situation.

### 2.8 Living near a nuclear power plant (`nuclear`, 0.00009 mSv)

- **Spain, current data:** in 2023, effective doses to members of the public from liquid and gaseous effluents of nuclear installations, "estimadas con criterios realistas", **did not exceed 1.1% of the authorised limit of 0.1 mSv in 12 consecutive months**. That is **≤ 1.1 µSv/yr** for the most exposed person [10, p. 66].
- CSN's 2010 brochure says the average dose potentially received in the immediate surroundings of Spanish plants is "por debajo de 10 microSievert por año". It also gives a national average from all discharges below 1 µSv [11, p. 6].
- **Plants operating in Spain (CSN 2023):** Almaraz I–II (Cáceres), Ascó I–II and Vandellós II (Tarragona), Cofrentes (València) and Trillo (Guadalajara) [10]. Garoña, José Cabrera and Vandellós I are in latency or dismantling [10].
- **Action:** keep the checkbox, because people genuinely ask about this and the answer is reassuring. Set the value to **0.001 mSv/yr**, a deliberately conservative upper bound from the CSN data, and label it "≤ 0,001 mSv". The current 0.00009 mSv is a US figure, though it is just as negligible.

Confidence: high.

### 2.9 Living near a coal power plant (`coal`, 0.0003 mSv, "menys de 80 km")

- **Origin:** NRC/ANS, "within 50 miles", 0.03 mrem [20][21].
- **Size of the effect:** UNSCEAR 2016 found that the coal cycle contributed more than half of the global *collective* public dose from electricity generation, and the nuclear fuel cycle less than a fifth [30]. That is a statement about worldwide collective dose, not about the dose to an individual living nearby. The individual figure available is the NRC/ANS 0.03 mrem (0.0003 mSv), which is negligible [20][21]. An authoritative individual dose for European coal plants was not verified (open question Q11).
- **Spain:** most coal plants have closed. The largest, As Pontes (A Coruña), stopped burning coal in November 2023 [37]. The 80 km/50 mile criterion is a US convention.
- **Action:** remove it. It could be mentioned in the info panel as a historical curiosity ("coal ash contains natural uranium and thorium").

Confidence: medium (I did not compile a complete list of remaining Spanish coal units).

### 2.10 Sleeping next to someone (`sleep`, 0.01 mSv)

- **Primary source:** none found. The "1 mrem/yr" or "2 mrem" figures circulate in US educational material; the value is not in the current NRC calculator [20][21].
- **Own estimate (low confidence):**
  - Adult body potassium is about 0.18% of body mass [1, para 95], so a 70 kg adult carries about 125 g of K, or about 4 kBq of K-40.
  - K-40 emits a 1.46 MeV gamma ray in 10.7% of decays.
  - The point-source air-kerma rate constant, computed from NIST µen/ρ, is about 0.018 µGy·m²·MBq⁻¹·h⁻¹.
  - At an effective distance of 0.3–0.5 m, with 30–40% self-absorption in the partner's body, the rate is about 0.2–0.5 nGy/h.
  - Over 8 h/night for 365 nights (2,920 h) this gives about **0.5–1.5 µSv/yr (≈ 0.001 mSv)**.
  - For comparison, one's own K-40 gives 0.165 mSv/yr [1, para 95]. The partner's contribution is therefore below 1% of that.
- **Action:** keep it only as an info-panel curiosity, or as a checkbox set to 0.001 mSv. Do not keep 0.01 mSv without a citable source.

### 2.11 Other lifestyle items considered (none recommended as new calculator inputs, except optionally high altitude)

| Item | Finding | Recommendation | Source / conf. |
|---|---|---|---|
| Bananas, other K-rich foods, **low-sodium (KCl) salt** | Body K is under homeostatic control, so extra potassium is excreted and does not raise the K-40 body burden or dose in healthy people. The internal K-40 dose is about 0.165 mSv/yr for adults regardless of diet. | Do not add. Keep the banana only as a comparison unit (§4). | [1] para 95, high |
| Brazil nuts | Known to concentrate radium. I did not verify a figure (the ORAU page now returns 404). | Do not add. Optional curiosity without a number. | Not verified |
| Granite worktops | US EPA: "extremely unlikely" to raise annual dose above normal background. Radon from the soil is the real issue. | Do not add. Mention in the radon/terrestrial panel. | [32], high |
| Ceramics, glazes, uranium (Vaseline) glass | Uranium-glazed tiles < 1 µSv/yr. Some uranium-glass collections up to 0.5 mSv/yr, typically an order of magnitude lower. Zircon-glazed ceramics "far below 1 Bq/g". | Do not add. | [1] para 134, 227, Table 29, high |
| TV/old CRT screens | NRC still lists "TV watching 1 mrem". CRTs are obsolete in Spain; flat screens emit no X-rays. | Do not add. | [20], high (obsolete) |
| Mobile phones, WiFi, microwave ovens, 5G, airport millimetre-wave scanners | **Non-ionising.** Cannot ionise atoms, so the effective dose is 0 mSv. A WHO-commissioned systematic review (Karipidis et al. 2024) found no association between mobile phone use and brain or other head and neck cancers. | Add to a **myth-busting panel**, not to the sum. | [31][19], high |
| Skiing and mountain trips | Cosmic dose rate rises with altitude. Using UNSCEAR 2000 Annex A eqs. (12)–(14): sea level ≈ 0.03 (ionising) + ≈ 0.007–0.009 (neutrons) µSv/h. At 2,500 m ≈ 0.08 + ≈ 0.05 ≈ 0.13 µSv/h. **The excess is ≈ 0.09 µSv/h ≈ 0.002 mSv per day**, so a ski week adds ≈ 0.01–0.015 mSv (about 3–5 h of flying). CSN cross-check: 1 mSv ≈ 42 days at 6,700 m in the Himalaya [11, p. 14]. | Optional input "dies a més de 2.000 m" × 0.002 mSv/day, or info-only. The cosmic section already handles **living** at altitude. | Own calc. from [3] (Annex A paras 47–51), medium-low |
| Spa or thermal water with radon | Highly variable. Some Spanish spa waters exceed 63.7 Bq/L Rn-222 (search result: Ródenas et al., not fetched). Visitor doses reported in the literature range from µSv to a few tens of µSv per season. | Do not add. Mention in the radon panel that radon is mainly a home (and workplace) issue. | Low (not verified) |

### 2.12 Occupational exposure (`workerRad`, free input in mSv)

**Typical annual doses**

| Group | Value | Notes | Source | Conf. |
|---|---|---|---|---|
| All monitored workers, Spain 2023 | 127,394 monitored workers. 81.3% at **background level**; 96.8% < 1 mSv; 99.81% < 6 mSv; 99.99% < 20 mSv | National Dosimetry Bank | [10] pp. 64–65 | High |
| Mean for workers with significant dose, Spain 2023 | **0.70 mSv/yr** | Excludes potential overexposures | [10] p. 64 | High |
| Nuclear power plants, Spain 2023 | **1.18 mSv/yr** mean (8,125 workers; Table 5.1.1). Fig. 3.3 of the same report says 1.28. | By plant: Cofrentes 1.7; Ascó 0.79; Almaraz 0.53; Trillo 0.53; Vandellós II 0.21 (from the plant cards) | [10] p. 39 (Fig. 3.3), ch. 4 plant summaries, p. 65 (Table 5.1.1) | High |
| Medical radioactive installations, Spain 2023 | **0.62 mSv/yr** (100,284 workers; Fig. 3.3 says 0.65) | Interventional cardiologists measure about 46 µSv/procedure *over the apron* (Hp(10)), which overestimates effective dose. Eye-lens doses of 8–60 mSv/yr are possible without protection. | [10] p. 65; [2] para 273 | High / medium |
| Industrial installations, Spain 2023 | 0.96 mSv/yr | — | [10] | High |
| Transport of radioactive material, Spain 2023 | 1.80 mSv/yr (highest sector mean) | — | [10] | High |
| **Aircrew**, Germany 2022–2023 | **1.2 mSv/yr** mean (about 37,000 people with measurable dose). Before the pandemic: 1.9–2.3. Individual values > 6 mSv/yr are "in der Regel nicht" exceeded. | The 2019 change of conversion factors lowered values by up to 30% | [12] pp. 5, 27, 35 | High |
| Aircrew, worldwide 2010–2014 | **2.7 mSv/yr** (short-haul 2.8, long-haul 2.7) | UNSCEAR survey, 10 countries | [2] Table 2 (p. 33) | High |
| Aircrew, Spain (Iberia, 2001) | 1.4 mSv/yr mean (0.4–2.7) | At solar maximum; may be 5–20% higher in other years | [2] para 108 (p. 37) | Medium |
| Aircrew regulation, Spain | A radiological protection programme is required when crew could exceed **1 mSv/yr** (RD 1029/2022 art. 81). CSN asks airlines to plan for < 6 mSv/yr, using CARI-7 or EPCARD.Net 5.4.3. Crew are not in the National Dosimetry Bank statistics above. | — | [7][9] | High |

**How to handle the user-entered occupational dose.** Recommended UX:
1. Ask: "Treballes exposat a radiació? (no / sí)". If yes, offer: (a) "Conec la meva dosi anual (del meu historial dosimètric)" → numeric input in mSv, step 0.01, not step 1 as now; or (b) "No la conec" → presets: medical 0.6, nuclear plant 1.2, industrial 1.0, aircrew 2.0. Each preset shows its source.
2. **Validation and messages:**
   - Above 6 mSv: "valor propi de treballadors de categoria A" (RD 1029/2022 art. 22) [7].
   - Above 20 mSv: "supera el límit legal anual (20 mSv, art. 11) — comprova les unitats; si és real, és un cas que el CSN investiga" [7][10].
   - Above 100: treat as a probable input error and ask for confirmation.
3. **Avoid double counting:**
   - Aircrew should not also enter their working flight hours in "Viatges". The tooltip should say "només vols com a passatger".
   - Patients' medical exposures are not occupational.
   - Official dosimetry reports dose above background (Hp(10) ≈ effective dose for whole-body photon exposure). Natural background is computed separately in the app, so there is no overlap.
4. Workers have the right to their individual dosimetry record, which must be kept "a disposición del propio trabajador" (RD 1029/2022 art. 39.1) [7]. The tooltip can tell users to ask their radiological protection service.

---

## 3. Result scale (gauge): critique and proposal

### 3.1 Problems with the current gauge (`js/gauge.js`)

- **Unsourced labels.** "Perillositat: Baixa < 10, Moderada 10–100, Alta 100–1000, Molt alta ≥ 1000 mSv/any" has no source. The page's own note says no explanation is given for the level.
- **Too coarse where it matters.** Almost every realistic result (about 2–15 mSv/yr in Spain) is "Baixa". The gauge does not tell a person whose home has 600 Bq/m³ of radon (≈ 15–30 mSv/yr) anything useful. Meanwhile "Molt alta ≥ 1000 mSv/any" refers to doses that only make sense as **acute** exposures.
- **Mixed concepts.** The 1000 mSv (1 Sv) region is where deterministic effects such as acute radiation syndrome appear. Those thresholds apply to **acute** doses, i.e. "delivered in a short time (usually a matter of minutes)" [24]. ICRP says effective dose (Sv) should not be used to quantify high doses at all; absorbed dose in Gy should be used instead [4, para 105]. An annual chronic sum of 1,000 mSv cannot be compared directly with an acute 1 Gy.
- **Wrong cause of concern.** "Perillositat" invites people to treat medical exposures as a hazard to avoid. In Spanish and EU law, medical exposures of patients are not subject to dose limits: they are justified case by case by the clinical benefit [7][8].

### 3.2 Sourced reference facts

| Reference point | Value | Source | Conf. |
|---|---|---|---|
| Public dose limit (planned exposures; excludes natural background and medical) | **1 mSv per official year**; lens 15 mSv; skin 50 mSv | RD 1029/2022 art. 15 [7]; Directive 2013/59/Euratom art. 12 [8] | High |
| Exposed-worker limit (Spain) | **20 mSv per official year**, with no 5-year averaging. Lens 100 mSv in 5 consecutive years with max. 50 mSv in one year; skin and extremities 500 mSv | RD 1029/2022 art. 11 [7] | High |
| Directive option not used by Spain for effective dose | up to 50 mSv in a single year if the 5-year average is ≤ 20 mSv | Directive 2013/59 art. 9.2 [8] | High |
| Category A worker | could exceed 6 mSv/yr (or lens 15, skin 150 mSv) | RD 1029/2022 art. 22 [7] | High |
| Pregnant worker (fetus) | ≤ 1 mSv from declaration to the end of pregnancy | RD 1029/2022 art. 12 [7] | High |
| Aircrew programme threshold | 1 mSv/yr (programme required); planning target < 6 mSv/yr | RD 1029/2022 art. 81 [7]; CSN Circular 1/24 [9] | High |
| **Radon reference level** (homes, public buildings and workplaces) | **300 Bq/m³** annual mean | RD 1029/2022 art. 72.a [7]; Directive arts. 54 and 74 [8] | High |
| Dose from a year at 300 Bq/m³ in a home | **≈ 7.5 mSv** (UNSCEAR coefficient 1.6 mSv per mJ·h·m⁻³) to **≈ 14 mSv** (ICRP 137 coefficient 3 mSv per mJ·h·m⁻³). Assumes F = 0.4 and 7,000 h/yr indoors. | Own calc. with the coefficients quoted in [36] | Medium |
| Indoor gamma from building materials | 1 mSv/yr above outdoor | RD 1029/2022 art. 72.b [7] | High |
| ICRP on the ~100 mSv level | Below about 100 mSv, ICRP *assumes* that risk is proportional to dose (LNT) as "the best practical approach" (paras 36, 64–65). Annual doses approaching 100 mSv "casi siempre justificarán la introducción de acciones protectoras" (para 35). 100 mSv is the maximum reference level for emergencies (para 236). ICRP also states that epidemiology gives evidence of risk "a dosis de alrededor de 100 mSv o menores aunque con incertidumbres" (para 62). | ICRP 103 (Spanish ed.) [4] | High |
| HPS position | Below about 100 mSv above background, observed effects are "not statistically different from zero". HPS advises against estimating risks for doses near or below natural background. | HPS PS010-4 (2019) [26] | High (it is a position statement) |
| Recent counter-evidence (honesty caveat) | INWORKS (309,932 nuclear workers): solid-cancer mortality rises 52% per Gy. The estimate restricted to 0–100 mGy cumulative is about twice as high, with wider uncertainty. | Richardson et al. 2023, BMJ [29] | High (the study exists); its interpretation is debated |
| BEIR VII | 100 mSv → about **1 in 100** people would develop a radiation-induced cancer, against about **42 in 100** who develop cancer from other causes. 10 mSv → about 1 in 1,000. | BEIR VII Report in Brief [27] | High |
| ICRP nominal risk coefficients (low dose rate, detriment-adjusted) | Cancer **5.5 × 10⁻² Sv⁻¹** (whole population), 4.1 × 10⁻² Sv⁻¹ (adult workers); heritable 0.2 / 0.1 × 10⁻² Sv⁻¹ | ICRP 103 Table 1, para 83 [4] | High |
| Collective-dose caveat | Collective dose "no está pensada como una herramienta para estudios epidemiológicos". Counting cancer deaths from trivial doses to large populations "no es razonable y debería evitarse". | ICRP 103 paras 66, 161 [4] | High |
| UNSCEAR caveat | UNSCEAR "does not recommend multiplying very low doses by large numbers of individuals to estimate numbers of radiation-induced health effects" at doses at or below background levels | UNSCEAR 2012 statement [28] | High |
| ARS (acute, whole body, penetrating, within minutes) | > **0.7 Gy** (full syndrome 0.7–10 Gy); mild symptoms possible from **0.3 Gy** | CDC (reviewed 23 Apr 2024) [24] | High |
| ARS threshold, WHO wording | "about 1 Sv (1000 mSv)" | WHO fact sheet, 27 Jul 2023 [25] | High |
| LD50/60 | about **2.5–5 Gy** with medical care | CDC [24] | High |
| Tissue reactions below 100 mGy | ICRP: up to about 100 mGy, no tissue is judged to show clinically relevant functional impairment, for single or repeated annual doses | ICRP 103 para 60 (Spanish ed.) [4] | High |
| Natural background, world | Average **2.4 mSv/yr**; most people **1–13 mSv/yr** | UNSCEAR 2008 Annex B paras 412, 741 [1] | High |
| Spain, average total | **3.7 mSv/yr** (2.4 natural + medical ≈ 1.28 + others) | CSN SDB-04.07 (2010) [11]. Medical part now 1.19 mSv per caput (DOPOES II, 2017 data) [33] | Medium (2010 figure; consistent with newer medical data) |
| High natural background areas | **Yangjiang** (China) ≈ 6.4 mSv/yr mean. **Kerala** (India) ≈ 4.5 mGy gamma + 2.4 mSv radon ≈ 7 mSv/yr (reported range 1–45). **Ramsar** (Iran) external 0.7–131 mSv/yr (mean 6) plus radon 2.5–72 mSv/yr. **Guarapari** (Brazil) now near normal except hot spots (< ~7 mSv/yr). Cancer-mortality studies in Yangjiang found no increase. | Hendry et al. 2009 [23] | High (doses); medium (epidemiology, ecological designs) |
| HBRA dose classes used in the literature | low ≤ 5; medium 5–20; high 20–50; very high > 50 mSv/yr | Hendry et al. 2009 [23] | Medium (classification convention) |

### 3.3 Proposed visual: logarithmic "reference ladder"

Replace the 4-colour "perillositat" bar with a **horizontal log scale from 0.0001 to 10,000 mSv** (8 decades; `pos = (log10(d) + 4) / 8`). The user's annual total sits on it as a marker, and labelled reference points appear above and below. Use two visual tracks:
- **Track A, "dosi anual / esdeveniment".** Everything up to 100 mSv. Marker colour: neutral blue/grey, not traffic lights.
- **Track B, "dosis agudes altes (en minuts)".** Expressed in **Gy**, greyed out, with a note that these are not comparable with a year of chronic dose [4 para 105][24].

| Point (≈ mSv) | Label (Catalan, short) | Type | Source |
|---|---|---|---|
| 0.0001 | Menjar un plàtan | single event | [1] para 95, [6], [34] (§4) |
| ≤ 0.001 | Viure un any al costat d'una central nuclear espanyola (persona més exposada, 2023) | annual | [10] |
| 0.003 | Vol Barcelona–Madrid | single event | [1] para 68, [14] |
| 0.04 | Radiografia de tòrax (Espanya) | single event | [33] |
| 0.03–0.05 | Vol Madrid–Nova York | single event | [14], [1] Table 50 |
| 0.17 | El potassi-40 del teu propi cos, en un any | annual | [1] para 95 |
| 0.36 | Fumar 20 cigarrets al dia durant un any | annual | [17] |
| 1 | Límit legal per al públic (fonts artificials, sense comptar la medicina ni el fons natural) | legal reference | [7] art. 15 |
| 1.2–2.7 | Tripulació aèria (mitjana anual) | annual | [12], [2] |
| 2 | TC de cap (Espanya) | single event | [33] |
| 2.4 | Mitjana mundial de radiació natural (rang habitual 1–13) | annual | [1] para 412 |
| ≈ 3.7 | Mitjana espanyola total | annual | [11], [33] |
| 6 | Llindar de treballador de categoria A | legal reference | [7] art. 22 |
| 6–7 | Zones d'alt fons natural (Yangjiang, Kerala): mitjana | annual | [23] |
| ≈ 7.5–14 | Viure un any a 300 Bq/m³ de radó (nivell de referència) | annual | [7] art. 72; own calc. [36] |
| 14 | TC d'abdomen (Espanya) | single event | [33] |
| 20 | Límit legal anual per a treballadors exposats | legal reference | [7] art. 11 |
| 100 | Nivell a partir del qual l'ICRP considera gairebé sempre justificat actuar; per sota, el risc no s'ha pogut mesurar amb claredat | reference | [4] paras 35, 62, 64; [26]; [27] |
| up to ≈ 130 (+ radon) | Màxims a Ramsar (Iran) | annual | [23] |
| 0.3 Gy (acute) | Possibles símptomes lleus | acute (track B) | [24] |
| 0.7–1 Gy (acute) | Llindar de la síndrome d'irradiació aguda | acute (track B) | [24][25] |
| 2.5–5 Gy (acute) | Dosi letal per al 50% amb atenció mèdica | acute (track B) | [24] |

### 3.4 Proposed result bands (replace "Perillositat")

Rename the heading to **"Com es compara la teva dosi?"** and use neutral, sourced bands for the **annual** total:

| Annual total | Label | Message (Catalan, short) | Basis |
|---|---|---|---|
| < 5 mSv | **Dins del rang habitual** | "Semblant a la mitjana espanyola (≈ 3,7 mSv) i dins del rang de fons natural de la majoria de persones (1–13 mSv)." | [1][11]; "low" class [23] |
| 5–20 mSv | **Per sobre de la mitjana** | "Sol ser degut al radó de casa o a proves mèdiques com TC. El radó és la part que pots reduir; les proves mèdiques justificades aporten un benefici." | "medium" class [23]; radon RL [7] |
| 20–100 mSv | **Elevada** | "Supera el que la llei permet als treballadors en un any (20 mSv). Si ve del radó, convé actuar (ventilació, segellat, mesura professional). Si ve de proves mèdiques, parla-ho amb el metge, però no evitis proves necessàries." | [7] art. 11; [23]; [4] Table 5 (band "> 20 to 100 mSv") |
| ≥ 100 mSv | **Molt elevada (revisa les dades)** | "Dosi anual que l'ICRP considera que gairebé sempre justifica actuar. Comprova que les dades són correctes (unitats, nombre de proves)." | [4] paras 35, 236 |

Additional rules:
- **Radon flag, independent of the total.** If the user enters a radon concentration above 300 Bq/m³, always show "supera el nivell de referència legal (300 Bq/m³, RD 1029/2022)" with a link to CSN guidance [7].
- **Show the breakdown.** Show which category dominates, e.g. "El 70% de la teva dosi ve del radó".
- **Do not show the banana count next to a hazard label.** Use it as a curiosity line only (§4).

### 3.5 Risk communication: recommendation

- **Recommended:** do **not** compute a personal "cancer risk %". ICRP 103 paras 66 and 161, UNSCEAR 2012 [28] and HPS PS010-4 [26] all discourage risk projections at doses near background.
- **Optional:** if the team wants one sentence of context, use BEIR VII's framing, which is population-level and illustrative. Suggested text: "Com a referència, segons el comitè BEIR VII, si 100 persones reben 100 mSv, s'estima que 1 podria desenvolupar un càncer a causa d'aquesta radiació, mentre que unes 42 de cada 100 en desenvoluparan al llarg de la vida per altres causes. Per a dosis més baixes, el risc estimat és proporcionalment menor i tan petit que no es pot mesurar directament" [27][26].
- **If a coefficient is used:** cite ICRP 103 Table 1 (5.5% per Sv, i.e. 0.0055% per mSv) as a *nominal protection coefficient*, not as an individual prediction [4], and add the INWORKS caveat that some recent worker studies suggest risk persists at low doses [29].

---

## 4. Banana equivalent dose (`bananaDose` in `js/script.js`, `info/BED.html`)

**Verification calculation** (own calculation; inputs sourced):
- K-40 is 0.0117% of natural potassium, and its specific activity is 2.6 × 10⁸ Bq/kg [1, para 95]. Natural potassium therefore has about **30.4 Bq per g of K**.
- A raw banana has 358 mg K per 100 g (USDA FoodData Central, SR Legacy 173944) [34]. An edible portion of about 120–150 g contains ≈ 0.43–0.54 g K, i.e. **≈ 13–16 Bq of K-40**.
- The adult ingestion dose coefficient for K-40 is **6.2 × 10⁻⁹ Sv/Bq** (ICRP 119, Table F.1) [6]. The result is ≈ **0.08–0.10 µSv per banana**. "≈ 0.1 µSv" is a fair rounding.
- 365 bananas ≈ 0.03–0.036 mSv, and 1 mSv ≈ 10,000 bananas. The app's `radDose * 10000` is consistent with this.

**Caveat (must be shown).** Body potassium is "under homeostatic control" [1, para 95]. Eating a banana does not raise the body's K-40 content in a lasting way; the excess is excreted. The real internal K-40 dose is about **0.165 mSv/yr** for adults (0.185 for children) whatever the diet [1, para 95]. The banana works as a **comparison unit**, not as an extra dose that accumulates.

**Checking the claims in `info/BED.html`**

| Claim on the page | Verdict | Fix |
|---|---|---|
| "concepte usat ocasionalment pels defensors de l'energia nuclear" | Loaded framing | Replace with "unitat informal utilitzada en divulgació". |
| K contains 0.0117% K-40 | Correct [1] | — |
| 150 g banana ≈ 600 mg K "[396 mg per cada 100 g]" | High. USDA gives 358 mg/100 g [34]. | "uns 400–550 mg de potassi". |
| ≈ 0.070 mg K-40 ≈ 18.5 Bq | Arithmetically consistent with 600 mg K (0.6 g × 30.4 Bq/g ≈ 18 Bq) | With USDA K content: ≈ 13–16 Bq. |
| "120,37 becquerels per quilogram" | False precision | "≈ 110–125 Bq/kg". |
| 365 bananas → 0.036 mSv | Correct order of magnitude | Add the homeostasis caveat. |
| "radiació natural en la Terra és de 2,4 mSv" | Correct: world average natural [1, para 412] | Add "(mitjana mundial; a Espanya la dosi total mitjana és ≈ 3,7 mSv)" [11]. |
| "60 vegades superior" | 2.4 / 0.036 ≈ 66 | "unes 65 vegades". |
| Bananas trigger false alarms at US port radiation portals | Plausible and widely reported, but **not verified** here | Cite a source or remove (Q10). |

Technical note outside this research scope: `info/BED.html` loads `../script.js`, which does not exist at the repo root, and Firebase scripts it does not need.

---

## 5. "Més informació" texts (Catalan)

Items are listed in suggested UI order. Each text is 2–4 sentences. Numbers match §1–§4.

**5.1 Vols (`travelTime`)**
> Com més amunt volem, menys atmosfera ens protegeix de la radiació còsmica: a l'altitud de creuer d'un avió la dosi és aproximadament 100 vegades més alta que a terra. Un vol curt com Barcelona–Madrid suposa uns 0,003 mSv, i un vol transatlàntic com Madrid–Nova York uns 0,04 mSv, similar a una radiografia de tòrax. Els vols cap a Amèrica del Nord o l'Àsia, que passen per latituds més altes, donen més dosi per hora que els vols cap a Amèrica del Sud. Per a qui vola de tant en tant és una aportació petita; només el personal de vol i les persones que volen moltíssim sumen uns quants mSv a l'any.

**5.2 Controls de seguretat a l'aeroport (myth-busting; replaces `luggage`)**
> A la màquina de raigs X de l'aeroport els raigs travessen l'equipatge, no a tu, i per això no reps cap dosi. A la Unió Europea, els escàners corporals per a passatgers només poden ser d'ones mil·limètriques, que no són radiació ionitzant. Per tant, passar el control de seguretat suma 0 mSv.

**5.3 Tabac (`smokingRad`)**
> Les fulles de tabac contenen poloni-210 i plom-210, elements radioactius que, en fumar, es dipositen als bronquis. Fumar un paquet al dia suposa una dosi efectiva d'uns 0,36 mSv l'any, tot i que la dosi en petites zones dels bronquis és molt més alta. Tot i això, la radioactivitat és només una petita part del perill del tabac: el fum conté moltes altres substàncies que causen càncer.

**5.4 Viure a prop d'una central nuclear (`nuclear`)**
> Les centrals nuclears espanyoles (Almaraz, Ascó, Vandellós II, Cofrentes i Trillo) alliberen quantitats molt petites de material radioactiu, controlades pel Consell de Seguretat Nuclear (CSN). El 2023, la dosi estimada a la persona més exposada de l'entorn no va arribar a 0,001 mSv l'any, menys d'una mil·lèsima part de la radiació natural que rebem. Viure-hi a prop no canvia de manera apreciable la teva dosi anual.

**5.5 Treballar amb radiació (`workerRad`)**
> Si treballes amb radiació (en un hospital, una central nuclear o la indústria) o ets tripulant d'avió, la teva dosi laboral consta en el teu historial dosimètric; la pots demanar al servei de protecció radiològica o a l'empresa. A Espanya, el 2023 el 97% dels treballadors controlats va rebre menys d'1 mSv, i la mitjana dels que van tenir una dosi mesurable va ser de 0,7 mSv. El límit legal és de 20 mSv l'any. Si ets tripulant, no tornis a comptar els vols de feina a l'apartat de viatges.

**5.6 Dormir al costat d'algú (`sleep`, curiosity)**
> El cos humà conté de manera natural potassi-40, que és radioactiu, i una petita part de la seva radiació surt del cos. Dormir cada nit al costat d'una altra persona afegeix, segons una estimació aproximada, al voltant de 0,001 mSv l'any. És molt menys que el que et dona el potassi del teu propi cos (uns 0,17 mSv l'any): és una curiositat, no un risc.

**5.7 Dies a alta muntanya (optional new item)**
> Com més amunt som, menys ens protegeix l'atmosfera de la radiació còsmica. Un dia a uns 2.500 m d'altitud afegeix aproximadament 0,002 mSv, i una setmana d'esquí entre 0,01 i 0,015 mSv, com unes poques hores d'avió. Si vius a la muntanya, això ja es té en compte a l'apartat de radiació còsmica.

**5.8 Mites: mòbils, wifi, 5G i microones (new info-only panel)**
> Els telèfons mòbils, el wifi, el 5G, els forns de microones i les antenes emeten radiació no ionitzant: no té prou energia per arrencar electrons dels àtoms, que és el que fan els raigs X o la radiació gamma. Per això no sumen dosi en aquesta calculadora (0 mSv). Una revisió científica encarregada per l'Organització Mundial de la Salut (2024) no va trobar relació entre l'ús del mòbil i el càncer de cervell.

**5.9 Objectes quotidians amb una mica de radioactivitat (replaces `wristwatch`, `detector`, `lantern`)**
> Alguns objectes contenen petites quantitats de material radioactiu: els detectors de fum iònics (americi-241), els rellotges amb triti, les camises de llanterna de gas amb tori o algunes ceràmiques i vidres antics amb urani. Les dosis que donen en un ús normal són molt petites, generalment per sota de 0,01 mSv l'any, i molts d'aquests productes ja s'han substituït per alternatives no radioactives. Per això no els incloem al càlcul: les fonts que realment pesen són el radó de casa i les proves mèdiques.

**5.10 Casa de pedra, maó o formigó (explains removal of `building`)**
> Els materials de construcció (pedra, granit, maó, formigó) contenen urani, tori i potassi naturals i emeten una mica de radiació gamma. Aquesta dosi ja està inclosa en el valor de radiació terrestre de la teva província, que combina el que reps a l'aire lliure i dins dels edificis. La llei fixa un nivell de referència d'1 mSv l'any per als materials de construcció, i els fabricants n'han de controlar la radioactivitat.

**5.11 Centrals de carbó (explains removal of `coal`)**
> Les cendres del carbó contenen urani i tori naturals, però la dosi que reben les persones que viuen a prop d'una central tèrmica és pràcticament nul·la. A més, la majoria de centrals de carbó d'Espanya ja han tancat o han deixat de cremar carbó; la d'As Pontes, la més gran, ho va fer el novembre de 2023.

**5.12 El plàtan com a unitat de comparació (`bananaDose`, `info/BED.html`)**
> Un plàtan conté uns 400–550 mg de potassi, una petita part del qual és potassi-40 radioactiu; menjar-ne un equival a uns 0,0001 mSv (0,1 µSv). Per fer-te'n una idea, 1 mSv equival a uns 10.000 plàtans. És una unitat divertida per comparar, però menjar més plàtans no fa que acumulis dosi: el cos manté constant la quantitat de potassi i elimina el que sobra.

**5.13 Com interpretar el resultat (new text for the result panel)**
> El resultat és una estimació de la teva dosi anual en mil·lisieverts (mSv). La majoria de persones del món reben entre 1 i 13 mSv l'any només de fonts naturals, i a Espanya la mitjana total és d'uns 3,7 mSv. Les dues fonts que més pesen, i que alhora es poden gestionar, són el radó de casa i les proves mèdiques; aquestes últimes es fan perquè el benefici per a la salut és molt més gran que el risc.

**5.14 Límits i nivells de referència (new text near the scale)**
> La llei espanyola (Reial decret 1029/2022) limita a 1 mSv l'any la dosi que una persona del públic pot rebre per activitats humanes amb radiació, sense comptar el fons natural ni la medicina, i a 20 mSv l'any la dels treballadors exposats. Per al radó, el nivell de referència és de 300 Bq/m³ de mitjana anual; si casa teva el supera, val la pena reduir-lo. Per sota d'uns 100 mSv els estudis no han pogut mesurar amb claredat un augment del risc de càncer, però la protecció radiològica suposa, per prudència, que qualsevol dosi comporta un risc petit i proporcional.

**5.15 Dosis agudes i efectes immediats (new text for track B of the scale)**
> Els efectes immediats de la radiació, com la síndrome d'irradiació aguda, només apareixen quan es rep una dosi molt alta de cop, en pocs minuts: a partir d'uns 0,7 Gy (aproximadament 700 mSv) a tot el cos. Aquestes xifres no es poden comparar directament amb la suma de dosis petites repartides al llarg d'un any, perquè quan la dosi arriba a poc a poc el cos té més temps per reparar el dany.

---

## 6. Bibliography

Fetch status: "fetched" means I retrieved and read the document on 3–4 Oct 2026. Page numbers are the printed page numbers unless marked "PDF p." (index in the PDF file).

1. **UNSCEAR.** *Sources and Effects of Ionizing Radiation. UNSCEAR 2008 Report*, Vol. I, **Annex B: Exposures of the public and workers from various sources of radiation.** United Nations, New York, 2010. Cited: para 68 (p. 232), 79–80 (pp. 233–234), 95 (p. 236), 134 (p. 240), 225–233 (pp. 253–254), 412 (p. 277), 450–453 (p. 282), 741 (p. 322); Table 29 (p. 347), Table 50 (p. 357). https://www.unscear.org/unscear/uploads/documents/publications/UNSCEAR_2008_Annex-B-CORR2.pdf (fetched)
2. **UNSCEAR.** *UNSCEAR 2020/2021 Report*, Vol. IV, **Annex D: Evaluation of occupational exposure to ionizing radiation.** United Nations, New York, 2022. Cited: Table 2 and paras 95, 106, 108 (PDF pp. 33–37); para 273 (PDF p. 91). Copy hosted by the Argentine government: https://argentina.gob.ar/sites/default/files/2022/09/unscear_2020_21_report_vol.iv_.pdf (fetched; official UNSCEAR page not checked)
3. **UNSCEAR.** *UNSCEAR 2000 Report*, Vol. I, **Annex A: Dose assessment methodologies** (paras 47–51, eqs. 12–14) and **Annex B: Exposures from natural radiation sources** (paras 20–31). https://www.unscear.org/unscear/uploads/documents/publications/UNSCEAR_2000_Annex-A.pdf and https://www.unscear.org/unscear/uploads/documents/publications/UNSCEAR_2000_Annex-B.pdf (both URLs verified, HTTP 200 PDF)
4. **ICRP.** *Las Recomendaciones 2007 de la Comisión Internacional de Protección Radiológica.* Publicación 103 (Spanish edition, SEPR; original Ann. ICRP 37(2–4), 2007). Cited: paras 35, 36, 60, 62, 64–66, 83, 105, 161, 236; Table 1; Table 5. https://icrp.org/docs/P103_Spanish.pdf (fetched)
5. **ICRP.** *Radiological Protection from Cosmic Radiation in Aviation.* ICRP Publication 132. Ann. ICRP 45(1), 1–48, 2016. https://www.icrp.org/publication.asp?id=ICRP%20Publication%20132 (abstract page fetched)
6. **ICRP.** *Compendium of Dose Coefficients based on ICRP Publication 60.* ICRP Publication 119. Ann. ICRP 41(Suppl.), 2012. Table F.1 (ingestion, members of the public): K-40 adult 6.2 × 10⁻⁹ Sv/Bq (PDF p. 73). https://www.icrp.org/docs/P%20119%20JAICRP%2041(s)%20Compendium%20of%20Dose%20Coefficients%20based%20on%20ICRP%20Publication%2060.pdf (fetched)
7. **Real Decreto 1029/2022**, de 20 de diciembre, por el que se aprueba el Reglamento sobre protección de la salud contra los riesgos derivados de la exposición a las radiaciones ionizantes. BOE núm. 305, 21/12/2022 (BOE-A-2022-21682). Cited: arts. 10–15, 22, 39, 72, 80, 81. https://www.boe.es/buscar/act.php?id=BOE-A-2022-21682 (fetched)
8. **Directiva 2013/59/Euratom** del Consejo, de 5 de diciembre de 2013, por la que se establecen normas de seguridad básicas para la protección contra los peligros derivados de la exposición a radiaciones ionizantes. DOUE L 13, 17.1.2014, pp. 1–73. Cited: arts. 9, 10, 12, 35, 54, 74, 75; Annex VIII. BOE copy of the Official Journal: https://www.boe.es/doue/2014/013/L00001-00073.pdf (fetched; EUR-Lex blocked automated access)
9. **Consejo de Seguridad Nuclear (CSN).** *Circular nº 1/24 sobre los programas de protección radiológica a implantar por las compañías aéreas en relación con la exposición a la radiación cósmica del personal de tripulación de aeronaves* (CSN/C/DPR/TGE/24/14), 11 April 2024. https://www.csn.es/documents/10182/27742/Circular+informativa+sobre+los+programas+de+protecci%C3%B3n+radiol%C3%B3gica+a+implantar+por+las+compa%C3%B1%C3%ADas+a%C3%A9reas+en+relaci%C3%B3n+con+la+exposici%C3%B3n+a+la+radiaci%C3%B3n+c%C3%B3smica+del+personal+de+tripulaci%C3%B3n+de+aeronaves/ccc6f345-8bab-1b96-4fc9-f2f277f3b435 (fetched)
10. **CSN.** *Informe del Consejo de Seguridad Nuclear al Congreso de los Diputados y al Senado. Año 2023 (Informe resumen).* Cited: Fig. 3.3 (p. 39); plant summaries (ch. 4); §5.1, Figs. 5.1.1–5.1.2, Table 5.1.1 (pp. 64–65); §5.2 (p. 66). https://www.csn.es/documents/10182/13529/Informe%20anual%202023%20(resumen) (fetched)
11. **CSN.** *Dosis de radiación* (SDB-04.07). Madrid, 2010. Cited: pp. 4, 6, 7, 8, 9, 11, 12, 14. https://www.csn.es/documents/10182/914805/Dosis%20de%20radiaci%C3%B3n (fetched; the worker limits in it predate RD 1029/2022)
12. **Bundesamt für Strahlenschutz (BfS).** *Die berufliche Strahlenexposition in Deutschland 2023 – Bericht des Strahlenschutzregisters* (BfS-65/25), January 2025. urn:nbn:de:0221-2025012349849. https://doris.bfs.de/jspui/bitstream/urn:nbn:de:0221-2025012349849/1/65-25_SSR-Bericht-2023.pdf (fetched)
13. **Copeland K, Eckhardt L.** *What Aircrews Should Know About Their Occupational Exposure to Ionizing Radiation, 2026 Edition.* DOT/FAA/AM-26/18. FAA Civil Aerospace Medical Institute, July 2026. https://rosap.ntl.bts.gov/view/dot/93318/dot_93318_DS1.pdf (fetched)
14. **Friedberg W, Copeland K.** *What Aircrews Should Know About Their Occupational Exposure to Ionizing Radiation.* DOT/FAA/AM-03/16. FAA, 2003. Table 2 (CARI-6; 45-year average flight doses, 1958–2002). https://rosap.ntl.bts.gov/view/dot/57947/dot_57947_DS1.pdf (fetched)
15. **Bottollier-Depois JF, Beck P, Latocha M, Mares V, Matthiä D, Rühm W, Wissmann F.** *Comparison of Codes Assessing Radiation Exposure of Aircraft Crew due to Galactic Cosmic Radiation.* EURADOS Report 2012-03, May 2012. §3.1 (pp. 24–25). https://eurados.sckcen.be/sites/eurados/files/uploads/Report-Publications/Reports/2012/EURADOS%20Report%202012-03.pdf (fetched)
16. **Bottollier-Depois JF (IRSN), Dessarps P (DGAC).** *L'exposition des personnels navigants au rayonnement cosmique* (SIEVERT system presentation, SFRP; c. 2004, date not stated). Cited: route examples Paris–Los Angeles (Jan–Feb 2001), Paris–Rio de Janeiro (May 2001), Paris–Fairbanks–Tokyo. https://sfrp.asso.fr/wp-content/uploads/2021/11/07_-_Bottollier.pdf (fetched)
17. **Kase KR et al.** *Radiation Exposure of the U.S. Population* (summary of NCRP Report No. 160). HPS/AAHP Annual Meeting, July 2009, slides 32–40. https://www.aahp-abhp.org/wp-content/uploads/2009/09/2009-NCRP_Radiation.pdf (fetched). Primary source: NCRP Report No. 160, *Ionizing Radiation Exposure of the Population of the United States*, 2009, §5 (consumer products), pp. 156–162 (not accessed, paywalled).
18. **Health Physics Society.** Ask the Experts, Question #8521 (radiation dose from cigarette smoking). https://hps.org/publicinformation/ate/q8521/ (fetched; date not shown)
19. **Commission Implementing Regulation (EU) No 1147/2011** of 11 November 2011 amending Regulation (EU) No 185/2010 as regards the use of security scanners at EU airports. Annex point 4.1.1.2(d). https://www.legislation.gov.uk/eur/2011/1147/data.xht (fetched; UK National Archives copy of the EU text)
    19b. **European Commission, DG MOVE.** *Security scanners* (web page, referring to Implementing Regulation (EU) 2015/1998). https://transport.ec.europa.eu/transport-modes/air/aviation-security/aviation-security-policy/security-scanners_en (fetched)
20. **US Nuclear Regulatory Commission.** *Personal Annual Radiation Dose Calculator* (last reviewed 15 Sep 2026). https://www.nrc.gov/about-nrc/radiation/around-us/calculator.html (fetched)
21. **American Nuclear Society.** *Radiation Dose Calculator.* https://www.ans.org/nuclear/dosechart/ (fetched)
22. **ORAU Health Physics Historical Instrumentation Museum.** *Incandescent Gas Lantern Mantles* (cites NRC NUREG-1717). https://orau.org/health-physics-museum/collection/consumer/products-containing-thorium/gas-lantern-mantles.html (fetched)
23. **Hendry JH, Simon SL, Wojcik A, Sohrabi M, Burkart W, Cardis E, Laurier D, Tirmarche M, Hayata I.** Human exposure to high natural background radiation: what can it teach us about radiation risks? *J Radiol Prot* 2009;29(2A):A29–A42. doi:10.1088/0952-4746/29/2A/S03. https://pmc.ncbi.nlm.nih.gov/articles/PMC4030667/ (full text read via the PMC OAI service)
24. **US Centers for Disease Control and Prevention.** *Acute Radiation Syndrome: Information for Clinicians* (last reviewed 23 April 2024). https://www.cdc.gov/radiation-emergencies/hcp/clinical-guidance/ars.html (fetched)
25. **World Health Organization.** *Ionizing radiation and health effects.* Fact sheet, 27 July 2023. https://www.who.int/news-room/fact-sheets/detail/ionizing-radiation-and-health-effects (fetched)
26. **Health Physics Society.** *Radiation Risk in Perspective.* Position Statement PS010-4 (revised February 2019). https://hps.org/wp-content/uploads/2024/12/radiationrisk.pdf (fetched)
27. **National Research Council (US).** *Health Risks from Exposure to Low Levels of Ionizing Radiation: BEIR VII Phase 2 – Report in Brief.* National Academies, 2006. https://nap.nationalacademies.org/resource/11340/beir_vii_final.pdf (fetched)
28. **UNSCEAR.** Statement on the UNSCEAR 2012 reports on attributing health effects and inferring risks, as distributed by the IAEA. https://www-pub.iaea.org/iaeameetings/Fukushima/UNSCEAR_Statement.pdf (fetched)
29. **Richardson DB, Leuraud K, Laurier D, et al.** Cancer mortality after low dose exposure to ionising radiation in workers in France, the United Kingdom, and the United States (INWORKS): cohort study. *BMJ* 2023;382:e074520. doi:10.1136/bmj-2022-074520. (Metadata verified via Crossref; full text not fetched; figures as reported in search results and the abstract. Medium confidence on the exact numbers.)
30. **UN Information Service.** Press release UNIS/OUS/366 on the UNSCEAR 2016 Report (radiation exposure from electricity generation), Vienna, 8 February 2017. https://unis.unvienna.org/unis/en/pressrels/2017/unisous366.html (fetched)
31. **Karipidis K, et al.** The effect of exposure to radiofrequency fields on cancer risk in the general and working population: A systematic review of human observational studies – Part I: Most researched outcomes. *Environment International* 2024;191:108983. doi:10.1016/j.envint.2024.108983. (Metadata verified via Crossref; conclusion as reported by ARPANSA and search results; full text not fetched.)
32. **US Environmental Protection Agency.** *Granite Countertops and Radiation* (last updated 14 Feb 2024; archived snapshot). https://19january2025snapshot.epa.gov/radiation/granite-countertops-and-radiation (fetched)
33. **Pastor Vega JM, Ruiz Cruces R, et al.** *Niveles de referencia de dosis (NRD) y estimación de Dosis Poblacional en España. Proyecto DOPOES II – Informe ejecutivo.* CSN–Universidad de Málaga, 2022 (2017 data). Table 4.1 (p. 32): chest 0.04, CT head 2.0, CT abdomen 13.8 mSv; per caput 1.19 mSv (p. 33). URL as given in `02-fonts-mediques.md` (verified there); I re-checked the values in the same PDF text.
34. **USDA Agricultural Research Service.** FoodData Central, SR Legacy food 173944 "Bananas, raw": potassium 358 mg/100 g (analytical). Retrieved via https://api.nal.usda.gov/fdc/v1/food/173944 (fetched). Web page: https://fdc.nal.usda.gov/food-details/173944/nutrients (not fetched).
35. **NOAA Space Weather Prediction Center.** *Joint solar maximum announcement – NASA and NOAA* (15 October 2024). https://www.spaceweather.gov/news/joint-solar-maximum-announcement-nasa-and-noaa (fetched)
36. **ASN – GPRADE.** *Avis du 3 mars 2020 sur les nouveaux coefficients de dose radon publiés par la CIPR* (ICRP 137: 3 or 6 mSv per mJ·h·m⁻³; UNSCEAR: 1.6 mSv per mJ·h·m⁻³). https://reglementation-controle.asnr.fr/content/download/193562/file_2/Avis%20GPRADE%203%20mars%202020%20Nouveaux%20coefficients%20de%20dose%20radon%20publi%C3%A9s%20par%20la%20CIPR%20.pdf (fetched)
37. **elDiario.es (Galicia),** 30 July 2026, on the demolition of the As Pontes cooling towers ("La quema de carbón cesó en noviembre de 2023"). https://www.eldiario.es/galicia/explosion-1-2-segundos-dice-adios-iconicas-torres-refrigeracion-central-termica-as-pontes_1_13418060.html (fetched; press source, low authority)
38. **CSN.** *Acta de inspección CSN-GC/AIN/30/IRA/1135/2013* (UTC Fire & Security España SLU, smoke detectors), 8 October 2013. https://www.csn.es/documents/10182/d70d1c4a-cc5d-4040-8d8b-536d2d8d00e1 (fetched)

---

## 7. Open questions and items to verify

- **Q1. Spanish route doses.** The route table in §2.1 contains my own estimates based on comparable published routes. Before publishing them, run CARI-7A (FAA) or the SIEVERT public calculator (DGAC/IRSN) for BCN–MAD, BCN–LHR, MAD–LPA, MAD–JFK, MAD–GRU/EZE and MAD–NRT at a stated date, and cite the runs. I did not run them: CARI-7A is a desktop executable, and the SIEVERT site needs an interactive form.
- **Q2. Smoking.** NCRP 160 (0.27–0.32 mSv/yr per smoker) and UNSCEAR 2008 Table 29 ("Po-210 in tobacco: 10 µSv") differ by about 30×. The UNSCEAR/UK figure may be per caput. Is there Spanish or EU data on Po-210 in tobacco (e.g. CIEMAT, universities)?
- **Q3. Radon factor (for the radon document).** The app uses 0.06 mSv per Bq/m³, which gives 18 mSv/yr at 300 Bq/m³. My own calculation gives ≈ 0.025 mSv per Bq/m³ (UNSCEAR) or ≈ 0.047 (ICRP 137), assuming F = 0.4 and 7,000 h [36]. This needs harmonising with the radon research.
- **Q4. Thorium gas mantles.** Are they still sold in Spain/EU? If they are, is a warning worthwhile for heavy users?
- **Q5. Ionisation smoke detectors in Spain.** What is the current regulatory status (CSN/Ministerio)? Are they still sold for homes? The French withdrawal (ASN, order of 18 Nov 2011) was seen only in search results; the ASN page redirect was not fetched.
- **Q6. Spanish aircrew dose statistics.** CSN Circular 1/24 asks airlines for annual dose distributions. Are these published anywhere? The only Spanish figure found is Iberia 2001: 1.4 mSv [2].
- **Q7. Spain's average total dose.** The 3.7 mSv figure comes from the 2010 CSN brochure. Harmonise with the natural (terrestrial/cosmic/radon) and medical documents (DOPOES II 1.19 mSv per caput), and check whether CSN has published a newer pie chart.
- **Q8. Sleeping next to someone.** Find a peer-reviewed or regulator source, or keep it only as an info-panel curiosity flagged "estimació aproximada".
- **Q9. Risk sentence.** Decide whether to show the BEIR VII "1 in 100 per 100 mSv" sentence (§3.5). The recommendation is to show at most that one sentence, with its caveats, and no personal percentage.
- **Q10. Banana false alarms at ports.** Find a citable source (e.g. a US government or national laboratory report) or remove the sentence from `info/BED.html`.
- **Q11. Coal plants.** If the item is kept for historical comparison, find an authoritative individual-dose figure (UNSCEAR 2016 Annex B tables). It was not verified here.
- **Q12. Out of scope but noticed.** The "teeth" item (porcelain crowns, internal section) and the cosmic altitude increments also look like NRC/ANS line items; they should be checked by the corresponding research documents.
- **Q13. Exposed-worker categories in the UI.** For category B workers without an individual dosimeter (art. 34, area dosimetry), the "conec la meva dosi" path may not apply. The presets in §2.12 cover this case.

---

## Annex A. Own calculations (for review)

1. **Banana.** 0.43–0.54 g K × 30.4 Bq/g = 13–16 Bq; × 6.2 × 10⁻⁹ Sv/Bq = 0.08–0.10 µSv [1][6][34].
2. **Sleeping partner.** 125 g K × 30.4 Bq/g ≈ 3.8 kBq of K-40. Air-kerma constant: Γ ≈ (0.1066 × 1.461 MeV × 1.602 × 10⁻¹³ J/MeV / 4π m²) × µen/ρ (0.00257 m²/kg) ≈ 1.8 × 10⁻¹⁴ Gy·h⁻¹·Bq⁻¹ at 1 m. At 0.3–0.5 m with 0.6–0.7 transmission: ≈ 0.2–0.5 nGy/h. × 2,920 h ≈ 0.6–1.5 µGy ≈ 0.5–1.5 µSv/yr.
3. **Altitude.** Ionising component: E_I(z) = E_I(0)·[0.21·e^(−1.649z) + 0.79·e^(0.4528z)], giving a factor of 2.45 at z = 2.5 km. Neutron component: attenuation e^(−0.00721·p), with p from h = 44.34 − 11.86·p^0.19, so p ≈ 761 g/cm² at 2.5 km, giving a factor of ≈ 7.1 relative to sea level. Inputs: sea-level outdoor values of 32 nSv/h (ionising) and ≈ 7–9 nSv/h (neutrons at the latitude of Spain) [3]. Result: ≈ 0.13 vs ≈ 0.04 µSv/h, an excess of ≈ 0.09 µSv/h ≈ 2.2 µSv/day.
4. **Radon at 300 Bq/m³ (home).** EEC = 300 × 0.4 = 120 Bq/m³; × 7,000 h = 840,000 Bq·h·m⁻³ × 5.56 × 10⁻⁶ mJ/Bq = 4.67 mJ·h·m⁻³. × 1.6 mSv/(mJ·h·m⁻³) (UNSCEAR) ≈ 7.5 mSv; × 3 (ICRP 137) ≈ 14 mSv [36].
5. **Smoking.** 18 µSv/yr per daily cigarette [17]; 18 / 365 = 0.049 µSv per cigarette; 20/day → 0.36 mSv/yr.
6. **Flights.** Route estimates = block hours × rate (3 µSv/h short-haul, 4 µSv/h long-haul) [1], cross-checked against the published comparable routes listed in §2.1.
