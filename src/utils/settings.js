function detectUnitFromLocale() {
  const locale = navigator.language || 'en-US';
  let region;
  try {
    region = new Intl.Locale(locale).region;
  } catch (e) {
    region = 'US'; // Default on error
  }
  const imperialRegions = ['US', 'BS','BZ', 'KY', 'LR', 'PW', 'FM', 'MH'];
  return imperialRegions.includes(region) ? 'imperial' : 'metric';
}

export function getSystemUnit() {
  const savedUnit = localStorage.getItem('systemUnit');
  return savedUnit || detectUnitFromLocale();
}

export function setSystemUnit(unit) {
  localStorage.setItem('systemUnit', unit);
}