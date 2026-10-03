// Textos de les fonts naturals: terra, raigs còsmics, radó i radiació interna (català).

export const naturalCategories = {
  terrestrial: {
    title: "El terra on vius",
    short: "Terrestre",
    mainName: "de la radiació del terra",
    lede: "El sòl, les roques i els materials de construcció contenen urani, tori i potassi radioactius des que es va formar la Terra. La dosi depèn de la geologia de cada zona.",
    more: `<p>Aquests elements emeten raigs gamma. Les zones granítiques (Galícia, el Sistema Central, Extremadura) en donen més que les zones calcàries i sedimentàries de la costa mediterrània. Com que els materials de construcció surten de la mateixa terra, a dins de casa la dosi sol ser una mica més alta que a fora; aquest valor ja inclou tots dos llocs.</p>
<p>La mitjana a Espanya és d'uns 0,5–0,6 mSv l'any. A Pontevedra (1,2 mSv) és gairebé quatre vegades la de Múrcia (0,3 mSv), i totes dues són situacions completament normals.</p>
<p>Els valors de la península surten del projecte MARNA del Consell de Seguretat Nuclear, que va fer més d'un milió de mesures. Els hem convertit a dosi efectiva amb el mètode de l'UNSCEAR (80 % del temps a dins d'edificis). Són mitjanes de tota la província: una casa concreta pot tenir el doble o la meitat.</p>`,
  },
  cosmic: {
    title: "L'altitud: raigs còsmics",
    short: "Còsmica",
    mainName: "de la radiació còsmica",
    lede: "De l'espai ens arriben partícules de molt alta energia. L'atmosfera ens fa d'escut: com més amunt vius, menys aire tens a sobre i més dosi reps.",
    more: `<p>Les partícules còsmiques (sobretot protons) xoquen amb l'atmosfera i produeixen una pluja de partícules secundàries, principalment muons i neutrons, que són les que ens arriben a terra.</p>
<p>Al nivell del mar rebem uns 0,3 mSv l'any; a 2.000 m, unes 2,5 vegades aquesta dosi (uns 0,8 mSv). Viure a Madrid (uns 650 m) suposa només uns 0,1 mSv més l'any que viure a Barcelona. La dosi també varia aproximadament un 10 %, amunt o avall, amb el cicle solar d'onze anys.</p>
<p>Calculem la dosi amb la fórmula de l'UNSCEAR, que té en compte que passem el 80 % del temps a dins d'edificis.</p>`,
  },
  radon: {
    title: "El radó de casa teva",
    short: "Radó",
    mainName: "del radó",
    lede: "El radó és un gas radioactiu natural, sense olor ni color, que surt del terra i es pot acumular dins dels edificis. És la font natural que més dosi aporta i la que més fàcilment es pot reduir.",
    more: `<p>El radó es forma a partir de l'urani present al sòl i a les roques. A l'aire lliure es dilueix, però pot acumular-se a plantes baixes i soterranis poc ventilats, sobretot en zones granítiques. Segons el Consell de Seguretat Nuclear, és la <b>segona causa de càncer de pulmó després del tabac</b> i la primera en persones que no fumen; el risc es multiplica si es fuma.</p>
<p>La bona notícia és que es pot <b>mesurar</b> fàcilment amb un detector durant uns mesos i, si cal, <b>reduir</b> ventilant o amb solucions constructives. A Espanya el nivell de referència és de <b>300 Bq/m³</b> de mitjana anual (Reial Decret 1029/2022); l'OMS recomana no superar els 100 Bq/m³ quan sigui possible.</p>
<p>Calculem la dosi amb el coeficient de l'UNSCEAR (0,025 mSv l'any per cada Bq/m³), el mateix que fan servir les mitjanes amb què et comparem. Amb el coeficient més recent de l'ICRP (publicació 137), la dosi seria aproximadament el doble: aquesta diferència reflecteix la incertesa científica real.</p>`,
  },
  internal: {
    title: "El teu propi cos",
    short: "Interna",
    mainName: "de la radiació interna",
    lede: "Mengem i bevem elements radioactius naturals, sobretot potassi-40, que formen part del nostre cos. Aquesta dosi varia poc d'una persona a una altra.",
    more: `<p>Una petita part de tot el potassi (un element imprescindible per a la vida) és potassi-40, que és radioactiu. També ingerim, en menor quantitat, elements de les famílies de l'urani i el tori, com el poloni-210, i carboni-14.</p>
<p>El cos regula la quantitat de potassi que conté, de manera que la part del potassi-40 (uns 0,17 mSv) és pràcticament la mateixa per a tothom; el total sol ser d'uns 0,3 mSv l'any. Per això <b>menjar més plàtans no augmenta la dosi</b>: el cos elimina el potassi que sobra. Les persones que mengen molt marisc en poden rebre fins a un 50 % més.</p>`,
  },
};

const provinces = {
  unknown: "No ho sé (mitjana d'Espanya)",
  abroad: "Visc fora d'Espanya (mitjana mundial)",
  almeria: "Almeria",
  cadis: "Cadis",
  cordova: "Còrdova",
  granada: "Granada",
  huelva: "Huelva",
  jaen: "Jaén",
  malaga: "Màlaga",
  sevilla: "Sevilla",
  osca: "Osca",
  saragossa: "Saragossa",
  terol: "Terol",
  asturies: "Astúries",
  balears: "Illes Balears",
  granCanaria: "Gran Canària",
  fuerteventura: "Fuerteventura",
  lanzarote: "Lanzarote",
  tenerife: "Tenerife, la Palma, la Gomera o el Hierro",
  cantabria: "Cantàbria",
  avila: "Àvila",
  burgos: "Burgos",
  lleo: "Lleó",
  palencia: "Palència",
  salamanca: "Salamanca",
  segovia: "Segòvia",
  soria: "Sòria",
  valladolid: "Valladolid",
  zamora: "Zamora",
  albacete: "Albacete",
  ciudadReal: "Ciudad Real",
  conca: "Conca",
  guadalajara: "Guadalajara",
  toledo: "Toledo",
  barcelona: "Barcelona",
  girona: "Girona",
  lleida: "Lleida",
  tarragona: "Tarragona",
  alacant: "Alacant",
  castello: "Castelló",
  valencia: "València",
  badajoz: "Badajoz",
  caceres: "Càceres",
  corunya: "La Corunya",
  lugo: "Lugo",
  ourense: "Ourense",
  pontevedra: "Pontevedra",
  madrid: "Madrid",
  murcia: "Múrcia",
  navarra: "Navarra",
  alaba: "Àlaba",
  biscaia: "Biscaia",
  guipuscoa: "Guipúscoa",
  rioja: "La Rioja",
  ceuta: "Ceuta",
  melilla: "Melilla",
};

export const naturalQuestions = {
  terProvince: {
    label: "En quina província vius?",
    options: provinces,
    optgroups: {
      and: "Andalusia",
      ara: "Aragó",
      ast: "Astúries",
      bal: "Illes Balears",
      can: "Canàries",
      cnt: "Cantàbria",
      cyl: "Castella i Lleó",
      clm: "Castella-la Manxa",
      cat: "Catalunya",
      val: "Comunitat Valenciana",
      ext: "Extremadura",
      gal: "Galícia",
      mad: "Comunitat de Madrid",
      mur: "Regió de Múrcia",
      nav: "Navarra",
      pv: "País Basc",
      rio: "La Rioja",
      cym: "Ceuta i Melilla",
    },
    info: `<p>Valor mitjà de la radiació gamma del terreny a la teva província, a dins i a fora dels edificis.</p>
<p>El projecte MARNA només cobreix la península. Per a la resta: el valor de les Balears surt d'11 mostres de sòl de Mallorca (confiança baixa); els de les Canàries, d'estudis de sòls de les universitats de les illes; i els de Ceuta i Melilla, del mapa radiomètric del CSN (orientatius).</p>`,
  },
  altitude: {
    label: "A quina altitud vius?",
    help: "Escriu l'altitud del teu municipi en metres (la trobaràs a la Viquipèdia). Per exemple: Barcelona ≈ 10 m, Madrid ≈ 650 m, Àvila ≈ 1.130 m. Si la deixes en blanc, fem servir la mitjana d'Espanya.",
    unit: "metres",
    placeholder: "p. ex. 120",
    info: `<p>Dosi anual de radiació còsmica segons l'altitud, calculada amb la fórmula de l'UNSCEAR: uns 0,31 mSv a nivell del mar, 0,46 mSv a 1.000 m i 0,80 mSv a 2.000 m. Si no indiques l'altitud, fem servir 0,36 mSv, la mitjana de la població espanyola segons l'Atles Europeu de Radiació Natural.</p>`,
  },
  radonMode: {
    label: "Saps quant radó hi ha a casa teva?",
    options: {
      unknown: "No ho sé",
      map: "Sé el potencial de la meva zona",
      measured: "L'he mesurat",
    },
  },
  radonZone: {
    label: "Potencial de radó de la teva zona",
    help: `Busca el teu municipi al <a href="https://www.csn.es/mapa-del-potencial-de-radon-en-espana" target="_blank" rel="noopener">mapa del potencial de radó del CSN</a> i tria la categoria que hi surt.`,
    options: {
      zone1: "Menys de 100 Bq/m³",
      zone2: "Entre 101 i 200 Bq/m³",
      zone3: "Entre 201 i 300 Bq/m³",
      zone4: "Entre 301 i 400 Bq/m³",
      zone5: "Més de 400 Bq/m³",
    },
    info: `<p>El «potencial de radó» d'una zona és la concentració que només superen el 10 % dels edificis (mesurats a planta baixa o primera). No és el valor de casa teva: la calculadora fa servir la concentració mitjana dels edificis de cada categoria (de 38 a 219 Bq/m³), segons l'informe del CSN.</p>
<p>Les zones amb potencial superior a 300 Bq/m³ són d'actuació prioritària i ocupen un 17 % del territori.</p>`,
  },
  radonBq: {
    label: "Resultat de la mesura",
    help: "Concentració mitjana anual que va donar el detector, en becquerels per metre cúbic (per exemple, 85).",
    unit: "Bq/m³",
    placeholder: "p. ex. 85",
    meta: "0,025 mSv l'any per cada Bq/m³",
    warn300: `<b>Supera el nivell de referència de 300 Bq/m³</b> (Reial Decret 1029/2022). Val la pena reduir-lo: ventila més sovint, segella les esquerdes i els passos d'instal·lacions del terra i, si cal, consulta un professional sobre sistemes d'extracció. Mira les <a href="https://www.csn.es/preguntas-frecuentes-sobre-el-radon-en-viviendas" target="_blank" rel="noopener">recomanacions del CSN</a>.`,
    info: `<p>Si vas fer una mesura de radó amb un detector homologat (normalment durant 3 mesos o més), escriu-ne el resultat. És la manera més fiable de conèixer la teva dosi: el radó pot variar molt d'una casa a la del costat.</p>`,
  },
  radonFloor: {
    label: "En quina planta vius?",
    options: {
      unknown: "No ho sé",
      low: "Casa unifamiliar, planta baixa o 1a",
      mid: "2a o 3a planta",
      high: "4a o més amunt",
    },
    info: `<p>El radó ve del terra, per això és més alt a soterranis i plantes baixes. Segons el CSN, disminueix aproximadament un 20 % per cada planta, i per sobre de la segona és molt improbable superar els 300 Bq/m³. Si no ho indiques, fem servir el valor de planta baixa (el més prudent).</p>`,
  },
  radonEstimate: {
    label: "La teva estimació de radó",
    detail: "Uns {c} Bq/m³ de mitjana a casa teva.",
    info: `<p>Dosi = concentració mitjana de radó (Bq/m³) × 0,025 mSv per Bq/m³ i any. Aquest coeficient és el de l'UNSCEAR i suposa que passes unes 7.000 hores l'any a dins d'edificis.</p>
<p>Si no saps el teu valor, fem servir uns 71 Bq/m³, la mitjana estimada per a Espanya a l'Atles Europeu de Radiació Natural (que probablement és una mica alta, perquè suposa que tothom viu a planta baixa).</p>`,
  },
  thoron: {
    label: "Torò (un altre isòtop del radó)",
    info: `<p>El torò (radó-220) és una altra forma (isòtop) del radó que ve del tori del sòl i dels materials de construcció. Com que dura molt poc, se n'acumula menys. No hi ha mesures espanyoles: fem servir la mitjana mundial de l'UNSCEAR (0,1 mSv l'any).</p>`,
  },
  internalFood: {
    label: "Elements radioactius dels aliments i l'aigua",
    info: `<p>0,29 mSv per la ingestió de potassi-40 (0,17 mSv) i d'elements de les famílies de l'urani i el tori (0,12 mSv), més 0,01 mSv de carboni-14 i altres elements produïts pels raigs còsmics. Són les mitjanes mundials de l'UNSCEAR, que també fa servir l'Atles Europeu per a Espanya.</p>`,
  },
};
