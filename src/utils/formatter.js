const timeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
};

const fahrenheitRegions = ['US', 'BS', 'KY', 'LR', 'PW', 'FM', 'MH'];


// formats ISO8601 dates into a local readable form
export function formatTime(dateInput, options = {}) {
    const { includeMinutes = true } = options;
    const dateObject = new Date(dateInput);
    if (!dateObject || !(dateObject instanceof Date) || isNaN(dateObject.getTime())) {
        return 'Invalid time';
    }
    const formatOptions = {
        hour: 'numeric',
    };
    if (includeMinutes) {
        formatOptions.minute = '2-digit';
    }
    return dateObject.toLocaleTimeString([], formatOptions)
}

// sets temperature scale to locale
export function formatTemp(celsius, system) {
    if (typeof celsius !== 'number') return '';
    const unit = system === 'imperial' ? 'fahrenheit' : 'celsius';

    let tempToDisplay = celsius;
    if (unit === 'fahrenheit') {
        tempToDisplay = (celsius * 9 / 5) + 32;
    }
    let userLocale = navigator.language || 'en-US';
    return new Intl.NumberFormat(userLocale, {
        style: 'unit',
        unit: unit,
        maximumFractionDigits: '0',
    }).format(Math.round(tempToDisplay));
}

export function formatSpeed(kph, system) {
    if (typeof kph !== 'number') return '';
    const unit = system === 'imperial' ? 'mile-per-hour' : 'kilometer-per-hour';

    let speedToDisplay = kph;
    if (unit === 'mile-per-hour') {
        speedToDisplay = kph * 0.621371;
    }
    let userLocale = navigator.language || 'en-US';
    return new Intl.NumberFormat(userLocale, {
        style: 'unit',
        unit: unit,
        maximumFractionDigits: '0',
    }).format(Math.round(speedToDisplay));
}

export function formatPrecipitation(mm, system) {
    if (typeof mm !== 'number') return '';
    const unit = system === 'imperial' ? 'inch' : 'millimeter';

    let precipToDisplay = mm;
    if (unit === 'inch') {
        precipToDisplay = mm / 25.4;
    }
    let userLocale = navigator.language || 'en-US';
    return new Intl.NumberFormat(userLocale, {
        style: 'unit',
        unit: unit,
        maximumFractionDigits: 1,
    }).format(Math.round(precipToDisplay));
}

export function formatDayOfWeek(dateObject) {
    let userLocale = navigator.language || 'en-US';
    return dateObject.toLocaleString(userLocale, { weekday: 'short' });
}
