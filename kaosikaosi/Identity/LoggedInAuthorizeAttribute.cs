using Microsoft.AspNetCore.Authorization;

namespace kaosikaosi.Identity
{
    public class LoggedInAuthorizeAttribute : AuthorizeAttribute, IAuthorizationRequirement, IAuthorizationRequirementData
    {
        public IEnumerable<IAuthorizationRequirement> GetRequirements()
        {
            yield return this;
        }
    }
}
