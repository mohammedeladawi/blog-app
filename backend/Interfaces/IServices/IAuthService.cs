using DTOs;

namespace Interfaces.IServices
{
    public interface IAuthService
    {
        Task<TokensDto> LoginAsync(LoginDto loginDto);

        Task LogoutAsync(string refreshToken);

        Task<int> SignUpAsync(SignUpDto signUpDto);

        Task<TokensDto> RefreshAccessTokenAsync(string refreshToken);
    }
}