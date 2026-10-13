const myWeatherCodes = [
  {
    range: [0],
    icon: '/images/icon-sunny.webp',
  },
  {
    range: [1, 2],
    icon: '/images/icon-partly-cloudy.webp',
  },
  {
    range: [3],
    icon: '/images/icon-overcast.webp',
  },
  {
    range: [45, 48],
    icon: '/images/icon-fog.webp',
  },
  {
    range: [51, 57],
    icon: '/images/icon-drizzle.webp',
  },
  {
    range: [61, 67],
    icon: '/images/icon-rain.webp',
  },
  {
    range: [71, 77],
    icon: '/images/icon-snow.webp',
  },
  {
    range: [80, 82],
    icon: '/images/icon-rain.webp',
  },
  {
    range: [85, 86],
    icon: '/images/icon-snow.webp',
  },
  {
    range: [95, 99],
    icon: '/images/icon-storm.webp',
  },
]

export function getWeatherIcon(code: number) {
  const weatherCode = myWeatherCodes.find((codeRange) => codeRange.range.includes(code))
  if (!weatherCode) return '/images/icon-sunny.webp'
  return weatherCode?.icon
}
