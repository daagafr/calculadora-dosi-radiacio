$(document).ready(function () {
  var $opcionSi = $("#siMed");
  var $opcionNo = $("#noMed");
  var $siMedDiv = $("#siMedDiv");

  function toggleMedYes() {
    $siMedDiv.toggle($opcionSi.prop("checked"));
  }

  $opcionSi.change(toggleMedYes);
  $opcionNo.change(toggleMedYes);

  toggleMedYes();

  function toggleXrayInput($checkbox, $input) {
    $input.toggle($checkbox.prop("checked"));
  }

  var $radiografiaCheckbox = $("#medicalexams_0");
  var $radiografiaInput = $("#radiografia");

  toggleXrayInput($radiografiaCheckbox, $radiografiaInput);
  $radiografiaCheckbox.change(function () {
    toggleXrayInput($radiografiaCheckbox, $radiografiaInput);
  });

  var xray = [
    { checkbox: $("#skull1"), input: $("#skull1input") },
    { checkbox: $("#skull2"), input: $("#skull2input") },
    { checkbox: $("#chest1"), input: $("#chest1input") },
    { checkbox: $("#chest2"), input: $("#chest2input") },
    { checkbox: $("#chest3"), input: $("#chest3input") },
    { checkbox: $("#dor1"), input: $("#dor1input") },
    { checkbox: $("#dor2"), input: $("#dor2input") },
    { checkbox: $("#lumb1"), input: $("#lumb1input") },
    { checkbox: $("#lumb2"), input: $("#lumb2input") },
    { checkbox: $("#ab1"), input: $("#ab1input") },
    { checkbox: $("#ab2"), input: $("#ab2input") },
    { checkbox: $("#pelv1"), input: $("#pelv1input") },
    { checkbox: $("#pelv2"), input: $("#pelv2input") },
    { checkbox: $("#bite"), input: $("#biteinput") },
    { checkbox: $("#joints"), input: $("#jointsinput") },
  ];

  xray.forEach(function (xray) {
    toggleXrayInput(xray.checkbox, xray.input);
    xray.checkbox.change(function () {
      toggleXrayInput(xray.checkbox, xray.input);
    });
  });

  function toggleProceduresInput($checkbox, $input) {
    $input.toggle($checkbox.prop("checked"));
  }

  var $proceduresCheckbox = $("#medicalexams_1");
  var $proceduresInput = $("#procedures");

  toggleProceduresInput($proceduresCheckbox, $proceduresInput);
  $proceduresCheckbox.change(function () {
    toggleProceduresInput($proceduresCheckbox, $proceduresInput);
  });

  var procedures = [
    { checkbox: $("#piv"), input: $("#pivinput") },
    { checkbox: $("#eso"), input: $("#esoinput") },
    { checkbox: $("#far"), input: $("#farinput") },
    { checkbox: $("#far2"), input: $("#far2input") },
    { checkbox: $("#en"), input: $("#eninput") },
    { checkbox: $("#ctcap"), input: $("#ctcapinput") },
    { checkbox: $("#cttor"), input: $("#cttorinput") },
    { checkbox: $("#ctab"), input: $("#ctabinput") },
    { checkbox: $("#ctpel"), input: $("#ctpelinput") },
    { checkbox: $("#ctcaptor"), input: $("#ctcaptorinput") },
    { checkbox: $("#ptca"), input: $("#ptcainput") },
    { checkbox: $("#ang"), input: $("#anginput") },
    { checkbox: $("#mam"), input: $("#maminput") },
    { checkbox: $("#lumb3"), input: $("#lumb3input") },
    { checkbox: $("#tora"), input: $("#torainput") },
    { checkbox: $("#cer"), input: $("#cerinput") },
  ];

  procedures.forEach(function (procedures) {
    toggleProceduresInput(procedures.checkbox, procedures.input);
    procedures.checkbox.change(function () {
      toggleProceduresInput(procedures.checkbox, procedures.input);
    });
  });

  function toggleExamInput($checkbox, $input) {
    $input.toggle($checkbox.prop("checked"));
  }

  var $examCheckbox = $("#medicalexams_2");
  var $examInput = $("#exam");

  toggleExamInput($examCheckbox, $examInput);
  $examCheckbox.change(function () {
    toggleExamInput($examCheckbox, $examInput);
  });

  var exam = [
    { checkbox: $("#brain"), input: $("#braininput") },
    { checkbox: $("#hep"), input: $("#hepinput") },
    { checkbox: $("#os"), input: $("#osinput") },
    { checkbox: $("#gpvp"), input: $("#gpvpinput") },
    { checkbox: $("#ren1"), input: $("#ren1input") },
    { checkbox: $("#ren2"), input: $("#ren2input") },
    { checkbox: $("#tumga"), input: $("#tumgainput") },
    { checkbox: $("#cor1"), input: $("#cor1input") },
    { checkbox: $("#cor2"), input: $("#cor2input") },
    { checkbox: $("#cor3"), input: $("#cor3input") },
    { checkbox: $("#cor4"), input: $("#cor4input") },
    { checkbox: $("#div"), input: $("#divinput") },
  ];

  exam.forEach(function (exam) {
    toggleExamInput(exam.checkbox, exam.input);
    exam.checkbox.change(function () {
      toggleExamInput(exam.checkbox, exam.input);
    });
  });

  function toggleFetusExamInput($checkbox, $input) {
    $input.toggle($checkbox.prop("checked"));
  }

  var $fetusexamCheckbox = $("#medicalexams_3");
  var $fetusexamInput = $("#fetusexam");

  toggleFetusExamInput($fetusexamCheckbox, $fetusexamInput);
  $fetusexamCheckbox.change(function () {
    toggleFetusExamInput($fetusexamCheckbox, $fetusexamInput);
  });

  var fetusexam = [
    { checkbox: $("#os2"), input: $("#os2input") },
    { checkbox: $("#pp"), input: $("#ppinput") },
    { checkbox: $("#tir"), input: $("#tirinput") },
    { checkbox: $("#tum"), input: $("#tuminput") },
    { checkbox: $("#vp"), input: $("#vpinput") },
    { checkbox: $("#cor5"), input: $("#cor5input") },
    { checkbox: $("#ren3"), input: $("#ren3input") },
    { checkbox: $("#ren4"), input: $("#ren4input") },
    { checkbox: $("#fet"), input: $("#fetinput") },
    { checkbox: $("#inf1"), input: $("#inf1input") },
    { checkbox: $("#inf2"), input: $("#inf2input") },
    { checkbox: $("#mel"), input: $("#melinput") },
    { checkbox: $("#braintir"), input: $("#braintirinput") },
    { checkbox: $("#flux"), input: $("#fluxinput") },
  ];

  fetusexam.forEach(function (fetusexam) {
    toggleFetusExamInput(fetusexam.checkbox, fetusexam.input);
    fetusexam.checkbox.change(function () {
      toggleFetusExamInput(fetusexam.checkbox, fetusexam.input);
    });
  });

  function toggleXrayInput($checkbox, $input) {
    $input.toggle($checkbox.prop("checked"));
  }

  var $radiografiaCheckbox = $("#medicalexams_0");
  var $radiografiaInput = $("#radiografia");

  toggleXrayInput($radiografiaCheckbox, $radiografiaInput);
  $radiografiaCheckbox.change(function () {
    toggleXrayInput($radiografiaCheckbox, $radiografiaInput);
  });

  var xray = [
    { checkbox: $("#skull1"), input: $("#skull1input") },
    { checkbox: $("#skull2"), input: $("#skull2input") },
    { checkbox: $("#chest1"), input: $("#chest1input") },
    { checkbox: $("#chest2"), input: $("#chest2input") },
    { checkbox: $("#chest3"), input: $("#chest3input") },
    { checkbox: $("#dor1"), input: $("#dor1input") },
    { checkbox: $("#dor2"), input: $("#dor2input") },
    { checkbox: $("#lumb1"), input: $("#lumb1input") },
    { checkbox: $("#lumb2"), input: $("#lumb2input") },
    { checkbox: $("#ab1"), input: $("#ab1input") },
    { checkbox: $("#ab2"), input: $("#ab2input") },
    { checkbox: $("#pelv1"), input: $("#pelv1input") },
    { checkbox: $("#pelv2"), input: $("#pelv2input") },
    { checkbox: $("#bite"), input: $("#biteinput") },
    { checkbox: $("#joints"), input: $("#jointsinput") },
  ];

  xray.forEach(function (xray) {
    toggleXrayInput(xray.checkbox, xray.input);
    xray.checkbox.change(function () {
      toggleXrayInput(xray.checkbox, xray.input);
    });
  });

  function togglePregXrayInput($checkbox, $input) {
    $input.toggle($checkbox.prop("checked"));
  }

  var $pregexamCheckbox = $("#medicalexams_4");
  var $pregexamInput = $("#pregexam");

  togglePregXrayInput($pregexamCheckbox, $pregexamInput);
  $pregexamCheckbox.change(function () {
    togglePregXrayInput($pregexamCheckbox, $pregexamInput);
  });

  var pregexam = [
    { checkbox: $("#pelv3"), input: $("#pelv3input") },
    { checkbox: $("#pelv4"), input: $("#pelv4input") },
    { checkbox: $("#pelv5"), input: $("#pelv5input") },
    { checkbox: $("#dor3"), input: $("#dor3input") },
    { checkbox: $("#dor4"), input: $("#dor4input") },
    { checkbox: $("#dor5"), input: $("#dor5input") },
    { checkbox: $("#lumb4"), input: $("#lumb4input") },
    { checkbox: $("#lumb5"), input: $("#lumb5input") },
  ];

  pregexam.forEach(function (pregexam) {
    togglePregXrayInput(pregexam.checkbox, pregexam.input);
    pregexam.checkbox.change(function () {
      togglePregXrayInput(pregexam.checkbox, pregexam.input);
    });
  });
});

//Càlcul radiació mèdica

var medrads = 0;

function getMedRad() {
  var multiplierMap = {
    skull1num: 0.03,
    skull2num: 0.01,
    chest1num: 0.02,
    chest2num: 0.04,
    chest3num: 0.06,
    dor1num: 0.4,
    dor2num: 0.3,
    lumb1num: 0.7,
    lumb2num: 0.3,
    ab1num: 0.7,
    ab2num: 0.53,
    pelv1num: 0.7,
    pelv2num: 0.83,
    bitenum: 0.004,
    jointsnum: 0.06,
    pivnum: 0.06,
    esonum: 1.5,
    farnum: 3,
    far2num: 3,
    ennum: 7,
    ctcapnum: 2,
    cttornum: 8,
    ctabnum: 10,
    ctpelnum: 10,
    ctcaptornum: 11,
    ptcanum: 7.5,
    angnum: 4.6,
    mamnum: 0.13,
    lumb3num: 1.8,
    toranum: 1.4,
    cernum: 0.27,
    brainnum: 0.5,
    hepnum: 0.05,
    osnum: 4.22,
    hepnum: 0.05,
    osnum: 4.22,
    hepnum: 0.05,
    osnum: 4.22,
    hepnum: 0.05,
    osnum: 4.22,
    hepnum: 0.05,
    osnum: 4.22,
    hepnum: 0.05,
    osnum: 4.22,
    gpvpnum: 2.3,
    ren1num: 3.63,
    ren2num: 5.2,
    tumganum: 10,
    cor1num: 9.9,
    cor2num: 14.3,
    cor3num: 10.36,
    cor4num: 7.56,
    divnum: 7,

    os2num: 4.6,
    tirnum: 0.6,
    tumnum: 18,
    ppnum: 0.56,
    vpnum: 7,
    cor5num: 5.3,
    ren3num: 14,
    ren4num: 9,
    braintirnum: 12,
    fetnum: 6,
    inf1num: 0.76,
    inf2num: 2.6,
    fluxnum: 6,
    melnum: 0.54,

    pelv3num: 1.44,
    pelv4num: 0.4,
    pelv5num: 0.53,
    dor3num: 0.018,
    dor4num: 0.012,
    dor5num: 0.006,
    lumb4num: 2.25,
    lumb5num: 1.13,
  };

  $.each(multiplierMap, function (id, multiplier) {
    if ($("#" + id.replace("num", "")).prop("checked")) {
      var currentValue = parseFloat($("#" + id).val()) || 0;
      var previousValue = parseFloat($("#" + id).data("previousValue")) || 0;
      medrads += (currentValue - previousValue) * multiplier;
      $("#" + id).data("previousValue", currentValue);
    }
  });

  RadDose();
  updateChartData();
}
