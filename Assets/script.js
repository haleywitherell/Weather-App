// Global Variables 
var APIKey = "21023d394bba75abe7a047a4ef72171b";
var weatherInfo = document.getElementById("current-weather-details")
var searchBtn = document.getElementById("search-btn"); 
var date = moment().format(" - dddd, MMMM Do, YYYY");

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
        // for (var i = 0; i < data.length; i++) {

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

        oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&units=imperial&appid=${APIKey}`
        fetch(oneCallUrl)
        .then(response => response.json())
        .then(newData => {
            console.log(newData)
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
                newP.textContent = formattedDate;
                forecastDiv.append(newP)


        //         //Creating a h3 element and a p element
        // var userName = document.createElement('h3');
        // var userUrl = document.createElement('p');

        // //Setting the text of the h3 element and p element.
        // userName.textContent = data[i].login;
        // userUrl.textContent = data[i].url;

        // //Appending the dynamically generated html to the div associated with the id="users"
        // //Append will attach the element as the bottom most child.
        // usersContainer.append(userName);
        // usersContainer.append(userUrl);
            }
        })
        
      });
  }
  searchBtn.addEventListener('click', getApi);



// local storage - save searched cities 
var cityInput = document.querySelector("#cityInput")
var searchedCities = document.querySelector("#searched-cities")
var cityAmount = document.querySelector("#city-amount")

var cities = []; 

function renderCities() {
  searchedCities.innerHTML = "";
  

    var li = document.createElement("li");
    li.textContent = city;
    li.setAttribute("data-index", i);

    var button = document.createElement("button");
    button.textContent = "Remove";

    li.appendChild(button);
    searchedCities.appendChild(li);
}

function previousCities() {
  var storedCities = JSON.parse(localStorage.getItem("cities"));

  if(storedCities !== null) {
    cities = storedCities
  }
  renderCities();
}

function storeCities() {
  localStorage.setItem("cities", JSON.stringify(cities));
}

cities.push(cityInput);
cityInput.value = "";

storeCities();
renderCities();

previousCities();



// function to get 5 day forecast

// Set up local storage 

// Function to save searched cities to local storage 

