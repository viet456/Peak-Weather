import { formatLocationForDisplay } from "../utils/formatLocation";
import { formatTime, formatTemp } from "../utils/formatter";

export function displayTodayWeather(todayData, location, temperatureUnit) {
    const template = document.getElementById('today-details-template');
    const clone = template.content.cloneNode(true);

    const elements = {
        title: clone.querySelector('.js-today-title'),
        highLow: clone.querySelector('.js-today-high-low'),
        wind: clone.querySelector('.js-today-wind'),
        sunrise: clone.querySelector('.js-today-sunrise'),
        sunset: clone.querySelector('.js-today-sunset'),
        precipProbability: clone.querySelector('.js-today-precip-probability'),
        precipSum: clone.querySelector('.js-today-precip-sum'),
        uvIndex: clone.querySelector('.js-today-uv-index'),
    }

    const formattedMax = formatTemp(todayData.tempMax, temperatureUnit);
    const formattedMin = formatTemp(todayData.tempMin, temperatureUnit);
    const windSpeed = Math.round(todayData.windSpeedMax);
    const windGusts = Math.round(todayData.windGustsMax);
    const sunriseTime = formatTime(todayData.sunrise);
    const sunsetTime = formatTime(todayData.sunset);
    const precipProbability = todayData.precipProbabilityMax;
    const precipSum = todayData.precipSum;
    const uvIndex = todayData.uvIndexMax;

    elements.title.textContent = `Weather Today in ${formatLocationForDisplay(location)}`;
    elements.highLow.textContent = `${formattedMax} / ${formattedMin}`;
    elements.wind.textContent = `${windSpeed} with gusts of ${windGusts}`;
    elements.sunrise.textContent = `${sunriseTime}`;
    elements.sunset.textContent = `${sunsetTime}`;
    elements.precipProbability.textContent = `${precipProbability}`
    elements.precipSum.textContent = `${precipSum}`;
    elements.uvIndex.textContent = `${uvIndex}`;

    const container = document.getElementById('today-details-container');
    container.innerHTML = '';
    container.append(clone);
}