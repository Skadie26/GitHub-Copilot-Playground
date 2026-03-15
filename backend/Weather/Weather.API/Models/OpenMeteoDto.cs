using System.Text.Json.Serialization;

namespace backend.Weather.Weather.API.Models;

    public class OpenMeteoResponse
    {
        [JsonPropertyName("latitude")]
        public double Latitude { get; set; }

        [JsonPropertyName("longitude")]
        public double Longitude { get; set; }

        [JsonPropertyName("timezone")]
        public string Timezone { get; set; } = string.Empty;

        [JsonPropertyName("current_weather")]
        public CurrentWeather? CurrentWeather { get; set; }

        public string ToDebugString() => $"Latitude: {Latitude}, Longitude: {Longitude}, HasCurrentWeather: {CurrentWeather != null}";

    }

    public class CurrentWeather
    {
        [JsonPropertyName("temperature")]
        public double Temperature { get; set; }

        [JsonPropertyName("windspeed")]
        public double WindSpeed { get; set; }

        [JsonPropertyName("weathercode")]
        public int WeatherCode { get; set; }

        [JsonPropertyName("time")]
        public string Time { get; set; } = string.Empty;
    }
