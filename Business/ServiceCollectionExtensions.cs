using Business.Email;
using Business.Users;
using Microsoft.Extensions.DependencyInjection;

namespace Business
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddBusinessService(this IServiceCollection services)
        {
            services.AddScoped<IUsersService, UsersService>();
            services.AddSingleton<ISendEmail, TencentSendEmail>();
            return services;
        }
    }
}
