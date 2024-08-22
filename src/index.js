function showWeatherData(response){
    let city = document.querySelector("#city")
    let cityinfo = response.data.city;
    city.innerHTML = cityinfo;

    let temp = document.querySelector("#app_temp");
    let tempinfo = Math.round(response.data.temperature.current);
   temp.innerHTML = tempinfo;

   let humid = document.querySelector("#hum");
    let humidinfo = Math.round(response.data.temperature.humidity);
   humid.innerHTML = `${humidinfo}%`;

   let wspeed = document.querySelector("#speed");
    let wspeedinfo = response.data.wind.speed;
   wspeed.innerHTML = `${wspeedinfo}m/sec`;

   let wstate = document.querySelector("#state");
    let wstateinfo = response.data.condition.description;
   wstate.innerHTML = wstateinfo;

   let date = document.querySelector("#time");
   let dateinfo = new Date(response.data.time * 1000);
   date.innerHTML = formatDate(dateinfo);

   let icon = document.querySelector("#app-icon");
   let iconinfo = `<img src="${response.data.condition.icon_url}" alt="weather-icon" class="app_icon">`
   icon.innerHTML = iconinfo;

   getForecastData(cityinfo);
}

function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let day = date.getDay();
  
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    if (hours < 10) {
      hours = `0${hours}`;
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
  
    let formattedDay = days[day];
    return `${formattedDay} ${hours}:${minutes}`;
  }

function searchCity(city){
let apiKey = "d001310fae770o7ftaaab3f4b5974a90";
let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`
axios.get(apiURL).then(showWeatherData);
}

function onSearch(event){
event.preventDefault();
let searchInput = document.querySelector("#search-form-input");
searchCity(searchInput.value);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", onSearch);

searchCity("Harare");

function getForecastData(city){
  let apiKey = "d001310fae770o7ftaaab3f4b5974a90";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`
  axios.get(apiURL).then(showForecast);
}


function showForecast(response){
console.log(response.data);

let days = ['Tue', 'Wed','Thu','Fri','Sat'];
let forecastinfo = ""

days.forEach(function (day){
forecastinfo = forecastinfo + `<div class = "app-forecast-day">
    <div class = "app-forecast-date">${day}</div> 
    <div class = "app-forecast-icon">🌦️</div>
    <div class = "app-forecast-temps">
        <div class = "app-forecast-temp">  
        <strong>15°</strong></div>
        <div class = "app-forecast-temp"> 9°</div>
</div></div>`;
});

let forecast = document.querySelector("#app-forecast");
forecast.innerHTML = forecastinfo;
}
showForecast();