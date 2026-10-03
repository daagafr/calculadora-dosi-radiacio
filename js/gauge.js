let medidorAncho = document.querySelector(".medidor").offsetWidth;
let limite1 = 10;
let limite2 = 100;
let limite3 = 1000;
let limite4 = 5000;

function gauge(radDose) {
  let porcentaje;

  if (radDose <= limite1) {
    porcentaje = radDose / limite1;
  } else if (radDose <= limite2) {
    porcentaje = 1 + 1.07 * ((radDose - limite1) / (limite2 - limite1));
  } else if (radDose <= limite3) {
    porcentaje = 2.1 + 1.03 * ((radDose - limite2) / (limite3 - limite2));
  } else if (radDose <= limite4) {
    porcentaje = 3.14 + (radDose - limite3) / (limite4 - limite3);
  }

  let posicion = (porcentaje / 4.3) * medidorAncho + 0;

  let marcador = document.querySelector(".marcador");
  marcador.style.left = posicion + "px";
}

let levelText = "";
let levelClass = "";
let descriptionText = "";
let effectsText = "";
let listItem1 = "";
let listItem2 = "";
let moreInfoText = "";

function updateDoseLevel(radDose) {
  const doseValue = parseFloat(radDose.toString().replace(' mSv/any', ''));
  if (doseValue < 10) {
    green();
  } else if (doseValue >= 10 && doseValue < 100) {
    yellow();
  } else if (doseValue >= 100 && doseValue < 1000) {
    orange();
  } else {
    red();
  }
}

function green() {
  levelText = "Baixa";
  levelClass = "verde-texto";
  updateUI()
}

function yellow() {
  levelText = "Moderada";
  levelClass = "amarillo-texto";
  updateUI()
}

function orange() {
  levelText = "Alta";
  levelClass = "naranja-texto";
  updateUI()
}

function red() {
  levelText = "Molt alta";
  levelClass = "rojo-texto";
  updateUI()
}

function updateUI() {
  const doseLevel = document.getElementById("doseLevel");

  doseLevel.textContent = levelText;
  doseLevel.className = levelClass;
}

