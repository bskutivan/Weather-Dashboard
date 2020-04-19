    //current conditions variables and search form
var searchFormEl = document.getElementById("searchForm");
var searchInputEl = document.getElementById("search");
var cityNameEl = document.getElementById("cityNameText");
var iconEl = document.getElementById("icon");
var currentTempEl = document.getElementById("currentTemp");
var currentHumidityEl = document.getElementById("currentHumidity")
var currentWindSpeedEl = document.getElementById("currentWindSpeed")
var currentUVEl = document.getElementById("currentUV")


var displayCurrentWeather = function(data) {
    //variables defined to retain data points needed to pass into UV fetch request and populate current weather section
    var lon = data.coord.lon;
    var lat = data.coord.lat;
    //get city name
    var city = data.name;
    var cityTitleEl = document.createElement("span")
    cityTitleEl.innerHTML = city

    //get temp
    var temp = data.main.temp;
    currentTempEl.innerHTML = " " + temp + "°F"

    //get humidity
    var humidity = data.main.humidity;
    currentHumidityEl.innerHTML = " " + humidity + "%"

    //get wind speed
    var windSpd = data.wind.speed;
    currentWindSpeedEl.innerHTML = " " + windSpd + "MPH"

    
    //get icon code
    var iconCode = data.weather[0].icon;
    iconEl.setAttribute("src","http://openweathermap.org/img/wn/" + iconCode +"@2x.png");
    //get date code
    var date = moment.unix(data.dt).format("L")
    var dateEl = document.createElement("span")
    dateEl.innerHTML = " (" + date + ")"
    
    var cityTitleEl = document.createElement("span")
    cityTitleEl.innerHTML = city
   
    
    //appending elements to Current Weather section
    cityNameEl.appendChild(cityTitleEl);
    cityNameEl.appendChild(dateEl);
    
    searchCityUV(lon, lat, city);
}

var displayCurrentUV = function(data) {
    var uv = data.value;
    console.log(uv)
    if (uv >= 6) {
        currentUVEl.classList="bg-danger m-3 p-2 border rounded text-center";
        currentUVEl.innerHTML=" " + uv + " ";
    } else if (uv > 3) {
        currentUVEl.classList="bg-warning m-3 p-2 border rounded text-center";
        currentUVEl.innerHTML=" " + uv + " ";
    } else {
    currentUVEl.classList="bg-primary m-3 p-2 border rounded text-center";
    currentUVEl.innerHTML=" " + uv + " ";
    }
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