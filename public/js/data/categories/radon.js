// Radó (gas radioactiu a l'interior dels edificis) i torò.
//
// Dosi = concentració mitjana a casa (Bq/m³) × 0,025 mSv/any per Bq/m³.
// 0,025 = coeficient de l'UNSCEAR (9 nSv per Bq·h/m³ EEC, factor d'equilibri 0,4,
// 7000 h/any a dins). És el criteri de totes les mitjanes amb què comparem el resultat.
// L'ICRP 137 donaria aproximadament el doble (s'explica a "Més informació").
// Detall: docs/fonts/01-fonts-naturals.md §4

export const RADON_MSV_PER_BQ = 0.025;

// Concentració mitjana de cada classe del mapa de potencial de radó del CSN (INT-04.41, taula 3)
const ZONE_MEAN = { zone1: 38, zone2: 67, zone3: 93, zone4: 117, zone5: 219 };

// Mitjana estimada per a Espanya (Atles Europeu de Radiació Natural: 1,79 mSv ≈ 71 Bq/m³)
const SPAIN_MEAN = 71;

// El radó disminueix aproximadament un 20 % per planta (CSN INT-04.41)
const FLOOR_FACTOR = { unknown: 1, low: 1, mid: 0.72, high: 0.5 };

export function radonConcentration(answers) {
  if (answers.radonMode === "measured") {
    const measured = Number(answers.radonBq);
    return measured > 0 ? measured : SPAIN_MEAN;
  }
  const base = answers.radonMode === "map" ? (ZONE_MEAN[answers.radonZone] ?? SPAIN_MEAN) : SPAIN_MEAN;
  return base * (FLOOR_FACTOR[answers.radonFloor] ?? 1);
}

export default {
  id: "radon",
  sources: ["csn-radon2019", "unscear2019-b", "eanr2019"],
  questions: [
    {
      id: "radonMode",
      type: "choice",
      display: "chips",
      input: true,
      default: "unknown",
      options: [
        { id: "unknown", dose: 0 },
        { id: "map", dose: 0 },
        { id: "measured", dose: 0 },
      ],
    },
    {
      id: "radonZone",
      type: "choice",
      display: "select",
      input: true,
      when: { q: "radonMode", eq: "map" },
      sources: ["csn-radon2019", "csn-radon-map"],
      options: [
        { id: "zone1", dose: 0 },
        { id: "zone2", dose: 0 },
        { id: "zone3", dose: 0 },
        { id: "zone4", dose: 0 },
        { id: "zone5", dose: 0 },
      ],
    },
    {
      id: "radonBq",
      type: "number",
      input: true,
      when: { q: "radonMode", eq: "measured" },
      max: 20000,
      step: 1,
      warn: [{ above: 300, key: "warn300" }],
      sources: ["rd1029-2022"],
    },
    {
      id: "radonFloor",
      type: "choice",
      display: "chips",
      input: true,
      default: "unknown",
      when: { q: "radonMode", in: ["unknown", "map"] },
      sources: ["csn-radon2019", "csn-radon-faq"],
      options: [
        { id: "unknown", dose: 0 },
        { id: "low", dose: 0 },
        { id: "mid", dose: 0 },
        { id: "high", dose: 0 },
      ],
    },
    {
      id: "radonEstimate",
      type: "derived",
      compute: (answers) => radonConcentration(answers) * RADON_MSV_PER_BQ,
      detail: (answers) => ({ c: Math.round(radonConcentration(answers)) }),
      sources: ["unscear2019-b", "eanr2019", "icrp137"],
    },
    { id: "thoron", type: "fixed", dose: 0.1, sources: ["unscear2000-b", "eanr2019"] },
  ],
};
