using Models;

namespace Interfaces
{
    public interface IUserRepository
    {
        Task<int> AddAsync(User user);

        Task<bool> IsExistByUsernameAsync(string username);

        Task<User?> GetByIdAsync(int userId);

        Task<User?> GetByUsernameAndPasswordHashAsync(string username, string passwordHash);
    }
}