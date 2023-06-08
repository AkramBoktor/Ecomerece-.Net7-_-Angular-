using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BaseApiController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
