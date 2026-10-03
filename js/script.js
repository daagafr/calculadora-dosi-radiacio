document.addEventListener("DOMContentLoaded", function () {
  var siRadon = document.getElementById("siRadon");
  var noRadon = document.getElementById("noRadon");
  var radonDiv = document.getElementById("radonDiv");

  function toggleradon() {
    if (noRadon.checked) {
      radonDiv.style.display = "none";
    } else {
      radonDiv.style.display = "block";
    }
  }

  siRadon.addEventListener("change", toggleradon);
  noRadon.addEventListener("change", toggleradon);

  toggleradon();
});

document.addEventListener("DOMContentLoaded", function () {
  var siRadon = document.getElementById("noRadon");
  var noRadon = document.getElementById("siRadon");
  var radonDivNo = document.getElementById("radonDivNo");

  function toggleradonNo() {
    if (noRadon.checked) {
      radonDivNo.style.display = "none";
    } else {
      radonDivNo.style.display = "block";
    }
  }

  siRadon.addEventListener("change", toggleradonNo);
  noRadon.addEventListener("change", toggleradonNo);

  toggleradonNo();
});

//Radiació Terrestre

var terrestrialRad = 0;

function getTerrestrialRad(casillaSeleccionada) {
  terrestrialRad = parseFloat(casillaSeleccionada.value);
  RadDose();
  updateChartData();
}

function mostrarProvincias(comunidad) {
  // Mostrar u ocultar las provincias de la comunidad seleccionada
  var checkBox = document.getElementById("comunidad" + comunidad);
  var provinciasComunidad = document.querySelectorAll(
    '.provincia[data-comunidad="' + comunidad + '"]'
  );
  for (var i = 0; i < provinciasComunidad.length; i++) {
    provinciasComunidad[i].style.display = checkBox.checked ? "block" : "none";
  }
}

// Inicialmente, ocultar todas las provincias al cargar la página
var provincias = document.querySelectorAll(".provincia");
for (var i = 0; i < provincias.length; i++) {
  provincias[i].style.display = "none";
}

//Radiació Còsmica

var valorPredCos = 0.26;
var cosmicRad = valorPredCos;

function getCosmicRad(casillaSeleccionada) {
  cosmicRad = valorPredCos + parseFloat(casillaSeleccionada.value);
  RadDose();
  updateChartData();
}

//Radiació Viatges

var valorPredTravel = 0;
var travelRad = valorPredTravel;

function getTravelRad() {
  var travelTimeInput =
    parseFloat(document.getElementById("travelTime").value) || 0;
  var lanternCheckbox = document.getElementById("lantern");
  var lanternValue = lanternCheckbox.checked
    ? parseFloat(lanternCheckbox.value)
    : 0;
  var luggageCheckbox = document.getElementById("luggage");
  var luggageValue = luggageCheckbox.checked
    ? parseFloat(luggageCheckbox.value)
    : 0;

  travelRad = travelTimeInput * 0.003 + lanternValue + luggageValue;

  RadDose();
  updateChartData();
}

//Altres Fonts

var valorPredOther = 0;
var otherRad = valorPredOther;

function getOtherRad() {
  var workerRad = parseFloat(document.getElementById("workerRad").value) || 0;
  var smokingRad = parseFloat(document.getElementById("smokingRad").value) || 0;
  var buildingCheckbox = document.getElementById("building");
  var buildingValue = buildingCheckbox.checked
    ? parseFloat(buildingCheckbox.value)
    : 0;
  var wristwatchCheckbox = document.getElementById("wristwatch");
  var wristwatchValue = wristwatchCheckbox.checked
    ? parseFloat(wristwatchCheckbox.value)
    : 0;
  var coalCheckbox = document.getElementById("coal");
  var coalValue = coalCheckbox.checked ? parseFloat(coalCheckbox.value) : 0;
  var nuclearCheckbox = document.getElementById("nuclear");
  var nuclearValue = nuclearCheckbox.checked
    ? parseFloat(nuclearCheckbox.value)
    : 0;
  var detectorCheckbox = document.getElementById("detector");
  var detectorValue = detectorCheckbox.checked
    ? parseFloat(detectorCheckbox.value)
    : 0;
  var sleepCheckbox = document.getElementById("sleep");
  var sleepValue = sleepCheckbox.checked ? parseFloat(sleepCheckbox.value) : 0;

  otherRad =
    buildingValue +
    wristwatchValue +
    coalValue +
    nuclearValue +
    detectorValue +
    workerRad +
    smokingRad * 365 * 0.000245 +
    sleepValue;

  RadDose();
  updateChartData();
}

//Radiació Interna

var valorPredInt = 0.29;
var internalRad = valorPredInt;

function getInternalRad() {
  var teethCheckbox = document.getElementById("teeth");
  var teethValue = teethCheckbox.checked ? parseFloat(teethCheckbox.value) : 0;

  internalRad = 0.4 + teethValue;

  RadDose();
  updateChartData();
}

//Radó

var radon = 0;

function getRadonRad() {
  if (siRadon.checked) {
    radon = (parseFloat(document.getElementById("radonbqm").value) || 0) * 0.06;
  } else {
    var radonPot = document.getElementById("radonPot");
    radon =
      parseFloat(radonPot.options[radonPot.selectedIndex].value) * 0.00745;
  }

  RadDose();
  updateChartData();
}

//Resultat

function RadDose() {
  var radDose =
    medrads +
    internalRad +
    cosmicRad +
    travelRad +
    otherRad +
    terrestrialRad +
    radon;
  var fixedradDose = radDose.toFixed(2);
  var formattedradDose = replaceDotWithComma(fixedradDose);
  bananaDose(radDose);
  updateDoseLevel(radDose);

  if (radDose > 0) {
    document.getElementById("radDose").innerHTML =
      formattedradDose + " " + "mSv/any";
  } else {
    document.getElementById("radDose").innerHTML = "-";
    document.getElementById("bananaDose").innerHTML = "-" + " ";
  }

  document.getElementById("medDose").innerHTML = medrads.toFixed(2);
  document.getElementById("internalDose").innerHTML = internalRad.toFixed(2);
  document.getElementById("cosmicDose").innerHTML = cosmicRad.toFixed(2);
  document.getElementById("travelDose").innerHTML = travelRad.toFixed(2);
  document.getElementById("otherDose").innerHTML = otherRad.toFixed(2);
  document.getElementById("terrestrialDose").innerHTML =
    terrestrialRad.toFixed(2);
  document.getElementById("radonDose").innerHTML = radon.toFixed(2);

  updateChartData();
  gauge(radDose);

  return radDose;
}

function formatNumberWithDots(number) {
  return new Intl.NumberFormat("es-ES", { useGrouping: true }).format(number);
}
function replaceDotWithComma(number) {
  return number.toString().replace(".", ",");
}

function bananaDose(radDose) {
  var bananaDose = (radDose * 10000).toFixed(0);
  var formattedBananaDose = formatNumberWithDots(bananaDose);
  document.getElementById("bananaDose").innerHTML =
    formattedBananaDose + " " + "plàtans/any" + " ";
  updateChartData();
}

function updateChartData() {
  myChart.data.datasets[0].data = [
    medrads,
    internalRad,
    cosmicRad,
    travelRad,
    otherRad,
    terrestrialRad,
    radon,
  ];
  myChart.update();
}

window.addEventListener(
  "DOMContentLoaded",
  RadDose,
  bananaDose,
  updateChartData
);

$(document).ready(function () {
  $(".overlay").show();
  $(".close").click(function () {
    $(".overlay").hide();
  });
});
