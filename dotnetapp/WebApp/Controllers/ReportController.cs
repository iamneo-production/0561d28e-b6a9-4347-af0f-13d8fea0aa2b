using Microsoft.AspNetCore.Mvc;
using DatabaseController;

namespace CookHiring.Controllers
{
    public class ReportController : Controller
    {
        private BusinessLayer bsl = new BusinessLayer();
        
        [Route("admin/report/totalUsers")]
        [HttpGet]
        public int totalUsers()
        {
            return bsl.totalUsers();
        }
        [Route("admin/report/totalJobSeekers")]
        [HttpGet]
        public int totalJobSeekers()
        {
            return bsl.totalJobSeekers();
        }
        [Route("admin/report/totalJobProviders")]
        [HttpGet]
        public int totalJobProviders()
        {
            return bsl.totalJobProviders();
        }
        [Route("admin/report/search/{location}")]
        [HttpGet]
        public object totalJobsByLocation(string location)
        {
            return bsl.totalJobsByLocation(location);
        }
        [Route("admin/report/review/avgRating")]
        [HttpGet]
        public float avgRating()
        {
            return bsl.avgRating();
        }
    }
}
