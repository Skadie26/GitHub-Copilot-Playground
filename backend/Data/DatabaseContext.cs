using System.Data;
using Microsoft.Data.Sqlite;
using Dapper;

namespace backend.Data
{
    public class DatabaseContext
    {
        private readonly string _connectionString;

        public DatabaseContext(string connectionString)
        {
            _connectionString = connectionString;
        }

        public IDbConnection CreateConnection()
        {
            return new SqliteConnection(_connectionString);
        }

        public async Task InitializeDatabaseAsync()
        {
            using var connection = CreateConnection();

            // Create the table if it doesn't exist
            await connection.ExecuteAsync(@"
                CREATE TABLE IF NOT EXISTS Weather (
                    Id INTEGER PRIMARY KEY AUTOINCREMENT,
                    CityName TEXT NOT NULL,
                    Temperature REAL NOT NULL,
                    WeatherDescription TEXT NOT NULL,
                    WindSpeed REAL NOT NULL,
                    Date TEXT NOT NULL
                );
            ");

            // Check if WindSpeed column exists and add it if it doesn't (for migration)
            var columnExists = await connection.QueryFirstOrDefaultAsync<int>(@"
                SELECT COUNT(*) FROM pragma_table_info('Weather') WHERE name='WindSpeed'
            ");

            if (columnExists == 0)
            {
                await connection.ExecuteAsync(@"
                    ALTER TABLE Weather ADD COLUMN WindSpeed REAL NOT NULL DEFAULT 0;
                ");
            }
        }
    }
}
