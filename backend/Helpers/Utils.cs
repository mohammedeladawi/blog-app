using System.Text.RegularExpressions;

namespace Helpers
{
    public static class Utils
    {
        public static string GenerateSlug(string title)
        {
            string slug = title
                .ToLower()
                .Trim()
                .Replace(" ", "-")
                .Replace("--", "-");

            // Remove invalid characters
            slug = Regex.Replace(slug, @"[^a-z0-9\-]", "");

            return slug;
        }
    }
}