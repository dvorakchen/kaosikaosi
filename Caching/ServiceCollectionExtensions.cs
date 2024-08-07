using Caching.CAPTCHA;
using Caching.Users;
using Microsoft.Extensions.DependencyInjection;

namespace Caching;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddCache(this IServiceCollection services)
    {
        services.AddMemoryCache();
        services.AddSingleton<ICAPTCHACache, CAPTCHACache>();
        services.AddSingleton<IUsersCache, UsersCache>();
        return services;
    }

}
