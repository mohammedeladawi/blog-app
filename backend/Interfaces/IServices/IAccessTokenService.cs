using DTOs;

namespace Interfaces
{
    public interface IAccessTokenService
    {
        string GenerateAccessToken(UserDto userDto);

    }
}