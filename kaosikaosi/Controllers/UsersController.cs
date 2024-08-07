using Caching.CAPTCHA;
using Microsoft.AspNetCore.Mvc;
using Utils;
using Business.Users;
using kaosikaosi.Extensions;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.Cookies;
using kaosikaosi.Identity;
using Microsoft.AspNetCore.Authorization;

namespace kaosikaosi.Controllers;

public class UsersController : ApiController
{
    private readonly IUsersService _usersService;

    public UsersController(IUsersService usersService)
    {
        _usersService = usersService;
    }

    [HttpPost("SendCAPTCHAFromEmail")]
    public async Task<IActionResult> SendCAPTCHAFromEmail([FromBody] string email)
    {
        if (!Validations.IsValidEmail(email))
        {
            return BadRequest("电子邮件地址错误");
        }
        var has = await _usersService.HasEmailAsync(email);
        if (!has)
        {
            return BadRequest("该用户不存在");
        }

        var user = await _usersService.GetByEmailAsync(email);
        user.SendCAPTCHEmail();

        return Ok();
    }

    [HttpPost("ValidCAPTCHA")]
    public async Task<IActionResult> ValidCAPTCHA([FromBody] RequestModels.ValidCAPTCHAModel model)
    {
        if (!ModelState.IsValid)
        {
            var errMsgs = ModelState.FlatErrorMessage();
            return BadRequest(errMsgs);
        }

        var user = await _usersService.GetByEmailAsync(model.Email);
        var isValid = user.ValidCAPTCHA(model.CAPTCHA);

        if (!isValid)
        {
            return BadRequest("验证码有误");
        }

        var claimsPrincipal = Authentication.GenerateClaimsPrincipal(user);

        return SignIn(claimsPrincipal, CookieAuthenticationDefaults.AuthenticationScheme);
    }

    [HttpPost("IsLoggedIn"), LoggedInAuthorize]
    public async Task<IActionResult> IsLoggedIn()
    {
        var id = Guid.Parse(User.FindFirstValue(ClaimTypes.Sid)!);
        var email = User.FindFirstValue(ClaimTypes.Email)!;

        var user = await _usersService.GetUserAsync(id);
        if (user.ValidEmail(email))
        {
            return Ok(new ResponseModels.LoggedInModel
            {
                Id = id,
                Email = email,
                Name = user.Name
            });
        }

        return Unauthorized("检测到账号异常，请重新登陆");
    }
}
