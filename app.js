const changeLocation = document.getElementById("change-location");
const card = document.getElementById("card");
const details = document.getElementById("details");
const weatherIcon = document.getElementById("weather-icon");
const errorTxt = document.getElementById("errortxt");
const formBtn = document.getElementById("formBtn");

changeLocation.addEventListener("submit", (e) => {
 e.preventDefault();

 if (!!changeLocation.city.value) {
  let city = changeLocation.city.value.trim();

  city = city.charAt().toUpperCase() + city.slice(1).toLowerCase();

  changeLocation.reset();

  getData(city)
   .then((data) => addUI(data))
   .catch((err) => {
    errorTxt.innerText = "Network error.";
    errorTxt.classList.remove("d-none");
    overlay.setAttribute("class", "overlay d-none");

    console.log(err);

    setTimeout(() => {
     errorTxt.classList.add("d-none");
     errorTxt.innerText = "Enter city or country name";
    }, 2500);
   });
 } else {
  changeLocation.city.classList.add("is-invalid");
  errorTxt.classList.remove("d-none");
  formBtn.classList.add("disabled");

  setTimeout(() => {
   changeLocation.city.classList.remove("is-invalid");
   errorTxt.classList.add("d-none");
   formBtn.classList.remove("disabled");
  }, 2000);
 }
});

const addUI = (val) => {
 const { name, sys, main, weather } = val;

 details.innerHTML = `
      <h5 class="mb-3">${name}, ${sys.country}</h5>

      <p class="mb-3">${weather[0].main}</p>

      <div class="display-4 mb-3">
       <span>${main.temp}</span>
       <span>&deg;C</span>
      </div>
 `;

 weatherIcon.src = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
 weatherIcon.alt = weather[0].description;

 if (card.classList.contains("d-none")) {
  card.classList.remove("d-none");
 }
};
