using Interfaces;
using Microsoft.Data.SqlClient;
using Models;
using Microsoft.Extensions.Logging;
using Interfaces.IRepositories;

namespace Repositories
{
    public class RefreshTokenRepository : IRefreshTokenRepository
    {
        private readonly IConfiguration _config;
        private readonly ILogger<RefreshTokenRepository> _logger;

        private readonly string _connectionString;

        public RefreshTokenRepository(IConfiguration config, ILogger<RefreshTokenRepository> logger)
        {
            _config = config;
            _connectionString = config.GetConnectionString("DefaultConnection") ??
                "Server=localhost,1433;Database=BlogDB;User Id=sa;Password=Password@1234;TrustServerCertificate=True;";

            _logger = logger;
        }

        public async Task<bool> AddAsync(RefreshToken refreshToken)
        {
            string cmdText = @"
                UPDATE RefreshTokens
                    SET IsRevoked = 1
                WHERE UserId = @UserId;

                INSERT INTO RefreshTokens (Token, ExpiresAt, UserId)
                VALUES (@Token, @ExpiresAt, @UserId);
            ";

            await using (var connection = new SqlConnection(_connectionString))
            await using (var command = new SqlCommand(cmdText, connection))
            {
                command.Parameters.AddWithValue("@Token", refreshToken.Token);
                command.Parameters.AddWithValue("@ExpiresAt", refreshToken.ExpiresAt);
                command.Parameters.AddWithValue("@UserId", refreshToken.UserId);

                try
                {
                    await connection.OpenAsync();

                    using (var transaction = connection.BeginTransaction())
                    {
                        command.Transaction = transaction;
                        int rowsAffected = await command.ExecuteNonQueryAsync();
                        if (rowsAffected > 0)
                        {
                            transaction.Commit();
                            return true;
                        }

                        transaction.Rollback();
                        return false;

                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Couldn't add the refresh token to DB");
                    return false;
                }

            }
        }

        public async Task<RefreshToken?> GetAsync(string refreshToken)
        {
            string cmdText = @"
                SELECT 
                    Id,
                    Token,
                    ExpiresAt,
                    IsUsed,
                    IsRevoked,
                    UserId
                FROM RefreshTokens
                WHERE Token = @RefreshToken;
            ";

            await using (var connection = new SqlConnection(_connectionString))
            await using (var command = new SqlCommand(cmdText, connection))
            {
                command.Parameters.AddWithValue("@RefreshToken", refreshToken);

                try
                {
                    await connection.OpenAsync();
                    var reader = await command.ExecuteReaderAsync();
                    if (await reader.ReadAsync())
                    {
                        return new RefreshToken
                        {
                            Id = (int)reader["Id"],
                            Token = (string)reader["Token"],
                            ExpiresAt = (DateTime)reader["ExpiresAt"],
                            IsUsed = (bool)reader["IsUsed"],
                            IsRevoked = (bool)reader["IsRevoked"],
                            UserId = (int)reader["UserId"],
                        };
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Couldn't get the refresh token from DB");
                }

                return null;

            }
        }

        public async Task<bool> MarkAsRevokedAsync(string refreshToken)
        {
            string cmdText = @"
                Update RefreshTokens
                    SET IsRevoked = 1
                WHERE Token = @RefreshToken;
            ";

            await using (var connection = new SqlConnection(_connectionString))
            await using (var command = new SqlCommand(cmdText, connection))
            {
                command.Parameters.AddWithValue("@RefreshToken", refreshToken);

                try
                {
                    await connection.OpenAsync();
                    int rowsAffected = await command.ExecuteNonQueryAsync();
                    return rowsAffected > 0;

                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Couldn't revoke the refresh token in DB");
                    return false;
                }
            }
        }

        public async Task<bool> MarkAsUsedAsync(string refreshToken)
        {
            string cmdText = @"
                Update RefreshTokens
                    SET IsUsed = 1
                WHERE Token = @RefreshToken;
            ";

            await using (var connection = new SqlConnection(_connectionString))
            await using (var command = new SqlCommand(cmdText, connection))
            {
                command.Parameters.AddWithValue("@RefreshToken", refreshToken);

                try
                {
                    await connection.OpenAsync();
                    int rowsAffected = await command.ExecuteNonQueryAsync();
                    return rowsAffected > 0;

                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Couldn't mark refresh token as used in DB");
                    return false;
                }
            }
        }
    }
}