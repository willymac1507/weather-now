export type WeatherData = {
  utcOffsetSeconds: number
  timezone: string
  timezoneAbbreviation: string
  current: {
    time: Date
    temperature: number
    is_day: number
    humidity: number
    real_feel: number
    wind_speed: number
    precipitation: number
    weather_code: number
  } | null
  hourly:
    | {
        date: Date
        temperature: number | null | undefined
        is_day: number | null | undefined
        weather_code: number | null | undefined
      }[]
    | null
    | undefined
  daily:
    | {
        date: Date
        temperature_max: number | null | undefined
        temperature_min: number | null | undefined
        weather_code: number | null | undefined
      }[]
    | null
    | undefined
}

export type Location = {
  lat: number
  lon: number
  name: string
  state: string
  country: string
}

export type LocationArray = Array<Location>
