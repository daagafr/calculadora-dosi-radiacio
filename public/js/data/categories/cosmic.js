// Radiació còsmica segons l'altitud on vius.
// Fórmula de l'UNSCEAR 2000 (Annex A, eq. 12–13), la mateixa que fa servir l'Atles Europeu
// de Radiació Natural: component ionitzant (0,240 mSv a nivell del mar) + neutrons
// (0,065 mSv a les latituds d'Espanya), amb 80 % del temps a dins i un blindatge de 0,8.
// Detall: docs/fonts/01-fonts-naturals.md §1

const atmosphericDepth = (km) => Math.pow((44.34 - km) / 11.86, 1 / 0.19); // g/cm²

export function cosmicDose(altitudeM) {
  const z = Math.min(Math.max(altitudeM, 0), 5000) / 1000;
  const ionizing = 0.24 * (0.21 * Math.exp(-1.649 * z) + 0.79 * Math.exp(0.4528 * z));
  const neutrons = 0.065 * Math.exp(0.00721 * (atmosphericDepth(0) - atmosphericDepth(z)));
  return ionizing + neutrons;
}

export default {
  id: "cosmic",
  sources: ["unscear2000-a", "unscear2000-b", "eanr2019"],
  questions: [
    {
      id: "altitude",
      type: "number",
      default: null,
      max: 5000,
      step: 1,
      compute: cosmicDose,
      ifEmpty: 0.36, // mitjana d'Espanya ponderada per població (EANR, taula 9-2)
      sources: ["unscear2000-a", "eanr2019"],
    },
  ],
};
