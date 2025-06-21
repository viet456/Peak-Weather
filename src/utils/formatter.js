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
export function formatTemp(celsius, unit) {
    if (typeof celsius !== 'number' || !unit) return '';
    let tempToDisplay = celsius;
    if (unit === 'fahrenheit') {
        tempToDisplay = (celsius * 9/5) + 32;
    }
    let userLocale = navigator.language || 'en-US';
    return new Intl.NumberFormat(userLocale, {
        style: 'unit',
        unit: unit,
        maximumFractionDigits: '0',
    }).format(Math.round(tempToDisplay));
}
