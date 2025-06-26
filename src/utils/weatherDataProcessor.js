export const weatherCodeMap = {
  0: { text: "Clear Skies", icon: "sun" },
  1: { text: "Mainly Clear", icon: "sun" },
  2: { text: "Partly Cloudy", icon: "sun-cloud" }, 
  3: { text: "Overcast", icon: "cloud" },
  45: { text: "Foggy", icon: "fog" },
  48: { text: "Rime Fog", icon: "fog" }, 
  51: { text: "Light Drizzle", icon: "drizzle" },
  53: { text: "Drizzle", icon: "drizzle" }, 
  55: { text: "Heavy Drizzle", icon: "drizzle" },
  56: { text: "Light Freezing Drizzle", icon: "drizzle" },
  57: { text: "Freezing Drizzle", icon: "drizzle" },
  61: { text: "Light Rain", icon: "rain" },
  63: { text: "Rain", icon: "rain" },
  65: { text: "Heavy Rain", icon: "rain" },
  66: { text: "Light Freezing Rain", icon: "rain" },
  67: { text: "Freezing Rain", icon: "rain" },
  71: { text: "Light Snow", icon: "snow" },
  73: { text: "Snow", icon: "snow" },
  75: { text: "Heavy Snow", icon: "snow" },
  77: { text: "Snow Grains", icon: "snow" }, 
  80: { text: "Light Showers", icon: "rain" },
  81: { text: "Showers", icon: "rain" },
  82: { text: "Heavy Showers", icon: "rain" }, 
  85: { text: "Light Snow Showers", icon: "snow" },
  86: { text: "Heavy Snow Showers", icon: "snow" },
  95: { text: "Thunderstorm", icon: "thunderstorm" },
  96: { text: "Thunderstorm & Hail", icon: "thunderstorm" }, 
  99: { text: "Thunderstorm & Heavy Hail", icon: "thunderstorm" }, 
};

export function getWeatherDescription(code) {
  const condition = weatherCodeMap[code];
  return condition ? condition.text : 'Weather data not available';
}

function extractHourDataByIndex(hourly, index) {
  if (!hourly) throw new Error('NO_DAILY_DATA: Daily data is missing.');
  if (!hourly.time) throw new Error('NO_TIME_ARRAY: Time array is missing in daily data.');
  if (!hourly.time[index]) throw new Error(`INVALID_INDEX: No data for index ${index}.`);
  return {
    isDay: hourly.is_day[index],
    precipProbability: hourly.precipitation_probability[index],
    temperature: hourly.temperature_2m[index],
    date: new Date(hourly.time[index]),
    weatherCode: hourly.weather_code[index],
    windGusts: hourly.wind_gusts_10m[index],
    windSpeed: hourly.wind_speed_10m[index],
  };
}

function extractDayDataByIndex(daily, index) {
  if (!daily) throw new Error('NO_DAILY_DATA: Daily data is missing.');
  if (!daily.time) throw new Error('NO_TIME_ARRAY: Time array is missing in daily data.');
  if (!daily.time[index]) throw new Error(`INVALID_INDEX: No data for index ${index}.`);
  return {
    date: new Date(daily.time[index]),
    weatherCode: daily.weather_code[index],
    tempMax: daily.temperature_2m_max[index],
    tempMin: daily.temperature_2m_min[index],
    sunrise: new Date(daily.sunrise[index]),
    sunset: new Date(daily.sunset[index]),
    uvIndexMax: daily.uv_index_max[index],
    precipSum: daily.precipitation_sum[index],
    precipProbabilityMax: daily.precipitation_probability_max[index],
    windSpeedMax: daily.wind_speed_10m_max[index],
    windGustsMax: daily.wind_gusts_10m_max[index],
  };
}

export function processCurrentData(weatherData) {
  const rawCurrent = weatherData.current;
  return {
    time: new Date(rawCurrent.time),
    temperature: rawCurrent.temperature_2m,
    apparentTemperature: rawCurrent.apparent_temperature,
    isDay: rawCurrent.is_day === 1,
    precipitation: rawCurrent.precipitation,
    humidity: rawCurrent.relative_humidity_2m,
    weatherCode: rawCurrent.weather_code,
    windSpeed: rawCurrent.wind_speed_10m,
    windGusts: rawCurrent.wind_gusts_10m,
  }
}

export function processTodayData(weatherData) {
  return extractDayDataByIndex(weatherData.daily, 0);
}

export function processDailyData(weatherData) {
  const daily = weatherData.daily;
  const forecastArray = [];
  for (let i = 0; i < daily.time.length; i++) {
    const dayData = extractDayDataByIndex(daily, i);
    if (dayData) {
      forecastArray.push(dayData);
    }
  }
  return forecastArray;
}

export function processHourlyData(weatherData) {
  const hourly = weatherData.hourly;
  const hourlyArray = [];
  const now = new Date();
  const startIndex = hourly.time.findIndex(timeString => new Date(timeString) >= now);
  if (startIndex === -1) return [];
  const endIndex = startIndex + 24;
  for (let i = startIndex; i < endIndex; i++) {
    const hourData = extractHourDataByIndex(hourly, i)
    if (hourData) {
      hourlyArray.push(hourData);
    }
  }
  return hourlyArray;
}

export function processPeriodsData(weatherData) {
  const hourly = weatherData.hourly;
  if (!hourly || !hourly.time) return [];

  const periodArray = [];
  const periodHours = {
    Morning: 9,
    Afternoon: 13,
    Evening: 19,
    Overnight: 22,
  };
  for (const periodName in periodHours) {
    const hourToFind = periodHours[periodName];
    const indexOfHour = hourly.time.findIndex(timeString => new Date(timeString).getHours() === hourToFind);
    if (indexOfHour !== -1) {
      const hourWeather = extractHourDataByIndex(hourly, indexOfHour);
      if (hourWeather) {
        hourWeather.name = periodName;
        periodArray.push(hourWeather);
      }
    }
  }
  return periodArray;
}