export function getWeatherElements(container) {
  const periodElements = container.querySelectorAll('.js-period');
  return {
    current: {
      location: container.querySelector('.js-location'),
      time: container.querySelector('.js-time'),
      temp: container.querySelector('.js-temperature'),
      profile: container.querySelector('.js-weather-code'),
      dayTemp: container.querySelector('.js-day-temp'),
      nightTemp: container.querySelector('.js-night-temp'),
    },

    today: {
      location: container.querySelector('.js-today-location'),
      feel: container.querySelector('.js-today-feel'),
      profile: container.querySelector('.js-today-code'),
      high: container.querySelector('.js-temp-high'),
      low: container.querySelector('.js-temp-low'),
      humidity: container.querySelector('.js-humidity'),
      uv: container.querySelector('.js-uv-index'),
      windSpeed: container.querySelector('.js-wind-speed'),
      windDirection: container.querySelector('.js-wind-direction'),
      visibility: container.querySelector('.js-visibility'),
    },

    forecast: {
      periods: Array.from(periodElements).map(periodEl => {
        return {
          container: periodEl,
          temp: periodEl.querySelector('.js-period-temp'),
          feel: periodEl.querySelector('.js-period-feel'),
          code: periodEl.querySelector('.js-period-code')
        };
      })
    },

    hourly: container.querySelector('.js-hourly'),
    daily: container.querySelector('.js-daily'),
  };
}