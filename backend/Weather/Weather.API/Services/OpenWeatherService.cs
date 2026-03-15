using backend.Weather.Weather.API.Interfaces;
using backend.Weather.Weather.API.Models;
using Microsoft.Extensions.Logging;
using System.Globalization;

namespace backend.Weather.Weather.API.Services
{
    public class OpenWeatherService : IOpenWeatherService
    {

        private readonly HttpClient _httpClient;
        private readonly ILogger<OpenWeatherService> _logger;

        public OpenWeatherService(HttpClient httpClient, ILogger<OpenWeatherService> logger)
        {
            _httpClient = httpClient;
            _httpClient.Timeout = TimeSpan.FromSeconds(10);
            _logger = logger;
        }

        public async Task<List<WeatherDto>> GetCityWeatherAsync(List<City> cities)
        {
            var weatherResults = new List<WeatherDto>();

            foreach (var city in cities)
            {

                try
                {

                    // Use invariant culture to ensure proper decimal formatting (dots instead of commas)
                    string url = $"https://api.open-meteo.com/v1/forecast?latitude={city.Latitude.ToString(CultureInfo.InvariantCulture)}&longitude={city.Longitude.ToString(CultureInfo.InvariantCulture)}&current_weather=true&timezone=Europe/Berlin";
                    _logger.LogInformation("API call for {CityName}: {Url}", city.Name, url);

                    var response = await _httpClient.GetFromJsonAsync<OpenMeteoResponse>(url);
                    _logger.LogInformation("API response for {CityName}: {Response}", city.Name, response?.ToDebugString() ?? "null");

                    if (response?.CurrentWeather != null)
                    {
                        var weatherDto = new WeatherDto
                        {
                            CityName = city.Name,
                            Temperature = response.CurrentWeather.Temperature,
                            WeatherDescription = GetWeatherDesciption(response.CurrentWeather.WeatherCode),
                            WindSpeed = response.CurrentWeather.WindSpeed,
                            Date = response.CurrentWeather.Time
                        };

                        _logger.LogInformation("Weather data for {CityName}: Temp={Temp}°C, Wind={Wind}km/h",
                        city.Name, weatherDto.Temperature, weatherDto.WindSpeed);

                        weatherResults.Add(weatherDto);

                    }
                    else
                    {
                        _logger.LogWarning("No weather data received for {CityName}. Debug: {DebugInfo}", city.Name, response?.ToDebugString());
                    }
                }
                catch (HttpRequestException httpEx)
                {
                    _logger.LogError(httpEx, "HTTP request error while fetching weather for {CityName}: {Message}", city.Name, httpEx.Message);
                }
                catch (TaskCanceledException tcEx)
                {
                    _logger.LogError(tcEx, "Request timeout while fetching weather for {CityName}: {Message}", city.Name, tcEx.Message);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Unexpected error while fetching weather for {CityName}: {Message}", city.Name, ex.Message);
                }
            }
            _logger.LogInformation("Total {Count} weather data records returned", weatherResults.Count);
            return weatherResults;
        }

        private static string GetWeatherDesciption(int weatherCode)
        {
            return weatherCode switch
            {
                0 => "Clear",
                1 => "Mostly clear",
                2 => "Partly cloudy",
                3 => "Overcast",
                >= 45 and <= 48 => "Fog",
                >= 51 and <= 55 => "Drizzle",
                >= 56 and <= 57 => "Freezing drizzle",
                >= 61 and <= 65 => "Rain",
                >= 66 and <= 67 => "Freezing rain",
                >= 71 and <= 77 => "Snowfall",
                >= 80 and <= 82 => "Rain showers",
                >= 85 and <= 86 => "Snow showers",
                >= 95 and <= 99 => "Thunderstorm",
                _ => "Unknown weather"
            };
        }
    }
}
