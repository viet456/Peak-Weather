import { formatTime, formatTemp, formatSpeed, formatPrecipitation } from "../utils/formatter";
import { getWeatherIconName } from "../utils/getWeatherIconName";
import { getWeatherDescription } from "../utils/weatherDataProcessor";
import { getWeatherIcon } from "../utils/weatherIcons";
import './periods.css';

function renderPeriodItem(periodData, systemUnit) {
    const itemTemplate = document.getElementById('period-item-template');
    const itemClone = itemTemplate.content.cloneNode(true);

    const elements = {
        name: itemClone.querySelector('.js-period-name'),
        temp: itemClone.querySelector('.js-period-temp'),
        weatherDesc: itemClone.querySelector('.js-period-description'),
        icon: itemClone.querySelector('.js-period-icon'),
        precipIcon: itemClone.querySelector('.js-period-precip-icon'),
        precipText: itemClone.querySelector('.js-period-precip-text'),
    }

    const name = periodData.name;
    const temp = formatTemp(periodData.temperature, systemUnit);
    const weatherDesc = getWeatherDescription(periodData.weatherCode);
    const iconName = getWeatherIconName(periodData);
    const iconSvg = getWeatherIcon(iconName);
    const precipProbability = periodData.precipProbability;
    let precipSvg = '';
    if (precipProbability >= 0) {
        precipSvg = getWeatherIcon('droplet-empty');
        if (precipProbability >= 30) {
            precipSvg = getWeatherIcon('droplet-filled');
        }
    };

    elements.name.textContent = name;
    elements.temp.textContent = temp;
    elements.weatherDesc.textContent = weatherDesc;
    elements.icon.innerHTML = `${iconSvg}`;
    elements.precipIcon.innerHTML = `${precipSvg}`;
    elements.precipText.textContent = `${precipProbability}%`;

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