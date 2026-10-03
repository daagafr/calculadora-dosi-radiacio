// Altres fonts: tabac, entorn i feina.
// S'han tret els elements negligibles o que es comptaven dues vegades (casa de pedra, rellotge,
// detector de fum, llanterna, central de carbó, escàner de maletes): s'expliquen a "Aprèn més".
// Detall: docs/fonts/03-fonts-estil-de-vida-i-referencies.md

export default {
  id: "other",
  sources: ["ncrp160", "csn-informe2023"],
  questions: [
    // 18 µSv/any per cada cigarret diari (NCRP 160): 20 al dia ≈ 0,36 mSv/any
    { id: "cigarettesPerDay", type: "count", perUnit: 0.018, max: 80, sources: ["ncrp160"] },
    // Dosi a la persona més exposada de l'entorn d'una central espanyola el 2023: ≤ 0,0011 mSv
    { id: "nuclearNearby", type: "toggle", dose: 0.001, sources: ["csn-informe2023"] },
    // Potassi-40 d'una altra persona: estimació ≈ 0,001 mSv/any (UNSCEAR 2008 B §95 + càlcul propi)
    { id: "sleepPartner", type: "toggle", dose: 0.001, sources: ["unscear2008-b"] },
    {
      id: "occupation",
      type: "choice",
      display: "select",
      default: "none",
      placeholder: false,
      sources: ["csn-informe2023", "bfs2025", "unscear2020-d", "rd1029-2022"],
      options: [
        { id: "none", dose: 0 },
        { id: "medical", dose: 0.62 }, // CSN 2023: instal·lacions mèdiques
        { id: "nuclear", dose: 1.18 }, // CSN 2023: centrals nuclears
        { id: "industry", dose: 0.96 }, // CSN 2023: instal·lacions industrials
        { id: "aircrew", dose: 2 }, // Alemanya 2023: 1,2; mitjana mundial: 2,7
        { id: "known", dose: 0 },
      ],
    },
    {
      id: "occupationDose",
      type: "number",
      factor: 1,
      max: 1000,
      step: 0.01,
      when: { q: "occupation", eq: "known" },
      warn: [
        { above: 6, key: "warn6" },
        { above: 20, key: "warn20" },
        { above: 100, key: "warn100" },
      ],
      sources: ["rd1029-2022"],
    },
  ],
};
