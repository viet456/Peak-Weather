import { formatLocationForDisplay } from "../utils/formatLocation";
import { formatTime, formatTemp, formatSpeed, formatPrecipitation } from "../utils/formatter";

export function displayTodayWeather(todayData, location, systemUnit) {
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

    const formattedMax = formatTemp(todayData.tempMax, systemUnit);
    const formattedMin = formatTemp(todayData.tempMin, systemUnit);
    const windSpeed = formatSpeed(todayData.windSpeedMax, systemUnit);
    const windGusts = formatSpeed(todayData.windGustsMax, systemUnit);
    const sunriseTime = formatTime(todayData.sunrise);
    const sunsetTime = formatTime(todayData.sunset);
    const precipProbability = formatPrecipitation(todayData.precipProbabilityMax, systemUnit);
    const precipSum = formatPrecipitation(todayData.precipSum, systemUnit);
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