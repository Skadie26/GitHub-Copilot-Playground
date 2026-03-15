using backend.Weather.Weather.API.Models;

namespace backend.Repositories
{
    public interface IWeatherRepository
    {
        Task<IEnumerable<WeatherDto>> GetAllWeatherAsync();
        Task AddWeatherAsync(WeatherDto weather);
    }
}