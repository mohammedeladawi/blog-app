using Helpers.Options;
using Interfaces.IRepositories;
using Interfaces.IServices;
using Microsoft.Extensions.Options;
using Models;

namespace Services
{
    internal class RefreshTokenService : IRefreshTokenService
    {
        private JwtOptions _jwtOptions;
        private IRefreshTokenRepository _refreshTokenRepo;

        public RefreshTokenService(IOptions<JwtOptions> jwtOptions, IRefreshTokenRepository refreshTokenRepo)
        {
            _jwtOptions = jwtOptions.Value;
            _refreshTokenRepo = refreshTokenRepo;
        }

        public async Task<bool> AddAsync(string refreshToken, int userId)
        {
            RefreshToken refToken = new RefreshToken
            {
                Token = refreshToken,
                UserId = userId,
                ExpiresAt = DateTime.UtcNow.AddDays(_jwtOptions.RefreshTokenExpirationDays),
            };

            return await _refreshTokenRepo.AddAsync(refToken);
        }

        public string GenerateRefreshToken()
        {
            return Guid.NewGuid().ToString("N");
        }

        public async Task<RefreshToken?> GetAsync(string refreshToken)
        {
            return await _refreshTokenRepo.GetAsync(refreshToken);
        }

        public async Task<bool> MarkAsRevokedAsync(string refreshToken)
        {
            return await _refreshTokenRepo.MarkAsRevokedAsync(refreshToken);
        }

        public async Task<bool> MarkAsUsedAsync(string refreshToken)
        {
            return await _refreshTokenRepo.MarkAsUsedAsync(refreshToken);
        }
    }
}