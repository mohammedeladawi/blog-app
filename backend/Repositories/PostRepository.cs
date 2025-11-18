using Interfaces.IRepositories;
using Microsoft.Data.SqlClient;
using Models;

namespace Repositories
{
    public class PostRepository : IPostRepository
    {
        private readonly IConfiguration _config;
        private readonly ILogger<PostRepository> _logger;

        private readonly string _connectionString;

        public PostRepository(ILogger<PostRepository> logger, IConfiguration config)
        {
            _config = config;
            _connectionString = config.GetConnectionString("DefaultConnection") ??
                "Server=localhost,1433;Database=BlogDB;User Id=sa;Password=Password@1234;TrustServerCertificate=True;";

            _logger = logger;

        }

        public async Task<int> AddAsync(Post post)
        {
            string cmdText = @"
                Insert into Posts (Title, Slug, Content, Summary, ImageUrl, CreatedAt)
                Values (@Title, @Slug, @Content, @Summary, @ImageUrl, @CreatedAt);
                Select SCOPE_IDENTITY();
            ";

            await using var connection = new SqlConnection(_connectionString);
            await using var command = new SqlCommand(cmdText, connection);

            command.Parameters.AddWithValue("@Title", post.Title);
            command.Parameters.AddWithValue("@Slug", post.Slug);
            command.Parameters.AddWithValue("@Content", post.Content);
            command.Parameters.AddWithValue("@Summary", post.Summary);
            command.Parameters.AddWithValue("@ImageUrl", post.ImageUrl ?? (object)DBNull.Value);
            command.Parameters.AddWithValue("@CreatedAt", post.CreatedAt);

            try
            {
                await connection.OpenAsync();
                var result = await command.ExecuteScalarAsync();
                return Convert.ToInt32(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error adding new post to database.");
                return -1;
            }
        }

        public async Task<Post?> GetBySlugAsync(string slug)
        {
            string cmdText = @"
                Select 
                    Id, 
                    Title, 
                    Slug, 
                    Content, 
                    Summary, 
                    ImageUrl, 
                    CreatedAt, 
                    UpdatedAt, 
                    UserId
                From Posts
                Where Slug = @Slug;
            ";

            await using var connection = new SqlConnection(_connectionString);
            await using var command = new SqlCommand(cmdText, connection);

            command.Parameters.AddWithValue("@Slug", slug);
            try
            {
                await connection.OpenAsync();
                await using var reader = await command.ExecuteReaderAsync();
                if (await reader.ReadAsync())
                {
                    return new Post
                    {
                        Id = reader.GetInt32(0),
                        Title = reader.GetString(1),
                        Slug = reader.GetString(2),
                        Content = reader.GetString(3),
                        Summary = reader.GetString(4),
                        ImageUrl = reader.IsDBNull(5) ? null : reader.GetString(5),
                        CreatedAt = reader.GetDateTime(6),
                        UpdatedAt = reader.GetDateTime(7),
                        UserId = reader.GetInt32(8)
                    };
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving post by slug from database.");
            }

            return null;
        }

        public async Task<int> GetCountAsync()
        {
            string cmdText = "Select Count(*) From Posts;";

            await using var connection = new SqlConnection(_connectionString);
            await using var command = new SqlCommand(cmdText, connection);
            try
            {
                await connection.OpenAsync();
                var result = await command.ExecuteScalarAsync();
                return Convert.ToInt32(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting post count from database.");
                return -1;
            }
        }

        public async Task<IEnumerable<Post>> GetPostsAsync(int skip, int limit)
        {
            var posts = new List<Post>();

            string cmdText = @"
                SELECT 
                    Id, 
                    Title, 
                    Slug, 
                    Content, 
                    Summary, 
                    ImageUrl, 
                    CreatedAt, 
                    UpdatedAt, 
                    UserId
                From Posts
                ORDER BY CreatedAt DESC
                OFFSET @Skip ROWS
                FETCH NEXT @Limit ONLY;
            ";

            await using var connection = new SqlConnection(_connectionString);
            await using var command = new SqlCommand(cmdText, connection);
            command.Parameters.AddWithValue("@Skip", skip);
            command.Parameters.AddWithValue("@Limit", limit);

            try
            {
                await connection.OpenAsync();
                await using var reader = await command.ExecuteReaderAsync();
                while (await reader.ReadAsync())
                {
                    posts.Add(new Post
                    {
                        Id = reader.GetInt32(0),
                        Title = reader.GetString(1),
                        Slug = reader.GetString(2),
                        Content = reader.GetString(3),
                        Summary = reader.GetString(4),
                        ImageUrl = reader.IsDBNull(5) ? null : reader.GetString(5),
                        CreatedAt = reader.GetDateTime(6),
                        UpdatedAt = reader.GetDateTime(7),
                        UserId = reader.GetInt32(8)
                    });
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving posts from database.");
            }

            return posts;

        }

        public async Task<bool> SlugExistsAsync(string slug)
        {
            string cmdText = @"
                SELECT TOP 1 1 FROM Posts
                WHERE Slug = @Slug;
            ";

            await using var connection = new SqlConnection(_connectionString);
            await using var command = new SqlCommand(cmdText, connection);
            command.Parameters.AddWithValue("@Slug", slug);

            try
            {
                await connection.OpenAsync();
                var result = await command.ExecuteScalarAsync();
                return result != null;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting post count from database.");
            }

            return false;
        }


        //====== Todo: Implement these methods ======
        public Task<bool> DeleteByIdAsync(int postId)
        {
            throw new NotImplementedException();
        }

        public Task<bool> UpdateAsync(Post post)
        {
            throw new NotImplementedException();
        }
    }
}