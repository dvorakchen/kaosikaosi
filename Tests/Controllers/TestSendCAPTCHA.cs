using Business.Email;
using Business.Users;
using Caching.CAPTCHA;
using Data.MySQL;
using kaosikaosi.Controllers;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;

namespace Tests.Controllers;

public class TestSendCAPTCHA
{
    [Fact]
    public async void InvalidEmail()
    {
        const string INVALID_EMAIL = "INMALID_EMAIL";

        var mock = new Mock<IUsersService>();

        var usersController = new UsersController(mock.Object);

        var res = await usersController.SendCAPTCHAFromEmail(INVALID_EMAIL);

        var badRequestResult = Assert.IsType<BadRequestObjectResult>(res);
        var errorMsg = Assert.IsType<string>(badRequestResult.Value);
        Assert.Equal("电子邮件地址错误", errorMsg);
    }

    [Fact]
    public async void HasNotEmail()
    {
        const string NOT_EXIST_EMAIL = "not@exist.com";

        var mock = new Mock<IUsersService>();
        mock.Setup(l => l.HasEmailAsync(NOT_EXIST_EMAIL))
            .ReturnsAsync(false);

        var usersController = new UsersController(mock.Object);

        var res = await usersController.SendCAPTCHAFromEmail(NOT_EXIST_EMAIL);

        var badRequestResult = Assert.IsType<BadRequestObjectResult>(res);
        var errorMsg = Assert.IsType<string>(badRequestResult.Value);
        Assert.Equal("该用户不存在", errorMsg);
    }

    [Fact]
    public async void Successfully()
    {
        const string EMAIL = "not@exist.com";

        var cacheMock = new Mock<ICAPTCHACache>();
        cacheMock.Setup(l => l.Set(It.IsAny<Guid>(), It.IsAny<string>()));

        var sendEmailMock = new Mock<ISendEmail>();
        sendEmailMock.Setup(l => l.SendCAPTCHA(It.IsAny<string>(), It.IsAny<string>()));

        var user = new User(new(), cacheMock.Object, sendEmailMock.Object);

        var mock = new Mock<IUsersService>();
        mock.Setup(l => l.HasEmailAsync(EMAIL))
            .ReturnsAsync(true);
        mock.Setup(l => l.GetByEmailAsync(EMAIL))
            .ReturnsAsync(user);

        var usersController = new UsersController(mock.Object);

        var res = await usersController.SendCAPTCHAFromEmail(EMAIL);

        var badRequestResult = Assert.IsType<OkResult>(res);

        cacheMock.Verify(cache => cache.Set(It.IsAny<Guid>(), It.IsAny<string>()), Times.Once);
        sendEmailMock.Verify(cache => cache.SendCAPTCHA(It.IsAny<string>(), It.IsAny<string>()), Times.Once);
    }
}