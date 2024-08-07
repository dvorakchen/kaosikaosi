using Data.Entities;
using Microsoft.Extensions.Caching.Memory;

namespace Caching.Users
{
    public class UsersCache(IMemoryCache memoryCache) : IUsersCache
    {
        private const string PREFIX = nameof(UsersCache);

        public async Task<User> GetUserByIdOrCreateAsync(Guid id, Func<ICacheEntry, Task<User>> factory)
        {
            var res = await memoryCache.GetOrCreateAsync(Key(id), factory);
            return res!;
        }

        public string Key(Guid id)
        {
            return $"{PREFIX}-{id}";
        }
    }
}
