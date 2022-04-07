using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNetCore.Mvc;
using DatabaseController;
using CookHiring.Models;


namespace DatabaseController
{
    
    public class BusinessLayer
    {
        private DataAccessLayer dal = new DataAccessLayer();
        //AuthController
        public object isUserPresent(LoginModel login)
        {
            return dal.isUserPresent(login);
        }
        public bool isUserPres(string email)
        {
            return dal.isUserPres(email);
        }
        public bool isAdminPres(string email)
        {
            return dal.isAdminPres(email);
        }
        public bool isAdminPresent(LoginModel login)
        {
            return dal.isAdminPresent(login);
        }
        public bool isAdminPres(string login)
        {
            return dal.isAdminPres(login);
        }
        public void saveUser(UserModel user)
        {
            if (user.userrole == "Job Seeker")
                dal.insertJobSeeker(user);
            else
                dal.insertJobProvider(user);
        }
        public void saveAdmin(AdminModel admin)
        {
            dal.insertAdmin(admin);
        }
        //UserController
        public object getJobSeeker()
        {
            return dal.getJobSeeker();
        }
        public object getJobProvider()
        {
            return dal.getJobProvider();
        }
        public string editUser(JobSeekerModel js)
        {
            return dal.editUser(js);
        }
        public string deleteUser(string id)
        {
            return dal.deleteUser(id);
        }
        public string applyJob(JobSeekerModel jobSeeker, int jobId)
        {
            return dal.applyJob(jobSeeker, jobId);
        }

        public object appliedJobSeeker(string jobSeekerId)
        {
            return dal.appliedJobSeeker(jobSeekerId);
        }
        public bool acceptJobSeeker(int id, int jobId)
        {
            return dal.acceptJobSeeker(id, jobId);
        }
        public bool rejectJobSeeker(int id, int jobId)
        {
            return dal.rejectJobSeeker(id, jobId);
        }
        public object searchLocation(string loc)
        {
            return dal.searchLocation(loc);
        }
        public object getCandidatesApplied(int jobProviderId, int jobId)
        {
            return dal.getCandidatesApplied(jobProviderId, jobId);
        }
        public object myJobs(string id)
        {
            return dal.getcustomerJobs(id);
        }
        public object getJobSeekerById(int id)
        {
            return dal.getJobSeekerById(id);
        }
        public bool alreadyApplied(int jsId, int jId)
        {
            return dal.alreadyApplied(jsId, jId);
        }
        public string checkCandidates(int jsId, int jId)
        {
            return dal.checkCandidates(jsId, jId);
        }

        public bool addReview(ReviewModel review)
        {
            return dal.addReview(review);
        }
        //JobController
        public string addJob(JobModel job, string id)
        {
            return dal.addJob(job, id);
        }
        public object getJobs()
        {
            return dal.getJobs();
        }
        public object getcustomerJobs(string id)
        {
            return dal.getcustomerJobs(id);
        }
        public string editJob(string id, JobModel job)
        {
            return dal.editJob(id, job);
        }
        public string deleteJob(string id)
        {
            return dal.deleteJob(id);
        }

        public object candidates()
        {
            return dal.candidates();
        }

        //AdminController
        public string addProfile(AdminModel data)
        {
            return dal.addProfile(data);
        }
        public string editUserDetails(UserModel user, int id)
        {
            return dal.editUserDetails(user, id);
        }
        public JsonResult deleteCandidates(int id)
        {
            return dal.deleteCandidates(id);
        }
        public string editProfile(string id, AdminModel data)
        {
            return dal.editProfile(id, data);
        }
        public object viewProfile()
        {
            return dal.viewProfile();
        }

        //Report
      public object totalUsers()
        {
            return dal.totalUsers();
        }
            public object totalUsersLoc(string loc)
        {
            return dal.totalUsersLoc(loc);
        }
    }
}
