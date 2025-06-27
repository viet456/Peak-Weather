import './style.css'
import { getWeather } from './api/weather'
import { getLocations } from './api/locations';
import { formatLocationForSearch, formatLocationForDisplay } from './utils/formatLocation';
import { displayCurrentWeather } from './ui/displayCurrent';
import { getSystemUnit, setSystemUnit } from './utils/settings';
import { updateSystemUnit } from './utils/unitSystemToggle';
import { displayTodayWeather } from './ui/displayToday';
import { processCurrentData, processTodayData, processDailyData, processHourlyData, processPeriodsData } from './utils/weatherDataProcessor';
import { displayDaily } from './ui/displayDaily';
import { displayHourlyWeather } from './ui/displayHourly';
import { displayPeriodWeather } from './ui/displayPeriods';

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
    if (!location || !location.city) {
      return;
    }
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
    searchInput.classList.remove('is-showing-results');
    return [];
  }
  const locations = await getLocations(query);
  searchInput.classList.add('is-showing-results');
  renderLocationDropdown(locations);
  console.log('API Search Results:', locations);
  return locations;
}

// handle user selection of a location
async function handleLocationSelection(location) {
  lastLoadedLocation = location;
  // update the input and hide the dropdown
  searchInput.value = '';
  searchInput.blur();
  searchInput.classList.remove('is-showing-results');
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
  const periodData = processPeriodsData(weatherData);

  displayCurrentWeather(currentData, location, systemUnit);
  displayTodayWeather(todayData, location, systemUnit);
  displayPeriodWeather(periodData, location, systemUnit);
  displayHourlyWeather(hourlyData, location, systemUnit);
  displayDaily(dailyData, location, systemUnit);
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
  let currentResults = [];
  let lastSearchedQuery = '';
  searchInput.addEventListener('input', (e) => {
    clearTimeout(timeout);
    const query = e.target.value.trim();

    timeout = setTimeout(async () => {
      if (query.length < 2) {
        searchResultsContainer.classList.add('hidden');
        return;
      }
      const locations = await getLocations(query);
      lastSearchedQuery = query;
      currentResults = locations || [];
      renderLocationDropdown(currentResults);
    }, 200);
  });

  // display results on 'Enter' input
  searchInput.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      clearTimeout(timeout);
      const query = e.target.value.trim();
      if (!query) return;

      let finalResults = currentResults;
      if (query != lastSearchedQuery) {
        finalResults = await handleSearch(query);
        lastSearchedQuery = query;
        currentResults = finalResults;
      };
      if (finalResults && finalResults.length > 0) {
        const topResult = finalResults[0];
        handleLocationSelection(topResult);
      } else {
        console.log("No results found for:", query);
      }
    };
  });

  // hide search results when search bar is clicked off of 
  searchInput.addEventListener('blur', () => {
    searchInput.classList.remove('is-showing-results');
    searchResultsContainer.classList.add('hidden');
  });
  searchInput.addEventListener('focus', () => {
    if (searchInput.value.length > 2) {
      searchInput.classList.add('is-showing-results');
      searchResultsContainer.classList.remove('hidden');
    }
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