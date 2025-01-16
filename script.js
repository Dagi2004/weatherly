const apiKey = "ee6230c4c435815b3e54fdc1ed8959e7"; // OpenWeatherMap API key
let currentCity = ""; // To store the current searched city
let currentStatus; // To store the current API response status
let refreshInterval; // To hold the interval for auto-refresh

// Fetch weather data based on city name
function fetchWeather(city) {
  if (!city) return;
  currentCity = city; // Store the city for refresh functionality
  const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  fetch(weatherUrl)
    .then((response) => {
      currentStatus = response.status; // Store the response status
      if (!response.ok) {
        throw new Error("Error fetching weather data."); // Throw error for non-200 responses
      } else {
        return response.json(); // Parse the response as JSON
      }
    })
    .then((data) => {
      updateWeatherInfo(data); // Update current weather information
      updateForecast(data.list); // Update 5-day forecast
      startAutoRefresh(); // Start auto-refreshing the weather data every few minutes
    })
    .catch((error) => {
      if (currentStatus === 404) {
        showErrorMessage("City not found. Please try another city."); // Handle 404 error
      } else {
        showErrorMessage(
          "Error fetching weather data. Please try again later."
        ); // Handle other errors
      }
      stopAutoRefresh(); // Stop auto-refresh on error
    });
}

// Start auto-refreshing the weather every 5 minutes (300,000 ms)
function startAutoRefresh() {
  stopAutoRefresh(); // Clear any existing interval to prevent multiple timers
  refreshInterval = setInterval(() => {
    if (currentCity) {
      fetchWeather(currentCity); // Fetch the weather again for the current city
    }
  }, 300000); // Update every 5 minutes (300,000 milliseconds)
}

// Stop auto-refreshing the weather
function stopAutoRefresh() {
  if (refreshInterval) {
    clearInterval(refreshInterval); // Clear the interval if it exists
  }
}

// Update the current weather information on the page
function updateWeatherInfo(data) {
  // Populate weather details
  document.querySelector("#cityName").textContent = data.city.name;
  document.querySelector(
    "#temperature"
  ).textContent = ` ${data.list[0].main.temp.toFixed(1)}°C`;
  document.querySelector(
    "#humidity"
  ).textContent = `Humidity: ${data.list[0].main.humidity}%`;
  document.querySelector(
    "#windSpeed"
  ).textContent = `Wind Speed: ${data.list[0].wind.speed} km/h`;
  document.querySelector(
    "#weatherIcon"
  ).src = `http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`;
  document.querySelector("#weatherIcon").alt =
    data.list[0].weather[0].description;

  // Display the current weather section and show the refresh button
  document.getElementById("weatherCondition").innerText =
    data.list[0].weather[0].description; // Set weather condition

  document.querySelector("#currentWeatherDiv").style.display = "block";
  document.querySelector("#refreshBtn").style.display = "block";
}

// Update the 5-day weather forecast on the page
function updateForecast(forecastList) {
  const forecastCards = document.querySelector("#forecastCards");
  forecastCards.innerHTML = ""; // Clear any previous forecast

  // Group forecasts by day and select the forecast for noon of each day
  const dailyForecasts = {};
  forecastList.forEach((forecast) => {
    const date = new Date(forecast.dt * 1000);
    const day = date.toLocaleDateString(undefined, { weekday: "long" });
    if (!dailyForecasts[day] && date.getHours() === 12) {
      dailyForecasts[day] = forecast; // Store forecast for noon of each day
    }
  });

  // Create forecast cards for each day
  Object.keys(dailyForecasts).forEach((day) => {
    const forecast = dailyForecasts[day];
    // Create a new div element for the forecast card
    const forecastCard = document.createElement("div");
    // Add the class 'forecast-card' to the div for styling purposes
    forecastCard.classList.add("forecast-card");

    const iconUrl = `http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;

    // Add the weather details to each card
    forecastCard.innerHTML = `
            <h4>${day}</h4>
            <img src="${iconUrl}" alt="${forecast.weather[0].description}">
            <p align="center" style="color: hsl(258, 43%, 18%); font-weight:bold;">${
              forecast.weather[0].description
            }</p>
            <p><font color=" #261a42"><b>Temp: ${forecast.main.temp.toFixed(
              1
            )}°C</b></font></p>
            <p><font color=" #261a42"><b>Humidity: ${
              forecast.main.humidity
            }%</b></font></p>
        `;
    // Append the created forecast card to the forecastCards container in the DOM
    forecastCards.appendChild(forecastCard);
  });

  // Display the forecast section
  document.querySelector("#forecastDiv").style.display = "block";
}

// Display an error message to the user
function showErrorMessage(message) {
  const errorMessage = document.querySelector("#errorMessage");
  errorMessage.textContent = message;
  errorMessage.style.display = "block"; // Show the error message

  // Hide error message after 3 seconds
  setTimeout(() => {
    errorMessage.style.display = "none";
  }, 3000);

  // Hide both the current weather and forecast sections on error
  document.querySelector("#currentWeatherDiv").style.display = "none";
  document.querySelector("#forecastDiv").style.display = "none";
  document.querySelector("#refreshBtn").style.display = "none"; // Hide refresh button on error
  stopAutoRefresh(); // Stop auto-refresh on error
}

// Event listener for the search button
document.querySelector("#searchBtn").addEventListener("click", () => {
  const city = document.querySelector("#cityInput").value.trim();
  if (city) {
    fetchWeather(city); // Fetch weather for the input city
  } else {
    showErrorMessage("Please enter a city name"); // Show error if no city is entered
  }
});

// Event listener for the refresh button
document.querySelector("#refreshBtn").addEventListener("click", () => {
  if (currentCity) {
    fetchWeather(currentCity); // Fetch the weather again for the current city
  } else {
    showErrorMessage("No city selected to refresh."); // Show error if no city was previously selected
  }
});

// Fetch weather data based on geographic coordinates (latitude and longitude)
function fetchWeatherByCoords(lat, lon) {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  fetch(weatherUrl)
    .then((response) => {
      currentStatus = response.status;
      if (!response.ok) {
        throw new Error("Error fetching weather data.");
      } else {
        return response.json();
      }
    })
    .then((data) => {
      updateWeatherInfo(data); // Update current weather information
      updateForecast(data.list); // Update 5-day forecast
      startAutoRefresh(); // Start auto-refreshing the weather data
    })
    .catch((error) => {
      showErrorMessage("Error fetching weather data for your location.");
    });
}

// Function to get the user's current location using Geolocation API
function getLocationAndFetchWeather() {
  // Check if the browser supports Geolocation API
  if (navigator.geolocation) {
    // If supported, use the getCurrentPosition method to get the user's location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // On success, destructure the latitude and longitude from the position object
        const { latitude, longitude } = position.coords;
        fetchWeatherByCoords(latitude, longitude); // Fetch weather by coordinates
      },
      (error) => {
        showErrorMessage(
          "Unable to retrieve your location. Please search manually."
        );
      }
    );
  } else {
    showErrorMessage("Geolocation is not supported by this browser.");
  }
}
