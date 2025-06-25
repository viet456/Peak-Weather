import { weatherCodeMap } from "./weatherDataProcessor";

export function getWeatherIconName(weatherData) {
    const code = weatherData.weatherCode;
    const isDay = weatherData.isDay;

    let iconName = weatherCodeMap[code]?.icon || 'unknown';
    if (isDay) {
        if (code === 0 || code === 1) { // Clear sky
            iconName = 'moon';
        }
        if (code === 2) { // Partly Cloudy
            iconName = 'moon-cloud';
        }
    }
    return iconName;
}