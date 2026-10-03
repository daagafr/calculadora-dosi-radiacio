// Radiació terrestre (raigs gamma del sòl i dels materials de construcció), per província.
//
// Península: mitjana provincial de la taxa d'exposició del projecte MARNA del CSN (µR/h,
// taula 4.37) convertida a dosi efectiva anual amb el mètode de l'UNSCEAR:
//   E (mSv/any) = 8,7 nGy/h per µR/h × 8760 h × 0,7 Sv/Gy × (0,2 + 0,8 × 1,4) × 10⁻⁶ = 0,0704 × µR/h
// (20 % del temps a l'aire lliure, 80 % a dins, i dins un 40 % més de dosi que a fora, valor d'Espanya).
// Illes, Ceuta i Melilla: MARNA no les cobreix; valors d'altres estudis (confiança menor).
// Detall: docs/fonts/01-fonts-naturals.md §2

const p = (group, id, dose) => ({ group, id, dose });

export default {
  id: "terrestrial",
  sources: ["marna2000", "unscear2000-a", "unscear2000-b"],
  questions: [
    {
      id: "terProvince",
      type: "choice",
      display: "select",
      default: "unknown",
      sources: ["marna2000", "unscear2000-b", "eanr2019", "arnedo2017", "martinluis2021", "csn-radon2019"],
      options: [
        { id: "unknown", dose: 0.53 }, // mitjana d'Espanya ponderada per població (EANR, taula 9-2)
        { id: "abroad", dose: 0.48 }, // mitjana mundial (UNSCEAR 2000)

        p("and", "almeria", 0.43),
        p("and", "cadis", 0.38),
        p("and", "cordova", 0.64),
        p("and", "granada", 0.48),
        p("and", "huelva", 0.53),
        p("and", "jaen", 0.56),
        p("and", "malaga", 0.51),
        p("and", "sevilla", 0.48),

        p("ara", "osca", 0.55),
        p("ara", "saragossa", 0.52),
        p("ara", "terol", 0.47),

        p("ast", "asturies", 0.7),

        p("bal", "balears", 0.41), // sòls de Mallorca (n = 11); confiança baixa

        p("can", "granCanaria", 0.59), // Arnedo et al. 2017
        p("can", "fuerteventura", 0.26),
        p("can", "lanzarote", 0.2),
        p("can", "tenerife", 0.58), // Martín Luis et al. 2021 (illes occidentals)

        p("cnt", "cantabria", 0.46),

        p("cyl", "avila", 1.06),
        p("cyl", "burgos", 0.48),
        p("cyl", "lleo", 0.63),
        p("cyl", "palencia", 0.48),
        p("cyl", "salamanca", 0.87),
        p("cyl", "segovia", 0.72),
        p("cyl", "soria", 0.47),
        p("cyl", "valladolid", 0.64),
        p("cyl", "zamora", 0.69),

        p("clm", "albacete", 0.37),
        p("clm", "ciudadReal", 0.55),
        p("clm", "conca", 0.44),
        p("clm", "guadalajara", 0.49),
        p("clm", "toledo", 0.88),

        p("cat", "barcelona", 0.5),
        p("cat", "girona", 0.65),
        p("cat", "lleida", 0.56),
        p("cat", "tarragona", 0.42),

        p("val", "alacant", 0.35),
        p("val", "castello", 0.34),
        p("val", "valencia", 0.35),

        p("ext", "badajoz", 0.74),
        p("ext", "caceres", 0.92),

        p("gal", "corunya", 0.77),
        p("gal", "lugo", 0.96),
        p("gal", "ourense", 1.01),
        p("gal", "pontevedra", 1.2),

        p("mad", "madrid", 0.9),
        p("mur", "murcia", 0.32),
        p("nav", "navarra", 0.55),

        p("pv", "alaba", 0.49),
        p("pv", "biscaia", 0.59),
        p("pv", "guipuscoa", 0.75),

        p("rio", "rioja", 0.51),

        p("cym", "ceuta", 0.99), // llegit del mapa radiomètric del CSN; orientatiu
        p("cym", "melilla", 0.56),
      ],
    },
  ],
};
