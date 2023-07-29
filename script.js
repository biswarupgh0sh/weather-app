
let city = document.querySelector(".weather-location");
let dateTime = document.querySelector(".weather-datetime");
let weatherForecast = document.querySelector(".weather-forecast");
let weatherIcon = document.querySelector(".weather-icon");
let weatherTemperature = document.querySelector(".weather-temperature");
let weatherMaxTemp = document.querySelector(".maxvalue");
let weatherMinTemp = document.querySelector(".minvalue");
let weatherFeelsLike = document.querySelector(".weather-feels-like");
let weatherHumidity = document.querySelector(".weather-humidity");
let weatherAirPressure = document.querySelector(".weather-air-pressure");
let weatherWindSpeed = document.querySelector(".weather-wind-speed");
let weatherSearch = document.querySelector(".weather-search");
let searchForm = document.querySelector(".weather-search-form");
let weatherCelsius = document.querySelector(".weather-in-celsius")
let weatherFarenheit = document.querySelector(".weather-in-farenheit");


let currCity = 'kolkata';
let currUnit = 'metric';

const countryCodeSolve = (code) => {
    let regionName = new Intl.DisplayNames(['en'], {type: 'region'});
    return regionName.of(code);
}

const convertFromTimeStamp = (timestamp, timezone) => {
    let convertFromTimezone = timezone / 3600;

    const datetime = new Date(timestamp * 1000);
    const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timezone: `Etc/GMT${convertFromTimezone>=0? '-': '+'}${Math.abs(convertFromTimezone)}`,
        hours12: true
    }
    return datetime.toLocaleString("en-US", options);
}

weatherSearch.addEventListener('submit', (e) => {
    e.preventDefault();
    if(searchForm.value === ''){
        alert("you must type name of a city")
    } else {
        currCity = searchForm.value;
    }
    getWeather();
    searchForm.value = '';
})

const getWeather = async () => {
    const api = '38b392a3f906ac3c09fe6db2b8550995';
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currCity}&appid=${api}&units=${currUnit}`)
    const json = await res.json();
    city.innerHTML = `${json.name}, ${countryCodeSolve(json.sys.country)}`
    dateTime.innerHTML = convertFromTimeStamp(json.dt, json.timezone)
    weatherForecast.innerHTML = `${json.weather[0].main}`
    weatherIcon.src = `http://openweathermap.org/img/wn/${json.weather[0].icon}@4x.png`
    weatherTemperature.innerHTML = `${json.main.temp.toFixed()}&#176`
    weatherMinTemp.innerHTML = `Min: ${json.main.temp_min.toFixed()}&#176`
    weatherMaxTemp.innerHTML = `Max: ${json.main.temp_max.toFixed()}&#176`
    weatherFeelsLike.innerHTML = `${json.main.feels_like.toFixed()}&#176`
    weatherHumidity.innerHTML = `${json.main.humidity}%`
    weatherAirPressure.innerHTML = `${json.main.pressure}hPa`
    weatherWindSpeed.innerHTML = `<p>${json.wind.speed.toFixed(2)} ${currUnit === 'metric' ? 'meter/sec' : 'miles/hour'}</p>`
}


weatherCelsius.addEventListener('click', () => {
    if(currUnit !== 'metric') {
        currUnit = 'metric';
    }
    getWeather();
})

weatherFarenheit.addEventListener('click', () => {
    if(currUnit !== 'imperial') {
        currUnit = 'imperial';
    }
    getWeather();
})

// one can look at the below code if they are not familiar with asynchronous programming.
// const getWeather = () => {
//     fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currCity}&appid=${api}&units=${currUnit}`)
//     .then(res => res.json())
//     .then(json => {
//         city.innerHTML = `${json.name}, ${countryCodeSolve(json.sys.country)}`
//     })
// }

getWeather();
