// Textos de viatges, altres fonts, referències i franges del resultat (català).

export const lifestyleCategories = {
  travel: {
    title: "Viatges",
    short: "Viatges",
    mainName: "dels viatges",
    lede: "Quan anem en avió, tenim molt menys aire a sobre que ens protegeixi dels raigs còsmics: a l'altitud de creuer, la dosi de radiació còsmica és unes 100 vegades més alta que a terra.",
    more: `<p>Un vol curt com Barcelona–Madrid suposa uns 0,003 mSv, i un de transatlàntic com Madrid–Nova York, uns 0,03–0,05 mSv, semblant a una radiografia de tòrax. Els vols cap a l'Amèrica del Nord o l'Àsia passen per latituds més altes i donen més dosi per hora que els vols cap a l'Amèrica del Sud.</p>
<p>Per a qui vola de tant en tant és una aportació petita; només el personal de vol arriba a 1–3 mSv l'any; fins i tot qui vola sovint rarament passa de 0,1–0,3 mSv.</p>
<table class="ref-table"><thead><tr><th>Trajecte (anada)</th><th>Dosi aproximada</th></tr></thead><tbody>
<tr><td>Barcelona–Madrid</td><td>≈ 3 µSv</td></tr>
<tr><td>Barcelona–Londres</td><td>≈ 5–10 µSv</td></tr>
<tr><td>Madrid–Gran Canària</td><td>≈ 6–10 µSv</td></tr>
<tr><td>Madrid–Nova York</td><td>≈ 30–50 µSv</td></tr>
<tr><td>Madrid–São Paulo o Buenos Aires</td><td>≈ 25–40 µSv</td></tr>
<tr><td>Madrid–Tòquio</td><td>≈ 60–100 µSv</td></tr>
</tbody></table>
<p>Valors orientatius estimats a partir de rutes semblants publicades per l'UNSCEAR i l'Administració Federal d'Aviació dels EUA; la dosi real depèn de la ruta exacta i de l'activitat del Sol.</p>`,
  },
  other: {
    title: "Hàbits, entorn i feina",
    short: "Altres",
    mainName: "d'«altres fonts»",
    lede: "Altres fonts que poden afegir dosi: el tabac, viure a prop d'una central nuclear o treballar amb radiació.",
    more: `<p>Hem tret de la calculadora algunes fonts que sortien en calculadores nord-americanes perquè la seva dosi és negligible o ja està inclosa en un altre apartat: la casa de pedra o maó (ja és dins la radiació terrestre), els rellotges lluminosos, els detectors de fum, les llanternes de càmping, les centrals de carbó o l'escàner de maletes de l'aeroport. En parlem a <a href="#article-objectes">Objectes quotidians</a> i a <a href="#article-mites">Mites</a>.</p>`,
  },
};

export const lifestyleQuestions = {
  flightShortHours: {
    label: "Hores en vols curts (fins a 4 h)",
    help: "Suma les hores dins l'avió dels últims 12 mesos, comptant anada i tornada. Per exemple, Barcelona–Madrid ≈ 1 h 15 min; Madrid–Canàries ≈ 3 h.",
    unit: "hores",
    placeholder: "0",
    meta: "3 µSv per hora de vol",
    info: `<p>En vols curts, l'UNSCEAR fa servir 3 µSv per hora, comptant l'enlairament i l'aterratge, quan l'avió vola més baix. És un valor adequat per a la majoria de vols des d'Espanya: nacionals, Canàries i Europa.</p>`,
  },
  flightLongHours: {
    label: "Hores en vols llargs (més de 4 h)",
    help: "Per exemple, Madrid–Nova York ≈ 8 h; Madrid–Tòquio ≈ 14 h. Si ets tripulant, no hi comptis els vols de feina (van a l'apartat de feina).",
    unit: "hores",
    placeholder: "0",
    meta: "4 µSv per hora de vol",
    info: `<p>L'UNSCEAR fa servir 4 µSv per hora com a mitjana dels vols llargs. Les rutes cap a l'Amèrica del Nord o l'Àsia, més a prop del pol, en donen 4–8 µSv/h; les rutes cap a l'Amèrica del Sud, menys.</p>`,
  },
  mountainDays: {
    label: "Dies a alta muntanya (per sobre dels 2.000 m)",
    unit: "per dia",
    rowsLabel: "Muntanya",
    info: `<p>A uns 2.500 m d'altitud la radiació còsmica és unes tres vegades més alta que a nivell del mar. Un dia a aquesta altitud afegeix aproximadament 0,002 mSv, i una setmana d'esquí, 0,01–0,015 mSv: com unes poques hores d'avió. Si <b>vius</b> a la muntanya, això ja es té en compte a l'apartat de l'altitud.</p>`,
  },
  cigarettesPerDay: {
    label: "Cigarrets que fumes al dia",
    meta: "18 µSv l'any per cada cigarret diari",
    rowsLabel: "Hàbits i entorn",
    info: `<p>Les fulles de tabac contenen poloni-210 i plom-210, elements radioactius que, en fumar, es dipositen als bronquis. Fumar un paquet al dia suposa una dosi efectiva d'uns 0,36 mSv l'any (estimació del consell nord-americà de protecció radiològica, NCRP), tot i que la dosi en petites zones dels bronquis és molt més alta.</p>
<p>La radioactivitat és només una petita part del perill del tabac: el fum conté moltes altres substàncies que causen càncer. A més, el tabac multiplica el risc del radó.</p>`,
  },
  nuclearNearby: {
    label: "Visc a prop d'una central nuclear",
    info: `<p>Les centrals nuclears espanyoles (Almaraz, Ascó, Vandellós II, Cofrentes i Trillo) alliberen quantitats molt petites de material radioactiu, controlades pel CSN. El 2023, la dosi estimada a la persona més exposada de l'entorn no va superar uns 0,001 mSv l'any, menys d'una mil·lèsima part de la radiació natural. Viure-hi a prop no canvia de manera apreciable la teva dosi.</p>`,
  },
  sleepPartner: {
    label: "Dormo cada nit al costat d'una altra persona",
    info: `<p>El cos humà conté potassi-40, i una petita part de la seva radiació en surt. Dormir cada nit al costat d'algú afegeix, segons una estimació aproximada, uns 0,001 mSv l'any: molt menys que el que et dona el potassi del teu propi cos (uns 0,17 mSv). És una curiositat, no un risc.</p>`,
  },
  occupation: {
    label: "Treballes amb radiació?",
    help: "Si no saps la teva dosi, fem servir la mitjana del teu sector.",
    options: {
      none: "No",
      medical: "Sí, en sanitat (radiologia, medicina nuclear, dentista…)",
      nuclear: "Sí, en una central nuclear",
      industry: "Sí, en la indústria",
      aircrew: "Sí, sóc tripulant d'avió",
      known: "Sí, i sé la meva dosi anual",
    },
    info: `<p>Mitjanes dels treballadors amb dosi mesurable a Espanya el 2023 (CSN): sanitat 0,62 mSv, centrals nuclears 1,18 mSv, indústria 0,96 mSv. El 97 % dels 127.000 treballadors controlats va rebre menys d'1 mSv.</p>
<p>Per a la tripulació d'avió fem servir 2 mSv, entre la mitjana d'Alemanya el 2023 (1,2 mSv) i la mitjana mundial (2,7 mSv). Si treballes amb radiació, la teva dosi consta al teu historial dosimètric i tens dret a consultar-lo.</p>`,
  },
  occupationDose: {
    label: "La teva dosi laboral anual",
    help: "Consta al teu historial dosimètric; la pots demanar al servei de protecció radiològica de la teva empresa.",
    unit: "mSv",
    placeholder: "p. ex. 0,8",
    warn6: "Més de 6 mSv l'any és propi de treballadors de <b>categoria A</b> (Reial Decret 1029/2022, art. 22).",
    warn20: "<b>Supera el límit legal anual de 20 mSv</b> per a treballadors (art. 11). Comprova les unitats: si el valor és correcte, és un cas que el CSN investiga.",
    warn100: "<b>Valor molt alt.</b> Comprova que l'has escrit bé (mSv, no µSv).",
    info: `<p>Escriu la dosi efectiva anual del teu dosímetre personal. La dosimetria laboral mesura la dosi per sobre del fons natural, que ja calculem a part, així que no es compta dues vegades.</p>`,
  },
  banana: {
    label: "La dosi en plàtans",
    meta: "≈ 0,1 µSv per plàtan",
    info: `<p>Un plàtan conté uns 400–550 mg de potassi, una petita part del qual és potassi-40 radioactiu. Menjar-ne un equival a uns 0,0001 mSv (0,1 µSv), de manera que 1 mSv equival a uns 10.000 plàtans.</p>
<p>És una unitat divertida per comparar, però <b>menjar plàtans no fa que acumulis dosi</b>: el cos manté constant la quantitat de potassi i elimina el que sobra.</p>`,
  },
};

export const referenceLabels = {
  "spain-average": "Mitjana d'Espanya (natural + mèdica)",
  "spain-natural": "Radiació natural mitjana a Espanya",
  "world-natural": "Radiació natural mitjana al món",
  banana: "Menjar un plàtan",
  "flight-bcn-mad": "Vol Barcelona–Madrid",
  "chest-xray": "Radiografia de tòrax",
  "public-limit": "Límit per al públic (sense fons natural ni medicina)",
  "worker-limit": "Límit per a treballadors",
  "icrp-100": "D'aquí amunt, risc observable en estudis",
  ars: "Dosi de cop: malaltia per radiació",
  // Versions curtes per a l'escala de referència
  ladder: {
    "spain-average": "Mitjana d'Espanya",
    "public-limit": "Límit legal per al públic (fonts artificials)",
    "worker-limit": "Límit legal per a treballadors",
    "icrp-100": "Risc observable en estudis",
    ars: "Malaltia per radiació (dosi de cop)",
  },
};

export const bandTexts = {
  usual: {
    title: "Dins del rang habitual",
    text: "Semblant a la mitjana d'Espanya i dins del rang de radiació natural de la majoria de persones del món (1–13 mSv l'any).",
  },
  above: {
    title: "Per sobre de la mitjana",
    text: "Sol ser pel radó de casa o per proves mèdiques com el TC. El radó és la part que pots reduir; les proves mèdiques justificades aporten un benefici.",
  },
  high: {
    title: "Elevada",
    text: "Supera el que la llei permet als treballadors en un any (20 mSv). Si ve del radó, convé actuar. Si ve de proves mèdiques, parla-ho amb el metge, però no evitis proves necessàries.",
  },
  veryHigh: {
    title: "Molt elevada: revisa les dades",
    text: "És una dosi anual que, segons l'ICRP, gairebé sempre justifica actuar. Comprova que les dades són correctes (unitats, nombre de proves).",
  },
};
