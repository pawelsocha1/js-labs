const apiKey = '448512eb5939b50a90d95ca8051327d3';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
const addForm = document.getElementById('add-form');
const deleteForm = document.getElementById('delete-form');
const locationInput = document.getElementById('location-input');
const locationSelect = document.getElementById('location-select');

// pobierz pogodę dla wszystkich miejsc zapisanych w localStorage
for (let i = 0; i < localStorage.length; i++) {
  const location = localStorage.key(i);
  getWeather(location);
}

addForm.addEventListener('submit', event => {
  event.preventDefault();
  const location = locationInput.value;
  // sprawdź, czy miejsce już istnieje w localStorage
  if (localStorage.getItem(location)) {
    alert(`Miejsce "${location}" już istnieje`);
  } else if (localStorage.length >= 10) {
    alert('Osiągnięto limit miejsc');
  } else {
    localStorage.setItem(location, location);
    locationInput.value = '';
    updateLocationSelect();
    getWeather(location);
  }
});

deleteForm.addEventListener('submit', event => {
  event.preventDefault();
  const location = locationSelect.value;
  localStorage.removeItem(location);
  updateLocationSelect();
});

function updateLocationSelect() {
  // usuń wszystkie opcje z locationSelect
  locationSelect.innerHTML = '';
  // dla każdego miejsca w localStorage, dodaj opcję do locationSelect
  for (let i = 0; i < localStorage.length; i++) {
    const location = localStorage.key(i);
    const option = document.createElement('option');
    option.value = location;
    option.textContent = location;
    locationSelect.appendChild(option);
  }
}

function getWeather(location) {
  const url = `${baseUrl}?q=${location}&appid=${apiKey}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      // pobierz temperaturę w stopniach Celsjusza
      const temperature = data.main.temp - 273.15;
      // pobierz wilgotność
      const humidity = data.main.humidity;
      // wyświetl informacje pogodowe
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
  locationDiv.textContent = location;
  const infoDiv = document.createElement('div');
  infoDiv.textContent = weatherInfo;
  weatherDiv.appendChild(locationDiv);
  weatherDiv.appendChild(infoDiv);
}
