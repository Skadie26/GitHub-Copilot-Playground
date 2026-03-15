export interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

export interface SimplifiedWeather {
  temperature: number;
  weatherDescription: string;
  date: string;
  cityName?: string;
  windspeed?: number;
}

export interface BackendWeatherResponse {
  cityName: string;
  temperature: number;
  weatherDescription: string;
  windSpeed: number;
  date: string;
}
