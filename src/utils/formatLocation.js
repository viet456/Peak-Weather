const stateCountryCodes = ['US', 'CA', 'AU', 'BR', 'IN'];

function toUpperCaseString(str) {
    if (typeof str !== 'string' || str === null) {
        return '';
    }
    return str.toUpperCase();
}

export function formatLocationForSearch(location) {
    if (!location || !location.city) return '';
    const { city, state, country_code } = location;
    const countryCode = toUpperCaseString(country_code);
    console.log(countryCode);
    // checks if the country uses states/provinces 
    const locationText = stateCountryCodes.includes(countryCode) && state
                        ? `${city}, ${state}, ${countryCode}`
                        : `${city}, ${countryCode}`;
    return locationText;
}

export function formatLocationForDisplay(location) {
    if (!location || !location.city) return '';
    const { city, state, country_code } = location;
    const countryCode = toUpperCaseString(country_code);
    // checks if the country uses states/provinces 
    const locationText = stateCountryCodes.includes(countryCode) && state
                        ? `${city}, ${state}`
                        : `${city}, ${countryCode}`;
    return locationText;
}