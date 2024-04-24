using DobruskyCapitalLLC.MVC.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Net.Mail;

namespace DobruskyCapitalLLC.MVC.Controllers
{
    public class HomeController : Controller
    {
        private readonly EmailHelper _emailHelper;
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger, EmailHelper emailHelper)
        {
            _logger = logger;
            _emailHelper = emailHelper;
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
                bool emailSent = _emailHelper.SendEmail(email, "Thank You", "Thanks for signing up to our email list!");
                // also save email to db here
                if (emailSent)
                {
                    ViewBag.Message = "Email sent successfully! You should get a confirmation email shortly.";
                }
                else
                {
                    ViewBag.Message = "Failed to send email. Please try again.";
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
                bool emailSent = _emailHelper.SendEmail("dobruskycapital@gmail.com", "Contact Us Submission", $"Name: {firstName} {lastName}\nEmail: {email}\nMessage: {message}");
                if (emailSent)
                {
                    ViewBag.Message = "Email sent successfully!";
                } else
                {
                    ViewBag.Message = "Failed to send email.";
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