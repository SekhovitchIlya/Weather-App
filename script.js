const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const API_ID = '5df828ef933f8720cbba3adaa77e393c';
const now = new Date();

const form = document.querySelector('#form');
const cityInput = document.querySelector('#input-city');
const month = document.querySelector('#month');
const date = document.querySelector('#date');
const day = document.querySelector('#day');
const hours = document.querySelector('#hours');
const minutes = document.querySelector('#minutes');
const currentBtn = document.querySelector('#current-button');
const currentCity = document.querySelector('#current-city');
const temp = document.querySelector('#day-temp');
const rain = document.querySelector('#rain');
const wind = document.querySelector('#wind');
const sky = document.querySelector('#sky');
const icon = document.querySelector('#weather-icon');
const celsius = document.querySelector('#celsius');
const fahrenheit = document.querySelector('#fahrenheit');

hours.textContent = now.getHours();
minutes.textContent = now.getMinutes();
day.textContent = days[now.getDay()];
month.textContent = months[now.getMonth()];
date.textContent = now.getDate();

const currentPositionWeather = () => {
  
  const displayTemp = (response) => {
    currentCity.innerHTML = response.name;
    temp.innerHTML = Math.round(response.main.temp);
  };

  const getPosition = async (position) => {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${API_ID}`
    );

    const data = await res.json();

    displayTemp(data);
  };

  navigator.geolocation.getCurrentPosition(getPosition);
};

let celsiusTemp;
const displayWeather = (response) => {  
  celsiusTemp = response.main.temp
  temp.textContent = Math.round(celsiusTemp)
  currentCity.textContent = response.name;
  rain.textContent = response.main.humidity;
  wind.textContent = Math.round(response.wind.speed);
  sky.textContent = response.weather[0].description;
  icon.setAttribute(
    'src',
    `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`
  );
};

const search = async (city) => {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_ID}&units=metric`
    );
    const data = await res.json();
    displayWeather(data);
  }
  catch(error) {
    alert('Ошибка сервера ' + error);
  }
};

const pressSubmit = (e) => {
  e.preventDefault();
  cityInput.value;
  search(cityInput.value);
};

const displayFahrenheit = () => {
  temp.textContent = Math.round((celsiusTemp * 9) / 5 + 32)
}

const displayCelsius = () => {
  temp.textContent = Math.round((celsiusTemp))
}

form.addEventListener('submit', pressSubmit);
currentBtn.addEventListener('click', currentPositionWeather);
celsius.addEventListener('click', displayCelsius)
fahrenheit.addEventListener('click', displayFahrenheit)

search('Minsk');