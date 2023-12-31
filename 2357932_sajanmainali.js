const apiKey = "fef8d2dffbb9e6b7136baacf21527fe9";

// Load initial city list from local storage and display the first city's weather data
document.addEventListener("DOMContentLoaded", function () {
    const cities = loadCitiesFromLocalStorage();
    if (cities.length > 0) {
        displayCitiesList(cities);
        fetchWeatherApi(cities[0]);
    }

    // Attach event listeners for search and button click
    document.getElementById("buttonClick").addEventListener("click", function () {
        changeBackgroundImage();
        const city = document.querySelector(".search-input").value;
        searchCity(city);
    });

    document.querySelector(".search-input").addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            changeBackgroundImage();
            const city = document.querySelector(".search-input").value;
            searchCity(city);
        }
    });
});

// Function to load cities from local storage
function loadCitiesFromLocalStorage() {
    const citiesJSON = localStorage.getItem("cities");
    if (citiesJSON) {
        return JSON.parse(citiesJSON);
    } else {
        return [];
    }
}

// Function to save cities to local storage
function saveCitiesToLocalStorage(cities) {
    localStorage.setItem("cities", JSON.stringify(cities));
}

// Function to display the list of cities
function displayCitiesList(cities) {
    const citiesList = document.getElementById("citiesList");
    citiesList.innerHTML = cities.map(city => `<li>${city}</li>`).join("");

    // Attach click event to each city
    citiesList.querySelectorAll("li").forEach(cityItem => {
        cityItem.addEventListener("click", function () {
            fetchWeatherApi(cityItem.textContent);
        });
    });
}

// Function to search for a city and display its weather data
function searchCity(city) {
    const cities = loadCitiesFromLocalStorage();

    if (!cities.includes(city)) {
        cities.unshift(city);
        saveCitiesToLocalStorage(cities);
        displayCitiesList(cities);
    }

    fetchWeatherApi(city);
}

// Function to fetch weather data
async function fetchWeatherApi(city) {
    try {
        const cachedData = localStorage.getItem(city);

        if (cachedData) {
            const weatherData = JSON.parse(cachedData);
            getWeather(weatherData);
        } else {
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
            const weatherResponse = await fetch(weatherUrl);
            const weatherData = await weatherResponse.json();

            if (weatherData.cod === "404") {
                displayAlert("City not found", "#000000e0");
            } else {
                storeDataInLocalStorage(city, weatherData);
                getWeather(weatherData);
            }
        }
    } catch (error) {
        displayAlert(`${error}`, " #000000e0");
    }
}

// Function to store weather data in local storage
function storeDataInLocalStorage(city, data) {
    localStorage.setItem(city, JSON.stringify(data));
}

// Function to get the current Date. Using Unix timestamp format I have fetched the date.

function getCurrentDate(weatherData) {

    let unixtime = weatherData;
    let date = new Date(unixtime * 1000); // Convert Unix timestamp to milliseconds

    // Extract the month, day, and year from the date object
    let month = date.getMonth() + 1; // Add 1 because months are zero-indexed
    let day = date.getDate();
    let year = date.getFullYear();

    // Create a new Date object with the extracted components
    let formattedDate = new Date(year, month - 1, day);

    const options = { weekday: "long", month: "long", day: "numeric" };
    return formattedDate.toLocaleDateString(undefined, options);

};


// Data from the api are stored in the following variables in this function.
function getWeather(weatherData) {

    const { name } = weatherData;
    const { icon, description, main } = weatherData.weather[0];
    const { temp: temperature, humidity, pressure } = weatherData.main;
    const { speed: windSpeed } = weatherData.wind;
    const { dt } = weatherData;
    let currentDate = getCurrentDate(dt);
    let upatedTemperature = Math.floor(temperature);


    displayWeather(
        name,
        icon,
        description,
        upatedTemperature,
        humidity,
        windSpeed,
        pressure,
        currentDate,
    );

    // Split the string by the comma
    let dateComponent = currentDate.split(', ');

    let day_of_week = dateComponent[0];
    let date = dateComponent[1];

    let weatherDatas = {
        temperature: upatedTemperature,
        description: main,
        city: name,
        day_of_week,
        date,
        icon
    }


    fetch('2357932_sajanmainali_weatherhistory.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(weatherDatas),
    })
        .then(response => response.text())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


// Displaying weather information in frontend.
function displayWeather(
    name,
    icon,
    description,
    temperature,
    humidity,
    windSpeed,
    pressure,
    currentDate,
) {

    fetch('2357932_sajanmainali_getweatherdata.php')
        .then(response => response.json())
        .then(data => {
            const weatherHistoryDiv = document.getElementById('weatherHistory');
            const weatherCardsHTML = data.map(entry => `
       <div class="weather-card">
         <div>${entry.date}</div>
         <div>${entry.day_of_week}</div>
         <img src="https://openweathermap.org/img/wn/${entry.icon}.png" alt="${entry.description}">
         <div>${entry.temperature}°C</div>
         <div>${entry.description}</div>
       </div>
     `).join('');

            weatherHistoryDiv.innerHTML = weatherCardsHTML;
        })
        .catch(error => console.error('Error fetching weather data:', error));



    document.querySelector(".city").innerText = name;
    document.querySelector(".temp").innerText = Math.floor(temperature) + "°C";
    document.querySelector(".description").innerText = description;
    document.querySelector(
        ".icon"
    ).src = `https://openweathermap.org/img/wn/${icon}.png`;
    document.querySelector(".humidity").innerText = `Humidity: ${humidity}% `;
    document.querySelector(".wind").innerHTML = `<h2>Wind Speed</h2>${windSpeed} km/hr  💨`;
    document.querySelector(".pressure").innerHTML = `<h2>Pressure</h2> ${pressure} pa   🌪️`;
    document.querySelector(".date").innerText = currentDate;

}


//  Taking search input and passing it to the fetchWeatherApi() function.
function search() {
    const city = document.querySelector(".search-input").value;
    fetchWeatherApi(city);
}


function changeBackgroundImage() {
    const randomNumber = Math.floor(Math.random() * 1000);
    document.body.style.backgroundImage = `url('https://source.unsplash.com/1920x1080/?landscape&${randomNumber}')`;
}



// Displaying Alert Messages for the invalid data.
function displayAlert(message, color) {
    const alertBox = document.createElement("div");
    alertBox.textContent = message;
    alertBox.classList.add("alert");
    alertBox.style.backgroundColor = color;
    document.body.insertBefore(alertBox, document.body.firstChild);

    // Remove the 
    setTimeout(function () {
        alertBox.remove();
    }, 4000);
}


// Waits for the HTML document to be fully loaded before executing the enclosed code.
document.addEventListener("DOMContentLoaded", function () {
    // When the icon is clicked, it calls search() function and changeBackgroundImage() function.
    document.getElementById("buttonClick").addEventListener("click", function () {
        changeBackgroundImage();
        search();

    });

    // When the "Enter" key is released, it calls search() function and changeBackgroundImage() function.
    document
        .querySelector(".search-input")
        .addEventListener("keyup", function (event) {
            if (event.key === "Enter") {
                search();
                changeBackgroundImage();
            }
        });

    fetchWeatherApi("guntersville");
    changeBackgroundImage();
});


document.addEventListener("DOMContentLoaded", function () {
    const cities = loadCitiesFromLocalStorage();
    if (cities.length > 0) {
        fetchWeatherApi(cities[0]);
    }
});

