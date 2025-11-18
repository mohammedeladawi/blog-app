using System.Security.Cryptography;
using System.Text;
using DTOs;
using Interfaces;
using Models;

namespace Services
{
    internal class UserService : IUserService
    {
        private string _HashPassword(string password)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] hashBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
            }
        }
        private readonly IUserRepository _userRepo;

        public UserService(IUserRepository userRepo)
        {
            _userRepo = userRepo;
        }

        public async Task<int> AddAsync(SignUpDto signUpDto)
        {

            if (await IsExistByUsernameAsync(signUpDto.Username))
                return -1;

            User user = new User
            {
                Username = signUpDto.Username,
                Email = signUpDto.Email,
                PasswordHash = _HashPassword(signUpDto.Password)
            };

            int userId = await _userRepo.AddAsync(user);
            if (userId == -1)
                return -1;

            return userId;
        }

        public async Task<bool> IsExistByUsernameAsync(string username)
        {
            return await _userRepo.IsExistByUsernameAsync(username.Trim());
        }

        public async Task<UserDto?> GetByIdAsync(int userId)
        {
            User? user = await _userRepo.GetByIdAsync(userId);
            if (user == null)
                return null;

            return new UserDto
            {
                Id = user.Id,
                Username = user.Username
            };
        }

        public async Task<UserDto?> GetByUsernameAndPasswordAsync(string username, string password)
        {
            string passwordHash = _HashPassword(password);

            User? user = await _userRepo.GetByUsernameAndPasswordHashAsync(username.Trim(), passwordHash);
            if (user == null)
                return null;

            return new UserDto
            {
                Id = user.Id,
                Username = user.Username
            };
        }
    }
}