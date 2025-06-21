const timeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
};

// formats ISO8601 dates into a local readable form
export function formatTime(dateInput) {
    const dateObject = new Date(dateInput);
    if (!dateObject || !(dateObject instanceof Date) || isNaN(dateObject.getTime())) {
        return 'Invalid time';
    }
    return dateObject.toLocaleTimeString([], timeFormatOptions)
}

