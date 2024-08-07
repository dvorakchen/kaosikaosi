using Business.Email;
using Business.Users;
using Caching.CAPTCHA;
using Caching.Users;
using Microsoft.Extensions.Logging;
using Moq;

namespace Tests.Business
{
    public class TestGetByEmail : TestWithDatabase
    {
        [Fact]
        public async void GetByEmail_Successfully()
        {
            const string EXPECTED_EMAIL = "birenchens@163.com";

            using var context = CreateContext();
            await context.Database.EnsureCreatedAsync();

            IUsersService usersService = new UsersService(context, Mock.Of<ICAPTCHACache>(), Mock.Of<ISendEmail>(), Mock.Of<IUsersCache>(), Mock.Of<ILogger<UsersService>>());
            var user = await usersService.GetByEmailAsync(EXPECTED_EMAIL);

            Assert.NotNull(user);
            Assert.Equal(EXPECTED_EMAIL, user.Email);
        }

        [Fact]
        public async void GetByEmail_Fail()
        {
            const string EXPECTED_EMAIL = "not@email.com";

            using var context = CreateContext();
            await context.Database.EnsureCreatedAsync();

            IUsersService usersService = new UsersService(context, Mock.Of<ICAPTCHACache>(), Mock.Of<ISendEmail>(), Mock.Of<IUsersCache>(), Mock.Of<ILogger<UsersService>>());

            await Assert.ThrowsAsync<UserNotFoundException>(async () => await usersService.GetByEmailAsync(EXPECTED_EMAIL));
        }
    }
}
