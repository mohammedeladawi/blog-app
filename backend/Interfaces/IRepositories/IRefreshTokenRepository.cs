using Models;

namespace Interfaces.IRepositories
{
    public interface IRefreshTokenRepository
    {
        Task<bool> AddAsync(RefreshToken refreshToken);
        Task<RefreshToken?> GetAsync(string refreshToken);
        Task<bool> MarkAsUsedAsync(string refreshToken);
        Task<bool> MarkAsRevokedAsync(string refreshToken);

    }
}