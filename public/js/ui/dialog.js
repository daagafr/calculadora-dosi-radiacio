// Diàleg "Més informació" per a cada element de la calculadora.

import { h, lookup } from "./dom.js";
import { formatDoseAuto, formatNumber } from "../format.js";

export function createInfoDialog(dialog, { text, citations, naturalPerYear }) {
  const t = (path) => lookup(text, path);
  const title = dialog.querySelector("[data-dialog-title]");
  const dose = dialog.querySelector("[data-dialog-dose]");
  const body = dialog.querySelector("[data-dialog-body]");
  const sources = dialog.querySelector("[data-dialog-sources]");

  // "0,04 mSv" → "uns 6 dies" de radiació natural mitjana
  function naturalEquivalent(mSv) {
    const days = (mSv / naturalPerYear) * 365;
    const plural = (n, [one, many]) => `${formatNumber(n)} ${n === 1 ? one : many}`;
    if (days < 1) return plural(Math.max(1, Math.round(days * 24)), t("ui.hour"));
    if (days < 14) return plural(Math.round(days), t("ui.day"));
    if (days < 60) return plural(Math.round(days / 7), t("ui.week"));
    if (days < 365) return plural(Math.round(days / 30.4), t("ui.month"));
    const years = days / 365;
    return `${formatNumber(years, years < 10 && years % 1 >= 0.25 ? 1 : 0)} ${years < 1.5 ? t("ui.year")[0] : t("ui.year")[1]}`;
  }

  dialog.querySelector("[data-dialog-close]").addEventListener("click", () => dialog.close());
  // Tancar clicant fora del contingut
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) dialog.close();
  });
  // Els enllaços a fonts tanquen el diàleg perquè es vegi la bibliografia
  sources.addEventListener("click", (e) => {
    if (e.target.closest("a.cite")) dialog.close();
  });

  function open(q) {
    const qt = t(`questions.${q.id}`) ?? {};
    title.textContent = qt.label ?? q.id;
    const value = q.type === "count" ? q.perUnit : q.type === "fixed" || q.type === "toggle" ? q.dose : null;
    const label = q.doseLabel ?? qt.meta;
    dose.hidden = value == null && !label;
    if (label) dose.textContent = label;
    else if (value != null) {
      const suffix = q.type === "count" ? ` ${qt.unit ?? t("ui.perExam")}` : t("ui.perYear");
      dose.textContent = `${formatDoseAuto(value)}${suffix}`;
    }
    body.innerHTML = qt.info ?? "";
    if (value && naturalPerYear && q.type !== "fixed") {
      body.append(h("p", {}, t("ui.naturalEquivalent").replace("{t}", naturalEquivalent(value))));
    }
    const refs = q.sources?.length ? citations.cite(q.sources) : [];
    sources.hidden = refs.length === 0;
    sources.replaceChildren(h("span", {}, `${t("ui.sources")}: `), ...refs);
    dialog.showModal();
  }

  return { open };
}
