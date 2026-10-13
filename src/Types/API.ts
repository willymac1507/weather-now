export type WeatherData = {
  current: {
    time: Date
    temperature: number
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
        humidity: number | null | undefined
        real_feel: number | null | undefined
        wind_speed: number | null | undefined
        precipitation: number | null | undefined
        weather_code: number | null | undefined
      }[]
    | null
  daily:
    | {
        date: Date
        temperature_max: number | null | undefined
        temperature_min: number | null | undefined
        weather_code: number | null | undefined
      }[]
    | null
}

export type Location = {
  lat: number
  lon: number
  name: string
  state: string
  country: string
}

export type LocationArray = Array<Location>
