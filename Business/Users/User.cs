using Business.Email;
using Caching.CAPTCHA;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Users;

public class User(Data.Entities.User userModel, ICAPTCHACache captchaCache, ISendEmail sendEmail)
{

    public Guid Id => userModel.Id;
    public string Email => userModel.Email;
    public string Name => userModel.Name;

    public bool IsActivity => userModel.Status == Data.Entities.UserStatus.Activity;

    /// <summary>
    /// Send the CAPTCHA to user, the CAPTCHA will be keep within 10 minutes
    /// </summary>
    public void SendCAPTCHEmail()
    {
        var captcha = new Random().Next(1000, 9999).ToString();
        sendEmail.SendCAPTCHA(userModel.Email, captcha);

        captchaCache.Set(Id, captcha);
    }

    public bool ValidCAPTCHA(string expectCAPTCHA)
    {
        var captcha = captchaCache.Get(Id);
        var isValid = captcha != null && captcha == expectCAPTCHA;
        if (isValid)
        {
            captchaCache.Remove(Id);
        }

        return isValid;
    }

    public bool ValidEmail(string email)
    {
        return userModel.EmailUpperCase == email.ToUpper().Trim();
    }
}

public class UserNotFoundException(string message) : Exception(message)
{
}
