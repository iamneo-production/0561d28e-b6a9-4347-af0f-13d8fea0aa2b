using Microsoft.AspNetCore.Mvc;
using DatabaseController;

namespace CookHiring.Controllers
{
    public class ReportController : Controller
    {
        private BusinessLayer bsl = new BusinessLayer();
        
        [Route("admin/report/totalUsers")]
        [HttpGet]
        public object totalUsers()
        {
            return bsl.totalUsers();
        }
        [Route("admin/report/totalUsers/{location}")]
        [HttpGet]
        public object totalUsersLoc(string location)
        {
            return bsl.totalUsersLoc(location);
        }
    }
}
