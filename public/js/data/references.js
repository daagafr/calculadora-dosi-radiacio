// Valors de referència per posar el resultat en context.
// Detall: docs/fonts/03-fonts-estil-de-vida-i-referencies.md §3 i docs/fonts/01-fonts-naturals.md §5

export const REFERENCES = {
  // ≈ 0,1 µSv per plàtan: 13–16 Bq de K-40 × 6,2·10⁻⁹ Sv/Bq (ICRP 119)
  banana: { dose: 0.0001, sources: ["unscear2008-b", "icrp119", "usda-banana"] },

  // Mitjanes amb què es compara el total. "spain-natural" també serveix per expressar
  // les dosis en "dies de radiació natural".
  averages: [
    // 3,1 natural (Atles Europeu, Espanya) + 1,26 mèdica (DOPOES II 1,19 + DOMNES 0,07)
    { id: "spain-average", dose: 4.3, sources: ["eanr2019", "dopoes2", "domnes"] },
    { id: "spain-natural", dose: 3.1, sources: ["eanr2019"] },
    { id: "world-natural", dose: 2.4, sources: ["unscear2008"] },
  ],

  // Escala logarítmica (mSv). `kind`: event = d'un sol cop; annual = per any;
  // limit = valor legal; acute = dosi rebuda de cop en minuts (no comparable amb una dosi anual).
  scale: {
    min: 0.0001,
    max: 1000,
    points: [
      { id: "banana", dose: 0.0001, kind: "event", sources: ["unscear2008-b", "icrp119"] },
      { id: "flight-bcn-mad", dose: 0.003, kind: "event", sources: ["unscear2008-b"] },
      { id: "chest-xray", dose: 0.04, kind: "event", sources: ["dopoes2"] },
      { id: "public-limit", dose: 1, kind: "limit", sources: ["rd1029-2022"] },
      { id: "spain-average", dose: 4.3, kind: "annual", sources: ["eanr2019", "dopoes2"] },
      { id: "worker-limit", dose: 20, kind: "limit", sources: ["rd1029-2022"] },
      { id: "icrp-100", dose: 100, kind: "annual", sources: ["icrp103", "beir7"] },
      { id: "ars", dose: 1000, kind: "acute", sources: ["who-ionizing2023", "cdc-ars"] },
    ],
  },

  // Franges neutres per al total anual (substitueixen l'antic "Perillositat")
  bands: [
    { id: "usual", below: 5 },
    { id: "above", below: 20 },
    { id: "high", below: 100 },
    { id: "veryHigh", below: Infinity },
  ],
};
