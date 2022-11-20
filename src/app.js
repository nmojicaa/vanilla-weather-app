let date = new Date();
let time = document.querySelector("#current-time");
let hours = date.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = date.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[date.getDay()];

time.innerHTML = `${day} ${hours}:${minutes}`;

function searchCity(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#city-input").value;
  let h1 = document.querySelector("#city");
  if (searchCity) {
    h1.innerHTML = `${searchCity}`;
  } else {
    h1.innerHTML = null;
    alert("Please enter a city");
  }
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleCity);

function showLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "ca95aece5407f70771d3c2a89b07f94b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  navigator.geolocation.getCurrentPosition(showLocation);
  axios.get(apiUrl).then(displayTemperature);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

function search(city) {
  let apiKey = "22f56e2b46e01f373930322b649479c4";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleCity(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#city-input");
  search(searchCity.value);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = Date(response.data.dt * 1000);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getLocation);

search("New York");
