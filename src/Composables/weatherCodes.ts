const myWeatherCodes = [
  {
    range: [0, 0],
    iconDay: '/icons/icon-sun.png',
    iconNight: '/icons/icon-moon.png',
  },
  {
    range: [1, 2],
    iconDay: '/icons/icon-partly-day.png',
    iconNight: '/icons/icon-partly-night.png',
  },
  {
    range: [3, 3],
    iconDay: '/icons/icon-overcast.png',
    iconNight: '/icons/icon-overcast.png',
  },
  {
    range: [45, 48],
    iconDay: '/icons/icon-fog-day.png',
    iconNight: '/icons/icon-fog-night.png',
  },
  {
    range: [51, 57],
    iconDay: '/icons/icon-drizzle.png',
    iconNight: '/icons/icon-drizzle.png',
  },
  {
    range: [61, 63],
    iconDay: '/icons/icon-light-rain.png',
    iconNight: '/icons/icon-light-rain.png',
  },
  {
    range: [65, 65],
    iconDay: '/icons/icon-heavy-rain.png',
    iconNight: '/icons/icon-heavy-rain.png',
  },
  {
    range: [66, 67],
    iconDay: '/icons/icon-sleet.png',
    iconNight: '/icons/icon-sleet.png',
  },
  {
    range: [71, 73],
    iconDay: '/icons/icon-light-snow.png',
    iconNight: '/icons/icon-light-snow.png',
  },
  {
    range: [75, 77],
    iconDay: '/icons/icon-heavy-snow.png',
    iconNight: '/icons/icon-heavy-snow.png',
  },
  {
    range: [80, 81],
    iconDay: '/icons/icon-light-rain.png',
    iconNight: '/icons/icon-light-rain.png',
  },
  {
    range: [82, 82],
    iconDay: '/icons/icon-heavy-rain.png',
    iconNight: '/icons/icon-heavy-rain.png',
  },
  {
    range: [85, 85],
    iconDay: '/icons/icon-light-snow.png',
    iconNight: '/icons/icon-light-snow.png',
  },
  {
    range: [86, 86],
    iconDay: '/icons/icon-heavy-snow.png',
    iconNight: '/icons/icon-heavy-snow.png',
  },
  {
    range: [95, 96],
    iconDay: '/icons/icon-light-thunder.png',
    iconNight: '/icons/icon-light-thunder.png',
  },
  {
    range: [97, 99],
    iconDay: '/icons/icon-heavy-thunder.png',
    iconNight: '/icons/icon-heavy-thunder.png',
  },
  {
    range: [100, 100],
    iconDay: '/icons/icon-no-data.png',
    iconNight: '/icons/icon-no-data.png',
  },
]

export function getWeatherIcon(code: number | null | undefined, isNight: boolean) {
  if (typeof code === 'number') {
    const weatherCode = myWeatherCodes.find((codeRange) => codeRange.range.includes(code))
    if (!weatherCode) return '/icons/no-data.png'
    if (!isNight) return weatherCode?.iconDay
    return weatherCode?.iconNight
  }
}

export const allCodes = {
  '0': 'Clear sky',
  '1': 'Mainly clear',
  '2': 'Partly cloudy',
  '3': 'Overcast',
  '45': 'Fog',
  '48': 'Depositing rime fog',
  '51': 'Light drizzle',
  '53': 'Moderate drizzle',
  '55': 'Dense drizzle',
  '56': 'Light freezing drizzle',
  '57': 'Dense freezing drizzle',
  '61': 'Slight rain',
  '63': 'Moderate rain',
  '65': 'Heavy rain',
  '66': 'Light freezing rain',
  '67': 'Heavy freezing rain',
  '71': 'Slight snowfall',
  '73': 'Moderate snowfall',
  '75': 'Heavy snowfall',
  '77': 'Snow grains',
  '80': 'Slight rain showers',
  '81': 'Moderate rain showers',
  '82': 'Violent rain showers',
  '85': 'Slight snow showers',
  '86': 'Heavy snow showers',
  '95': 'Thunderstorm',
  '96': 'Thunderstorm with slight hail',
  '97': 'Heavy thunderstorm',
  '99': 'Thunderstorm with heavy hail',
}
