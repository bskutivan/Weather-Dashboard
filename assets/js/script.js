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
var cityNameEl = document.getElementById("cityNameText");
var iconEl = document.getElementById("icon");

var displayCurrentWeather = function(data) {
    //variables defined to retain data points needed to pass into UV fetch request and populate current weather section
    var lon = data.coord.lon;
    var lat = data.coord.lat;
    var city = data.name;
    //var temp = data.main.temp
    
    var iconCode = data.weather[0].icon;
    console.log(iconCode);
    iconEl.setAttribute("src","http://openweathermap.org/img/wn/" + iconCode +"@2x.png");
    console.log(iconEl);
    var date = moment.unix(data.dt).format("L")
    var dateEl = document.createElement("span")
    dateEl.innerHTML = "(" + date + ")"
    
    
    var cityTitleEl = document.createElement("span")
    cityTitleEl.innerHTML = city
   
    
    //appending elements to Current Weather section
    cityNameEl.appendChild(cityTitleEl);
    cityNameEl.appendChild(dateEl);
    

    console.log(date)
    searchCityUV(lon, lat, city);
}

var displayCurrentUV = function() {
    console.log("sunburns")
}

var searchSubmitHandler = function(event) {
    event.preventDefault();
    
    var city = searchInputEl.value.trim();
    cityNameEl.innerHTML = ""
    if(city) {
        searchCityCurrent(city);
        searchInputEl.value = "";
    } else {
        alert("Please enture the name of the city you want the forecast for.");
    }
}

var searchCityUV = function(lon, lat, city) {
    console.log(lon);
    console.log(lat);
    console.log(city);

    var apiUrl = "http://api.openweathermap.org/data/2.5/uvi?q=" + city + "&APPID=e51cf34ee1831280d9d0aec1b510446b&lat=" + lat + "&lon=" +lon;

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayCurrentUV(data);
            });
        } else {
            alert("Error: " + response.statusText);
        }
    })
}

var searchCityCurrent = function(city) {
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&APPID=e51cf34ee1831280d9d0aec1b510446b"

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayCurrentWeather(data, city);
            });
        } else {
            alert("Error: " + response.statusText);
        }
})

}

searchFormEl.addEventListener("submit", searchSubmitHandler)