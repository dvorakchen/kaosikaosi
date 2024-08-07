using Business.Email;
using Caching.CAPTCHA;
using Caching.Users;
using Data.MySQL;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Business.Users
{
    public class UsersService(MySQLKaosiDbContext db, ICAPTCHACache captchaCache, ISendEmail sendEmail, IUsersCache usersCache, ILogger<UsersService> log) : IUsersService
    {
        public async Task<bool> HasEmailAsync(string email)
        {
            return await db.Users.AnyAsync(user => user.EmailUpperCase == email.ToUpper().Trim());
        }

        public async Task<User> GetByEmailAsync(string email)
        {
            var userModel = await db.Users.FirstOrDefaultAsync(user => user.EmailUpperCase == email.ToUpper().Trim())
                ?? throw new UserNotFoundException($"邮箱用户: {email} 不存在");

            return BuildUser(userModel);
        }

        public async Task<bool> IsUserActivity(Guid id, string email)
        {
            try
            {
                var user = await GetUserAsync(id);
                log.LogInformation("found User via id: {id}", id);
                return user.ValidEmail(email) && user.IsActivity;
            }
            catch (InvalidOperationException)
            {
                // no user that id is {id}
                log.LogError("cannot found User via id: {id}", id);
                return false;
            }
        }

        public async Task<User> GetUserAsync(Guid id)
        {
            var userModel = await usersCache.GetUserByIdOrCreateAsync(id, async (entity) =>
            {
                return await db.Users.SingleAsync(user => user.Id == id);
            });
            return BuildUser(userModel);
        }

        private User BuildUser(Data.Entities.User userModel)
        {
            return new(userModel, captchaCache, sendEmail);
        }
    }
}
