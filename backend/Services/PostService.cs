using DTOs;
using Helpers;
using Interfaces.IRepositories;
using Interfaces.IServices;
using Models;

namespace Services
{
    public class PostService : IPostService
    {
        private async Task<string> _GenerateUniqueSlugAsync(string title)
        {
            string baseSlug = Utils.GenerateSlug(title);

            string uniqueSlug = baseSlug;
            int counter = 1;

            while (await _postRepo.SlugExistsAsync(uniqueSlug))
            {
                uniqueSlug = $"{baseSlug}-{counter}";
                counter++;
            }

            return uniqueSlug;

        }

        private readonly IPostRepository _postRepo;

        public PostService(IPostRepository postRepo)
        {
            _postRepo = postRepo;
        }

        public async Task<int> CreateAsync(CreatePostDto dto, int authorId)
        {
            if (authorId <= 0)
                throw new Exception("Invalid author ID.");

            if (dto == null)
                throw new Exception("Post data cannot be null.");

            if (string.IsNullOrWhiteSpace(dto.Title))
                throw new Exception("Title cannot be empty.");

            string slug = await _GenerateUniqueSlugAsync(dto.Title);

            Post post = new Post
            {
                Title = dto.Title,
                Slug = slug,
                Content = dto.Content,
                Summary = dto.Summary,
                ImageUrl = dto.ImageUrl,
                CreatedAt = DateTime.UtcNow,
                Author = new User { Id = authorId }
            };

            int postId = await _postRepo.AddAsync(post);
            if (postId == -1)
                throw new Exception("Failed to add post to the database.");

            return postId;
        }

        public async Task<SpecificPostDto?> GetBySlugAsync(string slug)
        {
            Post? post = await _postRepo.GetBySlugAsync(slug);
            if (post == null)
                throw new Exception("Could not find post with the given slug.");

            return new SpecificPostDto
            {
                Id = post.Id,
                Title = post.Title,
                Slug = post.Slug,
                Content = post.Content,
                Summary = post.Summary,
                ImageUrl = post.ImageUrl,
                CreatedAt = post.CreatedAt,
                UpdatedAt = post.UpdatedAt,
                Author = new UserDto
                {
                    Id = post.Author.Id,
                    Username = post.Author.Username,
                }
            };
        }

        public async Task<SpecificPostDto?> GetByIdAsync(int postId)
        {
            Post? post = await _postRepo.GetByIdAsync(postId);
            if (post == null)
                throw new Exception($"Could not find post with the given ID: {postId}.");

            return new SpecificPostDto
            {
                Id = post.Id,
                Title = post.Title,
                Slug = post.Slug,
                Content = post.Content,
                Summary = post.Summary,
                ImageUrl = post.ImageUrl,
                CreatedAt = post.CreatedAt,
                Author = new UserDto
                {
                    Id = post.Author.Id,
                    Username = post.Author.Username,
                }
            };
        }

        public async Task<IEnumerable<PostDto>> GetPostsAsync(int skip, int limit)
        {
            var posts = await _postRepo.GetPostsAsync(skip, limit);

            return posts.Select(post => new PostDto
            {
                Id = post.Id,
                Title = post.Title,
                Slug = post.Slug,
                Summary = post.Summary,
                ImageUrl = post.ImageUrl,
                CreatedAt = post.CreatedAt,
                Author = new UserDto
                {
                    Id = post.Author.Id,
                    Username = post.Author.Username,
                }
            });
        }

        public async Task<int> GetTotalCountAsync()
        {
            return await _postRepo.GetCountAsync();
        }

        public async Task<bool> SlugExistsAsync(string slug)
        {
            return await _postRepo.SlugExistsAsync(slug);
        }

        public async Task<bool> DeleteByIdAsync(int postId)
        {
            if (await _postRepo.GetByIdAsync(postId) is null)
                throw new Exception("Post not found.");

            if (!await _postRepo.DeleteByIdAsync(postId))
                throw new Exception("Failed to delete post.");

            return true;

        }

        public async Task<bool> UpdateAsync(int postId, UpdatePostDto dto)
        {
            if (await _postRepo.GetByIdAsync(postId) is null)
                throw new Exception("Post not found.");

            if (dto == null)
                throw new Exception("Invalid post data.");


            Post post = new Post
            {
                Id = postId,
                Title = dto.Title,
                Content = dto.Content,
                Summary = dto.Summary,
                Slug = await _GenerateUniqueSlugAsync(dto.Title),
                ImageUrl = dto.ImageUrl,
                UpdatedAt = DateTime.UtcNow
            };

            if (!await _postRepo.UpdateAsync(post))
                throw new Exception("Failed to update post.");

            return true;
        }

    }
}