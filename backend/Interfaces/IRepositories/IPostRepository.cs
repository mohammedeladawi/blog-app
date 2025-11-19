using Models;

namespace Interfaces.IRepositories
{
    public interface IPostRepository
    {
        Task<IEnumerable<Post>> GetPostsAsync(int skip, int limit);

        Task<int> AddAsync(Post post);

        Task<Post?> GetBySlugAsync(string slug);

        Task<Post?> GetByIdAsync(int postId);

        Task<bool> UpdateAsync(Post post);

        Task<bool> DeleteByIdAsync(int postId);

        Task<bool> SlugExistsAsync(string slug);

        Task<int> GetCountAsync();
    }
}