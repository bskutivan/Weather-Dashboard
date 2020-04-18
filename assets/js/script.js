// search for city
    // fetch request for city info
    // capture data 
    // feed data to new function

// display city
    // take fed data and display city info and adjust card info

// city search handler function
    // captures input value and feeds into search city function
var searchFormEl = document.getElementById("searchForm");
var searchInputEl = document.getElementById("search");

var displayCurrentWeather = function() {
    
}

var searchSubmitHandler = function(event) {
    event.preventDefault();
    
    var city = searchInputEl.value.trim();

    if(city) {
        searchCityCurrent(city);

        searchInputEl.value = "";
    } else {
        alert("Please enture the name of the city you want the forecast for.");
    }
}

var searchCityCurrent = function(city) {
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&APPID=e51cf34ee1831280d9d0aec1b510446b"

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayCurrentWeather(data);
            });
        } else {
            alert("Error: " + response.statusText);
        }
})

}

searchFormEl.addEventListener("submit", searchSubmitHandler)