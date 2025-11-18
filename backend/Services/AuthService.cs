using System.Runtime.CompilerServices;
using DTOs;
using Interfaces;
using Interfaces.IServices;
using Models;

namespace Services
{
    public class AuthService : IAuthService
    {
        private IUserService _userService;
        private IRefreshTokenService _refreshTokenService;
        private IAccessTokenService _accessTokenService;

        public AuthService(IUserService userService, IRefreshTokenService refreshTokenService,
             IAccessTokenService accessTokenService)
        {
            _userService = userService;
            _refreshTokenService = refreshTokenService;
            _accessTokenService = accessTokenService;
        }

        public async Task<TokensDto> LoginAsync(LoginDto loginDto)
        {
            UserDto? userDto = await _userService.GetByUsernameAndPasswordAsync(loginDto.Username, loginDto.Password);
            if (userDto == null)
                throw new Exception("Invalid username or password!");

            string refreshToken = _refreshTokenService.GenerateRefreshToken();
            if (!await _refreshTokenService.AddAsync(refreshToken, userDto.Id))
                throw new Exception("Invalid operation with DB");

            string accessToken = _accessTokenService.GenerateAccessToken(userDto);

            return new TokensDto
            {
                RefreshToken = refreshToken,
                AccessToken = accessToken
            };

        }

        public async Task LogoutAsync(string refreshToken)
        {
            bool isMarked = await _refreshTokenService.MarkAsRevokedAsync(refreshToken);
            if (!isMarked)
                throw new Exception("Invalid DB operation!");
        }

        public async Task<int> SignUpAsync(SignUpDto signUpDto)
        {
            if (await _userService.IsExistByUsernameAsync(signUpDto.Username.Trim()))
                throw new Exception("Username already exists, please use another one!");

            int userId = await _userService.AddAsync(signUpDto);
            if (userId == -1)
                throw new Exception("Invalid DB operation");

            return userId;
        }

        public async Task<TokensDto> RefreshAccessTokenAsync(string refreshToken)
        {
            RefreshToken? refreshToken1 = await _refreshTokenService.GetAsync(refreshToken);
            if (refreshToken1 == null || refreshToken1.ExpiresAt < DateTime.UtcNow || refreshToken1.IsRevoked)
                throw new Exception("Invalid refresh token!");

            UserDto? userDto = await _userService.GetByIdAsync(refreshToken1.UserId);
            if (userDto == null)
                throw new Exception("User is not found!");

            if (!await _refreshTokenService.MarkAsUsedAsync(refreshToken))
                throw new Exception("Failed to mark refresh token as used!");

            // ======== Todo : Rotate refresh token ================

            string accessToken = _accessTokenService.GenerateAccessToken(userDto);

            return new TokensDto
            {
                RefreshToken = refreshToken,
                AccessToken = accessToken
            };
        }
    }
}