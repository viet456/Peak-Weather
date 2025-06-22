import { getSystemUnit, setSystemUnit } from "../utils/settings";

export function updateSystemUnit() {
    const currentUnit = getSystemUnit();

    if (currentUnit === 'metric') {
        setSystemUnit('imperial');
    } else {
        setSystemUnit('metric');
    }
}