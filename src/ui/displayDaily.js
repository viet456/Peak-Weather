import { formatLocationForDisplay } from "../utils/formatLocation";
import { formatTime, formatTemp, formatSpeed, formatPrecipitation, formatDayOfWeek } from "../utils/formatter";

function renderDailyItem(dayData, systemUnit) {
    const itemTemplate = document.getElementById('daily-item-template');
    const itemClone = itemTemplate.content.cloneNode(true);

    const elements = {
        day: itemClone.querySelector('.js-daily-day'),
        icon: itemClone.querySelector('.js-daily-icon'),
        high: itemClone.querySelector('.js-daily-high'),
        low: itemClone.querySelector('.js-daily-low'),
        precip: itemClone.querySelector('.js-daily-precip'),
    };

    const weekday = formatDayOfWeek(dayData.date);
    const highTemp = formatTemp(dayData.tempMax, systemUnit);
    const lowTemp = formatTemp(dayData.tempMin, systemUnit);
    const precipProbability = dayData.precipProbabilityMax;

    elements.day.textContent = weekday;
    elements.icon.textContent = '';
    elements.high.textContent = highTemp;
    elements.low.textContent = lowTemp;
    elements.precip.textContent = `${precipProbability}%`;

    return itemClone;
}

export function displayDaily(dailyData, location, systemUnit) {
    const containerTemplate = document.getElementById('daily-forecast-template');
    const containerClone = containerTemplate.content.cloneNode(true);

    const itemsContainer = containerClone.querySelector('.daily-forecast__items-container');

    dailyData.forEach(day => {
        const dailyItemElement = renderDailyItem(day, systemUnit);
        itemsContainer.append(dailyItemElement);
    });
    
    const pageContainer = document.getElementById('daily-forecast-container');
    pageContainer.innerHTML = '';
    pageContainer.append(containerClone);
}