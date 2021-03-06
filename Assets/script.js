// Global Variables 
var APIKey = "21023d394bba75abe7a047a4ef72171b";
var weatherInfo = document.getElementById("current-weather-details")
var searchedCities = document.getElementById("searched-cities")
var searchBtn = document.getElementById("search-btn"); 
var date = moment().format(" - dddd, MMMM Do, YYYY");
const cityWeatherKey = "cityWeather"
const uvIndexKey = "uvWeather"

// Date function
$("#location").text(date);

function getApi() {
    var city = document.getElementById("cityInput").value
    var requestUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        window.localStorage.setItem(cityWeatherKey, JSON.stringify(data))
        // for (var i = 0; i < data.length; i++) {

        //Reference html elements
        var location = document.getElementById("location"); 
        var icon = document.getElementById("icon"); 
        var temp = document.getElementById("temp"); 
        var wind = document.getElementById("wind"); 
        var humidity = document.getElementById("humidity"); 
        var uvIndex = document.getElementById("uv-index"); 

        //Set the text of html elements 
        location.textContent = data.name + date
        icon.textContent = data.weather.icon
        temp.textContent = "Temp: " + data.main.temp +"°F"
        wind.textContent = data.wind.speed + " MPH"
        humidity.textContent = "Humidity: " + data.main.humidity + "%"

        oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&units=imperial&appid=${APIKey}`
        fetch(oneCallUrl)
        .then(response => response.json())
        .then(newData => {
            console.log(newData)
            // set new key for uv index
            window.localStorage.setItem(uvIndexKey, JSON.stringify(newData))
            uvIndex.textContent ="UVI: " + newData.current.uvi
            if(newData.current.uvi >=3 && newData.current.uvi < 5){
                uvIndex.setAttribute("style", "background-color: yellow;")
                } else if(newData.current.uvi >= 0 && newData.current.uvi < 2) {
                  uvIndex.setAttribute("style", "background-color: green;")
                } else if(newData.current.uvi >= 6 && newData.current.uvi < 7) {
                  uvIndex.setAttribute("style", "background-color: orange;")
                } else if(newData.current.uvi >= 8 && newData.current.uvi < 11) {
                  uvIndex.setAttribute("style", "background-color: red;")
                }

            var forecastDiv = document.getElementById("5-day-forecast")
            forecastDiv.innerHTML = "";
            for(i=1; i<6 ; i++) {
                var date = new Date(newData.daily[i].dt * 1000)
                var dateString = date.toString().split(" ")
                var formattedDate = `${dateString[0]} ${dateString[1]} ${dateString[2]} ${dateString[3]}`
                console.log(formattedDate)

                var newP = document.createElement("p");
                newP.textContent = " " + formattedDate + " ";
                forecastDiv.append(newP)
                newP.setAttribute("style", "display: inline;", "margins: auto;")

                var p2 = document.createElement("p");
                p2.textContent = location

            }
        })
        
      });
  }
  searchBtn.addEventListener('click', getApi);

  // Local Storage save weather info to browser
function loadStoredData() {
  const dataString = window.localStorage.getItem(cityWeatherKey)

  if(!dataString) return
  const data = JSON.parse(dataString)

   //Reference html elements
   var location = document.getElementById("location"); 
   var temp = document.getElementById("temp"); 
   var wind = document.getElementById("wind"); 
   var humidity = document.getElementById("humidity"); 
   var uvIndex = document.getElementById("uv-index"); 

   //Set the text of html elements 
   location.textContent = data.name + date
   temp.textContent = "Temp: " + data.main.temp +"°F"
   wind.textContent = data.wind.speed + " MPH"
   humidity.textContent = "Humidity: " + data.main.humidity + "%"

   const newDataString = window.localStorage.getItem(uvIndexKey)
   if(!newDataString) return
   const newData = JSON.parse(newDataString)

   uvIndex.textContent ="UVI: " + newData.current.uvi
            if(newData.current.uvi >=3 && newData.current.uvi < 5){
                uvIndex.setAttribute("style", "background-color: yellow;")
                } else if(newData.current.uvi >= 0 && newData.current.uvi < 2) {
                  uvIndex.setAttribute("style", "background-color: green;")
                } else if(newData.current.uvi >= 6 && newData.current.uvi < 7) {
                  uvIndex.setAttribute("style", "background-color: orange;")
                } else if(newData.current.uvi >= 8 && newData.current.uvi < 11) {
                  uvIndex.setAttribute("style", "background-color: red;")
                }   
}
loadStoredData()



// local storage - save searched cities 


var numOfCities = document.getElementById("#num-of-cities")

 var cities = []
 

 function displayCities() {
   searchedCities.innerHTML = "";
   numOfCities.textContent = cities.length;
   numOfCities.setAttribute("style", "display: none")


   for (var i = 0; i < cities.length; i++) {
    var city = cities[i];

    var li = document.createElement("li");
    li.textContent = city;
    li.setAttribute("data-index", i);

    var button = document.createElement("button");
    button.textContent = "Remove";

    li.appendChild(button);
    searchedCities.appendChild(li);
  }
}

function showCities(){
  var storedCities = JSON.parse(localStorage.getItem("cities"));

  if(!storedCities) return

  displayCities();
}

function storeCities() {
  localStorage.setItem("cities", JSON.stringify(cities));
}

