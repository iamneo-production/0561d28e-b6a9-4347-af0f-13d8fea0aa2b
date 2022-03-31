using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatabaseController;
using CookHiring.Models;

namespace CookHiring.Controllers
{
    public class JobController : ControllerBase
    {
        private BusinessLayer bsl = new BusinessLayer();
        [Route("admin/addJob/{id}")]
        [HttpPost]
        public string addJob([FromBody]JobModel job, string id)
        {
            return bsl.addJob(job, id);
        }
        [Route("admin/editJob/{id}")]
        [HttpPut]
        public string editJob(string id, [FromBody]JobModel job)
        {
            return bsl.editJob(id, job);

        }
        [Route("user/dashboard")]
        [HttpGet]
        public object getJobs()
        {
            var jobs =  bsl.getJobs();
            return jobs;
        }
        //JobProviderDashboard
        [Route("customer/dashboard")]
        [HttpGet]
        public object getCustomerJobs(string id)
        {
            var jobs = bsl.getcustomerJobs(id);
            return jobs;
        }
        [Route("admin/deleteJob/{jobId}")]
        [HttpPost]
        public string deleteJob(string jobId)
        {
            return bsl.deleteJob(jobId);
        }
        [Route("admin/getCandidates")]
        [HttpGet]
        public object candidates()
        {
            var res = bsl.candidates();
            return res;
        }
    }
}
