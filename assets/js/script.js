//current conditions variables and search form variables
var searchFormEl = document.getElementById("searchForm");
var searchInputEl = document.getElementById("search");
var cityNameEl = document.getElementById("cityNameText");
var iconEl = document.getElementById("icon");
var currentTempEl = document.getElementById("currentTemp");
var currentHumidityEl = document.getElementById("currentHumidity");
var currentWindSpeedEl = document.getElementById("currentWindSpeed");
var currentUVEl = document.getElementById("currentUV");
var cityHistoryEl = document.getElementById("cityHistory")

var savedCities = [];

//5 day focast variables
var forecastEl = document.getElementById("forecast");

    // day one
    var day1DateEl = document.getElementById("day1Date");
    var day1IconEl = document.getElementById("day1Icon");
    var day1TempEl = document.getElementById("day1Temp");
    var day1HumEl = document.getElementById("day1Hum");

    // day two
    var day2DateEl = document.getElementById("day2Date");
    var day2IconEl = document.getElementById("day2Icon");
    var day2TempEl = document.getElementById("day2Temp");
    var day2HumEl = document.getElementById("day2Hum");

    //day three
    var day3DateEl = document.getElementById("day3Date");
    var day3IconEl = document.getElementById("day3Icon");
    var day3TempEl = document.getElementById("day3Temp");
    var day3HumEl = document.getElementById("day3Hum");

    //day four
    var day4DateEl = document.getElementById("day4Date");
    var day4IconEl = document.getElementById("day4Icon");
    var day4TempEl = document.getElementById("day4Temp");
    var day4HumEl = document.getElementById("day4Hum");

    //day five
    var day5DateEl = document.getElementById("day5Date");
    var day5IconEl = document.getElementById("day5Icon");
    var day5TempEl = document.getElementById("day5Temp");
    var day5HumEl = document.getElementById("day5Hum");
// end of forecase variable

// start of functions

    var displayCurrentWeather = function(data) {
    //variables defined to retain data points needed to pass into UV fetch request and populate current weather section
    var lon = data.coord.lon;
    var lat = data.coord.lat;
    
    //clear data conditional
    var clearData = cityNameEl.firstChild;

    if (clearData) {
        var clearMe = document.getElementById("clearMe");
        var clearMeAlso = document.getElementById("clearMeAlso");
        clearMe.remove();
        clearMeAlso.remove();
    }

    //get city name
    var city = data.name;
    var cityTitleEl = document.createElement("h3")
    cityTitleEl.innerHTML = city
    cityTitleEl.classList = "d-inline"
    cityTitleEl.setAttribute("id", "clearMe")

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
    var dateEl = document.createElement("h3")
    dateEl.innerHTML = " (" + date + ")"
    dateEl.classList = "d-inline"
    dateEl.setAttribute("id", "clearMeAlso")
    
    
    //appending elements to Current Weather section
    cityNameEl.appendChild(cityTitleEl);
    cityNameEl.appendChild(dateEl);
    
    searchCityUV(lon, lat, city);
}

var displayCurrentUV = function(data) {
    var uv = data.value;
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

var displayForecastWeather = function(data) {
    //remove hide from forecast div
    forecastEl.classList= "p-3"
    
    // day 1 data
    var day1Date = moment.unix(data.list[2].dt).format("L");
    day1DateEl.innerHTML= " (" + day1Date + ")";

    var day1Icon = data.list[2].weather[0].icon;
    day1IconEl.setAttribute("src", "http://openweathermap.org/img/wn/" + day1Icon +"@2x.png");

    var day1Temp = data.list[2].main.temp;
    day1TempEl.innerHTML= " " + day1Temp + " ";

    var day1Hum = data.list[2].main.humidity;
    day1HumEl.innerHTML= " " + day1Hum + "%";
  

    // day 2 data
    var day2Date = moment.unix(data.list[10].dt).format("L");
    day2DateEl.innerHTML= " (" + day2Date + ")";

    var day2Icon = data.list[10].weather[0].icon;
    day2IconEl.setAttribute("src", "http://openweathermap.org/img/wn/" + day2Icon +"@2x.png");

    var day2Temp = data.list[10].main.temp;
    day2TempEl.innerHTML= " " + day2Temp + " ";

    var day2Hum = data.list[10].main.humidity;
    day2HumEl.innerHTML= " " + day2Hum + "%";

    // day 3 data
    var day3Date = moment.unix(data.list[18].dt).format("L");
    day3DateEl.innerHTML= " (" + day3Date + ")";

    var day3Icon = data.list[18].weather[0].icon;
    day3IconEl.setAttribute("src", "http://openweathermap.org/img/wn/" + day3Icon +"@2x.png");

    var day3Temp = data.list[18].main.temp;
    day3TempEl.innerHTML= " " + day3Temp + " ";

    var day3Hum = data.list[18].main.humidity;
    day3HumEl.innerHTML= " " + day3Hum + "%";

    // day 4 data
    var day4Date = moment.unix(data.list[26].dt).format("L");
    day4DateEl.innerHTML= " (" + day4Date + ")";

    var day4Icon = data.list[26].weather[0].icon;
    day4IconEl.setAttribute("src", "http://openweathermap.org/img/wn/" + day4Icon +"@2x.png");

    var day4Temp = data.list[26].main.temp;
    day4TempEl.innerHTML= " " + day4Temp + " ";

    var day4Hum = data.list[26].main.humidity;
    day4HumEl.innerHTML= " " + day4Hum + "%";

    // day 5 data
    var day5Date = moment.unix(data.list[34].dt).format("L");
    day5DateEl.innerHTML= " (" + day5Date + ")";

    var day5Icon = data.list[34].weather[0].icon;
    day5IconEl.setAttribute("src", "http://openweathermap.org/img/wn/" + day5Icon +"@2x.png");

    var day5Temp = data.list[34].main.temp;
    day5TempEl.innerHTML= " " + day5Temp + " ";

    var day5Hum = data.list[34].main.humidity;
    day5HumEl.innerHTML= " " + day5Hum + "%";


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
    
    //clear out current information before displaying new information

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

var searchCityForecast = function(city) {
    var apiUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=e51cf34ee1831280d9d0aec1b510446b"

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayForecastWeather(data, city);
            });
        } else {
            alert("Error: " + response.statusText);
        }
    })
}

var saveCity = function(city) {
    var cityEl = document.createElement("li");
    cityEl.innerText = city;
    cityEl.classList = "list-group-item onHover"
    cityHistoryEl.appendChild(cityEl);

    savedCities.push(city);

    localStorage.setItem("city", JSON.stringify(savedCities));
    console.log(savedCities);
}

var loadSavedCities = function() {
    var savedCityUnParsed = localStorage.getItem("city");
    
    if (!savedCityUnParsed) {
        return false;
    };
    
    savedCity = JSON.parse(savedCityUnParsed);

    for (i = 0; i < savedCity.length; i++ ) {
        var cityEl = document.createElement("li")
        cityEl.innerText = savedCity[i];
        cityEl.classList = "list-group-item onHover"
        cityHistoryEl.appendChild(cityEl);
    };
}

var cityHistoryEventHandler = function(event) {
    event.preventDefault();

    var city = event.target.innerHTML;
    localStorage.getItem(city);

    searchCityCurrent(city);
    searchCityForecast(city);
}

var searchSubmitHandler = function(event) {
    event.preventDefault();

    var city = searchInputEl.value.trim();
    if(city) {
        searchCityCurrent(city);
        searchCityForecast(city);
        saveCity(city);
        searchInputEl.value = "";
    } else {
        alert("Please enter the name of the city you want the forecast for.");
    }
}

loadSavedCities();

cityHistoryEl.addEventListener("click", cityHistoryEventHandler)
searchFormEl.addEventListener("submit", searchSubmitHandler)