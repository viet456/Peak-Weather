import { formatLocationForDisplay } from "../utils/formatLocation";
import { formatTime, formatTemp } from "../utils/formatter";
import { getWeatherDescription } from "../utils/weatherDataProcessor";
import { getWeatherIconName } from "../utils/getWeatherIconName";
import { getWeatherIcon } from "../utils/weatherIcons";
import './current.css';

export function displayCurrentWeather(currentData, location, systemUnit) {
    const template = document.getElementById('current-weather-template');
    const clone = template.content.cloneNode(true);

    const elements = {
        location: clone.querySelector('.js-current-location'),
        time: clone.querySelector('.js-current-time'),
        temp: clone.querySelector('.js-current-temp'),
        icon: clone.querySelector('.js-current-icon'),
        weatherDesc: clone.querySelector('.js-current-description')
    };

    const formattedLocation = formatLocationForDisplay(location);
    const formattedTime = formatTime(currentData.time);
    const temperature = formatTemp(currentData.temperature, systemUnit);
    const weatherDesc = getWeatherDescription(currentData.weatherCode);
    const iconName = getWeatherIconName(currentData);
    const iconSvg = getWeatherIcon(iconName);

    elements.location.textContent = `${formattedLocation}`;
    elements.time.textContent = `As of ${formattedTime}`;
    elements.temp.textContent = `${temperature}`;
    elements.icon.innerHTML = iconSvg;
    elements.weatherDesc.textContent = weatherDesc;

    const container = document.getElementById('current-weather-container');
    container.innerHTML = '';
    container.append(clone);
}