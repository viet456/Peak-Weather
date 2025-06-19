import './style.css'
import { getWeather } from './api/weather'
import { getLocations } from './api/locations';

// check location matches
const searchResults = document.getElementById('search-results');
async function showLocationDropdown(input) {
  if (!input) {
    return null;
  }
  searchResults.innerHTML = '';
  let locations = await getLocations(input);
  locations.forEach(location => {
    const locationEl = document.createElement('div');
    locationEl.classList.add('locationEl');

    // only include admin1 for countries that use states/provinces
    const stateCountries = ['United States', 'Canada', 'Australia', 'Brazil', 'India', 'Mexico', 'United Kingdom', 'Argentina'];
    const locationText = stateCountries.includes(location.country)
                        ? `${location.name}, ${location.admin1}, ${location.country}`
                        : `${location.name}, ${location.country}`;
    locationEl.textContent = locationText;
    searchResults.append(locationEl);
  });;
} 

let timeout;
const search = document.getElementById('search');
search.addEventListener('input', (e) => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    showLocationDropdown(e.target.value);
  }, 300);
});

// hide search results when search bar is clicked off of 
search.addEventListener('blur', () => {
  searchResults.classList.add('hidden')
})
search.addEventListener('focus', () => {
  searchResults.classList.remove('hidden');
})