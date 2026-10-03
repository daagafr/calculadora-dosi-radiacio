// Bibliografia. Cada font té:
//   short    → etiqueta curta (es mostra en passar el ratolí per sobre de la cita)
//   citation → referència completa
//   url      → enllaç (comprovat durant la recerca; vegeu docs/fonts/)
// A la pàgina només apareixen les fonts que algú cita, numerades per ordre d'aparició.

export const SOURCES = {
  // --- Exposicions mèdiques -------------------------------------------------
  dopoes2: {
    short: "CSN – DOPOES II (2022)",
    citation:
      "Pastor Vega JM, Ruiz Cruces R, et al. Niveles de referencia de dosis (NRD) y estimación de dosis poblacional en España. Proyecto DOPOES II – Resumen ejecutivo. Consejo de Seguridad Nuclear – Universidad de Málaga, 2022 (dades de 2017). Taula 4.1.",
    url: "https://www.csn.es/documents/10182/2399922/Niveles%20de%20referencia%20de%20dosis%20(NRD)%20y%20%20estimaci%C3%B3n%20de%20Dosis%20Poblacional%20en%20%20Espa%C3%B1a%20(DOPOES%20II%20-%20Resumen%20ejecutivo)",
  },
  domnes: {
    short: "CSN – DOMNES (2014)",
    citation:
      "Consejo de Seguridad Nuclear, Ministerio de Sanidad, SEMNIM. Proyecto DOMNES: prospección nacional de procedimientos de diagnóstico en medicina nuclear. Estimación de dosis recibidas por los pacientes y la población. CSN, 2014 (dades de 2011). Taula 9.",
    url: "https://www.csn.es/documents/10182/1006281/Proyecto%20DOMNES.%20Prospecci%C3%B3n%20nacional%20de%20procedimientos%20de%20diagn%C3%B3stico%20en%20medicina%20nuclear%20utilizados%20en%20los%20centros%20sanitarios%20espa%C3%B1oles.%20Estimaci%C3%B3n%20de%20dosis%20recibidas%20por%20los%20pacientes%20y%20la%20poblaci%C3%B3n",
  },
  "ec-rp180": {
    short: "Comissió Europea – RP 180 (2014)",
    citation:
      "European Commission. Radiation Protection No 180: Medical Radiation Exposure of the European Population, Part 1/2. Luxemburg, 2014. Taules 5.10–5.14, 5.33, 5.37–5.38.",
    url: "https://www.eurosafeimaging.org/wp/wp-content/uploads/2015/05/Radiation-Protection-180.pdf",
  },
  "ec-rp180-2": {
    short: "Comissió Europea – RP 180, part 2 (2014)",
    citation:
      "European Commission. Radiation Protection No 180: Diagnostic Reference Levels in Thirty-six European Countries, Part 2/2. Luxemburg, 2014. Pròleg.",
    url: "https://eurosafeimaging.org/wp/wp-content/uploads/2015/05/Radiation-protection-180-part2.pdf",
  },
  mettler2008: {
    short: "Mettler et al., Radiology (2008)",
    citation:
      "Mettler FA Jr, Huda W, Yoshizumi TT, Mahesh M. Effective doses in radiology and diagnostic nuclear medicine: a catalog. Radiology 2008;248(1):254–263. doi:10.1148/radiol.2481071451.",
    url: "https://pubs.rsna.org/doi/10.1148/radiol.2481071451",
  },
  radiologyinfo: {
    short: "RadiologyInfo.org (ACR/RSNA, 2025)",
    citation: "American College of Radiology, RSNA. Radiation Dose (RadiologyInfo.org). Revisat el 15/04/2025.",
    url: "https://www.radiologyinfo.org/en/info/safety-xray",
  },
  mahesh2023: {
    short: "Mahesh et al., Radiology (2023)",
    citation:
      "Mahesh M, Ansari AJ, Mettler FA Jr. Patient exposure from radiologic and nuclear medicine procedures in the United States and worldwide: 2009–2018. Radiology 2023;307(1):e221263. doi:10.1148/radiol.221263.",
    url: "https://pubs.rsna.org/doi/10.1148/radiol.221263",
  },
  "marti-climent2017": {
    short: "Martí-Climent et al., EJNMMI Res (2017)",
    citation:
      "Martí-Climent JM, Prieto E, Morán V, et al. Effective dose estimation for oncological and neurological PET/CT procedures. EJNMMI Research 2017;7:37. doi:10.1186/s13550-017-0272-5.",
    url: "https://europepmc.org/article/PMC/PMC5403773",
  },
  stocker2018: {
    short: "Stocker et al., Eur Heart J (2018)",
    citation:
      "Stocker TJ, Deseive S, Leipsic J, et al. Reduction in radiation exposure in cardiovascular computed tomography imaging: results from the PROTECTION VI registry. Eur Heart J 2018;39(41):3715–3723. doi:10.1093/eurheartj/ehy546.",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6455904",
  },
  revel2025: {
    short: "ESTI – cribratge amb TC de baixa dosi (2025)",
    citation:
      "Revel MP, Biederer J, Nair A, et al. ESR Essentials: lung cancer screening with low-dose CT – practice recommendations by the European Society of Thoracic Imaging. Eur Radiol 2026 (en línia 2025). doi:10.1007/s00330-025-11910-9.",
    url: "https://doi.org/10.1007/s00330-025-11910-9",
  },
  benavides2024: {
    short: "Benavides et al., JADA (2024)",
    citation:
      "Benavides E, Krecioch JR, Connolly RT, et al. Optimizing radiation safety in dentistry. J Am Dent Assoc 2024;155(4):280–293. doi:10.1016/j.adaj.2023.12.002. Taula 1.",
    url: "https://doi.org/10.1016/j.adaj.2023.12.002",
  },
  ludlow2015: {
    short: "Ludlow et al., DMFR (2015)",
    citation:
      "Ludlow JB, Timothy R, Walker C, et al. Effective dose of dental CBCT – a meta analysis of published data and additional data for nine CBCT units. Dentomaxillofac Radiol 2015;44(1):20140197. doi:10.1259/dmfr.20140197.",
    url: "https://doi.org/10.1259/dmfr.20140197",
  },
  hpa2009: {
    short: "HPA/RCR/CoR – embarassades (2009)",
    citation:
      "Health Protection Agency, The Royal College of Radiologists, College of Radiographers. Protection of Pregnant Patients during Diagnostic Medical Exposures to Ionising Radiation (RCE-9). 2009.",
    url: "https://www.ipem.ac.uk/media/0ympgwl2/protection-of-pregnant-patients.pdf",
  },
  icrp84: {
    short: "ICRP 84 (2000)",
    citation: "ICRP. Pregnancy and Medical Radiation. ICRP Publication 84. Ann. ICRP 30(1), 2000.",
    url: "https://www.icrp.org/publication.asp?id=ICRP%20Publication%2084",
  },
  icrp105: {
    short: "ICRP 105 (2007)",
    citation: "ICRP. Radiological Protection in Medicine. ICRP Publication 105. Ann. ICRP 37(6), 2007.",
    url: "https://www.icrp.org/publication.asp?id=ICRP%20Publication%20105",
  },
  "rd601-2019": {
    short: "Reial Decret 601/2019",
    citation:
      "Real Decreto 601/2019, de 18 de octubre, sobre justificación y optimización del uso de las radiaciones ionizantes para la protección radiológica de las personas con ocasión de exposiciones médicas. BOE-A-2019-15604.",
    url: "https://www.boe.es/buscar/act.php?id=BOE-A-2019-15604",
  },
  "csn-dosis2010": {
    short: "CSN – fullet «Dosis de radiación» (2010)",
    citation: "Consejo de Seguridad Nuclear. Dosis de radiación (fullet divulgatiu SDB-04.07). Madrid, 2010.",
    url: "https://www.csn.es/documents/10182/914805/Dosis%20de%20radiaci%C3%B3n",
  },

  // --- Fonts naturals ----------------------------------------------------------
  "unscear2000-a": {
    short: "UNSCEAR 2000, Annex A",
    citation:
      "UNSCEAR. Sources and Effects of Ionizing Radiation. UNSCEAR 2000 Report, Vol. I, Annex A: Dose assessment methodologies. Nacions Unides, Nova York, 2000. §45–59, eq. 12–14.",
    url: "https://www.unscear.org/unscear/uploads/documents/publications/UNSCEAR_2000_Annex-A.pdf",
  },
  "unscear2000-b": {
    short: "UNSCEAR 2000, Annex B",
    citation:
      "UNSCEAR. UNSCEAR 2000 Report, Vol. I, Annex B: Exposures from natural radiation sources. Nacions Unides, Nova York, 2000. Taules 7, 24 i 31.",
    url: "https://www.unscear.org/unscear/uploads/documents/publications/UNSCEAR_2000_Annex-B.pdf",
  },
  unscear2008: {
    short: "UNSCEAR 2008, Vol. I",
    citation:
      "UNSCEAR. Sources and Effects of Ionizing Radiation. UNSCEAR 2008 Report to the General Assembly, Vol. I. Nacions Unides, Nova York, 2010. Taula 1.",
    url: "https://www.unscear.org/unscear/uploads/documents/unscear-reports/UNSCEAR_2008_Report_Vol.I-CORR.pdf",
  },
  "unscear2008-b": {
    short: "UNSCEAR 2008, Annex B",
    citation:
      "UNSCEAR. UNSCEAR 2008 Report, Vol. I, Annex B: Exposures of the public and workers from various sources of radiation. Nacions Unides, Nova York, 2010. §68, 95, 225–233, 412.",
    url: "https://www.unscear.org/unscear/uploads/documents/publications/UNSCEAR_2008_Annex-B-CORR2.pdf",
  },
  "unscear2019-b": {
    short: "UNSCEAR 2019, Annex B (radó)",
    citation:
      "UNSCEAR. Sources, Effects and Risks of Ionizing Radiation. UNSCEAR 2019 Report, Annex B: Lung cancer from exposure to radon. Nacions Unides, Nova York, 2020. §190–191.",
    url: "https://www.unscear.org/unscear/uploads/documents/publications/UNSCEAR_2019_Annex-B.pdf",
  },
  "unscear2020-a": {
    short: "UNSCEAR 2020/2021, Annex A",
    citation:
      "UNSCEAR. Sources, Effects and Risks of Ionizing Radiation. UNSCEAR 2020/2021 Report, Vol. I, Annex A: Evaluation of medical exposure to ionizing radiation. Nacions Unides, Nova York, 2022.",
    url: "https://www.unscear.org/unscear/uploads/documents/unscear-reports/UNSCEAR_2020_21_Report_Vol.I.pdf",
  },
  "unscear2020-d": {
    short: "UNSCEAR 2020/2021, Annex D (treballadors)",
    citation:
      "UNSCEAR. UNSCEAR 2020/2021 Report, Vol. IV, Annex D: Evaluation of occupational exposure to ionizing radiation. Nacions Unides, Nova York, 2022. Taula 2, §106–108.",
    url: "https://www.unscear.org/unscear/en/publications/2020_2021_4.html",
  },
  marna2000: {
    short: "CSN – Projecte MARNA (2000)",
    citation:
      "Suárez Mahou E, Fernández Amigot JÁ, Baeza Espasa A, et al. Proyecto MARNA. Mapa de radiación gamma natural. CSN, Colección Informes Técnicos INT-04.02, 2000. Taula 4.37 (mitjanes provincials).",
    url: "https://www.csn.es/documents/10182/27786/INT-04-02+Proyecto+Marna.+Mapa+de+radiaci%C3%B3n+gamma+natural/6185a9df-6c24-4ac1-8d8d-197003e09401",
  },
  eanr2019: {
    short: "Atles Europeu de Radiació Natural (2019)",
    citation:
      "Cinelli G, De Cort M, Tollefsen T (eds.). European Atlas of Natural Radiation. Publications Office of the European Union, Luxemburg, 2019. Capítols 8 i 9 (taula 9-2, Espanya). doi:10.2760/520053.",
    url: "https://remon.jrc.ec.europa.eu/About/Atlas-of-Natural-Radiation",
  },
  arnedo2017: {
    short: "Arnedo et al. (2017), Canàries orientals",
    citation:
      "Arnedo MA, Rubiano JG, Alonso H, et al. Mapping natural radioactivity of soils in the eastern Canary Islands. J Environ Radioact 2017;166:242–258. doi:10.1016/j.jenvrad.2016.07.010.",
    url: "https://doi.org/10.1016/j.jenvrad.2016.07.010",
  },
  martinluis2021: {
    short: "Martín Luis et al. (2021), Canàries occidentals",
    citation:
      "Martín Luis MC, López Pérez M, Hernández F, et al. Natural and artificial gamma-emitting radionuclides in volcanic soils of the Western Canary Islands. J Geochem Explor 2021;229:106840. doi:10.1016/j.gexplo.2021.106840.",
    url: "https://doi.org/10.1016/j.gexplo.2021.106840",
  },
  "csn-radon2019": {
    short: "CSN – Cartografia del potencial de radó (2019)",
    citation:
      "García-Talavera San Miguel M, López Acevedo FJ. Cartografía del potencial de radón de España. CSN, Colección Informes Técnicos INT-04.41, 2019. Taula 3.",
    url: "https://www.csn.es/documents/10182/27786/INT-04.41+Cartograf%C3%ADa+del+potencial+de+rad%C3%B3n+de+Espa%C3%B1a",
  },
  "csn-radon-map": {
    short: "CSN – Mapa del potencial de radó",
    citation: "Consejo de Seguridad Nuclear. Mapa del Potencial de Radón de España (CSN, 2017). Visor web.",
    url: "https://www.csn.es/mapa-del-potencial-de-radon-en-espana",
  },
  "csn-radon-faq": {
    short: "CSN – Preguntes freqüents sobre el radó",
    citation: "Consejo de Seguridad Nuclear. Preguntas frecuentes sobre el radón en viviendas.",
    url: "https://www.csn.es/preguntas-frecuentes-sobre-el-radon-en-viviendas",
  },
  icrp137: {
    short: "ICRP 137 (2017)",
    citation: "ICRP. Occupational Intakes of Radionuclides: Part 3. ICRP Publication 137. Ann. ICRP 46(3/4), 2017.",
    url: "https://www.icrp.org/publication.asp?id=ICRP%20Publication%20137",
  },
  "who-radon2023": {
    short: "OMS – Radó (2023)",
    citation: "Organització Mundial de la Salut. Radon and health. Fact sheet, 25/01/2023.",
    url: "https://www.who.int/news-room/fact-sheets/detail/radon-and-health",
  },
  "rd1029-2022": {
    short: "Reial Decret 1029/2022",
    citation:
      "Real Decreto 1029/2022, de 20 de diciembre, por el que se aprueba el Reglamento sobre protección de la salud contra los riesgos derivados de la exposición a las radiaciones ionizantes. BOE-A-2022-21682. Arts. 11, 15, 22, 72, 81.",
    url: "https://www.boe.es/buscar/act.php?id=BOE-A-2022-21682",
  },
  "cte-hs6": {
    short: "Codi Tècnic de l'Edificació, DB HS6",
    citation:
      "Real Decreto 732/2019, de 20 de diciembre, por el que se modifica el Código Técnico de la Edificación (DB HS6 «Protección frente a la exposición al radón»). BOE-A-2019-18528.",
    url: "https://www.boe.es/buscar/act.php?id=BOE-A-2019-18528",
  },

  // --- Viatges, estil de vida, treball i referències ----------------------------
  ncrp160: {
    short: "NCRP Report 160 (2009)",
    citation:
      "NCRP. Ionizing Radiation Exposure of the Population of the United States. NCRP Report No. 160, 2009 (resum: Kase KR et al., HPS/AAHP 2009, diapositives 32–40).",
    url: "https://www.aahp-abhp.org/wp-content/uploads/2009/09/2009-NCRP_Radiation.pdf",
  },
  faa2003: {
    short: "FAA – dosis en vols (CARI-6)",
    citation:
      "Friedberg W, Copeland K. What Aircrews Should Know About Their Occupational Exposure to Ionizing Radiation. DOT/FAA/AM-03/16. Federal Aviation Administration, 2003. Taula 2.",
    url: "https://rosap.ntl.bts.gov/view/dot/57947/dot_57947_DS1.pdf",
  },
  "csn-informe2023": {
    short: "CSN – Informe anual 2023",
    citation:
      "Consejo de Seguridad Nuclear. Informe del Consejo de Seguridad Nuclear al Congreso de los Diputados y al Senado. Año 2023 (resum). §5.1, taula 5.1.1; §5.2.",
    url: "https://www.csn.es/documents/10182/13529/Informe%20anual%202023%20(resumen)",
  },
  bfs2025: {
    short: "BfS – exposició laboral a Alemanya (2025)",
    citation:
      "Bundesamt für Strahlenschutz. Die berufliche Strahlenexposition in Deutschland 2023 – Bericht des Strahlenschutzregisters (BfS-65/25), 2025.",
    url: "https://doris.bfs.de/jspui/bitstream/urn:nbn:de:0221-2025012349849/1/65-25_SSR-Bericht-2023.pdf",
  },
  "eu-scanners": {
    short: "Reglament (UE) 1147/2011 (escàners)",
    citation:
      "Reglament d'Execució (UE) núm. 1147/2011 de la Comissió, sobre l'ús d'escàners de seguretat als aeroports de la UE (incorporat al Reglament (UE) 2015/1998).",
    url: "https://transport.ec.europa.eu/transport-modes/air/aviation-security/aviation-security-policy/security-scanners_en",
  },
  icrp103: {
    short: "ICRP 103 (2007)",
    citation:
      "ICRP. Las Recomendaciones 2007 de la Comisión Internacional de Protección Radiológica. Publicación 103 (ed. castellana, SEPR). Ann. ICRP 37(2–4), 2007. §35, 60–66, 83, 105, 161.",
    url: "https://icrp.org/docs/P103_Spanish.pdf",
  },
  icrp119: {
    short: "ICRP 119 (2012)",
    citation:
      "ICRP. Compendium of Dose Coefficients based on ICRP Publication 60. ICRP Publication 119. Ann. ICRP 41(Suppl.), 2012. Taula F.1.",
    url: "https://www.icrp.org/publication.asp?id=ICRP%20Publication%20119",
  },
  "usda-banana": {
    short: "USDA FoodData Central – plàtan",
    citation: "USDA Agricultural Research Service. FoodData Central, SR Legacy 173944 «Bananas, raw» (potassi: 358 mg/100 g).",
    url: "https://fdc.nal.usda.gov/food-details/173944/nutrients",
  },
  beir7: {
    short: "BEIR VII (2006)",
    citation:
      "National Research Council. Health Risks from Exposure to Low Levels of Ionizing Radiation: BEIR VII Phase 2 – Report in Brief. National Academies Press, 2006.",
    url: "https://nap.nationalacademies.org/resource/11340/beir_vii_final.pdf",
  },
  "hps-risk": {
    short: "Health Physics Society – PS010-4 (2019)",
    citation: "Health Physics Society. Radiation Risk in Perspective. Position Statement PS010-4, 2019.",
    url: "https://hps.org/wp-content/uploads/2024/12/radiationrisk.pdf",
  },
  "cdc-ars": {
    short: "CDC – síndrome d'irradiació aguda",
    citation: "Centers for Disease Control and Prevention. Acute Radiation Syndrome: Information for Clinicians (revisat el 23/04/2024).",
    url: "https://www.cdc.gov/radiation-emergencies/hcp/clinical-guidance/ars.html",
  },
  "who-ionizing2023": {
    short: "OMS – radiació ionitzant (2023)",
    citation: "Organització Mundial de la Salut. Ionizing radiation and health effects. Fact sheet, 27/07/2023.",
    url: "https://www.who.int/news-room/fact-sheets/detail/ionizing-radiation-and-health-effects",
  },
  hendry2009: {
    short: "Hendry et al., J Radiol Prot (2009)",
    citation:
      "Hendry JH, Simon SL, Wojcik A, et al. Human exposure to high natural background radiation: what can it teach us about radiation risks? J Radiol Prot 2009;29(2A):A29–A42. doi:10.1088/0952-4746/29/2A/S03.",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4030667/",
  },
  richardson2023: {
    short: "Richardson et al. – INWORKS, BMJ (2023)",
    citation:
      "Richardson DB, Leuraud K, Laurier D, et al. Cancer mortality after low dose exposure to ionising radiation in workers in France, the United Kingdom, and the United States (INWORKS): cohort study. BMJ 2023;382:e074520.",
    url: "https://doi.org/10.1136/bmj-2022-074520",
  },
  karipidis2024: {
    short: "Karipidis et al., Environ Int (2024)",
    citation:
      "Karipidis K, et al. The effect of exposure to radiofrequency fields on cancer risk in the general and working population: a systematic review of human observational studies – Part I. Environment International 2024;191:108983.",
    url: "https://doi.org/10.1016/j.envint.2024.108983",
  },
  "epa-granite": {
    short: "US EPA – taulells de granit",
    citation: "US Environmental Protection Agency. Granite Countertops and Radiation (actualitzat el 14/02/2024).",
    url: "https://19january2025snapshot.epa.gov/radiation/granite-countertops-and-radiation",
  },
};
