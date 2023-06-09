$(document).ready(function () {

  let currentDate = moment().format("L");


  function defaultCity() {
    cityName = "Austin";
    findCity();
  }
 
  defaultCity();

  let cityHistory = JSON.parse(localStorage.getItem("city")) || [];


  $("#get-results").on("click", (event) => {
    event.preventDefault();
    getCityName();
    findCity();
  
    if (cityHistory.includes(cityName) === false) {
      cityHistory.push(cityName);
      localStorage.setItem("city", JSON.stringify(cityHistory));
    }
  
    $("#stored-cities").html("");
    
    for (var i = 0; i < cityHistory.length && i < 10; i++) {
      renderPastCity(cityHistory[i]);
    }
  });

  for (var i = 0; i < cityHistory.length && i < 10; i++) {
    renderPastCity(cityHistory[i]);
  }


  function renderPastCity(cityText) {
    let cityItem = $("<li>").addClass("city-li").text(cityText);
    $("#stored-cities").append(cityItem);

 
    $("#stored-cities li").on("click", (event) => {

      let runAgain = $(event.target);
      cityName = runAgain.text();
    
      return findCity(cityName);
    });
  }


  $("#clear").on("click", () => {
    localStorage.removeItem("city");
    $("#stored-cities").empty();
  });

  function getCityName() {
    cityName = $("#city-name").val();
  
    if (!cityName) {
      window.alert("Please enter a city name");
      return;
    } else {
      return cityName;
    }
  };

  function findCity() {
    $.ajax({
      url:
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        cityName +
        "&units=imperial&appid=cb32126a8e0dc1a5be8e3ad121f71997",

      method: "GET",
    }).then(function (response) {
      //weather variables from api
      let cityID = response.id;
      let currentName = response.name;
      let currentIcon = response.weather[0].icon;
      let currentTemp = response.main.temp;
      let currentHum = response.main.humidity;
      let currentWind = response.wind.speed;
      console.log(cityID);

      //render variables from api onto page
      $("#current-name").text(currentName);
      $("#current-date").text(currentDate);
      $("#icon").html(`<img src="./imgs/${currentIcon}.png">`);
      $("#current-temp").text(
        "Current Temperature in (F): " + currentTemp + "°"
      );
      $("#humidity").text("Current Humidity Levels: " + currentHum + "%");
      $("#wind").text("Current Wind Speeds: " + currentWind + "mph");

      getFiveDays(cityID);
    });
  }

  function getFiveDays(cityID) {
    $.ajax({
      url:
        "https://api.openweathermap.org/data/2.5/forecast?id=" +
        cityID +
        "&units=imperial&appid=cb32126a8e0dc1a5be8e3ad121f71997",
      method: "GET",
    }).then(function (response) {
      const weatherCards = document.querySelectorAll(".cards");
      for (var i = 0; i < weatherCards.length; i++) {
        weatherCards[i].innerHTML = "";
    
        let forecastDate = moment()
          .add(1 + i, "days")
          .format("l");
        let forecastDateEl = document.createElement("p");
        forecastDateEl.innerHTML = forecastDate;
        weatherCards[i].append(forecastDateEl);

        let forecastIcon = response.list[i].weather[0].icon;
        let forecastIconEl = document.createElement("img");
        forecastIconEl.setAttribute("src", `./imgs/${forecastIcon}.png`); 
        weatherCards[i].append(forcastIconEl);

        let forecastTemp = response.list[i].main.temp;
        let forecastTempEl = document.createElement("p");
        forecastTempEl.innerHTML = "Temp: " + forecastTemp + "° (F)";
        weatherCards[i].append(forecastTempEl);

   
        let forecastHum = response.list[i].main.humidity;
        let forecastHumEl = document.createElement("p");
        forecastHumEl.innerHTML = "Humidity: " + forecastHum + "%";
        weatherCards[i].append(forecastHumEl);

    
        let forecastWind = response.list[i].wind.speed;
        let forecastWindEl = document.createElement("p");
        forecastWindEl.innerHTML = "Wind: " + forecastWind + "mph";
        weatherCards[i].append(forecastWindEl);
      }
    });
  }
});  


        