using Data.MySQL;
using Microsoft.EntityFrameworkCore;
using Business;
using kaosikaosi.Extensions;
using kaosikaosi.Identity;
using Microsoft.AspNetCore.Authorization;
using Caching;

var builder = WebApplication.CreateBuilder(args);

//  Cache
builder.Services.AddCache();

// Add services to the container.
builder.Services.AddControllersWithViews();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
    ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");

builder.Services.AddMySQLDbContextPool(connectionString);
builder.Services.AddBusinessService();

//  Authorization
builder.Services.AddAuthorization();
builder.Services.AddScoped<IAuthorizationHandler, LoggedInAgeAuthorizationHandler>();

//  Authentication
builder.Services.AddAuthenticationWithCookie();

builder.Services.AddCookiePolicy(options =>
{
    options.HttpOnly = Microsoft.AspNetCore.CookiePolicy.HttpOnlyPolicy.Always;
    options.Secure = CookieSecurePolicy.Always;
    options.MinimumSameSitePolicy = SameSiteMode.None;
});

// Cross-Origin Request
builder.Services.AddAllowFrontEndCors();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
}

//app.UseDefaultFiles();

app.UseStaticFiles();

app.UseRouting();

app.UseCors(CorsExtensions.ALLOW_FRONT_END);

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
