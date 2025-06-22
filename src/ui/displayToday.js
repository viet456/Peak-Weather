import { formatLocationForDisplay } from "../utils/formatLocation";
import { formatTime, formatTemp } from "../utils/formatter";
import { getWeatherDescription } from "../utils/weatherDataProcessor";
import { getTodayWeather } from "../utils/weatherDataProcessor";

export function displayTodayWeather(weatherData, location, temperatureUnit) {
    const template = document.getElementById('today-details-template');
    const clone = template.content.cloneNode(true);
    const today = getTodayWeather(weatherData);

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

    const formattedMax = formatTemp(today.tempMax, temperatureUnit);
    const formattedMin = formatTemp(today.tempMin, temperatureUnit);
    const windSpeed = Math.round(today.windSpeedMax);
    const windGusts = Math.round(today.windGustsMax);
    const sunriseTime = formatTime(today.sunrise);
    const sunsetTime = formatTime(today.sunset);

    elements.title.textContent = `Weather Today in ${formatLocationForDisplay(location)}`;
    elements.highLow.textContent = `${formattedMax} / ${formattedMin}`;
    elements.wind.textContent = `${windSpeed} with gusts of ${windGusts}`;
    elements.sunrise.textContent = `${sunriseTime}`;
    elements.sunset.textContent = `${sunsetTime}`;
    elements.precipProbability.textContent = `${today.precipProbabilityMax}`
    elements.precipSum.textContent = `${today.precipSum}`;
    elements.uvIndex.textContent = `${today.uvIndexMax}`;

    const container = document.getElementById('today-details-container');
    container.innerHTML = '';
    container.append(clone);
}