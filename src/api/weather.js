//const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

export async function getWeather(latitude, longitude) {
    if (latitude === undefined || longitude === undefined) {
        console.error("Latitude and longitude are required.");
    return null;
    }
    let apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
    `&forecast_days=10&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m,wind_gusts_10m` +
    `&hourly=temperature_2m,apparent_temperature,precipitation_probability,weather_code,wind_speed_10m,wind_gusts_10m,is_day` +
    `&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max` +
    `&past_days=1` +
    `&timezone=auto`;
    try {
        let response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        let data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Failed to fetch weather data:", error);
        return null;
    }
}