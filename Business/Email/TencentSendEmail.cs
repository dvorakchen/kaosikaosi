using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using Utils;
using Newtonsoft.Json;
using TencentCloud.Common;
using TencentCloud.Common.Profile;
using TencentCloud.Ses.V20201002;
using TencentCloud.Ses.V20201002.Models;

namespace Business.Email
{
    public class TencentSendEmail : ISendEmail
    {
        private readonly IConfiguration _config;

        public TencentSendEmail(IConfiguration config)
        {
            _config = config;
        }

        public void SendCAPTCHA(string to, string captcha)
        {
            var tencent = _config.GetSection("Tencent");
            var secretId = tencent.GetSection("SecretId").Value;
            var secretKey = tencent.GetSection("SecretKey").Value;
            var fromEmail = tencent.GetSection("FromEmail").Value;
            var templateId = ulong.Parse(tencent.GetSection("EmailTemplateId").Value!);

            var cred = new Credential
            {
                SecretId = secretId,
                SecretKey = secretKey
            };

            var clientProfile = new ClientProfile();

            var client = new SesClient(cred, "ap-guangzhou", clientProfile);

            var req = new SendEmailRequest
            {
                FromEmailAddress = fromEmail,
                Destination = [to],
                Subject = $"验证码: {captcha}"
            };
            var template1 = new Template
            {
                TemplateID = templateId,
                TemplateData = "{\"value\": \"" + captcha + "\"}"
            };
            req.Template = template1;
            SendEmailResponse resp = client.SendEmailSync(req);

            Console.WriteLine(AbstractModel.ToJsonString(resp));


        }
    }
}
