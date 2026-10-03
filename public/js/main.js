// Punt d'entrada: connecta el model, els textos i la interfície.

import { CATEGORIES } from "./data/model.js";
import { REFERENCES } from "./data/references.js";
import { SOURCES } from "./data/sources.js";
import text from "./i18n/ca.js";
import { computeDoses, defaultAnswers, isVisible } from "./calc.js";
import { formatDose, formatDoseAuto, formatNumber } from "./format.js";
import { createCitations } from "./sources.js";
import { renderForm } from "./ui/form.js";
import { createResult } from "./ui/result.js";
import { createInfoDialog } from "./ui/dialog.js";
import { lookup } from "./ui/dom.js";

const STORAGE_KEY = "calculadora-dosi:v2";
const t = (path) => lookup(text, path);

const form = document.getElementById("calc-form");
const questions = new Map(CATEGORIES.flatMap((c) => c.questions.map((q) => [q.id, q])));

// --- Fonts: es numeren per ordre d'aparició (categories → preguntes → referències → text)
const citations = createCitations(SOURCES);
for (const c of CATEGORIES) {
  c.sources?.forEach(citations.number);
  c.questions.forEach((q) => q.sources?.forEach(citations.number));
}
[...REFERENCES.averages, ...REFERENCES.scale.points, REFERENCES.banana].forEach((r) =>
  r.sources?.forEach(citations.number)
);
citations.hydrate(document);

// --- Interfície
const dialog = createInfoDialog(document.getElementById("info-dialog"), {
  text,
  citations,
  naturalPerYear: REFERENCES.averages.find((a) => a.id === "spain-natural")?.dose,
});
document.querySelector("[data-banana-info]").addEventListener("click", () =>
  dialog.open({ id: "banana", type: "info", doseLabel: t("questions.banana.meta"), sources: REFERENCES.banana.sources })
);
renderForm(form, { categories: CATEGORIES, text, citations, onInfo: dialog.open });
const result = createResult(document.getElementById("resultat"), {
  categories: CATEGORIES,
  references: REFERENCES,
  text,
  citations,
});
citations.renderBibliography(document.getElementById("biblio"));

// --- Estat (es desa al navegador perquè no es perdi en recarregar)
let answers = loadAnswers();
let lastDoses = null;
syncInputs();
update();

form.addEventListener("input", onInput);
form.addEventListener("change", onInput);
form.addEventListener("click", (e) => {
  const button = e.target.closest("button[data-step]");
  if (!button) return;
  const q = questions.get(button.dataset.for);
  const next = Math.max(0, (Number(answers[q.id]) || 0) + Number(button.dataset.step));
  answers[q.id] = next;
  form.querySelector(`input[data-q="${q.id}"]`).value = next;
  update();
});

function onInput(e) {
  const el = e.target;
  const id = el.dataset?.q;
  if (!id || !questions.has(id)) return;
  const q = questions.get(id);
  if (el.type === "checkbox") answers[id] = el.checked;
  else if (el.type === "radio") {
    if (!el.checked) return;
    answers[id] = el.value;
  } else if (q.type === "choice") answers[id] = el.value || null;
  else answers[id] = el.value === "" ? null : Number(el.value);
  update();
}

function update() {
  const doses = computeDoses(CATEGORIES, answers);

  // Les caselles numèriques s'eixamplen perquè hi càpiga el número sencer
  for (const input of form.querySelectorAll('input[type="number"]')) {
    input.style.setProperty("--len", String(input.value.length));
  }

  for (const q of questions.values()) {
    if (!q.when) continue;
    const visible = isVisible(q, answers);
    form.querySelectorAll(`[data-question="${q.id}"], [data-row="${q.id}"]`).forEach((el) => (el.hidden = !visible));
  }
  for (const block of form.querySelectorAll(".q--rows")) {
    block.hidden = ![...block.querySelectorAll(".row")].some((row) => !row.hidden);
  }

  for (const c of CATEGORIES) {
    const dose = doses.byCategory[c.id];
    form.querySelector(`[data-cat-dose="${c.id}"]`).textContent = formatDose(dose);
    const share = doses.total > 0 ? dose / doses.total : 0;
    form.querySelector(`[data-cat-bar="${c.id}"]`).style.width = `${share * 100}%`;
  }

  for (const q of questions.values()) {
    const dose = doses.byQuestion[q.id] ?? 0;
    const row = form.querySelector(`[data-row="${q.id}"]`);
    if (row) row.classList.toggle("row--active", dose > 0);
    const out = form.querySelector(`[data-q-dose="${q.id}"]`);
    if (out) {
      const usingAverage = q.ifEmpty !== undefined && (answers[q.id] === null || answers[q.id] === "");
      out.textContent =
        dose > 0 ? `${t("ui.contributes")} ${formatDoseAuto(dose)}${t("ui.perYear")}${usingAverage ? t("ui.averageUsed") : ""}` : "";
    }
    if (q.type === "derived") {
      form.querySelector(`[data-derived="${q.id}"]`).textContent = formatDoseAuto(dose);
      const detail = form.querySelector(`[data-derived-detail="${q.id}"]`);
      if (detail && q.detail) {
        const values = q.detail(answers);
        detail.textContent = Object.entries(values).reduce(
          (str, [k, v]) => str.replace(`{${k}}`, formatNumber(v)),
          t(`questions.${q.id}.detail`)
        );
      }
    }
    if (q.warn) {
      const warn = form.querySelector(`[data-q-warn="${q.id}"]`);
      const value = Number(answers[q.id]) || 0;
      const hit = [...q.warn].reverse().find((w) => value > w.above);
      warn.hidden = !hit || !isVisible(q, answers);
      if (hit) warn.innerHTML = t(`questions.${q.id}.${hit.key}`);
    }
    if (q.type === "count") {
      const dec = form.querySelector(`button[data-for="${q.id}"][data-step="-1"]`);
      if (dec) dec.disabled = !(answers[q.id] > 0);
    }
  }

  for (const sum of form.querySelectorAll("[data-group-sum]")) {
    const gid = sum.dataset.groupSum;
    const groupDose = [...questions.values()]
      .filter((q) => q.group === gid)
      .reduce((acc, q) => acc + (doses.byQuestion[q.id] ?? 0), 0);
    sum.textContent = groupDose > 0 ? `${formatDoseAuto(groupDose)}` : "";
    sum.classList.toggle("is-active", groupDose > 0);
  }

  result.update(doses);
  document.querySelector("[data-mobile-total]").textContent = formatDose(doses.total);
  saveAnswers();
  lastDoses = doses;
}

function syncInputs() {
  for (const [id, value] of Object.entries(answers)) {
    for (const el of form.querySelectorAll(`[data-q="${id}"]`)) {
      if (el.type === "checkbox") el.checked = Boolean(value);
      else if (el.type === "radio") el.checked = el.value === value;
      else if (el.tagName === "SELECT") el.value = value ?? "";
      else el.value = value ? value : el.closest(".stepper") ? 0 : "";
    }
  }
}

function loadAnswers() {
  const defaults = defaultAnswers(CATEGORIES);
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
    for (const key of Object.keys(defaults)) {
      if (key in stored) defaults[key] = stored[key];
    }
  } catch {
    /* navegació privada o dades corruptes: comencem de zero */
  }
  return defaults;
}

function saveAnswers() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
  } catch {
    /* sense emmagatzematge disponible */
  }
}

// --- Accions del resultat
document.querySelector("[data-reset]").addEventListener("click", () => {
  if (!confirm(t("result.resetConfirm"))) return;
  answers = defaultAnswers(CATEGORIES);
  syncInputs();
  update();
});

document.querySelector("[data-copy]").addEventListener("click", async (e) => {
  const lines = [
    `${t("result.copyTitle")}: ${formatDose(lastDoses.total)} mSv/any`,
    ...CATEGORIES.map((c) => `· ${t(`categories.${c.id}.title`)}: ${formatDose(lastDoses.byCategory[c.id])} mSv`),
    location.origin + location.pathname,
  ];
  try {
    await navigator.clipboard.writeText(lines.join("\n"));
    const button = e.currentTarget;
    const original = button.textContent;
    button.textContent = t("result.copied");
    setTimeout(() => (button.textContent = original), 1800);
  } catch {
    prompt(t("result.copyFallback"), lines.join("\n"));
  }
});

// --- Barra inferior al mòbil: s'amaga quan el resultat ja és visible
const mobileBar = document.querySelector(".mobile-bar");
if ("IntersectionObserver" in window) {
  new IntersectionObserver(
    (entries) => mobileBar.classList.toggle("is-hidden", entries.some((en) => en.isIntersecting)),
    { threshold: 0.15 }
  ).observe(document.querySelector(".result__card"));
}

// --- Els enllaços a un article (#article-…) l'obren automàticament
function openTargetArticle() {
  const target = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)));
  if (target instanceof HTMLDetailsElement) {
    target.open = true;
    target.scrollIntoView();
  }
}
window.addEventListener("hashchange", openTargetArticle);
openTargetArticle();
