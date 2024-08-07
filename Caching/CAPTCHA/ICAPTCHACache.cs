namespace Caching.CAPTCHA;

public interface ICAPTCHACache
{
    string Key(Guid id);
    void Set(Guid userId, string captcha);

    string? Get(Guid userId);
    void Remove(Guid userId);
}
