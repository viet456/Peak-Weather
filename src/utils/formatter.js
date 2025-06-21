const timeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
};

const fahrenheitRegions = ['US', 'BS', 'KY', 'LR', 'PW', 'FM', 'MH'];


// formats ISO8601 dates into a local readable form
export function formatTime(dateInput) {
    const dateObject = new Date(dateInput);
    if (!dateObject || !(dateObject instanceof Date) || isNaN(dateObject.getTime())) {
        return 'Invalid time';
    }
    return dateObject.toLocaleTimeString([], timeFormatOptions)
}

// sets temperature scale to locale
export function formatTemp(celsius) {
    if (typeof celsius !== 'number') return '';
    // find a user's country via their language code
    const userLocale = navigator.language || 'en-US';
    let region;
    try {
        // .region only works on Locale objects
        region = new Intl.Locale(userLocale.region);
    } catch (e) {
        region = 'US';
    }
    
    const unit = fahrenheitRegions.includes(region)
        ? 'fahrenheit'
        : 'celsius';
    let tempToDisplay = celsius;
    if (unit === 'fahrenheit') {
        tempToDisplay = (celsius * 9/5) + 32;
    }
    return new Intl.NumberFormat(userLocale, {
        style: 'unit',
        unit: unit,
        maximumFractionDigits: '0',
    }).format(Math.round(tempToDisplay));
}
