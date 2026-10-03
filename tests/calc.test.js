import { test } from "node:test";
import assert from "node:assert/strict";
import { computeDoses, defaultAnswers, isVisible, logPosition, questionDose } from "../public/js/calc.js";

const close = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) < eps, `${a} ≉ ${b}`);

const categories = [
  {
    id: "a",
    questions: [
      { id: "fixed", type: "fixed", dose: 0.3 },
      { id: "pick", type: "choice", default: "x", options: [{ id: "x", dose: 1 }, { id: "y", dose: 2 }] },
      { id: "tog", type: "toggle", dose: 0.05 },
    ],
  },
  {
    id: "b",
    questions: [
      { id: "mode", type: "choice", default: "none", options: [{ id: "none", dose: 0 }, { id: "measured", dose: 0 }] },
      { id: "conc", type: "number", factor: 0.01, when: { q: "mode", eq: "measured" } },
      { id: "exams", type: "count", perUnit: 0.5 },
    ],
  },
];

test("defaultAnswers inicialitza cada tipus de pregunta", () => {
  assert.deepEqual(defaultAnswers(categories), { pick: "x", tog: false, mode: "none", conc: 0, exams: 0 });
});

test("questionDose per tipus", () => {
  const [fixed, pick, tog] = categories[0].questions;
  const [, conc, exams] = categories[1].questions;
  assert.equal(questionDose(fixed, undefined), 0.3);
  assert.equal(questionDose(pick, "y"), 2);
  assert.equal(questionDose(pick, null), 0);
  assert.equal(questionDose(tog, true), 0.05);
  assert.equal(questionDose(tog, false), 0);
  assert.equal(questionDose(exams, 3), 1.5);
  assert.equal(questionDose(exams, 1e12), 5e11, "sense límit superior");
  assert.equal(questionDose(exams, -2), 0, "no accepta negatius");
  close(questionDose(conc, "120,5"), 1.205);
});

test("una pregunta oculta no suma", () => {
  const answers = { ...defaultAnswers(categories), conc: 100 };
  assert.equal(isVisible(categories[1].questions[1], answers), false);
  assert.equal(computeDoses(categories, answers).byCategory.b, 0);
  answers.mode = "measured";
  assert.equal(computeDoses(categories, answers).byCategory.b, 1);
});

test("desmarcar o posar a zero resta la dosi (no és incremental)", () => {
  const answers = { ...defaultAnswers(categories), exams: 4, tog: true };
  close(computeDoses(categories, answers).total, 0.3 + 1 + 0.05 + 2);
  answers.exams = 0;
  answers.tog = false;
  close(computeDoses(categories, answers).total, 1.3);
});

test("fórmula personalitzada amb compute", () => {
  const q = { id: "alt", type: "number", compute: (m) => 0.3 * Math.exp(m / 1000) };
  close(questionDose(q, 0), 0.3);
  close(questionDose(q, 1000), 0.3 * Math.E);
});

test("logPosition", () => {
  assert.equal(logPosition(0.001, 0.01, 1000), 0);
  assert.equal(logPosition(5000, 0.01, 1000), 1);
  close(logPosition(1, 0.01, 1000), 0.4);
});
