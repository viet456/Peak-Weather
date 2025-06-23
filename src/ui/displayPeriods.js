import { formatTime, formatTemp, formatSpeed, formatPrecipitation } from "../utils/formatter";
import { getWeatherDescription } from "../utils/weatherDataProcessor";

function renderPeriodItem(periodData, systemUnit) {
    const itemTemplate = document.getElementById('period-item-template');
    const itemClone = itemTemplate.content.cloneNode(true);

    const elements = {
        name: itemClone.querySelector('.js-period-name'),
        temp: itemClone.querySelector('.js-period-temp'),
        text: itemClone.querySelector('.js-period-description'),
        precip: itemClone.querySelector('.js-period-precip'),
    }

    const name = periodData.name;
    const temp = formatTemp(periodData.temperature, systemUnit);
    const weatherCode = getWeatherDescription(periodData.weatherCode);
    const precipProbability = periodData.precipProbability;

    elements.name.textContent = name;
    elements.temp.textContent = temp;
    elements.text.textContent = weatherCode;
    elements.precip.textContent = precipProbability;

    return itemClone;
}

export function displayPeriodWeather(periodData, location, systemUnit) {
    const containerTemplate = document.getElementById('periods-forecast-template');
    const containerClone = containerTemplate.content.cloneNode(true);

    const itemsContainer = containerClone.querySelector('.periods-forecast__list');

    periodData.forEach(period => {
        const periodItemElement = renderPeriodItem(period, systemUnit);
        itemsContainer.append(periodItemElement);
    })

    const pageContainer = document.getElementById('periods-forecast-container');
    pageContainer.innerHTML = '';
    pageContainer.append(containerClone);
}