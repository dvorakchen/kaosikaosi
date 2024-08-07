using System.ComponentModel.DataAnnotations;

namespace kaosikaosi.RequestModels
{
    public class ValidCAPTCHAModel
    {
        [Required(AllowEmptyStrings = false, ErrorMessage = "邮箱地址错误"), EmailAddress(ErrorMessage = "邮箱地址错误")]
        public string Email { get; set; } = "";

        [Required(AllowEmptyStrings = false, ErrorMessage = "验证码有误"), StringLength(Consts.CAPTCHA_LENGTH, ErrorMessage = "验证码有误")]
        public string CAPTCHA { get; set; } = "";
    }
}
