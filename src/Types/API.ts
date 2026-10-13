export type WeatherData = {
  current: {
    time: Date
    temperature_2m: number
    relative_humidity_2m: number
    apparent_temperature: number
    wind_speed_10m: number
    precipitation: number
    weather_code: number
  } | null
  hourly: {
    time?: Date[]
    temperature_2m: Float32Array<ArrayBufferLike> | null
    relative_humidity_2m: Float32Array<ArrayBufferLike> | null
    apparent_temperature: Float32Array<ArrayBufferLike> | null
    wind_speed_10m: Float32Array<ArrayBufferLike> | null
    precipitation: Float32Array<ArrayBufferLike> | null
    weather_code: Float32Array<ArrayBufferLike> | null
  } | null
}

export type Location = {
  lat: number
  lon: number
  name: string
  state: string
  country: string
}

export type LocationArray = Array<Location>
