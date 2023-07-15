const apiKey = "fef8d2dffbb9e6b7136baacf21527fe9";


async function fetchWeatherApi(city) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const response = await fetch(url);
    const weatherData = await response.json();
    console.log(weatherData);

    getWeather(weatherData);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

function getWeather(weatherData) {
  const { name } = weatherData;
  const { icon, description } = weatherData.weather[0];
  const { temp: temperature, humidity, pressure } = weatherData.main;
  const { speed: windSpeed } = weatherData.wind;

  displayWeather(name, icon, description, temperature, humidity, windSpeed, pressure);
}

function displayWeather(name, icon, description, temperature, humidity, windSpeed, pressure) {
  document.querySelector('.city').innerText = name;
  document.querySelector('.temp').innerText = temperature + '°C';
  document.querySelector('.description').innerText = description.charAt(0).toUpperCase() + description.slice(1);
  document.querySelector('.icon').src = `https://openweathermap.org/img/wn/${icon}.png`;
  document.querySelector('.humidity').innerText = `Humidity: ${humidity}%`;
  document.querySelector('.wind').innerText = `Wind Speed: ${windSpeed}km/hr`;
  document.querySelector('.pressure').innerText = `Pressure: ${pressure} pa`;
}

function search() {
  fetchWeatherApi(document.querySelector(".search-input").value);
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('buttonClick').addEventListener('click', function() {
    search();
  });

  document.querySelector('.search-input').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
      search();
    }
  });

  fetchWeatherApi('cullman');
});
