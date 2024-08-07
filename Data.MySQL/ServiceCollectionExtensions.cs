using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace Data.MySQL
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddMySQLDbContextPool(this IServiceCollection services, string connectionString)
        {
            services.AddDbContextPool<MySQLKaosiDbContext>(options =>
            {
                options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString))
#if DEBUG
                .LogTo(Console.WriteLine, LogLevel.Information)
#endif
                ;
            });
            return services;
        }
    }
}
