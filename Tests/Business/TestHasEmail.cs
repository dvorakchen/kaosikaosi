using Business.Email;
using Business.Users;
using Caching.CAPTCHA;
using Caching.Users;
using Data.MySQL;
using Microsoft.Extensions.Logging;
using Moq;

namespace Tests.Business
{
    public class TestHasEmail : TestWithDatabase
    {
        [Fact]
        public async void HasEmail()
        {
            const string EXPECTED_EMAIL = "birenchens@163.com";
            using var context = CreateContext();
            await context.Database.EnsureCreatedAsync();

            IUsersService usersService = new UsersService(context, Mock.Of<ICAPTCHACache>(), Mock.Of<ISendEmail>(), Mock.Of<IUsersCache>(), Mock.Of<ILogger<UsersService>>());
            var hasEmail = await usersService.HasEmailAsync(EXPECTED_EMAIL);

            Assert.True(hasEmail);
        }

        [Fact]
        public async void HasNotEmail()
        {
            const string EXPECTED_EMAIL = "expected@email.com";
            const string NOT_EXIST_EMAIL = "not@email.com";

            using var context = CreateContext();
            await context.Database.EnsureCreatedAsync();

            await context.Users.AddRangeAsync(new Data.Entities.User
            {
                Email = NOT_EXIST_EMAIL,
                EmailUpperCase = NOT_EXIST_EMAIL.ToUpper(),
            });
            await context.SaveChangesAsync();

            IUsersService usersService = new UsersService(context, Mock.Of<ICAPTCHACache>(), Mock.Of<ISendEmail>(), Mock.Of<IUsersCache>(), Mock.Of<ILogger<UsersService>>());
            var hasEmail = await usersService.HasEmailAsync(EXPECTED_EMAIL);

            Assert.False(hasEmail);
        }
    }
}
