using Microsoft.Extensions.Options;
using System.Net;
using System.Net.Mail;

public class EmailHelper
{
    private readonly SMTPSettings _smtpSettings;

    public EmailHelper(IOptions<SMTPSettings> smtpSettings)
    {
        _smtpSettings = smtpSettings.Value;
    }

    public bool SendEmail(string toEmail, string subject, string body)
    {
        try
        {
            MailAddress fromAddress = new(_smtpSettings.Username, "Dobrusky Capital");
            MailAddress toAddress = new(toEmail);

            SmtpClient smtp = new()
            {
                Host = _smtpSettings.Host,
                Port = _smtpSettings.Port,
                EnableSsl = _smtpSettings.EnableSSL,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(_smtpSettings.Username, _smtpSettings.Password)
            };

            using MailMessage message = new(fromAddress, toAddress)
            {
                Subject = subject,
                Body = body
            };
            smtp.Send(message);
            return true;
        } catch (Exception)
        {
            return false;
        }
    }
}

public class SMTPSettings
{
    public string Host { get; set; } = "";
    public int Port { get; set; }
    public bool EnableSSL { get; set; }
    public string Username { get; set; } = "";
    public string Password { get; set; } = "";
}
