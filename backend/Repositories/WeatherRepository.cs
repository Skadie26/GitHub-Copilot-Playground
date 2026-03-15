using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using backend.Weather.Weather.API.Models;
using Dapper;
using backend.Data;

namespace backend.Repositories
{
    public class WeatherRepository : IWeatherRepository
    {
        private readonly DatabaseContext _dbContext;

        public WeatherRepository(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<WeatherDto>> GetAllWeatherAsync()
        {
            using var connection = _dbContext.CreateConnection();
            var result = await connection.QueryAsync<WeatherDto>("SELECT * FROM Weather");
            Console.WriteLine($"Retrieved {result.Count()} weather records from database");
            return result;
        }

        public async Task AddWeatherAsync(WeatherDto weather)
        {
            using var connection = _dbContext.CreateConnection();
            Console.WriteLine($"Database connection string: {connection.ConnectionString}");
            await connection.ExecuteAsync(@"
                INSERT INTO Weather (CityName, Temperature, WeatherDescription, WindSpeed, Date)
                VALUES (@CityName, @Temperature, @WeatherDescription, @WindSpeed, @Date)",
                weather);
            Console.WriteLine($"Saved weather data for {weather.CityName} to database");
        }
    }
}
