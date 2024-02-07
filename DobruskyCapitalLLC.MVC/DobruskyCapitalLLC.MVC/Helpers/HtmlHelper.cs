using Microsoft.AspNetCore.Mvc.Rendering;

namespace DobruskyCapitalLLC.MVC.Helpers
{
    public static class HtmlHelpers
    {
        public static string IsActive(this IHtmlHelper htmlHelper, string controller, string action)
        {
            var routeData = htmlHelper.ViewContext.RouteData;

            var routeController = routeData.Values["Controller"].ToString();
            var routeAction = routeData.Values["Action"].ToString();

            // Returns "active" if the current controller and action match the provided values
            return controller == routeController && action == routeAction ? "active" : "";
        }
    }

}
