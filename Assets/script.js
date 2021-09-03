// Global Variables 
var APIKey = "21023d394bba75abe7a047a4ef72171b";
var weatherInfo = document.getElementById("current-weather-details")
var searchBtn = document.getElementById("search-btn"); 



function getApi() {
    var city = document.getElementById("cityInput").value
    var requestUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        // for (var i = 0; i < data.length; i++) {

        //Reference html elements? 
        var location = document.getElementById("location"); 
        var temp = document.getElementById("temp"); 
        var wind = document.getElementById("wind"); 
        var humidity = document.getElementById("humidity"); 
        var uvIndex = document.getElementById("uv-index"); 

        //Set the text of html elements .something?
        location.textContent = data.name
        temp.textContent = "Temp: " + data.main.temp +"°F"
        wind.textContent = data.wind.speed + " mph"
        humidity.textContent = "Humidity: " + data.main.humidity + "%"

        oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&units=imperial&appid=${APIKey}`
        fetch(oneCallUrl)
        .then(response => response.json())
        .then(newData => {
            console.log(newData)
            uvIndex.textContent ="UVI: " + newData.current.uvi
            if(newData.current.uvi >=3 || newData.current.uvi < 5){
                uvIndex.setAttribute("style", "background-color: yellow;")
                } else if(newData.current.uvi >= 0 || newData.current.uvi < 2) {
                  uvIndex.setAttribute("style", "background-color: green;")
                } else if(newData.current.uvi >= 6 || newData.current.uvi < 7) {
                  uvIndex.setAttribute("style", "background-color: orange;")
                } else(newData.current.uvi >= 8 || newData.current.uvi < 11)

            var forecastDiv = document.getElementById("5-day-forecast")
            forecastDiv.innerHTML = "";
            for(i=1; i<6 ; i++) {
                var date = new Date(newData.daily[i].dt * 1000)
                var dateString = date.toString().split(" ")
                var formattedDate = `${dateString[0]} ${dateString[1]} ${dateString[2]} ${dateString[3]}`
                console.log(formattedDate)

                var newP = document.createElement("p");
                newP.textContent = formattedDate;
                forecastDiv.append(newP)
                
            }
        })
        //Appending the dynamically generated html to the div associated with the id="current-weather-details"
        // weatherInfo.append(location);
        // weatherInfo.append(temp);
        // weatherInfo.append(wind);
        // weatherInfo.append(humidity);
        // weatherInfo.append(uvIndex);
        // }
      });
  }
  searchBtn.addEventListener('click', getApi);









// function to get weather 

// function to get 5 day forecast

// Set up local storage 

// Function to save searched cities to local storage 

