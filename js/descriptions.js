const medRaddisplay = document.querySelector(".medRad-des-div-dis");
const medRad_notdisplay = document.querySelector(".medRad-des-div");
const med_arrow = document.querySelector(".arrow-medRad");

function medRad_display() {
  medRaddisplay.classList.toggle("show");
  medRad_notdisplay.classList.toggle("show");
  med_arrow.style.transform = medRaddisplay.classList.contains("show")
    ? "rotate(180deg)"
    : "rotate(0deg)";
}

const internalRaddisplay = document.querySelector(".internalRad-des-div-dis");
const internalRad_notdisplay = document.querySelector(".internalRad-des-div");
const internal_arrow = document.querySelector(".arrow-internalRad");

function internalRad_display() {
  internalRaddisplay.classList.toggle("show");
  internalRad_notdisplay.classList.toggle("show");
  internal_arrow.style.transform = internalRaddisplay.classList.contains("show")
    ? "rotate(180deg)"
    : "rotate(0deg)";
}

const cosmicRaddisplay = document.querySelector(".cosmicRad-des-div-dis");
const cosmicRad_notdisplay = document.querySelector(".cosmicRad-des-div");
const cosmic_arrow = document.querySelector(".arrow-cosmicRad");

function cosmicRad_display() {
  cosmicRaddisplay.classList.toggle("show");
  cosmicRad_notdisplay.classList.toggle("show");
  cosmic_arrow.style.transform = cosmicRaddisplay.classList.contains("show")
    ? "rotate(180deg)"
    : "rotate(0deg)";
}

const travelRaddisplay = document.querySelector(".travelRad-des-div-dis");
const travelRad_notdisplay = document.querySelector(".travelRad-des-div");
const travel_arrow = document.querySelector(".arrow-travelRad");

function travelRad_display() {
  travelRaddisplay.classList.toggle("show");
  travelRad_notdisplay.classList.toggle("show");
  travel_arrow.style.transform = travelRaddisplay.classList.contains("show")
    ? "rotate(180deg)"
    : "rotate(0deg)";
}

const otherRaddisplay = document.querySelector(".otherRad-des-div-dis");
const otherRad_notdisplay = document.querySelector(".otherRad-des-div");
const other_arrow = document.querySelector(".arrow-otherRad");

function otherRad_display() {
  otherRaddisplay.classList.toggle("show");
  otherRad_notdisplay.classList.toggle("show");
  other_arrow.style.transform = otherRaddisplay.classList.contains("show")
    ? "rotate(180deg)"
    : "rotate(0deg)";
}

const terrestrialRaddisplay = document.querySelector(
  ".terrestrialRad-des-div-dis"
);
const terrestrialRad_notdisplay = document.querySelector(
  ".terrestrialRad-des-div"
);
const terrestrial_arrow = document.querySelector(".arrow-terrestrialRad");

function terrestrialRad_display() {
  terrestrialRaddisplay.classList.toggle("show");
  terrestrialRad_notdisplay.classList.toggle("show");
  terrestrial_arrow.style.transform = terrestrialRaddisplay.classList.contains(
    "show"
  )
    ? "rotate(180deg)"
    : "rotate(0deg)";
}

const RadonRaddisplay = document.querySelector(".RadonRad-des-div-dis");
const RadonRad_notdisplay = document.querySelector(".RadonRad-des-div");
const Radon_arrow = document.querySelector(".arrow-RadonRad");

function RadonRad_display() {
  RadonRaddisplay.classList.toggle("show");
  RadonRad_notdisplay.classList.toggle("show");
  Radon_arrow.style.transform = RadonRaddisplay.classList.contains("show")
    ? "rotate(180deg)"
    : "rotate(0deg)";
}

const mainContent = document.getElementById("maincontent");
const sidebar = document.querySelector(".sidebar");

window.addEventListener("scroll", handleScroll);

function handleScroll() {
  const mainContentHeight = mainContent.offsetHeight;
  var correction = 0;

  if (window.innerWidth === 1920) {
    correction = 0;
  } else if (window.innerWidth === 2560) {
    correction = 0;
  } else if (window.innerWidth === 1536) {
    correction = -862;
  } else if (window.innerWidth === 1366) {
    correction = -812;
  } else if (window.innerWidth === 1572) {
    correction = -1724;
  }

  var triggerPoint = mainContentHeight - (window.innerHeight + 29) + correction;

  const scrollY = window.scrollY;
  console.log('window.innerWidth:' + window.innerWidth)
  console.log('window.innerHeight:' + window.innerHeight)
  console.log('ScrollY:' + scrollY)
  console.log('mainContentHeight:' + mainContentHeight)
  console.log('correction:' + correction)
  console.log('triggerPoint:' + triggerPoint)
  console.log('sidebar.style.top:' + sidebar.style.top)

  if (scrollY > triggerPoint) {
    sidebar.classList.add("absolute");
    sidebar.style.top = `${(triggerPoint/window.innerHeight)*100}%`;
  } else {
    sidebar.classList.remove("absolute");
    sidebar.style.top = "0";
  }
}

function displayAll() {
  medRad_display();
  internalRad_display();
  cosmicRad_display();
  travelRad_display();
  otherRad_display();
  terrestrialRad_display();
  RadonRad_display();
}
