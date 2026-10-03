// Radiació mèdica: dosi efectiva típica per prova en un adult (mSv).
// Prioritat de fonts: estudis espanyols del CSN (DOPOES II per a raigs X i TC,
// DOMNES per a medicina nuclear) → EC RP 180 → Mettler 2008.
// Detall i justificació de cada valor: docs/fonts/02-fonts-mediques.md

const exam = (group, id, perUnit, sources) => ({ id, type: "count", group, perUnit, max: 50, sources });

export default {
  id: "medical",
  searchable: true,
  sources: ["dopoes2", "domnes", "ec-rp180"],
  questions: [
    // Radiografia convencional
    exam("med-xray", "rxTorax", 0.04, ["dopoes2", "ec-rp180", "mettler2008"]),
    exam("med-xray", "rxColumnaCervicalDorsal", 0.2, ["dopoes2", "ec-rp180", "mettler2008"]),
    exam("med-xray", "rxColumnaLumbar", 1.8, ["dopoes2", "ec-rp180", "mettler2008"]),
    exam("med-xray", "rxAbdomen", 0.8, ["dopoes2", "ec-rp180", "mettler2008"]),
    exam("med-xray", "rxPelvisMaluc", 0.4, ["dopoes2", "ec-rp180", "mettler2008"]),
    exam("med-xray", "rxCrani", 0.1, ["mettler2008"]),
    exam("med-xray", "rxExtremitats", 0.005, ["mettler2008", "radiologyinfo"]),

    // Dental
    exam("med-dental", "dentalIntraoral", 0.005, ["mettler2008", "benavides2024"]),
    exam("med-dental", "dentalPanoramica", 0.02, ["benavides2024", "mettler2008"]),
    exam("med-dental", "dentalCbct", 0.1, ["ludlow2015", "benavides2024"]),

    // Mamografia i densitometria
    exam("med-mammo", "mamografia", 0.25, ["dopoes2", "ec-rp180", "radiologyinfo"]),
    exam("med-mammo", "densitometria", 0.001, ["mettler2008", "radiologyinfo"]),

    // TC (escàner)
    exam("med-ct", "tcCap", 2.0, ["dopoes2", "ec-rp180", "mettler2008"]),
    exam("med-ct", "tcColl", 3.5, ["dopoes2", "ec-rp180"]),
    exam("med-ct", "tcTorax", 8.0, ["dopoes2", "ec-rp180", "mettler2008"]),
    exam("med-ct", "tcToraxBaixaDosi", 1, ["revel2025"]),
    exam("med-ct", "tcAbdomen", 14, ["dopoes2", "ec-rp180", "mettler2008"]),
    exam("med-ct", "tcPelvis", 8.8, ["dopoes2", "ec-rp180"]),
    exam("med-ct", "tcToracoabdominal", 16, ["dopoes2", "ec-rp180"]),
    exam("med-ct", "tcColumna", 11, ["dopoes2", "ec-rp180", "mettler2008"]),
    exam("med-ct", "tcCoronari", 4, ["stocker2018", "radiologyinfo"]),

    // Proves amb contrast (fluoroscòpia)
    exam("med-fluoro", "fluoroEsofagogastroduodenal", 4.7, ["dopoes2", "ec-rp180", "mettler2008"]),
    exam("med-fluoro", "fluoroTransitIntestinal", 9.3, ["dopoes2", "ec-rp180"]),
    exam("med-fluoro", "fluoroEnemaOpac", 8.5, ["dopoes2", "ec-rp180", "mettler2008"]),
    exam("med-fluoro", "fluoroUrografia", 1.9, ["dopoes2", "ec-rp180"]),

    // Intervencionisme
    exam("med-interv", "intCoronariografia", 7.6, ["dopoes2", "ec-rp180", "mettler2008"]),
    exam("med-interv", "intAngioplastia", 17, ["dopoes2", "ec-rp180", "mettler2008"]),
    exam("med-interv", "intAltres", 7, ["dopoes2", "mettler2008"]),

    // Medicina nuclear
    exam("med-nuclear", "nmOssia", 4.4, ["domnes", "ec-rp180", "mettler2008"]),
    exam("med-nuclear", "nmPerfusioMiocardica", 11, ["domnes", "mettler2008"]),
    exam("med-nuclear", "nmPetTc", 16, ["marti-climent2017", "domnes"]),
    exam("med-nuclear", "nmTiroide", 2.8, ["domnes", "ec-rp180", "mettler2008"]),
    exam("med-nuclear", "nmParatiroides", 6.3, ["domnes", "mettler2008"]),
    exam("med-nuclear", "nmPulmonar", 2.5, ["domnes", "ec-rp180"]),
    exam("med-nuclear", "nmRenal", 1.2, ["domnes", "ec-rp180", "mettler2008"]),
    exam("med-nuclear", "nmCervell", 5, ["domnes", "mettler2008"]),
    exam("med-nuclear", "nmLeucocits", 4.1, ["domnes", "mettler2008"]),

    // Dosi coneguda (de l'informe dosimètric de l'hospital)
    { id: "medKnownDose", type: "number", factor: 1, max: 500, step: 0.01, sources: ["rd601-2019"] },
  ],
};
