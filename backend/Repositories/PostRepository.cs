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
                Insert into Posts (Title, Slug, Content, Summary, ImageUrl, CreatedAt, UserId)
                Values (@Title, @Slug, @Content, @Summary, @ImageUrl, @CreatedAt, @UserId);
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
            command.Parameters.AddWithValue("@UserId", post.Author.Id);


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
                    P.Id, 
                    P.Title, 
                    P.Slug, 
                    P.Content, 
                    P.Summary, 
                    P.ImageUrl, 
                    P.CreatedAt, 
                    P.UpdatedAt, 
                    U.Id as AuthorId,
                    U.Username as AuthorName
                From Posts P
                INNER JOIN Users U ON P.UserId = U.Id
                Where P.Slug = @Slug;
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
                        Author = new User
                        {
                            Id = reader.GetInt32(8),
                            Username = reader.GetString(9)
                        }
                    };
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving post by slug from database.");
            }

            return null;
        }

        public async Task<Post?> GetByIdAsync(int postId)
        {
            string cmdText = @"
                Select 
                    P.Id, 
                    P.Title, 
                    P.Slug, 
                    P.Content, 
                    P.Summary, 
                    P.ImageUrl, 
                    P.CreatedAt, 
                    P.UpdatedAt, 
                    U.Id as AuthorId,
                    U.Username as AuthorName
                From Posts P
                INNER JOIN Users U ON P.UserId = U.Id
                Where P.Id = @PostId;
            ";

            await using var connection = new SqlConnection(_connectionString);
            await using var command = new SqlCommand(cmdText, connection);

            command.Parameters.AddWithValue("@PostId", postId);
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
                        Author = new User
                        {
                            Id = reader.GetInt32(8),
                            Username = reader.GetString(9)
                        }
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

        public async Task<IEnumerable<Post>> GetPostsAsync(int offset, int limit)
        {
            var posts = new List<Post>();

            string cmdText = @"
                SELECT 
                    P.Id, 
                    P.Title, 
                    P.Slug, 
                    P.Summary, 
                    P.ImageUrl, 
                    P.CreatedAt, 
                    U.Id as AuthorId,
                    U.Username as AuthorName
                From Posts P
                INNER JOIN Users U ON P.UserId = U.Id
                ORDER BY P.CreatedAt DESC
                OFFSET @Offset ROWS
                FETCH NEXT @Limit Rows ONLY;
            ";

            await using var connection = new SqlConnection(_connectionString);
            await using var command = new SqlCommand(cmdText, connection);
            command.Parameters.AddWithValue("@Offset", offset);
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
                        Summary = reader.GetString(3),
                        ImageUrl = reader.IsDBNull(4) ? null : reader.GetString(4),
                        CreatedAt = reader.GetDateTime(5),
                        Author = new User
                        {
                            Id = reader.GetInt32(6),
                            Username = reader.GetString(7)
                        }
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

        public async Task<bool> DeleteByIdAsync(int postId)
        {
            string cmdText = @"
                DELETE FROM Posts
                WHERE Id = @PostId;
            ";

            await using var connection = new SqlConnection(_connectionString);
            await using var command = new SqlCommand(cmdText, connection);
            command.Parameters.AddWithValue("@PostId", postId);

            try
            {
                await connection.OpenAsync();
                int rowsAffected = await command.ExecuteNonQueryAsync();
                return rowsAffected > 0;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting post from database.");
                return false;
            }
        }

        public async Task<bool> UpdateAsync(Post post)
        {
            string cmdText = @"
                UPDATE Posts
                SET Title = @Title,
                    Slug = @Slug,
                    Content = @Content,
                    Summary = @Summary,
                    ImageUrl = @ImageUrl,
                    UpdatedAt = @UpdatedAt
                WHERE Id = @Id;
            ";

            await using var connection = new SqlConnection(_connectionString);
            await using var command = new SqlCommand(cmdText, connection);
            command.Parameters.AddWithValue("@Title", post.Title);
            command.Parameters.AddWithValue("@Slug", post.Slug);
            command.Parameters.AddWithValue("@Content", post.Content);
            command.Parameters.AddWithValue("@Summary", post.Summary);
            command.Parameters.AddWithValue("@ImageUrl", post.ImageUrl ?? (object)DBNull.Value);
            command.Parameters.AddWithValue("@UpdatedAt", post.UpdatedAt);
            command.Parameters.AddWithValue("@Id", post.Id);
            try
            {
                await connection.OpenAsync();
                int rowsAffected = await command.ExecuteNonQueryAsync();
                return rowsAffected > 0;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating post in database.");
                return false;
            }
        }
    }
}