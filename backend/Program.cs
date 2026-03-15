using backend.Data;
using backend.Repositories;
using backend.Weather.Weather.API.Interfaces;
using backend.Weather.Weather.API.Services;
using System.IO;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular",
        policy => policy
            .WithOrigins("http://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod());
});

builder.Services.AddHttpClient();
builder.Services.AddScoped<IOpenWeatherService, OpenWeatherService>();

// Determine database path (inside container defaults to /data/local.db; locally falls back to ./backend/Data/local.db)
var dbPathEnv = Environment.GetEnvironmentVariable("DB_PATH");
var defaultLocalPath = Path.Combine(AppContext.BaseDirectory, "data", "local.db");
var dbPath = string.IsNullOrWhiteSpace(dbPathEnv) ? defaultLocalPath : dbPathEnv;
var dbDir = Path.GetDirectoryName(dbPath);
if (!string.IsNullOrEmpty(dbDir) && !Directory.Exists(dbDir))
{
    Directory.CreateDirectory(dbDir);
}
builder.Services.AddSingleton(new DatabaseContext($"Data Source={dbPath}"));

// Register WeatherRepository
builder.Services.AddScoped<IWeatherRepository, WeatherRepository>();

// Allow overriding URLs via ASPNETCORE_URLS env (e.g. set in container)
var urlsEnv = Environment.GetEnvironmentVariable("ASPNETCORE_URLS");
if (!string.IsNullOrWhiteSpace(urlsEnv))
{
    builder.WebHost.UseUrls(urlsEnv);
}

var app = builder.Build();

// Initialize the database
var dbContext = app.Services.GetRequiredService<DatabaseContext>();
await dbContext.InitializeDatabaseAsync();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAngular");
app.MapControllers();
app.MapGet("/api/hello", () => Results.Json(new { message = "Hello World!" }));

app.Run();
