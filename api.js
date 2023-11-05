const overlay = document.getElementById("overlay");
const switcher = document.getElementById("apiSelect");
const container = document.getElementById("switcher");
const btnOpen = document.getElementById("open");
const btnClose = document.getElementById("close");

const keys = {
 API1: "96b947a45d33d7dc1c49af3203966408",
 API2: "baea381d31d2efa76e51177799c96f2d",
 API3: "649b17900f83a9cf5a5b9c3e33fb9c6d",
};

let KEY = keys.API1;

const getData = async (city) => {
 overlay.setAttribute("class", "overlay d-flex");

 const base = "https://api.openweathermap.org/data/2.5/weather";
 const query = `?q=${city}&units=metric&appid=${KEY}`;

 const req = await fetch(base + query);
 const data = await req.json();

 overlay.setAttribute("class", "overlay d-none");

 return data;
};

btnOpen.addEventListener("click", () => {
 container.classList.remove("d-none");
});

btnClose.addEventListener("click", () => {
 container.classList.add("d-none");
});

switcher.addEventListener("change", () => {
 let api = switcher.value;
 if (switcher.value != "API1") {
  KEY = keys[api];
 }
});

window.addEventListener("offline", (e) => {
 alert("Connection lost, please try again later!");
});
