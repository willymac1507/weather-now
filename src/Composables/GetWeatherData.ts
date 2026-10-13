import { fetchWeatherApi } from 'openmeteo'
import type { LocationArray, WeatherData } from '@/Types/API.ts'

export async function getWeather(lat: number, lng: number): Promise<WeatherData> {
  const params = {
    latitude: lat,
    longitude: lng,
    hourly: [
      'temperature_2m',
      'apparent_temperature',
      'relative_humidity_2m',
      'wind_speed_10m',
      'precipitation',
      'weather_code',
    ],
    current: [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'wind_speed_10m',
      'precipitation',
      'weather_code',
    ],
  }
  const url = 'https://api.open-meteo.com/v1/forecast'
  const responses = await fetchWeatherApi(url, params)

  // Process first location. Add a for-loop for multiple locations or weather models
  const response = responses[0]

  // Attributes for timezone and location
  const latitude = response ? response.latitude() : null
  const longitude = response ? response.longitude() : null
  const elevation = response ? response.elevation() : null
  const utcOffsetSeconds = response ? response.utcOffsetSeconds() : null

  const current = response ? response.current()! : null
  const hourly = response ? response.hourly()! : null

  // Note: The order of weather variables in the URL query and the indices below need to match!

  return {
    current: current
      ? {
          time: new Date(
            (Number(current.time()) + (utcOffsetSeconds ? utcOffsetSeconds : 0)) * 1000,
          ),
          temperature_2m: current.variables(0)!.value(),
          relative_humidity_2m: current.variables(1)!.value(),
          apparent_temperature: current.variables(2)!.value(),
          wind_speed_10m: current.variables(3)!.value(),
          precipitation: current.variables(4)!.value(),
          weather_code: current.variables(5)!.value(),
        }
      : null,
    hourly: hourly
      ? {
          time: Array.from(
            { length: (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval() },
            (_, i) =>
              new Date(
                (Number(hourly.time()) +
                  i * hourly.interval() +
                  (utcOffsetSeconds ? utcOffsetSeconds : 0)) *
                  1000,
              ),
          ),
          temperature_2m: hourly.variables(0)!.valuesArray(),
          apparent_temperature: hourly.variables(1)!.valuesArray(),
          relative_humidity_2m: hourly.variables(2)!.valuesArray(),
          wind_speed_10m: hourly.variables(3)!.valuesArray(),
          precipitation: hourly.variables(4)!.valuesArray(),
          weather_code: hourly.variables(5)!.valuesArray(),
        }
      : null,
  }
}

export async function getLocation(location: string): Promise<LocationArray> {
  const url = 'http://api.openweathermap.org/geo/1.0/direct?q='
  const city = location
  const apiKey = import.meta.env.VITE_OPEN_WEATHER_API
  try {
    const response = await fetch(`${url}${city}&limit=5&appid=${apiKey}`)

    return await response.json()
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
    throw error
  }
}
