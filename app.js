function formatDateAndTime(timestamp) {
  let date = new Date(timestamp);

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let mins = date.getMinutes();
  if (mins < 10) {
    mins = `0${mins}`;
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
  return `${day} ${hours}:${mins}`;
}
//
function formatDayForecast(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["SUN", "MON", "TUE", "WED", "THUR", "FRI", "SAT"];
  return days[day];
}
//
function displayForecast(response) {
  let forecast = response.data.daily;
  //console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">   
        <div class="weather-forcast-day">${formatDayForecast(
          forecastDay.dt
        )}</div> 
          <img
            src="https://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png"
            alt="google rain emoji"
            width="30"
          />
          <div class="weather-forcast-temp">
            <span class="weather-forcast-temp-max"> 
              ${Math.round(forecastDay.temp.max)}º 
            </span>
            <span class="weather-forcast-temp-min">
              ${Math.round(forecastDay.temp.min)}º
            </span>
        </div>
      </div>
    `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
//
function getForecast(coordinates) {
  //console.log(coordinates);
  let apiKey = "9c9080e190f8de94f431567b5176425a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric
  `;
  //console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}
///
function displayTemperature(response) {
  let temperatureElement = document.querySelector("#number-temp");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  let conditionsElement = document.querySelector("#conditions");
  conditionsElement.innerHTML = response.data.weather[0].description;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let dateElement = document.querySelector("#dateAndTime");
  dateElement.innerHTML = formatDateAndTime(response.data.dt * 1000);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  //
  celsiusTemp = response.data.main.temp;
  //
  getForecast(response.data.coord);
}
///
function search(city) {
  let apiKey = "9c9080e190f8de94f431567b5176425a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-imput");
  search(cityInputElement.value);
}
//
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("London");
