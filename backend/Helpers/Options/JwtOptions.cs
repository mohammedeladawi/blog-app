namespace Helpers.Options
{
    public class JwtOptions
    {
        public string Key { get; set; }
        public string Issuer { get; set; }
        public string Audience { get; set; }
        public short AccessTokenExpirationMinutes { get; set; }
        public short RefreshTokenExpirationDays { get; set; }

    }
}