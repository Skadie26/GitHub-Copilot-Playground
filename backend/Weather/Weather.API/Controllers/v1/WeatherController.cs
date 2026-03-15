using backend.Repositories;
using backend.Weather.Weather.API.Interfaces;
using backend.Weather.Weather.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Weather.Weather.API.Controllers.v1
{

    [ApiController]
    [Route("api/v1/[controller]")]
    public class WeatherController: ControllerBase
    {

        private readonly IOpenWeatherService _openWeatherService;
        private readonly ILogger<WeatherController> _logger;
        private readonly IWeatherRepository _weatherRepository;

        private static readonly List<City> Cities = new()
        {
            new City { Name = "Berlin", Latitude = 52.52, Longitude = 13.41 },
            new City { Name = "München", Latitude = 48.14, Longitude = 11.58 },
            new City { Name = "Hamburg", Latitude = 53.55, Longitude = 10.00 },
            new City { Name = "Köln", Latitude = 50.94, Longitude = 6.96 },
            new City { Name = "Frankfurt am Main", Latitude = 50.11, Longitude = 8.68 },
            new City { Name = "Stuttgart", Latitude = 48.78, Longitude = 9.18 },
            new City { Name = "Düsseldorf", Latitude = 51.23, Longitude = 6.78 },
            new City { Name = "Leipzig", Latitude = 51.34, Longitude = 12.37 },
            new City { Name = "Dortmund", Latitude = 51.51, Longitude = 7.47 },
            new City { Name = "Essen", Latitude = 51.45, Longitude = 7.01 },
            new City { Name = "Bremen", Latitude = 53.08, Longitude = 8.80 },
            new City { Name = "Dresden", Latitude = 51.05, Longitude = 13.74 },
            new City { Name = "Hannover", Latitude = 52.37, Longitude = 9.72 },
            new City { Name = "Nürnberg", Latitude = 49.45, Longitude = 11.08 },
            new City { Name = "Bochum", Latitude = 51.48, Longitude = 7.22 }
        };

        public WeatherController(IOpenWeatherService openWeatherService, ILogger<WeatherController> logger, IWeatherRepository weatherRepository)
        {
            _openWeatherService = openWeatherService ?? throw new ArgumentNullException(nameof(openWeatherService));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _weatherRepository = weatherRepository ?? throw new ArgumentNullException(nameof(weatherRepository));
        }

        [HttpGet("openmeteo")]

        public async Task<ActionResult<List<WeatherDto>>> GetOpenMereoWeather()
        {
            try
            {
                _logger.LogInformation("Retrieving OpenMeteo weather data for {Count} cities", Cities.Count);
                var result = await _openWeatherService.GetCityWeatherAsync(Cities);

                _logger.LogInformation("OpenMeteo weather data retrieved: {Count} results", result.Count);

                if (result.Count == 0)
                {
                    _logger.LogWarning("No weather data received from OpenMeteo");
                    return NoContent();
                }

                return Ok(result);
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError(ex, "HTTP error while retrieving OpenMeteo weather data");
                return StatusCode(503, "External service unavailable");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving OpenMeteo weather data");
                return StatusCode(500, "Internal server error while retrieving weather data");
            }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<WeatherDto>>> GetWeather()
        {
            var weatherData = await _weatherRepository.GetAllWeatherAsync();
            return Ok(weatherData);
        }

        [HttpPost]
        public async Task<IActionResult> AddWeather([FromBody] WeatherDto weather)
        {
            await _weatherRepository.AddWeatherAsync(weather);
            return CreatedAtAction(nameof(GetWeather), new { id = weather.CityName }, weather);
        }
    }
}
