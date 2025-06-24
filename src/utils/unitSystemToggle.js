import { getSystemUnit, setSystemUnit } from "./settings";

export function updateSystemUnit() {
    const currentUnit = getSystemUnit();

    if (currentUnit === 'metric') {
        setSystemUnit('imperial');
    } else {
        setSystemUnit('metric');
    }
}