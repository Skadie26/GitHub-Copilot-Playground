using backend.Repositories;
using backend.Weather.Weather.API.Controllers.v1;
using backend.Weather.Weather.API.Interfaces;
using backend.Weather.Weather.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;

namespace backendTests.Controller
{
    [TestFixture]
    public class WeatherControllerTests
    {
        private Mock<IOpenWeatherService> _mockOpenWeatherService;
        private Mock<ILogger<WeatherController>> _mockLogger;
        private Mock<IWeatherRepository> _mockWeatherRepository;
        private WeatherController _controller;

        [SetUp]
        public void Setup()
        {
            _mockOpenWeatherService = new Mock<IOpenWeatherService>();
            _mockLogger = new Mock<ILogger<WeatherController>>();
            _mockWeatherRepository = new Mock<IWeatherRepository>();

            _controller = new WeatherController(
                _mockOpenWeatherService.Object,
                _mockLogger.Object,
                _mockWeatherRepository.Object);
        }

        [Test]
        public async Task GetWeather_ShouldReturnOkWithWeatherData()
        {
            // Arrange
            var expectedWeatherData = new List<WeatherDto>
            {
                new WeatherDto
                {
                    CityName = "Berlin",
                    Temperature = 20.5,
                    WeatherDescription = "Sunny",
                    WindSpeed = 5.2,
                    Date = "2025-09-25"
                },
                new WeatherDto
                {
                    CityName = "München",
                    Temperature = 18.3,
                    WeatherDescription = "Cloudy",
                    WindSpeed = 3.8,
                    Date = "2025-09-25"
                }
            };

            _mockWeatherRepository
                .Setup(repo => repo.GetAllWeatherAsync())
                .ReturnsAsync(expectedWeatherData);

            // Act
            var result = await _controller.GetWeather();

            // Assert
            Assert.That(result, Is.TypeOf<ActionResult<IEnumerable<WeatherDto>>>());
            var okResult = result.Result as OkObjectResult;
            Assert.That(okResult, Is.Not.Null);
            Assert.That(okResult.StatusCode, Is.EqualTo(200));

            var actualData = okResult.Value as List<WeatherDto>;
            Assert.That(actualData, Is.Not.Null);
            Assert.That(actualData.Count, Is.EqualTo(2));
            Assert.That(actualData[0].CityName, Is.EqualTo("Berlin"));
            Assert.That(actualData[1].CityName, Is.EqualTo("München"));
        }

        [Test]
        public async Task GetWeather_ShouldReturnEmptyList_WhenNoDataExists()
        {
            // Arrange
            var emptyWeatherData = new List<WeatherDto>();
            _mockWeatherRepository
                .Setup(repo => repo.GetAllWeatherAsync())
                .ReturnsAsync(emptyWeatherData);

            // Act
            var result = await _controller.GetWeather();

            // Assert
            var okResult = result.Result as OkObjectResult;
            Assert.That(okResult, Is.Not.Null);
            Assert.That(okResult.StatusCode, Is.EqualTo(200));

            var actualData = okResult.Value as List<WeatherDto>;
            Assert.That(actualData, Is.Not.Null);
            Assert.That(actualData.Count, Is.EqualTo(0));
        }

        [Test]
        public async Task AddWeather_ShouldReturnCreatedAtAction_WithValidWeatherData()
        {
            // Arrange
            var newWeather = new WeatherDto
            {
                CityName = "Hamburg",
                Temperature = 22.1,
                WeatherDescription = "Rainy",
                WindSpeed = 7.5,
                Date = "2025-09-25"
            };

            _mockWeatherRepository
                .Setup(repo => repo.AddWeatherAsync(It.IsAny<WeatherDto>()))
                .Returns(Task.CompletedTask);

            // Act
            var result = await _controller.AddWeather(newWeather);

            // Assert
            Assert.That(result, Is.TypeOf<CreatedAtActionResult>());
            var createdResult = result as CreatedAtActionResult;
            Assert.That(createdResult, Is.Not.Null);
            Assert.That(createdResult.StatusCode, Is.EqualTo(201));
            Assert.That(createdResult.ActionName, Is.EqualTo(nameof(WeatherController.GetWeather)));
            Assert.That(createdResult.Value, Is.EqualTo(newWeather));

            // Verify the repository method was called
            _mockWeatherRepository.Verify(repo => repo.AddWeatherAsync(newWeather), Times.Once);
        }

        [Test]
        public async Task GetOpenMereoWeather_ShouldReturnOk_WhenDataIsRetrieved()
        {
            // Arrange
            var expectedWeatherData = new List<WeatherDto>
            {
                new WeatherDto
                {
                    CityName = "Berlin",
                    Temperature = 19.5,
                    WeatherDescription = "Clear",
                    WindSpeed = 4.2,
                    Date = "2025-09-25"
                }
            };

            _mockOpenWeatherService
                .Setup(service => service.GetCityWeatherAsync(It.IsAny<List<City>>()))
                .ReturnsAsync(expectedWeatherData);

            // Act
            var result = await _controller.GetOpenMereoWeather();

            // Assert
            Assert.That(result, Is.TypeOf<ActionResult<List<WeatherDto>>>());
            var okResult = result.Result as OkObjectResult;
            Assert.That(okResult, Is.Not.Null);
            Assert.That(okResult.StatusCode, Is.EqualTo(200));

            var actualData = okResult.Value as List<WeatherDto>;
            Assert.That(actualData, Is.Not.Null);
            Assert.That(actualData.Count, Is.EqualTo(1));
            Assert.That(actualData[0].CityName, Is.EqualTo("Berlin"));
        }

        [Test]
        public async Task GetOpenMereoWeather_ShouldReturnNoContent_WhenNoDataIsRetrieved()
        {
            // Arrange
            var emptyWeatherData = new List<WeatherDto>();
            _mockOpenWeatherService
                .Setup(service => service.GetCityWeatherAsync(It.IsAny<List<City>>()))
                .ReturnsAsync(emptyWeatherData);

            // Act
            var result = await _controller.GetOpenMereoWeather();

            // Assert
            Assert.That(result, Is.TypeOf<ActionResult<List<WeatherDto>>>());
            var noContentResult = result.Result as NoContentResult;
            Assert.That(noContentResult, Is.Not.Null);
            Assert.That(noContentResult.StatusCode, Is.EqualTo(204));
        }

        [Test]
        public async Task GetOpenMereoWeather_ShouldReturnServiceUnavailable_WhenHttpRequestExceptionOccurs()
        {
            // Arrange
            _mockOpenWeatherService
                .Setup(service => service.GetCityWeatherAsync(It.IsAny<List<City>>()))
                .ThrowsAsync(new HttpRequestException("Service unavailable"));

            // Act
            var result = await _controller.GetOpenMereoWeather();

            // Assert
            Assert.That(result, Is.TypeOf<ActionResult<List<WeatherDto>>>());
            var statusResult = result.Result as ObjectResult;
            Assert.That(statusResult, Is.Not.Null);
            Assert.That(statusResult.StatusCode, Is.EqualTo(503));
            Assert.That(statusResult.Value, Is.EqualTo("External service unavailable"));
        }

        [Test]
        public async Task GetOpenMereoWeather_ShouldReturnInternalServerError_WhenExceptionOccurs()
        {
            // Arrange
            _mockOpenWeatherService
                .Setup(service => service.GetCityWeatherAsync(It.IsAny<List<City>>()))
                .ThrowsAsync(new Exception("Unexpected error"));

            // Act
            var result = await _controller.GetOpenMereoWeather();

            // Assert
            Assert.That(result, Is.TypeOf<ActionResult<List<WeatherDto>>>());
            var statusResult = result.Result as ObjectResult;
            Assert.That(statusResult, Is.Not.Null);
            Assert.That(statusResult.StatusCode, Is.EqualTo(500));
            Assert.That(statusResult.Value, Is.EqualTo("Internal server error while retrieving weather data"));
        }

        [Test]
        public void Constructor_ShouldThrowArgumentNullException_WhenOpenWeatherServiceIsNull()
        {
            // Act & Assert
            Assert.Throws<ArgumentNullException>(() =>
                new WeatherController(null!, _mockLogger.Object, _mockWeatherRepository.Object));
        }

        [Test]
        public void Constructor_ShouldThrowArgumentNullException_WhenLoggerIsNull()
        {
            // Act & Assert
            Assert.Throws<ArgumentNullException>(() =>
                new WeatherController(_mockOpenWeatherService.Object, null!, _mockWeatherRepository.Object));
        }

        [Test]
        public void Constructor_ShouldThrowArgumentNullException_WhenWeatherRepositoryIsNull()
        {
            // Act & Assert
            Assert.Throws<ArgumentNullException>(() =>
                new WeatherController(_mockOpenWeatherService.Object, _mockLogger.Object, null!));
        }

        [Test]
        public async Task GetOpenMereoWeather_ShouldLogInformation_WhenCalled()
        {
            // Arrange
            var expectedWeatherData = new List<WeatherDto>
            {
                new WeatherDto { CityName = "Berlin", Temperature = 20.0 }
            };

            _mockOpenWeatherService
                .Setup(service => service.GetCityWeatherAsync(It.IsAny<List<City>>()))
                .ReturnsAsync(expectedWeatherData);

            // Act
            await _controller.GetOpenMereoWeather();

            // Assert
            _mockLogger.Verify(
                x => x.Log(
                    LogLevel.Information,
                    It.IsAny<EventId>(),
                    It.Is<It.IsAnyType>((v, t) => v.ToString()!.Contains("Retrieving OpenMeteo weather data")),
                    It.IsAny<Exception?>(),
                    It.IsAny<Func<It.IsAnyType, Exception?, string>>()),
                Times.AtLeastOnce);
        }
    }
}