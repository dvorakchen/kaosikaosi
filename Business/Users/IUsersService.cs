namespace Business.Users
{
    public interface IUsersService
    {
        Task<bool> HasEmailAsync(string email);

        Task<User> GetByEmailAsync(string email);

        Task<bool> IsUserActivity(Guid id, string email);

        Task<User> GetUserAsync(Guid id);
    }
}
