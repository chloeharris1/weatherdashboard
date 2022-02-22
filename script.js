
// Variable to store the searched city
var city = "";

// Variable for API Key
var APIKey = "82ec049d39033e14bb1857a732520ca9";

// Create event listener for click, store searched city in local storage. 
var searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', getCity, false);

// Retrieve user city search from local storage
function getCity() {
    // Variable for user city input  
    var searchCity = document.getElementById('search-city').value;
    // City variable is equal to the value of searchCity 
    city = searchCity;
    // console.log(city);
    // Loop through local storage to get city, add to page as search history list item
    for (var i = 0; i < localStorage.length; i++) {
        // Query a stored value
        var city = localStorage.getItem(i);
        console.log(localStorage.getItem("city"));
        var cityName = $(".list-group").addClass("list-group-item");
        // Put user search history in list below search field 
        cityName.append("<li>" + city + "<li>");
    }

}

// Retrieve current weather data from API
function getWeather(cityName) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + APIKey;
    // console.log(queryURL);

    fetch(queryURL)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function(data) {
            console.log("data",data);

            // HTML template for dynamically generated weather data 
            var template = `
                <h1 class="d-inline" id="current-city">${data.name}</h1>
                <img class="d-inline" id="city-name-icon" src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png"
        alt="weather icon">
                <p>Temperature:<span class="current" id="temperature">${data.main.temp}</span></p>
                <p>Humidity:<span class="current" id="humidity">${data.main.humidity}</span></p>
                <p>Wind Speed:<span class="current" id="wind speed">${data.wind.speed}</span></p>
                <p>UV Index:<span class="current bg-danger rounded py-2 px-2 text-white"
                    id="uv-index"></span></p>
            `;

            document.querySelector("#current-weather").innerHTML = template;

        });
}

// Retrieve 5-day forecast data from API
function forecast(cityName) {
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=" + APIKey;
    console.log(queryURL);
    fetch(queryURL)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function(data) {
            console.log("forecast",data);

            var list = data.list.filter(function(datum) {
                if (datum.dt_txt.includes("12:00:00")) {
                    return true;
                } else {
                    return false;
                }
            });
            // Variable to store HTML template with forecast data  
            var template = "";
            list.forEach(function(item) {
                // HTML template for dynamically generated forecast data 
                template += `
                    <div class="col-sm2 forecast text-white ml-2 mb-3 p-2 mt-2">
                        <div class="card bg-dark text-light">
                            <div class="card-body">
                                <h5 class="card-title-date" id="day1-date">${new Date(item.dt_txt).toLocaleDateString()}</h5>
                                <p class="emoji" id="day-1-weather-emoji"><img class="d-inline" id="city-name-icon" src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png"
                                alt="weather icon"></p>
                                <p class="card-text temp" id="day-1-temp">Temp: ${item.main.temp} F</p>
                                <p class="card-text wind" id="day-1-wind">Wind: ${item.wind.speed} MPH</p>
                                <p class="card-text humidity" id="day-1-humidity">Humidity: ${item.main.humidity}%</p>
                            </div>
                        </div>
                    </div>
                `;
            })
            
            // Append forecast data to page
            document.querySelector("#forecast").innerHTML = template;

        });
}


// Execute weather functions when user clicks search
searchButton.addEventListener('click', function () {
    // Get the user input
    var cityName = document.querySelector("#search-city").value;
    // Execute get weather function
    getWeather(cityName);
    // Execute forecast function
    forecast(cityName);
});



