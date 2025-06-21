export const weatherCodeMap = {
  0: { text: "Clear sky", icon: "sun" },
  1: { text: "Mainly clear", icon: "sun" },
  2: { text: "Partly cloudy", icon: "sun-cloud" },
  3: { text: "Overcast", icon: "cloud" },
  45: { text: "Fog", icon: "fog" },
  48: { text: "Depositing rime fog", icon: "fog" },
  51: { text: "Light drizzle", icon: "drizzle" },
  53: { text: "Moderate drizzle", icon: "drizzle" },
  55: { text: "Dense drizzle", icon: "drizzle" },
  56: { text: "Light freezing drizzle", icon: "drizzle" },
  57: { text: "Dense freezing drizzle", icon: "drizzle" },
  61: { text: "Slight rain", icon: "rain" },
  63: { text: "Moderate rain", icon: "rain" },
  65: { text: "Heavy rain", icon: "rain" },
  66: { text: "Light freezing rain", icon: "rain" },
  67: { text: "Heavy freezing rain", icon: "rain" },
  71: { text: "Slight snow fall", icon: "snow" },
  73: { text: "Moderate snow fall", icon: "snow" },
  75: { text: "Heavy snow fall", icon: "snow" },
  77: { text: "Snow grains", icon: "snow" },
  80: { text: "Slight rain showers", icon: "rain" },
  81: { text: "Moderate rain showers", icon: "rain" },
  82: { text: "Violent rain showers", icon: "rain" },
  85: { text: "Slight snow showers", icon: "snow" },
  86: { text: "Heavy snow showers", icon: "snow" },
  // Note: Thunderstorm forecast with hail is only available in Central Europe
  95: { text: "Thunderstorm", icon: "thunderstorm" },
  96: { text: "Thunderstorm with slight hail", icon: "thunderstorm" },
  99: { text: "Thunderstorm with heavy hail", icon: "thunderstorm" },
};

export function getWeatherDescription(code) {
  const condition = weatherCodeMap[code];
  return condition ? condition.text : 'Weather data not available';
}