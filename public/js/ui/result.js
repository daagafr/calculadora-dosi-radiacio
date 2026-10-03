// Panell de resultats: total, franja, plàtans, comparacions, dònut per categories i escala de referència.

import { h, svg, lookup } from "./dom.js";
import { logPosition } from "../calc.js";
import { formatDose, formatDoseCompact, formatNumber, formatPercent } from "../format.js";

const DONUT_R = 52;
const DONUT_C = 2 * Math.PI * DONUT_R;

export function createResult(root, { categories, references, text, citations }) {
  const t = (path) => lookup(text, path);
  const $ = (sel) => root.querySelector(sel);

  // --- Dònut i llegenda
  const ring = svg("g", { transform: "rotate(-90 66 66)" });
  const donut = svg(
    "svg",
    { class: "donut", viewBox: "0 0 132 132", role: "img", "aria-label": t("result.breakdownTitle") },
    svg("circle", { cx: 66, cy: 66, r: DONUT_R, fill: "none", stroke: "var(--rule)", "stroke-width": 16 }),
    ring
  );
  const arcs = new Map();
  const legendItems = new Map();
  for (const c of categories) {
    const arc = svg("circle", {
      cx: 66,
      cy: 66,
      r: DONUT_R,
      fill: "none",
      stroke: `var(--c-${c.id})`,
      "stroke-width": 16,
      "stroke-dasharray": `0 ${DONUT_C}`,
    });
    ring.append(arc);
    arcs.set(c.id, arc);
    const value = h("span", { class: "legend__value" }, "0");
    const li = h(
      "li",
      {},
      h("span", { class: "legend__dot", style: `background: var(--c-${c.id})` }),
      h("a", { href: `#cat-${c.id}` }, t(`categories.${c.id}.short`) ?? t(`categories.${c.id}.title`)),
      value
    );
    legendItems.set(c.id, { li, value });
  }
  $("[data-breakdown]").replaceChildren(donut, h("ul", { class: "legend" }, [...legendItems.values()].map((x) => x.li)));

  // --- Escala de referència vertical (logarítmica)
  const { min, max, points } = references.scale;
  const pos = (dose) => 3 + logPosition(dose, min, max) * 94; // marge perquè les etiquetes no surtin
  const bandStops = references.bands.filter((b) => b.below < Infinity).map((b) => pos(b.below));
  const track = h("div", {
    class: "ladder__track",
    style: `--b1:${bandStops[0]}%; --b2:${bandStops[1]}%; --b3:${bandStops[2]}%`,
  });
  const ladder = h("div", { class: "ladder" }, track);
  for (const p of points) {
    ladder.append(
      h(
        "div",
        { class: `ladder__tick ladder__tick--${p.kind}`, style: `bottom: ${pos(p.dose)}%` },
        h(
          "span",
          { class: "ladder__label" },
          h(
            "b",
            {},
            formatDoseCompact(p.dose).replace(/\s/, "\u00a0"),
            p.kind === "annual" || p.kind === "limit" ? t("result.perYearUnit") : ""
          ),
          " ",
          t(`references.ladder.${p.id}`) ?? t(`references.${p.id}`)
        )
      )
    );
  }
  // Les fonts de l'escala van a la nota de sota, per no saturar les etiquetes
  const scaleSources = [...new Set(points.flatMap((p) => p.sources))];
  $("[data-scale-sources]").replaceChildren(...citations.cite(scaleSources));
  const markerValue = h("b", {}, "0");
  const marker = h("div", { class: "ladder__marker" }, h("span", { class: "ladder__you" }, t("result.you"), " ", markerValue));
  ladder.append(marker);
  $("[data-scale]").replaceChildren(ladder);

  // --- Comparacions amb mitjanes de referència
  $("[data-compare]").replaceChildren(
    ...references.averages.map((a) =>
      h(
        "div",
        { class: "compare" },
        h("span", {}, t(`references.${a.id}`), " ", citations.cite(a.sources)),
        h("b", {}, `${formatDose(a.dose, { min: 1 })} mSv`)
      )
    )
  );

  const spain = references.averages.find((a) => a.id === "spain-average");

  function update({ total, byCategory }) {
    $("[data-total]").textContent = formatDose(total);
    $("[data-bananas]").textContent = formatNumber(Math.round(total / references.banana.dose));

    // Franja
    const band = references.bands.find((b) => total < b.below);
    const bandEl = $("[data-band]");
    bandEl.dataset.band = band.id;
    bandEl.querySelector("[data-band-title]").textContent = t(`bands.${band.id}.title`);
    bandEl.querySelector("[data-band-text]").textContent = t(`bands.${band.id}.text`);

    // Comparació amb la mitjana d'Espanya
    const ratio = total / spain.dose;
    $("[data-ratio]").textContent =
      ratio >= 1
        ? t("result.ratioAbove").replace("{x}", formatNumber(ratio, ratio < 10 ? 1 : 0))
        : t("result.ratioBelow").replace("{p}", formatPercent(ratio));

    // Dònut, llegenda i font principal
    let offset = 0;
    let main = null;
    for (const c of categories) {
      const dose = byCategory[c.id] ?? 0;
      const share = total > 0 ? dose / total : 0;
      const len = share * DONUT_C;
      const arc = arcs.get(c.id);
      arc.setAttribute("stroke-dasharray", `${Math.max(len - (len > 2 ? 1.2 : 0), 0)} ${DONUT_C}`);
      arc.setAttribute("stroke-dashoffset", String(-offset));
      offset += len;
      const item = legendItems.get(c.id);
      item.value.textContent = dose > 0 ? `${formatDose(dose)} · ${formatPercent(share)}` : "0";
      item.li.classList.toggle("is-zero", dose === 0);
      if (!main || dose > main.dose) main = { id: c.id, dose, share };
    }
    $("[data-main-source]").textContent =
      main && main.dose > 0
        ? t("result.mainSource")
            .replace("{cat}", t(`categories.${main.id}.mainName`))
            .replace("{p}", formatPercent(main.share))
        : "";

    marker.style.bottom = `${pos(Math.max(total, min))}%`;
    markerValue.textContent = `${formatDose(total)} mSv`;
  }

  return { update };
}
