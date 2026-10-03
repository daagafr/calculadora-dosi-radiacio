// Numeració de les fonts bibliogràfiques per ordre d'aparició a la pàgina.

import { h } from "./ui/dom.js";

export function createCitations(SOURCES) {
  const order = [];

  function number(id) {
    if (!SOURCES[id]) {
      console.warn(`Font desconeguda: ${id}`);
      return null;
    }
    let index = order.indexOf(id);
    if (index === -1) index = order.push(id) - 1;
    return index + 1;
  }

  function cite(ids = []) {
    return ids
      .map((id) => {
        const n = number(id);
        return n && h("a", { class: "cite", href: `#ref-${n}`, title: SOURCES[id].short }, n);
      })
      .filter(Boolean);
  }

  // Omple els <a class="cite" data-source="..."> escrits directament a l'HTML.
  function hydrate(root) {
    for (const el of root.querySelectorAll("a.cite[data-source]")) {
      const n = number(el.dataset.source);
      if (!n) continue;
      el.textContent = n;
      el.href = `#ref-${n}`;
      el.title = SOURCES[el.dataset.source].short;
    }
  }

  function renderBibliography(list) {
    list.replaceChildren(
      ...order.map((id, i) => {
        const s = SOURCES[id];
        return h(
          "li",
          { id: `ref-${i + 1}` },
          h("span", { class: "biblio__n" }, `${i + 1}.`),
          h(
            "span",
            {},
            s.citation,
            " ",
            s.url && h("a", { href: s.url, target: "_blank", rel: "noopener" }, linkLabel(s.url))
          )
        );
      })
    );
  }

  return { cite, hydrate, number, renderBibliography };
}

function linkLabel(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}
