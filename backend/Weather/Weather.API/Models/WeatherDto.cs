namespace backend.Weather.Weather.API.Models
{
    public class WeatherDto
    {
        public string CityName { get; set; } = string.Empty;
        public double Temperature { get; set; }
        public string WeatherDescription { get; set; } = string.Empty;
        public double WindSpeed { get; set; }
        public string Date { get; set; } = string.Empty;
    }
}
