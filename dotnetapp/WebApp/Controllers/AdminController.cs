using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatabaseController;
using CookHiring.Models;
using CookHiring.Controllers;

namespace CookHiring.Controllers
{
    public class AdminController : ControllerBase
    {
        private BusinessLayer bsl = new BusinessLayer();
        [Route("admin/editProfile")]
        [HttpPut]
        public string editUser(JobSeekerModel js)
        {
            return bsl.editUser(js);

        }
        [Route("admin/editUser/{id}")]
        [HttpPut]
        public string editUserDetails([FromBody] UserModel user, int id)
        {
            return bsl.editUserDetails(user, id);
        }
        [Route("admin/getJobSeeker")]
        [HttpGet]
        public object getJobSeeker()
        {
            var users = bsl.getJobSeeker();
            return users;
        }
        [Route("admin/getJobProvider")]
        [HttpGet]
        public object getJobProvider()
        {
            var users = bsl.getJobProvider();
            return users;
        }
        [Route("admin/deleteCandidate/{id}")]
        [HttpDelete]
        public JsonResult deleteCandidates(int id)
        {
            return bsl.deleteCandidates(id);
        }
        JobController jobController = new JobController();
        [Route("admin/getAllJobs")]
        [HttpGet]
        public object getAllJobs()
        {
            return jobController.getJobs();
        }
    }
}
