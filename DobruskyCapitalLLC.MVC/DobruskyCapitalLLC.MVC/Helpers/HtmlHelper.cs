using Microsoft.AspNetCore.Mvc.Rendering;

namespace DobruskyCapitalLLC.MVC.Helpers
{
    public static class HtmlHelpers
    {
        public static string IsActive(this IHtmlHelper htmlHelper, string controller, string action)
        {
            RouteData routeData = htmlHelper.ViewContext.RouteData;
            string routeController = routeData.Values["Controller"].ToString();
            string routeAction = routeData.Values["Action"].ToString();
            return controller == routeController && action == routeAction ? "active" : "";
        }

        public static string HasScrollingNavbarTransition(this IHtmlHelper htmlHelper, string controller, string action)
        {
            RouteData routeData = htmlHelper.ViewContext.RouteData;
            string routeController = routeData.Values["Controller"].ToString();
            string routeAction = routeData.Values["Action"].ToString();
            return controller != routeController || action != routeAction ? "scrolled-navbar" : "";
        }
    }

}
