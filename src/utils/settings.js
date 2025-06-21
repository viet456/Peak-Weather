function detectUnitFromLocale() {
  const locale = navigator.language || 'en-US';
  let region;
  try {
    region = new Intl.Locale(locale).region;
  } catch (e) {
    region = 'US'; // Default on error
  }
  const fahrenheitRegions = ['US', 'BS', 'KY', 'LR', 'PW', 'FM', 'MH'];
  return fahrenheitRegions.includes(region) ? 'fahrenheit' : 'celsius';
}

export function getTemperatureUnit() {
  const savedUnit = localStorage.getItem('temperatureUnit');
  return savedUnit || detectUnitFromLocale();
}

export function setTemperatureUnit(unit) {
  localStorage.setItem('temperatureUnit', unit);
}