using Microsoft.Extensions.Caching.Memory;

namespace Caching.Users
{
    public interface IUsersCache
    {
        string Key(Guid id);
        Task<Data.Entities.User> GetUserByIdOrCreateAsync(Guid id, Func<ICacheEntry, Task<Data.Entities.User>> factory);

    }
}
