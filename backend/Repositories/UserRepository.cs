using Interfaces;
using Microsoft.Data.SqlClient;
using Models;
using Microsoft.Extensions.Logging;

namespace Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly IConfiguration _config;
        private readonly ILogger<UserRepository> _logger;

        private readonly string _connectionString;

        public UserRepository(IConfiguration config, ILogger<UserRepository> logger)
        {
            _config = config;
            _connectionString = config.GetConnectionString("DefaultConnection") ??
                "Server=localhost,1433;Database=BlogDB;User Id=sa;Password=Password@1234;TrustServerCertificate=True;";

            _logger = logger;
        }

        public async Task<int> AddAsync(User user)
        {
            string cmdText = @"
                INSERT INTO Users (Username, Email, PasswordHash)
                VALUES (@Username, @Email, @PasswordHash);
                SELECT CAST(SCOPE_IDENTITY() AS INT);
            ";

            await using (var connection = new SqlConnection(_connectionString))
            await using (var command = new SqlCommand(cmdText, connection))
            {
                command.Parameters.AddWithValue("@Username", user.Username);
                command.Parameters.AddWithValue("@Email", user.Email);
                command.Parameters.AddWithValue("@PasswordHash", user.PasswordHash);

                try
                {
                    await connection.OpenAsync();
                    var result = await command.ExecuteScalarAsync();
                    return Convert.ToInt32(result);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Couldn't add the user to DB");
                    return -1;
                }

            }
        }

        public async Task<bool> IsExistByUsernameAsync(string username)
        {
            string cmdText = @"
                Select 1 from Users
                Where Username = @Username
            ";

            await using (var connection = new SqlConnection(_connectionString))
            await using (var command = new SqlCommand(cmdText, connection))
            {
                command.Parameters.AddWithValue("@Username", username);

                try
                {
                    await connection.OpenAsync();
                    var result = await command.ExecuteScalarAsync();
                    return result != null;
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Couldn't check user existance in DB");
                    return false;
                }

            }
        }

        public async Task<User?> GetByIdAsync(int userId)
        {
            string cmdText = @"
                SELECT 
                    Id,
                    Username,
                    Email,
                    PasswordHash
                FROM Users
                WHERE Id = @UserId
            ";

            await using (var connection = new SqlConnection(_connectionString))
            await using (var command = new SqlCommand(cmdText, connection))
            {
                command.Parameters.AddWithValue("@UserId", userId);

                try
                {
                    await connection.OpenAsync();
                    var reader = await command.ExecuteReaderAsync();

                    if (await reader.ReadAsync())
                    {
                        return new User
                        {
                            Id = (int)reader["Id"],
                            Username = (string)reader["Username"],
                            Email = (string)reader["Email"],
                            PasswordHash = (string)reader["PasswordHash"]
                        };
                    }

                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Couldn't get user by Id from DB");
                }

                return null;

            }
        }

        public async Task<User?> GetByUsernameAndPasswordHashAsync(string username, string passwordHash)
        {
            string cmdText = @"
                SELECT 
                    Id,
                    Username,
                    Email,
                    PasswordHash
                FROM Users
                WHERE Username = @Username
                AND PasswordHash = @PasswordHash;
            ";

            await using (var connection = new SqlConnection(_connectionString))
            await using (var command = new SqlCommand(cmdText, connection))
            {
                command.Parameters.AddWithValue("@Username", username);
                command.Parameters.AddWithValue("@PasswordHash", passwordHash);

                try
                {
                    await connection.OpenAsync();
                    var reader = await command.ExecuteReaderAsync();

                    if (await reader.ReadAsync())
                    {
                        return new User
                        {
                            Id = (int)reader["Id"],
                            Username = (string)reader["Username"],
                            Email = (string)reader["Email"],
                            PasswordHash = (string)reader["PasswordHash"]
                        };
                    }

                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Couldn't get user by username and password hash from DB");
                }

                return null;

            }
        }
    }
}