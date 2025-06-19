import './style.css'
import { getWeather } from './api/weather'
import { getLocations } from './api/locations';
import { displayWeather } from './ui/displayWeather';
import { formatLocationForSearch, formatLocationForDisplay } from './utils/formatLocation';

// DOM elements
const searchResultsContainer = document.getElementById('search-results');
const searchInput = document.getElementById('searchInput');
const weatherContainer = document.getElementById('weather-container'); 

// show location matches
async function renderLocationDropdown(locations) {
  if (!locations) {
    return null;
  }
  searchResultsContainer.innerHTML = '';
  searchResultsContainer.classList.remove('hidden');

  // if (locations.length === 0 && searchInput.value!=='') {
  //   searchResultsContainer.innerHTML = '<div class="location-result-item">No results found</div>';
  //   return;
  // }
  
  locations.forEach(location => {
    const locationEl = document.createElement('div');
    locationEl.classList.add('location-result-item');

    // only include admin1 for countries that use states/provinces
    locationEl.textContent = formatLocationForSearch(location);

    // click on location to display its weather
    // mousedown fires before blur-out of searchbox
    locationEl.addEventListener('mousedown', async() => {
      selectLocation(location);
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
}

// handle user selection of a location
async function selectLocation(location) {
  // update the input and hide the dropdown
  searchInput.value = formatLocationForDisplay(location);
  searchResultsContainer.innerHTML = '';
  searchResultsContainer.classList.add('hidden');

  // get weather data and display it
  const weatherData = await getWeather(location.latitude, location.longitude);
  displayWeather(weatherData, location);
}

// main initialization
function init() {
  // wait 250ms after last input to pull location matches
  let timeout;
  searchInput.addEventListener('input', (e) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      handleSearch(e.target.value);
    }, 250);
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

  // getWeather(37.77, 122.41).then(data => {
  //     displayWeather(data, { name: "San Francisco", country: "United States" });
  // });
}

init();