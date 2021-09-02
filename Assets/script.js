// Global Variables 
var APIKey = "21023d394bba75abe7a047a4ef72171b";
var city = ""
var weatherInfo = document.getElementById("current-weather-details")
var searchBtn = document.getElementById("search-btn"); 


// fetch method syntax

// fetch(requestURL)
// .then(function (response) {
//     return response.json();
// })
// .then(function (data) {
//     console.log('Fetch Response \n-------------');
//     console.log(data);
//     for (var i = 0; i < data.length; i++) {
//         console.log(data[i].url);
//         console.log(data[i].user.login);
//       }
// })



function getApi() {
    var requestUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        for (var i = 0; i < data.length; i++) {

        //Reference html elements? 
        var location = document.getElementById("location"); 
        var temp = document.getElementById("temp"); 
        var wind = document.getElementById("wind"); 
        var humidity = document.getElementById("humidity"); 
        var uvIndex = document.getElementById("uv-index"); 

        //Set the text of html elements .something?
        location.textContent = data[i].
        temp.textContent = data[i].
        wind.textContent = data[i].
        humidity.textContent = data[i].
        uvIndex.textContent = data[i].
  
        //Appending the dynamically generated html to the div associated with the id="current-weather-details"
        weatherInfo.append(location);
        weatherInfo.append(temp);
        weatherInfo.append(wind);
        weatherInfo.append(humidity);
        weatherInfo.append(uvIndex);
        }
      });
  }
  searchBtn.addEventListener('click', getApi);









// function to get weather 

// function to get 5 day forecast

// Set up local storage 

// Function to save searched cities to local storage 

