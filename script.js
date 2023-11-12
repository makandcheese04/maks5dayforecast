var apiKey = "2b6c6da296a0bdff975209048e42a6df";
var apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?q=${*cityName*}&appid=${2b6c6da296a0bdff975209048e42a6df}&units=metric";
const searchInput = document.getElementById("city-input");
const searchButton = document.getElementById("search-button");
const cityName = document.getElementById("city-name");
const date = document.getElementById("date");
const weatherIcon = document.getElementById("weather-icon");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const forecastContainer = document.getElementById("forecast-container");

const weatherDisplay = document.getElementById("current-weather");

// Function to fetch weather data from the API
function getWeatherData(city) {
  fetch(
    `${"https://api.openweathermap.org/data/2.5/weather"}?q=${city}&appid=${"2b6c6da296a0bdff975209048e42a6df"}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");

      }
      return response.json();
    })
    .then((data) => {
      fetch5Days(city);
      const { name, main, weather } = data;
      const temperature = main.temp;
      const description = weather[0].description;

      const weatherInfo = `City: ${name}<br>Temperature: ${temperature}°C<br>Description: ${description}`;
      weatherDisplay.innerHTML = weatherInfo;
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Unable to fetch weather data. Please try again.");
    });
}
function display5Days(list){
  for (let i = 0; i < list.length; i++) {
    if(list[i].dt_txt.includes("06:00:00")){

      const {  main, weather } = list[i];
      const temperature = main.temp;
      const description = weather[0].description;

      const weatherInfo = `Temperature: ${temperature}°C<br>Description: ${description} <hr/>`;
      document.getElementById("forecast-container").innerHTML += weatherInfo;
    }
    
  }
}
function fetch5Days(cityName){
  fetch(
    `${"https://api.openweathermap.org/data/2.5/forecast"}?q=${cityName}&appid=${"2b6c6da296a0bdff975209048e42a6df"}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");

      }
      return response.json();
    })
    .then((data) => {
      display5Days(data.list);
      
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Unable to fetch weather data. Please try again.");
    });
}

// Function to display the 5-day forecast
function displayForecast(forecastData) {
  const forecastContainer = document.getElementById("forecast-container"); // Replace with your HTML container element

  // Clear any previous forecast data
  forecastContainer.innerHTML = "";

  // Loop through the forecast data
  forecastData.forEach((day) => {
    const { date, temperature, description } = day;

    // Create HTML elements for each day's forecast
    const forecastCard = document.createElement("div");
    forecastCard.classList.add("forecast-card");

    const dateElement = document.createElement("p");
    dateElement.textContent = date;

    const temperatureElement = document.createElement("p");
    temperatureElement.textContent = `Temperature: ${temperature}°C`;

    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = `Description: ${description}`;

    // Append elements to the forecast card
    forecastCard.appendChild(dateElement);
    forecastCard.appendChild(temperatureElement);
    forecastCard.appendChild(descriptionElement);

    // Append the forecast card to the forecast container
    forecastContainer.appendChild(forecastCard);
  });
};


// Event listener for the search button
searchButton.addEventListener("click", function () {
  const city = searchInput.value;
  getWeatherData(city);
});

