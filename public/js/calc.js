// Motor de càlcul: funcions pures, sense DOM, perquè es puguin provar amb `npm test`.
//
// Cada categoria (radó, terrestre…) té una llista de preguntes. Cada pregunta
// aporta una dosi en mSv/any segons la resposta de l'usuari:
//   fixed  → dosi constant (p. ex. radiació interna)
//   choice → l'opció triada té una dosi (p. ex. província)
//   toggle → si està marcada, suma `dose`
//   count  → resposta × `perUnit` (p. ex. nombre de radiografies)
//   number → resposta × `factor`, o `compute(resposta)` si cal una fórmula;
//            si es deixa buida i té `ifEmpty`, aporta aquest valor
//   derived → `compute(respostes)`: dosi que depèn de diverses preguntes (p. ex. radó)
// Una pregunta amb `input: true` només recull una dada per a una `derived` i no suma.
// Una pregunta amb `when` només compta si es compleix la condició.

export function isVisible(question, answers) {
  const cond = question.when;
  if (!cond) return true;
  const value = answers[cond.q];
  if (cond.in) return cond.in.includes(value);
  if ("eq" in cond) return value === cond.eq;
  return Boolean(value);
}

function toNumber(value) {
  const n = typeof value === "string" ? parseFloat(value.replace(",", ".")) : Number(value);
  return Number.isFinite(n) && n > 0 ? n : 0;
}

const isEmpty = (v) => v === null || v === undefined || v === "";

export function questionDose(question, answer, answers = {}) {
  if (question.input) return 0;
  switch (question.type) {
    case "fixed":
      return question.dose;
    case "choice": {
      const option = question.options.find((o) => o.id === answer);
      return option ? option.dose : 0;
    }
    case "toggle":
      return answer ? question.dose : 0;
    case "count": {
      const n = Math.min(toNumber(answer), question.max ?? Infinity);
      return n * question.perUnit;
    }
    case "number": {
      if (isEmpty(answer) && question.ifEmpty !== undefined) return question.ifEmpty;
      const n = Math.min(toNumber(answer), question.max ?? Infinity);
      return question.compute ? question.compute(n) : n * question.factor;
    }
    case "derived":
      return question.compute(answers);
    default:
      return 0;
  }
}

export function defaultAnswers(categories) {
  const answers = {};
  for (const category of categories) {
    for (const q of category.questions) {
      if (q.type === "fixed" || q.type === "derived") continue;
      if ("default" in q) answers[q.id] = q.default;
      else if (q.type === "toggle") answers[q.id] = false;
      else if (q.type === "count" || q.type === "number") answers[q.id] = 0;
      else answers[q.id] = null;
    }
  }
  return answers;
}

export function computeDoses(categories, answers) {
  const byCategory = {};
  const byQuestion = {};
  let total = 0;
  for (const category of categories) {
    let sum = 0;
    for (const q of category.questions) {
      if (!isVisible(q, answers)) continue;
      const dose = questionDose(q, answers[q.id], answers);
      byQuestion[q.id] = dose;
      sum += dose;
    }
    byCategory[category.id] = sum;
    total += sum;
  }
  return { total, byCategory, byQuestion };
}

// Posició (0–1) d'una dosi en una escala logarítmica entre `min` i `max` mSv.
export function logPosition(dose, min, max) {
  if (dose <= min) return 0;
  if (dose >= max) return 1;
  return (Math.log10(dose) - Math.log10(min)) / (Math.log10(max) - Math.log10(min));
}
