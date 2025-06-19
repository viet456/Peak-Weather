const stateCountries = ['United States', 'Canada', 'Australia', 'Brazil', 'India', 'Mexico', 'United Kingdom'];

export function formatLocationForSearch(location) {
    if (!location || !location.name) return '';
    const { name, admin1, country } = location;
    // checks if the country uses states/provinces 
    const locationText = stateCountries.includes(country) && admin1
                        ? `${name}, ${admin1}, ${country}`
                        : `${name}, ${country}`;
    return locationText;
}

export function formatLocationForDisplay(location) {
    if (!location || !location.name) return '';
    const { name, admin1, country } = location;
    // checks if the country uses states/provinces 
    const locationText = stateCountries.includes(country) && admin1
                        ? `${name}, ${admin1}`
                        : `${name}, ${country}`;
    return locationText;
}