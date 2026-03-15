using backend.Weather.Weather.API.Models;

namespace backend.Weather.Weather.API.Interfaces
{
    public interface IOpenWeatherService
    {
        Task<List<WeatherDto>> GetCityWeatherAsync(List<City> cities);
    }
}
