// api 
// http://api.openweathermap.org/data/2.5/weather?q=Baltimore,US&APPID=b1878f2ffc29aff5ccaab85e9e259392&units=imperial



const apiKey = "b1878f2ffc29aff5ccaab85e9e259392";
const apiURL = "http://api.openweathermap.org/data/2.5/weather?units=imperial&q=";

const searchBox =  document.querySelector(".weather-search input");
const searchBtn =  document.querySelector(".weather-search button");
const weatherIcon = document.querySelector(".weather-icon .icon");

const iconClear = "svg code";

async function checkWeather(city){
    const response = await fetch(apiURL + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".weather-display").style.display = "none";
        document.querySelector(".weather-error").style.display = "block";
    } else {
        var data = await response.json();
        console.log(data);
    
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".actual").innerHTML = Math.round(data.main.temp) + "°F";
        document.querySelector(".feels-like").innerHTML = "<em>Feels like</em> " + Math.round(data.main.feels_like) + "°F";
        document.querySelector(".description").innerHTML = data.weather[0].description;
        document.querySelector(".humidity").innerHTML = "<em class='sr-only'>Humidity</em> " + data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = "<em class='sr-only'>Wind</em> " + data.wind.speed + " mph";
        
        document.querySelector(".sunrise").innerHTML = "<em class='sr-only'>Sunrise</em> " + moment(data.sys.sunrise * 1000).format('h:mm a');  
        document.querySelector(".sunset").innerHTML = "<em class='sr-only'>Sunset</em> " + moment(data.sys.sunset * 1000).format('h:mm a');   

        if (data.weather[0].main == "Clear") {
            weatherIcon.innerHTML = '<img src="/fair-weather/img/clear.svg" alt="Clear" />'
        } else if (data.weather[0].main == "Clouds") {
            weatherIcon.innerHTML = '<img src="/fair-weather/img/clouds.svg" alt="Clouds" />'
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.innerHTML = '<img src="/fair-weather/img/Drizzle.svg" alt="Drizzle" />'
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.innerHTML = '<img src="/fair-weather/img/Mist.svg" alt="Mist" />'
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.innerHTML = '<img src="/fair-weather/img/Rain.svg" alt="Rain" />'
        } else if (data.weather[0].main == "Snow") {
            weatherIcon.innerHTML = '<img src="/fair-weather/img/Snow.svg" alt="Snow" />'
        }
    
        document.querySelector(".weather-display").style.display = "block";
        document.querySelector(".weather-error").style.display = "none";
    }

};

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
});