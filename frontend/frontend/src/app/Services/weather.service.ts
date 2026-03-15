import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Observable,
  catchError,
  forkJoin,
  map,
  switchMap,
  throwError,
} from 'rxjs';
import { API_CONFIG } from '../config/app.config';
import {
  BackendWeatherResponse,
  SimplifiedWeather,
} from '../interfaces/weather.interfaces';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getWeather(): Observable<SimplifiedWeather[]> {
    return this.http
      .get<BackendWeatherResponse[]>(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.FETCH_FRESH_WEATHER}`
      )
      .pipe(
        map((response) =>
          response.map((item) => ({
            cityName: item.cityName,
            temperature: item.temperature,
            weatherDescription: item.weatherDescription,
            date: item.date,
            windspeed: item.windSpeed,
          }))
        ),
        catchError(this.handleError)
      );
  }

  getWeatherFromDatabase(): Observable<SimplifiedWeather[]> {
    return this.http
      .get<BackendWeatherResponse[]>(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.WEATHER}`
      )
      .pipe(
        map((response) =>
          response.map((item) => ({
            cityName: item.cityName,
            temperature: item.temperature,
            weatherDescription: item.weatherDescription,
            date: item.date,
            windspeed: item.windSpeed,
          }))
        ),
        catchError(this.handleError)
      );
  }

  fetchAndSaveWeatherData(): Observable<any[]> {
    // First fetch the data from OpenMeteo API
    return this.http
      .get<BackendWeatherResponse[]>(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.FETCH_FRESH_WEATHER}`
      )
      .pipe(
        // Then save each weather entry to the database
        switchMap((weatherData) => {
          const saveRequests = weatherData.map((weather) =>
            this.http.post(
              `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SAVE_WEATHER}`,
              weather
            )
          );
          return forkJoin(saveRequests);
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    console.error('BackendWeatherService Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
