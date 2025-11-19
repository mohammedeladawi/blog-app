using DTOs;

namespace Interfaces.IServices
{
    public interface IPostService
    {
        Task<IEnumerable<PostDto>> GetPostsAsync(int offset, int limit);

        Task<int> CreateAsync(CreatePostDto dto, int authorId);

        Task<SpecificPostDto?> GetBySlugAsync(string slug);

        Task<SpecificPostDto?> GetByIdAsync(int postId);

        Task<bool> UpdateAsync(int postId, UpdatePostDto dto);

        Task<bool> DeleteByIdAsync(int postId);

        Task<bool> SlugExistsAsync(string slug);

        Task<int> GetTotalCountAsync();
    }
}