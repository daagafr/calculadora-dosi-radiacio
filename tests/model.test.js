// Comprova que les dades, els textos i les fonts són coherents entre si.
// Si edites public/js/data/ o public/js/i18n/, executa `npm test`.

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { CATEGORIES } from "../public/js/data/model.js";
import { REFERENCES } from "../public/js/data/references.js";
import { SOURCES } from "../public/js/data/sources.js";
import text from "../public/js/i18n/ca.js";
import { computeDoses, defaultAnswers } from "../public/js/calc.js";

const allQuestions = CATEGORIES.flatMap((c) => c.questions);

test("els identificadors de pregunta són únics", () => {
  const ids = allQuestions.map((q) => q.id);
  assert.deepEqual(ids.filter((id, i) => ids.indexOf(id) !== i), []);
});

test("cada categoria té títol i color", () => {
  const css = readFileSync(new URL("../public/css/styles.css", import.meta.url), "utf8");
  for (const c of CATEGORIES) {
    assert.ok(text.categories[c.id]?.title, `falta el títol de ${c.id}`);
    assert.ok(css.includes(`--c-${c.id}:`), `falta el color --c-${c.id} a styles.css`);
  }
});

test("cada pregunta té etiqueta, i cada opció també", () => {
  for (const q of allQuestions) {
    const qt = text.questions[q.id];
    assert.ok(qt?.label, `falta questions.${q.id}.label`);
    if (q.type === "choice") {
      for (const o of q.options) assert.ok(qt.options?.[o.id], `falta l'etiqueta de l'opció ${q.id}.${o.id}`);
    }
    if (q.group) assert.ok(text.groups[q.group]?.title, `falta el títol del grup ${q.group}`);
  }
});

test("les dosis són números vàlids i no negatius", () => {
  for (const q of allQuestions) {
    const values = [q.dose, q.perUnit, q.factor, ...(q.options ?? []).map((o) => o.dose)].filter((v) => v !== undefined);
    for (const v of values) assert.ok(Number.isFinite(v) && v >= 0, `dosi invàlida a ${q.id}: ${v}`);
  }
});

test("les condicions `when` apunten a preguntes que existeixen", () => {
  const ids = new Set(allQuestions.map((q) => q.id));
  for (const q of allQuestions) if (q.when) assert.ok(ids.has(q.when.q), `${q.id} depèn de ${q.when.q}, que no existeix`);
});

test("totes les fonts citades existeixen a sources.js", () => {
  const cited = [
    ...CATEGORIES.flatMap((c) => c.sources ?? []),
    ...allQuestions.flatMap((q) => q.sources ?? []),
    ...[...REFERENCES.averages, ...REFERENCES.scale.points, REFERENCES.banana].flatMap((r) => r.sources ?? []),
  ];
  const html = readFileSync(new URL("../public/index.html", import.meta.url), "utf8");
  cited.push(...[...html.matchAll(/data-source="([^"]+)"/g)].map((m) => m[1]));
  for (const id of new Set(cited)) assert.ok(SOURCES[id], `font desconeguda: ${id}`);
});

test("les referències tenen etiqueta", () => {
  for (const r of [...REFERENCES.averages, ...REFERENCES.scale.points]) {
    assert.ok(text.references[r.id], `falta references.${r.id}`);
  }
});

test("amb les respostes per defecte el total és raonable (1–10 mSv)", () => {
  const { total } = computeDoses(CATEGORIES, defaultAnswers(CATEGORIES));
  assert.ok(total >= 0 && total < 10, `total per defecte: ${total}`);
});
