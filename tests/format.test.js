import { test } from "node:test";
import assert from "node:assert/strict";
import { formatDose, formatDoseAuto, formatNumber } from "../public/js/format.js";

test("format català amb coma decimal", () => {
  assert.equal(formatDose(3.4217), "3,42");
  assert.equal(formatDose(0), "0");
  assert.equal(formatDoseAuto(0.04), "40 µSv");
  assert.equal(formatNumber(30700), "30.700");
});

test("els números enormes es mostren en notació científica", () => {
  assert.equal(formatDose(1.8e24), "1,8 × 10²⁴");
  assert.equal(formatNumber(5e12), "5 × 10¹²");
  assert.equal(formatDose(Infinity), "∞");
});
