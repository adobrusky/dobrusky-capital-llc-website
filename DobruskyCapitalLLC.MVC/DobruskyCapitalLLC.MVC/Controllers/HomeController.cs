using DobruskyCapitalLLC.MVC.DataModels;
using DobruskyCapitalLLC.MVC.Managers.MailingListManager;
using DobruskyCapitalLLC.MVC.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Net.Mail;

namespace DobruskyCapitalLLC.MVC.Controllers
{
    public class HomeController : Controller
    {
        private readonly EmailHelper _emailHelper;
        private readonly MailingListManager _mailingListManager;
        private readonly ILogger<HomeController> _logger;
        private readonly string errorMessage = "Something went wrong and we couldn't process your request. Please try again or contact our support team if the problem persists.";

        public HomeController(ILogger<HomeController> logger, EmailHelper emailHelper, MailingListManager mailingListManager)
        {
            _logger = logger;
            _emailHelper = emailHelper;
            _mailingListManager = mailingListManager;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Index(string email)
        {
            try
            {
                // send email
                bool emailSent = !string.Equals(email, "throwerror@test.com") && _emailHelper.SendEmail(email, "Thank You", "Thanks for signing up to our email list!");
                // add email to mailing list if not already there
                MailingListEmail? emailRecord = _mailingListManager.GetEmailRecordByEmail(email);
                if (emailRecord == null)
                {
                    _mailingListManager.AddEmailRecord(email);
                }
                if (emailSent)
                {
                    ViewBag.Message = "Success! Please check your email shortly for your free educational material and sample of the journal.";
                    ViewBag.Success = true;
                }
                else
                {
                    ViewBag.Message = errorMessage;
                    ViewBag.Success = false;
                }
                return View();
            }
            catch (Exception)
            {
                return View("Error");
            }
        }


        public IActionResult Indicators()
        {
            return View();
        }

        public IActionResult Contact()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Contact(string firstName, string lastName, string email, string message)
        {
            try
            {
                bool emailSent = !string.Equals(email, "throwerror@test.com") && _emailHelper.SendEmail("dobruskycapital@gmail.com", "Contact Us Submission", $"Name: {firstName} {lastName}\nEmail: {email}\nMessage: {message}");
                if (emailSent)
                {
                    ViewBag.Message = "Message sent successfully! Expect a response within 1-2 business days.";
                    ViewBag.Success = true;
                }
                else
                {
                    ViewBag.Message = errorMessage;
                    ViewBag.Success = false;
                }
                return View();
            }
            catch (Exception)
            {
                return View("Error");
            }
        }

        public IActionResult Privacy()
        {
            return View();
        }


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}