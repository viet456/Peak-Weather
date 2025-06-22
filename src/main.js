import './style.css'
import { getWeather } from './api/weather'
import { getLocations } from './api/locations';
import { formatLocationForSearch, formatLocationForDisplay } from './utils/formatLocation';
import { displayCurrentWeather } from './ui/displayCurrent';
import { getSystemUnit, setSystemUnit } from './utils/settings';
import { updateSystemUnit } from './ui/unitSystemToggle';
import { displayTodayWeather } from './ui/displayToday';
import { processCurrentData, processTodayData, processDailyData, processHourlyData } from './utils/weatherDataProcessor';
import { displayDaily } from './ui/displayDaily';
import { displayHourlyWeather } from './ui/displayHourly';

// DOM elements
const searchResultsContainer = document.getElementById('search-results');
const searchInput = document.getElementById('search-input');
const weatherContainer = document.getElementById('weather-container');
const unitToggleBtn = document.getElementById('unit-toggle-btn');

let lastLoadedLocation = null;
let lastLoadedWeatherData = null;



// show location matches
async function renderLocationDropdown(locations) {
  if (!locations) {
    return null;
  }
  searchResultsContainer.innerHTML = '';
  searchResultsContainer.classList.remove('hidden');

  // handle no search results
  if (locations.length === 0 && searchInput.value !== '') {
    searchResultsContainer.innerHTML = '<div class="location-result-item">No results found</div>';
    return;
  }

  locations.forEach(location => {
    const locationEl = document.createElement('div');
    locationEl.classList.add('location-result-item');

    // only include admin1 for countries that use states/provinces
    locationEl.textContent = formatLocationForSearch(location);

    // click on location to display its weather
    // mousedown fires before blur-out of searchbox
    locationEl.addEventListener('mousedown', async () => {
      handleLocationSelection(location);
    })
    searchResultsContainer.append(locationEl);
  });;
}

async function handleSearch(query) {
  if (!query || query.length < 2) {
    searchResultsContainer.classList.add('hidden');
    searchResultsContainer.innerHTML = '';
    return;
  }
  const locations = await getLocations(query);
  renderLocationDropdown(locations);
  console.log('searched');
}

// handle user selection of a location
async function handleLocationSelection(location) {
  lastLoadedLocation = location;
  // update the input and hide the dropdown
  searchInput.value = '';
  searchInput.blur();
  searchResultsContainer.innerHTML = '';
  searchResultsContainer.classList.add('hidden');

  // get weather data and display it
  const weatherData = await getWeather(location.lat, location.lon);
  lastLoadedWeatherData = weatherData;
  //displayCurrentWeather(weatherData, location, temperatureUnit);
  renderWeather(weatherData, location)
}

function renderWeather(weatherData, location) {
  let systemUnit = getSystemUnit();
  const currentData = processCurrentData(weatherData);
  const todayData = processTodayData(weatherData);
  const dailyData = processDailyData(weatherData);
  const hourlyData = processHourlyData(weatherData);

  displayCurrentWeather(currentData, location, systemUnit);
  displayTodayWeather(todayData, location, systemUnit);
  displayDaily(dailyData, location, systemUnit);
  displayHourlyWeather(hourlyData, location, systemUnit);
}

// handles user's settings
function initializeSettings() {
  if (getSystemUnit() === 'metric') {
    unitToggleBtn.textContent = 'C';
  } else {
    unitToggleBtn.textContent = 'F';
  }

  // day/night mode:
}

// main initialization
function init() {
  // pull user settings
  initializeSettings();

  // toggle button switches temperature scale
  unitToggleBtn.addEventListener('click', () => {
    updateSystemUnit();
    if (getSystemUnit() === 'metric') {
      unitToggleBtn.textContent = 'C';
    } else {
      unitToggleBtn.textContent = 'F';
    }
    console.log(getSystemUnit());
    if (lastLoadedLocation) {
      // rerender weather display
      renderWeather(lastLoadedWeatherData, lastLoadedLocation);
    }
  })

  // wait 200ms after last input to pull location matches
  let timeout;
  searchInput.addEventListener('input', (e) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      handleSearch(e.target.value);
    }, 200);
  });

  // hide search results when search bar is clicked off of 
  searchInput.addEventListener('blur', () => {
    setTimeout(() => {
      searchResultsContainer.classList.add('hidden');
    }, 150);
  });
  searchInput.addEventListener('focus', () => {
    searchResultsContainer.classList.remove('hidden');
  })

  //show San Francisco by default
  getWeather(37.77, 122.41);
  const defaultLocation = {
    city: "San Francisco",
    state_code: "CA",
    country: "United States",
    country_code: "us",
    lat: 37.7749,
    lon: -122.4194
  };
  handleLocationSelection(defaultLocation);

  // getWeather(37.77, 122.41).then(data => {
  //     displayWeather(data, { name: "San Francisco", country: "United States" });
  // });
}

init();