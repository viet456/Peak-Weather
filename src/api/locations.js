const apiKey = import.meta.env.VITE_GEOAPIFY_API_KEY;

export async function getLocations(location) {
    if (!location) {
        return null;
    }
    let apiUrl = `https://api.geoapify.com/v1/geocode/search?text=${location}`;
        apiUrl+= `&limit=5&bias=countrycode:auto&format=json&apiKey=${apiKey}`;
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