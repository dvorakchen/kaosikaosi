using Business.Users;
using Data.MySQL;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace kaosikaosi.Identity;

public class LoggedInAgeAuthorizationHandler : AuthorizationHandler<LoggedInAuthorizeAttribute>
{
    //public const string POLICY_NAME = nameof(LoggedInAgeAuthorizationHandler);

    private readonly IUsersService _usersService;

    public LoggedInAgeAuthorizationHandler(IUsersService usersService)
    {
        _usersService = usersService;
    }

    protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, LoggedInAuthorizeAttribute requirement)
    {
        var sidClaim = context.User.FindFirst(ClaimTypes.Sid);
        var emailClaim = context.User.FindFirst(ClaimTypes.Email);

        if (sidClaim is not null && emailClaim is not null && sidClaim.Issuer == Authentication.ISSUER && emailClaim.Issuer == Authentication.ISSUER)
        {
            var sid = Guid.Parse(sidClaim.Value);
            var email = emailClaim.Value;

            var isActivity = await _usersService.IsUserActivity(sid, email);
            if (isActivity)
            {
                context.Succeed(requirement);
                return;
            }
        }

        context.Fail();
    }
}
