namespace kaosikaosi.Extensions
{
    public static class CorsExtensions
    {
        internal const string ALLOW_FRONT_END = "_frontFrontEnd";
        public static IServiceCollection AddAllowFrontEndCors(this IServiceCollection services)
        {
            var config = services.BuildServiceProvider().GetService<IConfiguration>()!;
            var frontDomain = config.GetValue(typeof(string), "Front:Domain", "") as string;

            services.AddCors(options =>
            {
                options.AddPolicy(ALLOW_FRONT_END, policy =>
                {
                    policy.WithOrigins(frontDomain!);
                    policy.WithHeaders("content-type");
                    policy.AllowCredentials();
                });
            });

            return services;
        }
    }
}
