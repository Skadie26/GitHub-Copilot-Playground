import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { SimplifiedWeather } from '../../interfaces/weather.interfaces';
import { WeatherService } from '../../Services/weather.service';
import { columnDefs, defaultColDef } from './backend-weather.grid';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, AgGridModule],
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  @Output() weatherDataChange = new EventEmitter<{
    isLoading: boolean;
    error: string | null;
    dataCount: number;
  }>();

  columnDefs = columnDefs;
  defaultColDef = defaultColDef;
  weatherData: SimplifiedWeather[] = [];
  isLoading = true;
  error: string | null = null;
  isSaving = false;
  isShowingOpenMeteoData = true; // Default to showing OpenMeteo data

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.loadOpenMeteoData(); // Load OpenMeteo data by default
  }

  private emitDataChange(): void {
    this.weatherDataChange.emit({
      isLoading: this.isLoading,
      error: this.error,
      dataCount: this.weatherData.length,
    });
  }

  loadWeatherData(): void {
    this.isLoading = true;
    this.error = null;
    this.weatherData = [];
    this.emitDataChange();

    this.weatherService.getWeather().subscribe({
      next: (data) => {
        console.log('Received fresh weather data from OpenMeteo API:', data);
        this.isLoading = false;
        if (data && data.length > 0) {
          this.weatherData = data;
          console.log('Weather data set to grid:', this.weatherData);
        } else {
          console.warn('Empty weather data received from OpenMeteo API');
          this.error = 'No weather data available from OpenMeteo API';
        }
        this.emitDataChange();
      },
      error: (error) => {
        console.error('Error loading weather data from OpenMeteo API:', error);
        this.isLoading = false;
        this.error = 'Error loading data from OpenMeteo API';
        this.weatherData = [
          {
            cityName: 'Error',
            temperature: 0,
            weatherDescription: 'Error loading data from OpenMeteo API',
            date: new Date().toISOString(),
          },
        ];
        this.emitDataChange();
      },
    });
  }

  loadOpenMeteoData(): void {
    this.isShowingOpenMeteoData = true;
    this.loadWeatherData(); // This now calls OpenMeteo endpoint
  }

  loadDatabaseData(): void {
    this.isShowingOpenMeteoData = false;
    this.isLoading = true;
    this.error = null;
    this.weatherData = [];
    this.emitDataChange();

    // Call the database endpoint directly
    this.weatherService.getWeatherFromDatabase().subscribe({
      next: (data) => {
        console.log('Received weather data from database:', data);
        this.isLoading = false;
        if (data && data.length > 0) {
          this.weatherData = data;
          console.log('Database weather data set to grid:', this.weatherData);
        } else {
          console.warn('Empty weather data received from database');
          this.error = 'No weather data available in database';
        }
        this.emitDataChange();
      },
      error: (error) => {
        console.error('Error loading weather data from database:', error);
        this.isLoading = false;
        this.error = 'Error loading data from database';
        this.weatherData = [
          {
            cityName: 'Error',
            temperature: 0,
            weatherDescription: 'Error loading data from database',
            date: new Date().toISOString(),
          },
        ];
        this.emitDataChange();
      },
    });
  }

  fetchAndSaveData(): void {
    this.isSaving = true;
    this.weatherService.fetchAndSaveWeatherData().subscribe({
      next: (result) => {
        console.log('Weather data saved successfully:', result);
        this.isSaving = false;
        // Optionally refresh the database view if currently showing it
        if (!this.isShowingOpenMeteoData) {
          this.loadDatabaseData();
        }
      },
      error: (error) => {
        console.error('Error saving weather data:', error);
        this.isSaving = false;
        this.error = 'Error saving weather data to database';
      },
    });
  }
}
