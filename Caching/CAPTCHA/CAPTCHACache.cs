using Microsoft.Extensions.Caching.Memory;

namespace Caching.CAPTCHA;

public class CAPTCHACache(IMemoryCache cache) : ICAPTCHACache
{
    private const string PREFIX = nameof(CAPTCHACache);

    private readonly TimeSpan expireLimit = TimeSpan.FromMinutes(10);
    private readonly IMemoryCache _cache = cache;

    public string Key(Guid id)
    {
        return $"{PREFIX}-{id}";
    }

    public string? Get(Guid userId)
    {
        return _cache.Get<string>(Key(userId));
    }


    public void Set(Guid userId, string captcha)
    {
        _cache.Set(Key(userId), captcha, expireLimit);
    }

    public void Remove(Guid userId)
    {
        _cache.Remove(Key(userId));
    }
}
