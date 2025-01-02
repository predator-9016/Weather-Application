let cityName = document.querySelector('.weather_city');
let dateTime = document.querySelector('.weather_date_time');
let w_forecast = document.querySelector('.weather_forecast');
let w_icon = document.querySelector('.weather_icon');
let w_temp = document.querySelector('.weather_temperature');
let w_minTem = document.querySelector('.weather_min');
let w_maxTem = document.querySelector('.weather_max');
let w_feelsLike = document.querySelector('.weather_feelsLike');
let w_humidity = document.querySelector('.weather_humidity');
let w_wind = document.querySelector('.weather_wind');
let w_pressure = document.querySelector('.weather_pressure');
let citySearch = document.querySelector('.weather-search');
let city = 'Navsari';

citySearch.addEventListener('submit', (e) => {
    e.preventDefault();
    let cityNameInput = document.querySelector('#search');
    city = cityNameInput.value;
    getWeatherData();
    cityNameInput.value = '';
});

const getCountryName = (countryCode) => {
    return new Intl.DisplayNames(['en'], {type: 'region'}).of(countryCode);
};

const getDateTime = (dt) => {
    const curDate = new Date(dt * 1000);
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZoneName: 'short'
    };
    const formatter = new Intl.DateTimeFormat('en-IN', options);
    return formatter.format(curDate);
};

const getWeatherData = async () => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=78da0b2e0a56a7a68f99d04bd2fbb230&units=metric`;
    try {
        const response = await fetch(weatherUrl);
        const data = await response.json();
        updateWeatherData(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
};

const updateWeatherData = (data) => {
    cityName.textContent = `${data.name}, ${getCountryName(data.sys.country)}`;
    dateTime.textContent = getDateTime(data.dt);
    w_forecast.textContent = data.weather[0].description;
    w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather icon">`;
    w_temp.textContent = `${data.main.temp}°C`;
    w_minTem.textContent = `Min: ${data.main.temp_min}°C`;
    w_maxTem.textContent = `Max: ${data.main.temp_max}°C`;
    w_feelsLike.textContent = `${data.main.feels_like}°C`;
    w_humidity.textContent = `${data.main.humidity}%`;
    w_wind.textContent = `${data.wind.speed} m/s`;
    w_pressure.textContent = `${data.main.pressure} hPa`;
};

// Initial call to display weather data for the default city
getWeatherData();