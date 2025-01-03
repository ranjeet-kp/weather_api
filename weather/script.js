let cityName = document.querySelector(".weather-city");
let dateTime = document.querySelector(".weather-date-time");
let forecast = document.querySelector(".weather-forecast");
let icon = document.querySelector(".weather-icon");
let temperature = document.querySelector(".weather-temperature");
let weatherMin = document.querySelector(".weather-min");
let weatherMax = document.querySelector(".weather-max");
let feels = document.querySelector(".weather-feels");
let humidity = document.querySelector(".weather-humidity");
let w_wind = document.querySelector(".weather-wind");
let pressure = document.querySelector(".weather-pressure");
let citySearch = document.querySelector(".weather-search");

const getCountryName = (code)=>{
    return new Intl.DisplayNames([code], { type: 'region' }).of(code);
}
const getDateTime = (dt)=>{
    const date = new Date(dt*1000);

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    }

    const formator = new Intl.DateTimeFormat('en-US', options);
    return formator.format(date);
}

var city = "pune"; 

citySearch.addEventListener("submit",(e)=>{
    e.preventDefault();

    let cityName = document.querySelector(".searchname");

    city = cityName.value;
    // console.log(cityName.value);

    getWeatherData();

    cityName.value = "";
})

const getWeatherData = async ()=>{
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=a0b06669a793506ae54060f7df8a5fb6`;
   
    try{
        const res = await fetch(weatherUrl);    
        const data = await res.json();

        const {main, name, weather, wind, sys, dt} = data;
        
        cityName.innerHTML = `${name}, ${getCountryName(sys.country)}`;
        dateTime.innerHTML = `${getDateTime(dt)}`;

        forecast.innerHTML = `${weather[0].main}`;
        icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`;

        temperature.innerHTML = `${main.temp}&#176`;
        weatherMin.innerHTML = `Min: ${main.temp_min.toFixed()}&#176`;
        weatherMax.innerHTML = `Max: ${main.temp_max.toFixed()}&#176`;

        feels.innerHTML = `${main.feels_like}&#176`;
        humidity.innerHTML = `${main.humidity}%`;
        w_wind.innerHTML = `${wind.speed} m/s`;
        pressure.innerHTML = `${main.pressure} hPa`;
    }
    catch(error){
        console.log(error);
    }
};

document.body.addEventListener("load",getWeatherData());