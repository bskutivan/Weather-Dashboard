// search for city
    // fetch request for city info
    // capture data 
    // feed data to new function

// display city
    // take fed data and display city info and adjust card info

// city search handler function
    // captures input value and feeds into search city function
var searchCity = function() {
    var apiUrl = "http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=e51cf34ee1831280d9d0aec1b510446b"

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
            })
        } else {
            alert("Error: " + response.statusText);
        }
    })


}

