using DTOs;
using Models;

namespace Interfaces
{
    public interface IUserService
    {
        Task<int> AddAsync(SignUpDto signUpDto);

        Task<bool> IsExistByUsernameAsync(string username);

        Task<UserDto?> GetByIdAsync(int userId);

        Task<UserDto?> GetByUsernameAndPasswordAsync(string username, string password);
    }
}