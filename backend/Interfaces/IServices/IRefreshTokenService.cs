using Models;

namespace Interfaces.IServices
{
    public interface IRefreshTokenService
    {
        Task<bool> AddAsync(string refreshToken, int userId);

        Task<bool> MarkAsUsedAsync(string refreshToken);

        Task<bool> MarkAsRevokedAsync(string refreshToken);

        Task<RefreshToken?> GetAsync(string refreshToken);

        public string GenerateRefreshToken();
    }
}