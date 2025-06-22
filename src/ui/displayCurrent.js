import { formatLocationForDisplay } from "../utils/formatLocation";
import { formatTime, formatTemp } from "../utils/formatter";
import { getWeatherDescription } from "../utils/weatherDataProcessor";

export function displayCurrentWeather(currentData, location, temperatureUnit) {
    const template = document.getElementById('current-weather-template');
    const clone = template.content.cloneNode(true);

    const elements = {
        location: clone.querySelector('.js-current-location'),
        time: clone.querySelector('.js-current-time'),
        temp: clone.querySelector('.js-current-temp'),
        icon: clone.querySelector('.js-current-icon'),
        text: clone.querySelector('.js-current-text')
    };

    const formattedLocation = formatLocationForDisplay(location);
    const formattedTime = formatTime(currentData.time);
    const temperature = formatTemp(currentData.temperature, temperatureUnit);
    const weatherCode = currentData.weatherCode;

    elements.location.textContent = `${formattedLocation}`;
    elements.time.textContent = `As of ${formattedTime}`;
    elements.temp.textContent = `${temperature}`;
    //elements.temp.icon
    elements.text.textContent = getWeatherDescription(weatherCode);

    const container = document.getElementById('current-weather-container');
    container.innerHTML = '';
    container.append(clone);
}