import { formatLocationForDisplay } from "../utils/formatLocation";
import { formatTime, formatTemp, formatSpeed, formatPrecipitation, formatDayOfWeek } from "../utils/formatter";
import { getWeatherDescription } from "../utils/weatherDataProcessor";
import { getWeatherIcon } from "../utils/weatherIcons";
import { getWeatherIconName } from "../utils/getWeatherIconName";
import './daily.css';

function renderDailyItem(dayData, systemUnit) {
    const itemTemplate = document.getElementById('daily-item-template');
    const itemClone = itemTemplate.content.cloneNode(true);

    const elements = {
        day: itemClone.querySelector('.js-daily-day'),
        icon: itemClone.querySelector('.js-daily-icon'),
        text: itemClone.querySelector('.js-daily-forecast'),
        high: itemClone.querySelector('.js-daily-high'),
        low: itemClone.querySelector('.js-daily-low'),
        precipIcon: itemClone.querySelector('.js-daily-precip-icon'),
        precipText: itemClone.querySelector('.js-daily-precip-text'),
    };

    const now = new Date();
    const forecastDate = dayData.date;
    let weekday;
    if (now.getFullYear() === forecastDate.getFullYear() &&
        now.getMonth() === forecastDate.getMonth() &&
        now.getDate() === forecastDate.getDate()) {
        // If it's today, set the label to "Today".
        weekday = 'Today';
    } else {
        weekday = formatDayOfWeek(forecastDate);
    }
    const highTemp = formatTemp(dayData.tempMax, systemUnit);
    const lowTemp = formatTemp(dayData.tempMin, systemUnit);
    const description = getWeatherDescription(dayData.weatherCode);
    const iconName = getWeatherIconName(dayData);
    const iconSvg = getWeatherIcon(iconName);
    const precipProbability = dayData.precipProbabilityMax;

    let precipSvg = '';
    if (precipProbability >= 0) {
        precipSvg = getWeatherIcon('droplet-empty');
        if (precipProbability >= 30) {
            precipSvg = getWeatherIcon('droplet-filled');
        }
    };


    elements.day.innerHTML = `${weekday}`;
    elements.icon.innerHTML = `${iconSvg}`;
    elements.text.textContent = description;
    elements.high.textContent = highTemp;
    elements.low.textContent = lowTemp;
    elements.precipIcon.innerHTML = `${precipSvg}`;
    elements.precipText.textContent = `${precipProbability}%`;

    return itemClone;
}

export function displayDaily(dailyData, location, systemUnit) {
    const containerTemplate = document.getElementById('daily-forecast-template');
    const containerClone = containerTemplate.content.cloneNode(true);
    const itemsContainer = containerClone.querySelector('.daily-forecast__items-container');

    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    dailyData.forEach(day => {
        if (day.date >= startOfToday) {
            const dailyItemElement = renderDailyItem(day, systemUnit);
            itemsContainer.append(dailyItemElement);
        }
    });

    const pageContainer = document.getElementById('daily-forecast-container');
    pageContainer.innerHTML = '';
    pageContainer.append(containerClone);
}