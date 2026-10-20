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
  id: number
  name: string
  latitude: number
  longitude: number
  elevation: number
  feature_code: string
  country_code: string
  admin1_id?: number
  admin2_id?: number
  admin3_id?: number
  admin4_id?: number
  timezone: string
  population: number
  postcodes: string[]
  country_id?: number
  country: string
  admin1?: string
  admin2?: string
  admin3?: string
  admin4?: string
}

export type GeolocationResults = {
  generationtime_ms: number
  results: Location[]
}

export type LocationArray = Array<Location>
