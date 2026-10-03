// Viatges: radiació còsmica addicional en avió i a alta muntanya.
// Vols: 3 µSv/h en vols curts i 4 µSv/h de mitjana en vols llargs (UNSCEAR 2008, Annex B §68).
// Muntanya: excés de ≈ 0,09 µSv/h a uns 2.500 m respecte del nivell del mar ≈ 0,002 mSv/dia
// (càlcul amb la fórmula de l'UNSCEAR 2000).
// Detall: docs/fonts/03-fonts-estil-de-vida-i-referencies.md §2.1, §2.11

export default {
  id: "travel",
  sources: ["unscear2008-b", "faa2003"],
  questions: [
    { id: "flightShortHours", type: "number", factor: 0.003, step: 0.5, sources: ["unscear2008-b", "faa2003"] },
    { id: "flightLongHours", type: "number", factor: 0.004, step: 0.5, sources: ["unscear2008-b", "faa2003"] },
    { id: "mountainDays", type: "count", perUnit: 0.002, sources: ["unscear2000-a"] },
  ],
};
