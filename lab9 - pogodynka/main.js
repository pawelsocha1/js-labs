const apiKey = '448512eb5939b50a90d95ca8051327d3';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
const addForm = document.getElementById('add-form');
const locationInput = document.getElementById('location-input');
const locationSelect = document.getElementById('location-select');

for (let i = 0; i < localStorage.length; i++) {
  const location = localStorage.key(i);
  getWeather(location);
}

addForm.addEventListener('submit', event => {
  event.preventDefault();
  const location = locationInput.value;
  if (localStorage.getItem(location)) {
    alert(`Miasto "${location}" już jest na liście`);
  } else if (localStorage.length >= 10) {
    alert('Osiągnąłeś limit miast');
  } else {
    localStorage.setItem(location, location);
    locationInput.value = '';
    getWeather(location);
  }
});



function getWeather(location) {
  const url = `${baseUrl}?q=${location}&appid=${apiKey}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const temperature = data.main.temp - 273.15;
      const humidity = data.main.humidity;
      const weatherInfo = `Temperatura: ${temperature}°C, Wilgotność: ${humidity}%`;
      displayWeather(location, weatherInfo);
    })
    .catch(error => {
      console.error(error);
    });
}

function displayWeather(location, weatherInfo) {
  const weatherDiv = document.getElementById('weather');
  const locationDiv = document.createElement('div');
  locationDiv.id = location;
  locationDiv.textContent = location;
  const infoDiv = document.createElement('div');
  infoDiv.textContent = weatherInfo;
  weatherDiv.appendChild(locationDiv);
  weatherDiv.appendChild(infoDiv);
  const delBtn = document.createElement('button');
  delBtn.textContent = 'Delete';
  delBtn.classList.add('delBtn');
  delBtn.addEventListener('click', () => {
    weatherDiv.removeChild(locationDiv);
    weatherDiv.removeChild(infoDiv);
    weatherDiv.removeChild(delBtn);
    localStorage.removeItem(location);
    updateLocationSelect();
  });
  weatherDiv.appendChild(delBtn);
}

