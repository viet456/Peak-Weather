import { formatTime, formatTemp, formatSpeed, formatPrecipitation } from "../utils/formatter";
import { getWeatherIconName } from "../utils/getWeatherIconName";
import { getWeatherDescription } from "../utils/weatherDataProcessor";
import { getWeatherIcon } from "../utils/weatherIcons";
import './hourly.css';

function renderHourlyItem(hourData, systemUnit) {
    const itemTemplate = document.getElementById('hourly-item-template');
    const itemClone = itemTemplate.content.cloneNode(true);

    const elements = {
        time: itemClone.querySelector('.js-hourly-time'),
        temp: itemClone.querySelector('.js-hourly-temp'),
        icon: itemClone.querySelector('.js-hourly-icon'),
        text: itemClone.querySelector('.js-hourly-description'),
        precipIcon: itemClone.querySelector('.js-hourly-precip-icon'),
        precipText: itemClone.querySelector('.js-hourly-precip-text'),
    }

    const time = formatTime(hourData.date, { includeMinutes: false });
    const temp = formatTemp(hourData.temperature, systemUnit);
    const weatherCode = getWeatherDescription(hourData.weatherCode);
    const iconName = getWeatherIconName(hourData);
    const iconSvg = getWeatherIcon(iconName);
    const precipProbability = hourData.precipProbability;
    let precipSvg = '';
    if (precipProbability >= 0) {
        precipSvg = getWeatherIcon('droplet-empty');
        if (precipProbability >= 30) {
            precipSvg = getWeatherIcon('droplet-filled');
        }
    };

    elements.time.textContent = time;
    elements.icon.innerHTML = `${iconSvg}`;
    elements.temp.textContent = temp;
    //elements.text.textContent = weatherCode;
    elements.precipIcon.innerHTML = `${precipSvg}`;
    elements.precipText.textContent = `${precipProbability}%`;

    return itemClone;
}

export function displayHourlyWeather(hourlyData, location, systemUnit) {
    const containerTemplate = document.getElementById('hourly-forecast-template');
    const containerClone = containerTemplate.content.cloneNode(true);

    const itemsContainer = containerClone.querySelector('.hourly-forecast__items-container');

    hourlyData.forEach(hour => {
        const hourlyItemElement = renderHourlyItem(hour, systemUnit);
        itemsContainer.append(hourlyItemElement);
    })

    const pageContainer = document.getElementById('hourly-forecast-container');
    pageContainer.innerHTML = '';
    pageContainer.append(containerClone);
}