//const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

export async function getWeather(latitude, longitude) {
    if (latitude === undefined || longitude === undefined) {
        console.error("Latitude and longitude are required.");
    return null;
    }
    let apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}`;
    apiUrl += `&hourly=uv_index,visibility,cloud_cover&current=temperature_2m,relative_humidity_2m,`
    apiUrl += `is_day,wind_speed_10m,wind_direction_10m,weather_code,precipitation,snowfall&timezone=auto`;
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