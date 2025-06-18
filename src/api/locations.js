export async function getLocations(location) {
    if (!location) {
        return null;
    }
    let apiUrl = `https://geocoding-api.open-meteo.com/v1/search?name=`
        apiUrl+= `${encodeURIComponent(location)}&count=5&language=en&format=json`;
    try {
        let response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        let data = await response.json();
        console.log(data.results);
        return data.results || [];
    } catch (error) {
        console.error("Failed to fetch locations:", error);
        return [];
    }
}