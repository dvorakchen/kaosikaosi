using Business.Email;
using Business.Users;
using Caching.CAPTCHA;
using Caching.Users;
using Data.MySQL;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using Moq;

namespace Tests.Business
{
    public class TestGetUser : TestWithDatabase
    {
        [Fact]
        public async void GetUser_Success()
        {
            var expectedId = Guid.Parse("548312b6-a7ec-496b-ab7c-cc4c16060882");

            var userCacheMock = new Mock<IUsersCache>();
            userCacheMock.Setup(l => l.GetUserByIdOrCreateAsync(expectedId, It.IsAny<Func<ICacheEntry, Task<Data.Entities.User>>>()))
                .ReturnsAsync(new Data.Entities.User
                {
                    Id = expectedId,
                });

            IUsersService usersService = new UsersService(Mock.Of<MySQLKaosiDbContext>(), Mock.Of<ICAPTCHACache>(), Mock.Of<ISendEmail>(), userCacheMock.Object, Mock.Of<ILogger<UsersService>>());
            var user = await usersService.GetUserAsync(expectedId);

            Assert.NotNull(user);
            Assert.Equal(expectedId, user.Id);
        }
    }
}
