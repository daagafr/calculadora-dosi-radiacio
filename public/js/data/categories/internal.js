// Radiació interna: elements radioactius naturals que entren al cos amb els aliments i l'aigua.
// 0,29 mSv per ingestió (potassi-40 0,17 + famílies de l'urani i el tori 0,12) + 0,01 de
// radionúclids cosmogènics com el carboni-14 (UNSCEAR 2000, taula 31; Atles Europeu).
// És pràcticament igual per a tothom perquè el cos regula la quantitat de potassi.
// Detall: docs/fonts/01-fonts-naturals.md §3

export default {
  id: "internal",
  sources: ["unscear2000-b", "eanr2019"],
  questions: [{ id: "internalFood", type: "fixed", dose: 0.3, sources: ["unscear2000-b", "unscear2008", "eanr2019"] }],
};
