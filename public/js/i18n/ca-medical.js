// Textos de la secció "Proves mèdiques" (català).

export const medicalCategory = {
  title: "Proves mèdiques",
  short: "Mèdica",
  mainName: "de les proves mèdiques",
  lede:
    "Radiografies, TC (escàner), mamografies, proves dentals o de medicina nuclear. Indica <b>quantes</b> n'has fet en els últims 12 mesos. Si no te n'has fet cap, salta aquesta secció.",
  more: `<p>Les xifres són la <b>dosi efectiva típica</b> d'una prova en una persona adulta, segons els estudis nacionals del Consell de Seguretat Nuclear (DOPOES II i DOMNES) i la Comissió Europea. Serveixen per comparar proves entre si i amb la radiació natural, però no per calcular el risc personal de ningú.</p>
<p>La mateixa prova pot donar dosis diverses vegades més altes o més baixes segons l'hospital, l'equip i la persona. A Espanya, les proves mèdiques suposen gairebé <b>un terç</b> de la dosi anual mitjana, i el TC n'és la part més gran.</p>
<p>Una prova indicada pel metge aporta un benefici diagnòstic molt més gran que el petit risc de la radiació. <b>Mai no evitis una prova necessària per por de la radiació</b>; si tens dubtes, pregunta si hi ha alternatives sense radiació (ecografia, ressonància).</p>`,
  notice: `<b>Embaràs.</b> Si estàs embarassada o podries estar-ho, digues-ho sempre abans d'una prova amb radiació. La gran majoria de proves donen dosis molt baixes a l'embrió o al fetus. Segons l'ICRP, una dosi al fetus inferior a 100 mGy no és motiu per interrompre un embaràs, i les proves diagnòstiques habituals queden per sota d'aquest valor. Aquesta dosi és la del fetus, no la teva, i per això no se suma al resultat. <a href="#article-embaras">Més informació</a>.`,
};

export const medicalGroups = {
  "med-xray": {
    title: "Radiografies",
    note: "Una radiografia fa passar un feix breu de raigs X a través del cos. La dosi depèn sobretot de la zona i del gruix que travessa. Compta cada prova completa, encara que tingui diverses imatges.",
  },
  "med-dental": {
    title: "Dentista",
    note: "Les radiografies dentals són de les proves amb menys dosi. El dentista només les demana quan la informació és útil.",
  },
  "med-mammo": {
    title: "Mamografia i densitometria",
    note: "La mamografia fa servir raigs X de baixa energia per detectar el càncer de mama a temps. La densitometria mesura la densitat dels ossos.",
  },
  "med-ct": {
    title: "TC (escàner o TAC)",
    note: "El TC fa moltes imatges des de diferents angles i en reconstrueix talls del cos. És una eina molt valuosa i també la que aporta més dosi a la població.",
  },
  "med-fluoro": {
    title: "Proves amb contrast",
    note: "Es beu o s'injecta un contrast (bari o iode) i se'n segueix el recorregut amb raigs X en temps real (fluoroscòpia). La dosi depèn molt de la durada.",
  },
  "med-interv": {
    title: "Cateterismes i intervencionisme",
    note: "El metge introdueix catèters pels vasos sanguinis guiant-se amb raigs X, per diagnosticar o tractar. La dosi depèn molt de la complexitat del procediment.",
  },
  "med-nuclear": {
    title: "Medicina nuclear (gammagrafia, PET)",
    note: "S'administra un medicament lleugerament radioactiu que es concentra en un òrgan i es detecta amb una gammacàmera o un equip PET. La radioactivitat desapareix sola en hores o dies.",
  },
};

const range = (r) => `<p>Interval habitual segons les fonts: <b>${r}</b>.</p>`;

export const medicalQuestions = {
  rxTorax: {
    label: "Radiografia de tòrax",
    info: `<p>La prova de raigs X més habitual, per veure els pulmons, el cor i les costelles. Es compta igual si té una o dues projeccions (frontal i lateral).</p>${range("0,01–0,26 mSv")}`,
  },
  rxColumnaCervicalDorsal: {
    label: "Radiografia de columna cervical o dorsal",
    info: `<p>Radiografia del coll o de la part mitjana de l'esquena. La dorsal sol tenir una mica més de dosi que la cervical.</p>${range("0,02–2 mSv")}`,
  },
  rxColumnaLumbar: {
    label: "Radiografia de columna lumbar",
    info: `<p>Radiografia de la part baixa de l'esquena. Té més dosi que altres radiografies perquè ha de travessar molt de gruix de cos, prop d'òrgans sensibles.</p>${range("0,3–3,2 mSv")}`,
  },
  rxAbdomen: {
    label: "Radiografia d'abdomen",
    info: `<p>Radiografia de la panxa, per exemple per buscar obstruccions o càlculs.</p>${range("0,1–2,9 mSv")}`,
  },
  rxPelvisMaluc: {
    label: "Radiografia de pelvis o maluc",
    info: `<p>Radiografia de la pelvis o de l'articulació del maluc (cadera).</p>${range("0,2–2,7 mSv")}`,
  },
  rxCrani: {
    label: "Radiografia de crani o sins paranasals",
    info: `<p>Avui és una prova poc habitual: sovint s'ha substituït pel TC.</p>${range("0,03–0,22 mSv")}`,
  },
  rxExtremitats: {
    label: "Radiografia d'extremitats (mà, peu, genoll, espatlla…)",
    info: `<p>Les radiografies de braços i cames tenen molt poca dosi perquè no hi ha òrgans sensibles a prop.</p>${range("de menys de 0,001 a 0,01 mSv")}`,
  },
  dentalIntraoral: {
    label: "Radiografia dental petita (periapical o de mossegada)",
    info: `<p>Les plaques petites que es posen dins la boca. Compta cada sessió (per exemple, les 2–4 plaques d'una revisió).</p>${range("0,0003–0,01 mSv")}`,
  },
  dentalPanoramica: {
    label: "Radiografia panoràmica dental (ortopantomografia)",
    info: `<p>La imatge de tota la boca que es fa amb un aparell que gira al voltant del cap.</p>${range("0,007–0,09 mSv")}`,
  },
  dentalCbct: {
    label: "TAC dental 3D (CBCT)",
    info: `<p>Tomografia de feix cònic: dona imatges en 3D, per exemple abans d'un implant. La dosi varia molt segons l'aparell i la mida de la zona.</p>${range("0,005–1,1 mSv")}`,
  },
  mamografia: {
    label: "Mamografia",
    info: `<p>Cribratge o diagnòstic de càncer de mama (normalment dues imatges de cada mama; també tomosíntesi). En els programes de cribratge, el benefici de detectar un càncer a temps supera clarament el risc.</p>${range("0,02–0,6 mSv")}`,
  },
  densitometria: {
    label: "Densitometria òssia (DXA)",
    info: `<p>Mesura la densitat dels ossos per diagnosticar l'osteoporosi. Té una dosi molt baixa.</p>${range("0,001–0,035 mSv")}`,
  },
  tcCap: {
    label: "TC de cap",
    info: `<p>TAC cranial, per exemple després d'un cop o per estudiar mals de cap.</p>${range("0,3–4 mSv")}`,
  },
  tcColl: {
    label: "TC de coll",
    info: range("0,4–5,4 mSv"),
  },
  tcTorax: {
    label: "TC de tòrax",
    info: `<p>TAC dels pulmons i el tòrax.</p>${range("2–20 mSv")}`,
  },
  tcToraxBaixaDosi: {
    label: "TC de tòrax de baixa dosi (cribratge de pulmó)",
    info: `<p>Protocol especial per detectar el càncer de pulmó en persones de risc (per exemple, fumadors). Està dissenyat per donar 1 mSv o menys.</p>`,
  },
  tcAbdomen: {
    label: "TC d'abdomen (o d'abdomen i pelvis)",
    info: `<p>A Espanya la dosi mitjana és alta (uns 14 mSv) perquè sovint es fan diverses fases amb contrast. Internacionalment, una sola fase sol donar 8–11 mSv.</p><p>Si et van fer abdomen i pelvis alhora, compta només aquesta prova (no hi afegeixis «TC de pelvis»).</p>${range("2,6–29 mSv")}`,
  },
  tcPelvis: {
    label: "TC de pelvis",
    info: range("0,8–14,5 mSv"),
  },
  tcToracoabdominal: {
    label: "TC de tòrax, abdomen i pelvis",
    info: `<p>El TC «de tronc» que es fa sovint en el seguiment de càncers.</p>${range("2,4–50 mSv")}`,
  },
  tcColumna: {
    label: "TC de columna",
    info: range("1,5–16 mSv"),
  },
  tcCoronari: {
    label: "Angio-TC coronària (TAC de coronàries)",
    info: `<p>Estudia les artèries del cor amb contrast. Les màquines modernes han reduït molt la dosi, però hi ha grans diferències entre hospitals (fins a 37 vegades).</p>${range("1,5–9 mSv")}`,
  },
  fluoroEsofagogastroduodenal: {
    label: "Trànsit esofagogastroduodenal amb bari",
    info: `<p>Es beu un contrast de bari («papilla») i es fan imatges de l'esòfag i l'estómac.</p>${range("0,8–15 mSv")}`,
  },
  fluoroTransitIntestinal: {
    label: "Trànsit intestinal amb bari",
    info: range("0,6–25 mSv"),
  },
  fluoroEnemaOpac: {
    label: "Ènema opac",
    info: `<p>Estudi del còlon amb contrast de bari. Avui sovint s'ha substituït per la colonoscòpia o el TC.</p>${range("2,2–25 mSv")}`,
  },
  fluoroUrografia: {
    label: "Urografia intravenosa",
    info: `<p>Estudi dels ronyons i les vies urinàries amb contrast iodat a la vena.</p>${range("0,4–5,6 mSv")}`,
  },
  intCoronariografia: {
    label: "Coronariografia (cateterisme cardíac diagnòstic)",
    info: range("2–16 mSv"),
  },
  intAngioplastia: {
    label: "Angioplàstia coronària amb stent",
    info: `<p>Tractament per desobstruir una artèria del cor. Sovint evita una operació o tracta un infart, de manera que el benefici és molt més gran que el risc.</p>${range("4–57 mSv")}`,
  },
  intAltres: {
    label: "Altres procediments intervencionistes",
    info: `<p>Arteriografies, embolitzacions, drenatges… La dosi varia moltíssim d'un procediment a un altre (de 5 a més de 70 mSv); aquest és només un valor orientatiu.</p>`,
  },
  nmOssia: {
    label: "Gammagrafia òssia",
    info: range("3–6,3 mSv"),
  },
  nmPerfusioMiocardica: {
    label: "Gammagrafia de perfusió miocàrdica (SPECT cardíac)",
    info: `<p>Estudia el reg sanguini del cor en repòs i en esforç. Amb tal·li-201 (avui poc habitual) la dosi és molt més alta.</p>${range("9–13 mSv")}`,
  },
  nmPetTc: {
    label: "PET-TC",
    info: `<p>Combina un PET (amb un sucre radioactiu, FDG) i un TC. Molt útil en oncologia. La dosi depèn sobretot del TC que l'acompanya.</p>${range("11–41 mSv")}`,
  },
  nmTiroide: {
    label: "Gammagrafia de tiroide",
    info: range("2–4,8 mSv"),
  },
  nmParatiroides: {
    label: "Gammagrafia de paratiroides",
    info: range("6,3–6,7 mSv"),
  },
  nmPulmonar: {
    label: "Gammagrafia pulmonar (ventilació/perfusió)",
    info: `<p>Es fa sobretot per descartar una embòlia pulmonar.</p>${range("1,8–3 mSv")}`,
  },
  nmRenal: {
    label: "Estudi renal isotòpic (renograma o DMSA)",
    info: range("0,8–3,3 mSv"),
  },
  nmCervell: {
    label: "SPECT cerebral (DaTSCAN o perfusió)",
    info: range("4,5–6,9 mSv"),
  },
  nmLeucocits: {
    label: "Gammagrafia amb leucòcits marcats (infecció)",
    info: range("4,1–8,1 mSv"),
  },
  medKnownDose: {
    label: "Saps la dosi exacta d'alguna prova?",
    help: "Si a l'informe de l'hospital hi consta la <b>dosi efectiva en mSv</b> d'una prova que no és a la llista, escriu-la aquí. (Si l'informe dona mGy, mGy·cm o Gy·cm², no és dosi efectiva: no l'escriguis.)",
    unit: "mSv",
    placeholder: "0",
    info: `<p>Des del 2019, a Espanya les proves de radiologia i medicina nuclear han de deixar constància de la dosi a la història clínica (Reial Decret 601/2019). Sovint s'expressa en magnituds tècniques (com el producte dosi-longitud, en mGy·cm), que no són dosi efectiva.</p>`,
  },
};
