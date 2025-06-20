import { formatLocationForDisplay } from "../utils/formatLocation";

export function displayCurrentWeather(weatherData, location) {
    const template = document.getElementById('current-weather-template');
    const clone = template.content.cloneNode(true);
    const current = weatherData.current;

    const elements = {
        location: clone.querySelector('.js-current-location'),
        time: clone.querySelector('.js-current-time'),
        temp: clone.querySelector('.js-current-temp'),
        icon: clone.querySelector('.js-current-icon'),
        text: clone.querySelector('.js-current-text')
    };

    elements.location.textContent = formatLocationForDisplay(location);
    elements.time.textContent = `As of ${current.time}`;
    elements.temp.textContent = `${current.temperature_2m}°`;

    const container = document.getElementById('current-weather-container');
    container.innerHTML = '';
    container.append(clone);
}