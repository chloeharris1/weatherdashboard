
// Variable to store the searched city
var city = "";

// Variable for API Key
var APIKey = "82ec049d39033e14bb1857a732520ca9";


// WHEN I search for a city
// Create event listener on click, store searched city in local storage. 
var searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', getCity, false);

// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
// Event listener click, pull saved search data from local storage
function getCity() {
    // Variable for user input for the city 
    var searchCity = document.getElementById('search-city').value;
    city = searchCity;
    // Forloop for putting persisting data onto page
    for (var i = 0; i < localStorage.length; i++) {
        var city = localStorage.getItem(i);
        console.log(localStorage.getItem("city"));
        var cityName = $(".list-group").addClass("list-group-item");
        // Put user search history in list below search field 
        cityName.append("<li>" + city + "<li>");
    }

}


function getWeather(cityName) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + APIKey;
    console.log(queryURL);
    fetch(queryURL)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function(data) {
            console.log("data",data);

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

            var template = "";
            list.forEach(function(item) {
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
            

            document.querySelector("#forecast").innerHTML = template;

        });
}



searchButton.addEventListener('click', function () {
    // get the user input
    var cityName = document.querySelector("#search-city").value;
    // get the current weather
    getWeather(cityName);
    // forecast
    forecast(cityName);
});



