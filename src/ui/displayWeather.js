import { getWeatherElements } from "../utils/getWeatherElements";
import { formatLocationForDisplay } from "../utils/formatLocation";


export async function displayWeather(weatherData, location) {
    const template = document.getElementById('weather-data-template');
    const weatherClone = template.content.cloneNode(true);
    // get the elements from template
    const clone = getWeatherElements(weatherClone);
    
    clone.current.location.textContent = formatLocationForDisplay(location);
    console.log(clone.current.location);

    const weatherContainer = document.getElementById('weather-container');
    weatherContainer.innerHTML = '';
    weatherContainer.appendChild(weatherClone);

}