import { getTemperatureUnit, setTemperatureUnit } from "../utils/settings";

export function updateTempUnit() {
    const currentUnit = getTemperatureUnit();

    if (currentUnit === 'celsius') {
        setTemperatureUnit('fahrenheit');
    } else {
        setTemperatureUnit('celsius');
    }
}