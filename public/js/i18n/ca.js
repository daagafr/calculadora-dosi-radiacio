// Tots els textos de la calculadora en català.
// Per traduir la web: copia aquest fitxer (i els ca-*.js) amb un altre codi d'idioma
// (p. ex. es.js) i tradueix-ne els valors, sense canviar les claus.

import { medicalCategory, medicalGroups, medicalQuestions } from "./ca-medical.js";
import { naturalCategories, naturalQuestions } from "./ca-natural.js";
import { bandTexts, lifestyleCategories, lifestyleQuestions, referenceLabels } from "./ca-lifestyle.js";

export default {
  ui: {
    mSv: "mSv",
    perYear: "/any",
    perExam: "per prova",
    moreInfo: "Més informació",
    sources: "Fonts",
    choose: "Tria una opció…",
    contributes: "Aporta",
    averageUsed: " (valor mitjà d'Espanya)",
    increase: "Afegeix-ne una",
    decrease: "Treu-ne una",
    searchExams: "Cerca una prova (p. ex. «TAC», «dentista»)",
    naturalEquivalent: "Equival a {t} de radiació natural mitjana.",
    day: ["dia", "dies"],
    week: ["setmana", "setmanes"],
    month: ["mes", "mesos"],
    year: ["any", "anys"],
    hour: ["hora", "hores"],
  },
  result: {
    breakdownTitle: "Distribució de la dosi per fonts",
    you: "La teva dosi",
    ratioAbove: "{x} vegades la mitjana d'Espanya",
    ratioBelow: "El {p} de la mitjana d'Espanya",
    resetConfirm: "Vols esborrar totes les respostes i tornar als valors mitjans?",
    copyTitle: "La meva dosi anual de radiació estimada",
    copied: "Copiat!",
    copyFallback: "Copia el text:",
    mainSource: "La part més gran ve {cat} ({p} del total).",
    perYearUnit: "/any",
  },
  categories: {
    ...naturalCategories,
    medical: medicalCategory,
    ...lifestyleCategories,
  },
  groups: medicalGroups,
  questions: {
    ...naturalQuestions,
    ...medicalQuestions,
    ...lifestyleQuestions,
  },
  references: referenceLabels,
  bands: bandTexts,
};
