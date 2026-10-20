import { fetchWeatherApi } from 'openmeteo'
import type { GeolocationResults, WeatherData } from '@/Types/API.ts'

interface WeatherParams {
  latitude: number
  longitude: number
  hourly: string[]
  current: string[]
  daily: string[]
  timezone: string
  forecast_days: number
  wind_speed_unit?: string
  temperature_unit?: string
  precipitation_unit?: string
}

interface LocationParams {
  name: string
  count: number
  language: string
  format: string
}

export async function getWeather(
  lat: number,
  lng: number,
  emit: (event: 'error', error: unknown) => void,
  metric: boolean,
): Promise<WeatherData> {
  const params: WeatherParams = {
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
  if (!metric) {
    params.temperature_unit = 'fahrenheit'
    params.precipitation_unit = 'inch'
    params.wind_speed_unit = 'mph'
  }

  const url = 'https://api.open-meteo.com/v1/forecast'
  let response = null
  try {
    const responses = await fetchWeatherApi(url, params)
    response = responses[0]
  } catch (error) {
    emit('error', error)
  }

  // Process first location. Add a for-loop for multiple locations or weather models

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
  console.log(current?.time())
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
            (Number(current.time()) + (utcOffsetSeconds ? utcOffsetSeconds - 3600 : 0)) * 1000,
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

export async function getLocation(location: string): Promise<GeolocationResults> {
  const params: LocationParams = {
    name: location,
    count: 5,
    language: 'en',
    format: 'json',
  }
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${params.name}&count=${params.count}&language=${params.language}&format=${params.format}`

  try {
    const response = await fetch(url)

    return await response.json()
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
    throw error
  }
}
