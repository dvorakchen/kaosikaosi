using Data.Entities;
using Utils;

namespace Data
{
    internal class Seeds
    {
        public static User[] Users
        {
            get
            {
                var user = new User
                {
                    Id = Guid.Parse("548312b6-a7ec-496b-ab7c-cc4c16060882"),
                    Name = "Dvorak",
                    Email = "birenchens@163.com",
                    PrivateKey = Convert.ToBase64String([123, 34, 31, 202, 38, 1, 207, 240, 1, 99, 148, 1, 73, 180, 133, 58, 255, 213, 218, 159, 23, 71, 181, 17, 67, 104, 120, 178, 103, 224, 69, 121]),
                    Invitation = Guid.Empty,
                };
                user.EmailUpperCase = user.Email.ToUpper();

                var phoneNumberBytes = Cipher.EncryptStringToBytes_Aes("13012000000", Convert.FromBase64String(user.PrivateKey), user.Id.ToByteArray());
                user.PhoneNumber = Convert.ToBase64String(phoneNumberBytes);

                return [user];
            }
        }
    }
}
