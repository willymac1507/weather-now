import { fetchWeatherApi } from 'openmeteo'
import type { LocationArray, WeatherData } from '@/Types/API.ts'

export async function getWeather(lat: number, lng: number): Promise<WeatherData> {
  const params = {
    latitude: lat,
    longitude: lng,
    hourly: ['temperature_2m', 'is_day', 'weather_code'],
    current: [
      'temperature_2m',
      'is_day',
      'apparent_temperature',
      'wind_speed_10m',
      'precipitation',
      'relative_humidity_2m',
      'weather_code',
    ],
    daily: ['temperature_2m_max', 'temperature_2m_min', 'weather_code'],
    timezone: 'auto',
    forecast_days: 8,
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
  const timezone = response ? response.timezone() : null
  const timezoneAbbreviation = response ? response.timezoneAbbreviation() : null
  const current = response ? response.current()! : null
  const hourly = response ? response.hourly()! : null
  const daily = response ? response.daily()! : null
  const hourlyTimes = hourly
    ? Array.from(
        { length: (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval() },
        (_, i) =>
          new Date(
            (Number(hourly.time()) +
              i * hourly.interval() +
              (utcOffsetSeconds ? utcOffsetSeconds : 0)) *
              1000,
          ),
      )
    : null

  const hourlyTemps: number[] | null = hourly ? makeArray(hourly.variables(0)!.valuesArray()) : null

  const hourlyIsDay: number[] | null = hourly ? makeArray(hourly.variables(1)!.valuesArray()) : null

  const hourlyWeatherCode: number[] | null = hourly
    ? makeArray(hourly.variables(2)!.valuesArray())
    : null

  const hourlyWeather = hourlyTimes
    ? hourlyTimes.map((hourlyTime, index) => ({
        date: hourlyTime,
        temperature: hourlyTemps ? hourlyTemps[index] : null,
        is_day: hourlyIsDay ? hourlyIsDay[index] : null,
        weather_code: hourlyWeatherCode ? hourlyWeatherCode[index] : null,
      }))
    : null

  const dailyTimes: Date[] | null = daily
    ? Array.from(
        { length: (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval() },
        (_, i) =>
          new Date(
            (Number(daily.time()) +
              i * daily.interval() +
              (utcOffsetSeconds ? utcOffsetSeconds : 0)) *
              1000,
          ),
      )
    : null

  const dailyMaxTemp: number[] | null = daily ? makeArray(daily.variables(0)!.valuesArray()) : null

  const dailyMinTemp: number[] | null = daily ? makeArray(daily.variables(1)!.valuesArray()) : null

  const dailyWeatherCode: number[] | null = daily
    ? makeArray(daily.variables(2)!.valuesArray())
    : null

  const dailyWeather = dailyTimes
    ? dailyTimes.map((hourlyTime, index) => ({
        date: hourlyTime,
        temperature_max: dailyMaxTemp ? dailyMaxTemp[index] : null,
        temperature_min: dailyMinTemp ? dailyMinTemp[index] : null,
        weather_code: dailyWeatherCode ? dailyWeatherCode[index] : null,
      }))
    : null

  dailyWeather ? dailyWeather.shift() : null

  function makeArray(array: Float32Array<ArrayBufferLike> | null): number[] | null {
    return hourly ? Array.prototype.slice.call(array) : null
  }

  // Note: The order of weather variables in the URL query and the indices below need to match!

  return {
    utcOffsetSeconds: utcOffsetSeconds ? utcOffsetSeconds : 0,
    timezone: timezone ? timezone : '',
    timezoneAbbreviation: timezoneAbbreviation ? timezoneAbbreviation : '',
    current: current
      ? {
          time: new Date(
            (Number(current.time()) + (utcOffsetSeconds ? utcOffsetSeconds : 0)) * 1000,
          ),
          temperature: current.variables(0)!.value(),
          is_day: current.variables(1)!.value(),
          real_feel: current.variables(2)!.value(),
          wind_speed: current.variables(3)!.value(),
          precipitation: current.variables(4)!.value(),
          humidity: current.variables(5)!.value(),
          weather_code: current.variables(6)!.value(),
        }
      : null,
    hourly: hourlyWeather ? hourlyWeather : null,
    daily: dailyWeather ? dailyWeather : null,
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
