// Genera el formulari de la calculadora a partir del model de dades i dels textos.

import { h, lookup } from "./dom.js";
import { formatDoseAuto } from "../format.js";

const ROW_TYPES = new Set(["toggle", "count"]);

export function renderForm(root, { categories, text, citations, onInfo }) {
  const t = (path) => lookup(text, path);
  const sections = categories.map((category, index) =>
    renderCategory(category, index, { t, citations, onInfo })
  );
  root.replaceChildren(...sections);
}

function renderCategory(category, index, ctx) {
  const { t } = ctx;
  const c = t(`categories.${category.id}`) ?? {};
  const headingId = `cat-${category.id}-title`;

  const section = h(
    "section",
    { class: "cat", id: `cat-${category.id}`, dataset: { cat: category.id }, "aria-labelledby": headingId },
    h(
      "header",
      { class: "cat__head" },
      h("span", { class: "cat__num" }, String(index + 1).padStart(2, "0")),
      h("h2", { class: "cat__title", id: headingId }, c.title),
      h(
        "span",
        { class: "cat__dose" },
        h("span", { "data-cat-dose": category.id }, "0"),
        h("small", {}, t("ui.mSv"))
      ),
      h("div", { class: "cat__bar", "aria-hidden": "true" }, h("span", { "data-cat-bar": category.id }))
    ),
    c.lede && h("p", { class: "cat__lede", html: c.lede }),
    c.more &&
      h(
        "details",
        { class: "more" },
        h("summary", {}, t("ui.moreInfo")),
        h(
          "div",
          { class: "more__body", html: c.more },
          category.sources?.length ? h("p", { class: "q__dose" }, `${t("ui.sources")}: `, ctx.citations.cite(category.sources)) : null
        )
      )
  );

  // Les preguntes amb `group` van dins de desplegables; les "fila" consecutives,
  // dins d'una mateixa llista.
  let rowList = null;
  const groups = new Map();
  for (const q of category.questions) {
    if (q.group) {
      let group = groups.get(q.group);
      if (!group) {
        group = renderGroup(q.group, ctx);
        groups.set(q.group, group);
        if (groups.size === 1 && category.searchable) section.append(renderSearch(section, ctx));
        section.append(group.el);
      }
      group.list.append(renderRow(q, ctx));
      rowList = null;
    } else if (ROW_TYPES.has(q.type)) {
      if (!rowList) {
        rowList = h("ul", { class: "rows" });
        section.append(wrapQuestionBlock(q, rowList, ctx));
      }
      rowList.append(renderRow(q, ctx));
    } else {
      rowList = null;
      section.append(renderQuestion(q, ctx));
    }
  }

  if (c.notice) section.append(h("p", { class: "notice", html: c.notice }));
  return section;
}

// Una llista de files pot anar precedida d'un títol (`rowsLabel` a la primera pregunta).
function wrapQuestionBlock(firstQuestion, list, { t }) {
  const label = t(`questions.${firstQuestion.id}.rowsLabel`);
  const help = t(`questions.${firstQuestion.id}.rowsHelp`);
  const block = h("div", { class: "q q--rows" });
  if (label) block.append(h("p", { class: "q__label" }, label));
  if (help) block.append(h("p", { class: "q__help", html: help }));
  block.append(list);
  return block;
}

function renderGroup(groupId, { t }) {
  const list = h("ul", { class: "rows" });
  const note = t(`groups.${groupId}.note`);
  const el = h(
    "details",
    { class: "group", dataset: { group: groupId } },
    h(
      "summary",
      {},
      h("span", { class: "group__title" }, t(`groups.${groupId}.title`)),
      h("span", { class: "group__sum", "data-group-sum": groupId }, "")
    ),
    h("div", { class: "group__body" }, note && h("p", { class: "group__note", html: note }), list)
  );
  return { el, list };
}

function renderSearch(section, { t }) {
  const input = h("input", {
    type: "search",
    placeholder: t("ui.searchExams"),
    "aria-label": t("ui.searchExams"),
    autocomplete: "off",
  });
  input.addEventListener("input", () => {
    const query = normalize(input.value.trim());
    for (const group of section.querySelectorAll(".group")) {
      let matches = 0;
      for (const row of group.querySelectorAll(".row")) {
        const hit = !query || normalize(row.textContent).includes(query);
        row.hidden = !hit;
        if (hit) matches++;
      }
      group.hidden = matches === 0;
      group.open = Boolean(query) && matches > 0;
    }
  });
  return h(
    "div",
    { class: "search" },
    h("span", {
      html: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="7" cy="7" r="5"/><path d="m11 11 3.5 3.5"/></svg>',
    }),
    input
  );
}

function normalize(s) {
  return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

function infoButton(q, ctx, title) {
  const hasInfo = ctx.t(`questions.${q.id}.info`) || q.sources?.length;
  if (!hasInfo) return null;
  return h(
    "button",
    {
      type: "button",
      class: "info-btn",
      "aria-label": `${ctx.t("ui.moreInfo")}: ${title}`,
      onclick: () => ctx.onInfo(q),
    },
    "i"
  );
}

function rowMeta(q, ctx) {
  const custom = ctx.t(`questions.${q.id}.meta`);
  if (custom) return custom;
  if (q.type === "toggle") return `${formatDoseAuto(q.dose)}${ctx.t("ui.perYear")}`;
  const unit = ctx.t(`questions.${q.id}.unit`) ?? ctx.t("ui.perExam");
  return `${formatDoseAuto(q.perUnit)} ${unit}`;
}

function renderRow(q, ctx) {
  const { t } = ctx;
  const label = t(`questions.${q.id}.label`) ?? q.id;
  const inputId = `q-${q.id}`;
  const text = [
    h("span", { class: "row__label" }, label),
    h("span", { class: "row__meta" }, rowMeta(q, ctx)),
  ];

  let main;
  let control = null;
  if (q.type === "toggle") {
    main = h(
      "label",
      { class: "row__main", for: inputId },
      h("input", { type: "checkbox", class: "check", id: inputId, dataset: { q: q.id } }),
      h("span", { class: "row__text" }, text)
    );
  } else {
    main = h("label", { class: "row__text", for: inputId }, text);
    control = stepper(q, inputId, t);
  }

  const info = infoButton(q, ctx, label);
  const right = h("div", { class: "row__main" }, info, control);
  return h("li", { class: "row", dataset: { row: q.id } }, main, right);
}

function stepper(q, inputId, t) {
  const input = h("input", {
    id: inputId,
    type: "number",
    inputmode: "numeric",
    min: 0,
    step: 1,
    value: 0,
    dataset: { q: q.id },
  });
  const dec = h("button", { type: "button", "aria-label": t("ui.decrease"), dataset: { step: -1, for: q.id } }, "−");
  const inc = h("button", { type: "button", "aria-label": t("ui.increase"), dataset: { step: 1, for: q.id } }, "+");
  return h("span", { class: "stepper" }, dec, input, inc);
}

function renderQuestion(q, ctx) {
  const { t } = ctx;
  const qt = t(`questions.${q.id}`) ?? {};
  const inputId = `q-${q.id}`;

  if (q.type === "fixed" || q.type === "derived") {
    const derived = q.type === "derived";
    return h(
      "div",
      { class: "q", dataset: { question: q.id } },
      h(
        "div",
        { class: derived ? "fixed fixed--derived" : "fixed" },
        h("span", {}, derived ? h("b", {}, qt.label) : qt.label, " ", infoButton(q, ctx, qt.label)),
        h(
          "span",
          { class: "fixed__value" },
          derived ? h("span", { "data-derived": q.id }) : formatDoseAuto(q.dose),
          t("ui.perYear")
        )
      ),
      derived && qt.detail && h("p", { class: "q__dose", "data-derived-detail": q.id }),
      qt.help && h("p", { class: "q__help", style: "margin-top:10px", html: qt.help })
    );
  }

  const wrapper = h(q.display === "chips" ? "fieldset" : "div", {
    class: "q",
    dataset: { question: q.id },
  });
  if (q.display === "chips") {
    // El <legend> ha de ser fill directe del <fieldset>
    wrapper.append(h("legend", { class: "q__label q__label--legend" }, qt.label, " ", infoButton(q, ctx, qt.label)));
  } else {
    wrapper.append(
      h(
        "div",
        { class: "row__main", style: "align-items:center" },
        h("label", { class: "q__label", for: inputId }, qt.label),
        infoButton(q, ctx, qt.label)
      )
    );
  }
  if (qt.help) wrapper.append(h("p", { class: "q__help", html: qt.help }));

  let control;
  if (q.type === "choice" && q.display === "chips") {
    control = h(
      "div",
      { class: "chips" },
      q.options.map((o) =>
        h(
          "label",
          { class: "chip" },
          h("input", { type: "radio", name: inputId, value: o.id, dataset: { q: q.id } }),
          h("span", {}, qt.options?.[o.id] ?? o.id)
        )
      )
    );
  } else if (q.type === "choice") {
    control = h("div", { class: "select" }, renderSelect(q, qt, inputId, t));
  } else if (q.type === "number") {
    control = h(
      "span",
      { class: "field" },
      h("input", {
        id: inputId,
        type: "number",
        inputmode: "decimal",
        min: 0,
        step: q.step ?? "any",
        placeholder: qt.placeholder ?? "0",
        dataset: { q: q.id },
      }),
      qt.unit && h("span", { class: "field__unit" }, qt.unit)
    );
  }
  wrapper.append(h("div", { class: "q__control" }, control));
  wrapper.append(h("p", { class: "q__dose", "data-q-dose": q.id }));
  if (q.warn) wrapper.append(h("p", { class: "notice notice--warn", "data-q-warn": q.id, hidden: true }));
  return wrapper;
}

function renderSelect(q, qt, inputId, t) {
  const select = h("select", { id: inputId, dataset: { q: q.id } });
  if (q.placeholder !== false && !("default" in q && q.default)) {
    select.append(h("option", { value: "" }, t("ui.choose")));
  }
  let currentGroup = null;
  let groupEl = null;
  for (const o of q.options) {
    const label = qt.options?.[o.id] ?? o.id;
    const option = h("option", { value: o.id }, label);
    if (o.group) {
      if (o.group !== currentGroup) {
        currentGroup = o.group;
        groupEl = h("optgroup", { label: qt.optgroups?.[o.group] ?? o.group });
        select.append(groupEl);
      }
      groupEl.append(option);
    } else {
      currentGroup = null;
      select.append(option);
    }
  }
  return select;
}
