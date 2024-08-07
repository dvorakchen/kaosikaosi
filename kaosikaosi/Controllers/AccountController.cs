using Microsoft.AspNetCore.Mvc;

namespace kaosikaosi.Controllers;

[Route("{controller}")]
public class AccountController : ControllerBase
{
    [HttpGet("Login")]
    public IActionResult ToLoginPage()
    {
        return Unauthorized();
    }

}
