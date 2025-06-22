import { formatTime, formatTemp, formatSpeed, formatPrecipitation } from "../utils/formatter";
import { getWeatherDescription } from "../utils/weatherDataProcessor";

function renderHourlyItem(hourData, systemUnit) {
    const itemTemplate = document.getElementById('hourly-item-template');
    const itemClone = itemTemplate.content.cloneNode(true);

    const elements = {
        time: itemClone.querySelector('.js-hourly-time'),
        temp: itemClone.querySelector('.js-hourly-temp'),
        icon: itemClone.querySelector('.js-hourly-icon'),
        text: itemClone.querySelector('.js-hourly-description'),
        precip: itemClone.querySelector('.js-hourly-precip'),
    }

    const time = formatTime(hourData.date);
    const temp = formatTemp(hourData.temperature);
    const weatherCode = getWeatherDescription(hourData.weatherCode);
    const precipProbability = hourData.precipProbability;

    elements.time.textContent = time;
    elements.temp.textContent = temp;
    elements.text.textContent = weatherCode;
    elements.precip.textContent = `${precipProbability}%`;

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