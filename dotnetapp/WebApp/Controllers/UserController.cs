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
    public class UserController : ControllerBase
    {
        private BusinessLayer bsl = new BusinessLayer();
        [Route("admin/addUser")]
        [HttpPost]
        public string addUser([FromBody] UserModel user)
        {
            string res = "";
            LoginModel login = new LoginModel();
            login.email = user.email;
            login.password = user.password;
            if (!(bsl.isUserPres(login.email)))
            {
                bsl.saveUser(user);
                res += "Profile Updated";
            }
            else
            {
                res += "Error Occured..!";
            }
            return res;
        }
        [Route("admin/deleteUser/{UserId}")]
        [HttpPost]
        public string deleteUser(String UserId)
        {
            return bsl.deleteUser(UserId);
        }
        [Route("jobSeeker/applyJob/{id}")]
        [HttpPost]
        public string applyJob([FromBody] JobSeekerModel jobSeeker, int id)
        {
            return bsl.applyJob(jobSeeker, id);
        }
        [Route("jobseeker/getAppliedJobs")]
        [HttpGet]
        public object appliedJobSeeker(string jobSeekerId)
        {
            var appliedJobSeeker = bsl.appliedJobSeeker(jobSeekerId);
            return appliedJobSeeker;
        }
        
        [Route("jobseeker/search")]
        [HttpGet]
        public object searchLocation(string location)
        {
            return bsl.searchLocation(location);
        }
        [Route("jobseeker/{id}")]
        [HttpGet]
        public object getJobSeekerById(int id)
        {
            var obj = bsl.getJobSeekerById(id);
            return obj;
        }
        [Route("jobseeker/job/alreadyApplied")]
        [HttpGet]
        public bool alreadyApplied(int jsId, int jId)
        {
            return bsl.alreadyApplied(jsId, jId);
        }
        [Route("jobprovider/appliedCandidates")]
        [HttpGet]
        public object getCandidatesApplied(int jobProviderId, int jobId)
        {
            var obj = bsl.getCandidatesApplied(jobProviderId, jobId);
            return obj;
        }
        [Route("jobprovider/acceptjobseeker/{id},{jobId}")]
        [HttpPut]
        public bool acceptJobSeeker(int id, int jobId)
        {
            return bsl.acceptJobSeeker(id, jobId);
        }
        [Route("jobprovider/rejectjobseeker/{id},{jobId}")]
        [HttpPut]
        public bool rejectJobSeeker(int id, int jobId)
        {
            return bsl.rejectJobSeeker(id, jobId);
        }
        [Route("jobprovider/myJobs/{id}")]
        [HttpGet]
        public object myJobs(string id)
        {
            var obj = bsl.myJobs(id);
            return obj;
        }
        [Route("jobprovider/job/checkCandidate/{jsId},{jId}")]
        [HttpGet]
        public string checkCandidates(int jsId, int jId)
        {
            return bsl.checkCandidates(jsId, jId);
        }
    }
}
