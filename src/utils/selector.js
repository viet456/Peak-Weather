export const selector = {
  template: '#weather-data-template',
  
  search: {
    input: '#search',
    results: '#search-results'
  },

  current: {
    location: '.js-location',
    time: '.js-time',
    temperature: '.js-temperature',
    weatherCode: '.js-weather-code',
    dayTemp: '.js-day-temp',
    nightTemp: '.js-night-temp'
  },

  today: {
    location: '.js-today-location',
    feel: '.js-today-feel',
    code: '.js-today-code',
    high: '.js-temp-high',
    low: '.js-temp-low',
    humidity: '.js-humidity',
    uv: '.js-uv-index',
    windSpeed: '.js-wind-speed',
    windDirection: '.js-wind-direction',
    visibility: '.js-visibility'
  },

  forecast: {
    period: '.js-period',
    temperature: '.js-period-temp',
    feel: '.js-period-feel',
    code: '.js-period-code'
  },

  sections: {
    hourly: '.js-hourly',
    daily: '.js-daily'
  }
};

// Helper for period-specific selections
export const getPeriodSelector = (period) => `[data-period="${period}"]`;