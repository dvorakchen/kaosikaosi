using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Claims;

namespace kaosikaosi.Identity
{
    public static class Authentication
    {
        public const string ISSUER = "https://kaosikaiso.com";

        public static ClaimsPrincipal GenerateClaimsPrincipal(Business.Users.User user)
        {
            var claims = new List<Claim>
            {
            new(ClaimTypes.Sid, user.Id.ToString(),ClaimValueTypes.Sid, ISSUER, ISSUER),
            new(ClaimTypes.Email, user.Email, ClaimValueTypes.Email, ISSUER, ISSUER)
            };
            var claimsIdentity = new ClaimsIdentity(
                claims, CookieAuthenticationDefaults.AuthenticationScheme);
            var claimsPrincipal = new ClaimsPrincipal(claimsIdentity);

            return claimsPrincipal;
        }

        public static IServiceCollection AddAuthenticationWithCookie(this IServiceCollection services)
        {
            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
            .AddCookie(options =>
            {
                options.ExpireTimeSpan = TimeSpan.FromDays(30);
                options.SlidingExpiration = true;
            });

            return services;
        }
    }
}
