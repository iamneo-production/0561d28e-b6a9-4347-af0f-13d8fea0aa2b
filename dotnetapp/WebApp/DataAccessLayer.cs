using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using CookHiring.Models;

namespace DatabaseController
{
    public class DataAccessLayer
    {
        private string con = "Server=0.0.0.0;Data Source=.;User id=sa;Password=examlyMssql@123;Initial Catalog=CookHiring;";
        //Common Methods
        public void Execute(string sqlstring)
        {
            SqlConnection sqlcon = new SqlConnection(con);
            sqlcon.Open();
            SqlCommand cmd = new SqlCommand(sqlstring, sqlcon);
            cmd.ExecuteNonQuery();
            sqlcon.Close();
        }

        //AuthController

        public object isUserPresent(LoginModel login)
        {
            string sqlstring = "select id, userrole, username from ch_user where email='" + login.email + "' and password='" + login.password + "'";
            SqlConnection sqlcon = new SqlConnection(con);
            sqlcon.Open();
            SqlCommand cmd = new SqlCommand(sqlstring, sqlcon);
            string id = "", userrole = "", username = "";
            var obj = new List<object>();
            cmd.ExecuteNonQuery();
            using (SqlDataReader sd = cmd.ExecuteReader())
            {
                while (sd.Read())
                {
                    id += sd[0].ToString();
                    userrole += sd[1].ToString();
                    username += sd[2].ToString();
                    var ob = new
                    {
                        id = id,
                        username = username,
                        userrole = userrole
                    };
                    obj.Add(ob);

                }
            }
            if (id.Length > 0)
            {
                return obj;
            }
            else
            {
                return -1;
            }
        }
        public bool isUserPres(string email)
        {
            string sqlstring = "select 1 from ch_user where email='" + email + "'";
            SqlConnection sqlcon = new SqlConnection(con);
            sqlcon.Open();
            SqlCommand cmd = new SqlCommand(sqlstring, sqlcon);
            SqlDataReader sd = cmd.ExecuteReader();
            bool flag = sd.Read() ? true : false;
            return flag;
        }
        public bool isAdminPresent(LoginModel login)
        {
            string sqlstring1 = "select 1 from admin where email='" + login.email + "' and password='" + login.password + "'";
            SqlConnection sqlcon = new SqlConnection(con);
            sqlcon.Open();
            SqlCommand cmd = new SqlCommand(sqlstring1, sqlcon);
            SqlDataReader sd = cmd.ExecuteReader();
            bool flag = sd.Read() ? true : false;
            sqlcon.Close();
            return flag ;
        }
        public bool isAdminPres(string email)
        {
            string sqlstring = "select 1 from admin where email='" + email + "'";
            SqlConnection sqlcon = new SqlConnection(con);
            sqlcon.Open();
            SqlCommand cmd = new SqlCommand(sqlstring, sqlcon);
            SqlDataReader sd = cmd.ExecuteReader();
            bool flag = sd.Read() ? true : false;
            return flag;
        }        public int getUserId(string sqlstring)
        {
            SqlConnection sqlcon = new SqlConnection(con);
            sqlcon.Open();
            SqlCommand cmd = new SqlCommand(sqlstring, sqlcon);
            int id = int.Parse(cmd.ExecuteScalar().ToString());
            sqlcon.Close();
            Console.WriteLine("Primar Key: ", id);
            return id;
        }
        public void insertJobSeeker(UserModel user)
        {
            string sql = "Insert into ch_user(userrole, username, email, password, mobileNumber) values('" + user.userrole + "', '" + user.username + "', '" + user.email + "', '" + user.password + "', '" + user.mobileNumber + "'); select @@Identity";
            // int id = getUserId(sql);
            // sql = "Insert into jobSeeker(id, phone, email) values(" + id + ", '" + user.mobileNumber + "', '" + user.email + "')";
            Execute(sql);
        }
        public void insertJobProvider(UserModel user)
        {
            string sql = "Insert into ch_user(userrole, username, email, password, mobileNumber) values('" + user.userrole + "', '" + user.username + "', '" + user.email + "', '" + user.password + "', '" + user.mobileNumber + "'); select @@Identity";
            // int id = getUserId(sql);
            // sql = "Insert into jobProvider(id, phone, email) values(" + id + ", '" + user.mobileNumber + "', '" + user.email + "')";
            Execute(sql);
        }
        public void insertAdmin(AdminModel admin)
        {
            string sql = "Insert into admin values('" + admin.username + "', '" + admin.email + "', '" + admin.password + "', '" + admin.mobileNumber + "')";
            Execute(sql);
        }

        //UserController

        public object executeGetJobSeeker(string sql)
        {
            SqlConnection sqlcon = new SqlConnection(con);
            sqlcon.Open();
            SqlCommand cmd = new SqlCommand(sql, sqlcon);
            SqlDataReader reader = cmd.ExecuteReader();
            List<Dictionary<string, string>> list = new List<Dictionary<string, string>>();
            Dictionary<string, string> column;
            while (reader.Read())
            {
                column = new Dictionary<string, string>();
                column["id"] = reader["id"].ToString();
                column["username"] = reader["username"].ToString();
               // column["name"] = reader["name"].ToString();
                column["email"] = reader["email"].ToString();
                column["mobileNumber"] = reader["mobileNumber"].ToString();
                // column["experience"] = reader["experience"].ToString();
                // column["address"] = reader["address"].ToString();

                list.Add(column);
            }
            sqlcon.Close();
            return list;
        }
        public object executeGetJobSeekerById(string sql)
        {
            SqlConnection sqlcon = new SqlConnection(con);
            sqlcon.Open();
            SqlCommand cmd = new SqlCommand(sql, sqlcon);
            SqlDataReader reader = cmd.ExecuteReader();
            List<Dictionary<string, string>> list = new List<Dictionary<string, string>>();
            Dictionary<string, string> column;
            while (reader.Read())
            {
                column = new Dictionary<string, string>();
                column["id"] = reader["id"].ToString();
                column["name"] = reader["name"].ToString();
                column["email"] = reader["email"].ToString();
                column["phone"] = reader["phone"].ToString();
                column["experience"] = reader["experience"].ToString();
                column["address"] = reader["address"].ToString();
                list.Add(column);
            }
            sqlcon.Close();
            return list;
        }
        public object getJobSeeker()
        {
            //string sql = "select ch_user.id, ch_user.username, ch_user.email, ch_user.password, ch_user.mobileNumber, jobSeeker.name, jobSeeker.address, jobSeeker.experience from ch_user inner join jobSeeker on ch_user.id = jobSeeker.id and ch_user.userrole='Job Seeker'";
            string sql="select * from ch_user where userrole='Job Seeker'";

            return executeGetJobSeeker(sql);

        }
        public object executeGetJobProvivder(string sql)
        {
            SqlConnection sqlcon = new SqlConnection(con);
            sqlcon.Open();
            SqlCommand cmd = new SqlCommand(sql, sqlcon);
            SqlDataReader reader = cmd.ExecuteReader();
            List<Dictionary<string, string>> list = new List<Dictionary<string, string>>();
            Dictionary<string, string> column;
            while (reader.Read())
            {
                column = new Dictionary<string, string>();
                column["id"] = reader["id"].ToString();
                column["name"] = reader["username"].ToString();
                column["email"] = reader["email"].ToString();
                column["mobileNumber"] = reader["mobileNumber"].ToString();
                list.Add(column);
            }
            sqlcon.Close();
            return list;
        }
        public object getJobProvider()
        {
            string sql = "select * from ch_user where userrole='Job Provider'";
            return executeGetJobProvivder(sql);

        }
        public string getUserrole(string sql)
        {
            string userrole = "";
            SqlConnection sqlcon = new SqlConnection(con);
            sqlcon.Open();
            SqlCommand cmd = new SqlCommand(sql, sqlcon);
            cmd.ExecuteNonQuery();
            using (SqlDataReader sd = cmd.ExecuteReader())
            {
                while (sd.Read())
                {
                    userrole = sd[0].ToString();
                }
            }
            if (userrole == "Job Provider")
            {
                userrole = "jobProvider";
            }
            else
            {
                userrole = "jobSeeker";
            }
            return userrole;
        }
        public string editUser(JobSeekerModel js)
        {
            string res = "";
            {
                string sql1 = "";
                sql1 = "update jobSeeker set name='" + js.personName + "', email='" + js.email + "', experience='" + js.personExp + "', phone='" + js.personPhone + "', address='" + js.personAddress + "' where id=" + js.personId;
                string sql2 = "update ch_user set username='" + js.personName + "', email='" + js.email + "' where id=" + js.personId;
                Execute(sql1);
                Execute(sql2);
                res += "Profile Updated";
            }
            return res;
        }
        public string deleteUser(string id)
        {
            try
            {
                string sql1 = "delete from jobSeeker where id=" + id;
                string sql2 = "delete from ch_user where id=" + id;
                Execute(sql1);
                Execute(sql2);
                return "Profile deleted";
            }
            catch (Exception ex)
            {
                return "Bad Request";
            }
        }
           public bool isprofilePres(int id)
        {
            string sqlstring = "select 1 from jobSeeker where email='" + id + "'";
            SqlConnection sqlcon = new SqlConnection(con);
            sqlcon.Open();
            SqlCommand cmd = new SqlCommand(sqlstring, sqlcon);
            SqlDataReader sd = cmd.ExecuteReader();
            bool flag = sd.Read() ? true : false;
            return flag;
        }

        public string applyJob(JobSeekerModel user, int jobId)
        {
            try
            {
                 string sql = "insert into appliedJobs(jobId, jobSeekerId, jobProviderId, selected) values(" + jobId + ", " + user.personId + ", (select jobProviderId from job where jobId= " + jobId + ")," + "0" + ")";

                string sql2="insert into jobSeeker(id, name, address,experience,phone,email) values("+user.personId+",'"+user.personName+"','"+user.personAddress+"','"+user.personExp+"','"+user.personPhone+"','"+user.email+"')";
                string sql3="update jobSeeker set name ='"+user.personName+"',address='"+user.personAddress+"',experience='"+user.personExp+"',phone='"+user.personPhone +"',email='"+user.email+"'";
               if(isprofilePres(user.personId))
               {
                Execute(sql3);
               }
               else{
                   Execute(sql2);
                   
               }
                Execute(sql);
                return "Job applied";
            }
            catch (Exception ex)
            {
                return "Bad Request";
            }
        }
        public object executeAppliedJobSeeker(string sql, string id)
        {
            SqlConnection sqlcon = new SqlConnection(con);
            sqlcon.Open();
            SqlCommand cmd = new SqlCommand(sql, sqlcon);
            SqlDataReader reader = cmd.ExecuteReader();
            List<Dictionary<string, string>> list = new List<Dictionary<string, string>>();
            Dictionary<string, string> column;
            while (reader.Read())
            {
                column = new Dictionary<string, string>();
                column["jobId"] = reader["jobId"].ToString();
                column["jobDescription"] = reader["jobDescription"].ToString();
                column["jobLocation"] = reader["jobLocation"].ToString();
                column["fromDate"] = reader["fromDate"].ToString();
                column["toDate"] = reader["toDate"].ToString();
                column["wagePerDay"] = reader["jobLocation"].ToString();
                column["mobileNumber"] = reader["mobileNumber"].ToString();
                column["selected"] = reader["selected"].ToString();
                list.Add(column);
            }

            return list;
        }
        public bool alreadyApplied(int jsId, int jId)
        {
            string sqlstring = "select 1 from appliedJobs where jobId=" + jId + " and jobSeekerId = " + jsId;
            SqlConnection sqlcon = new SqlConnection(con);
            sqlcon.Open();
            SqlCommand cmd = new SqlCommand(sqlstring, sqlcon);
            SqlDataReader sd = cmd.ExecuteReader();
            bool flag = sd.Read() ? true : false;
            return flag;
        }
        public object appliedJobSeeker(string id)
        {
            string sql = "select j.*, a.selected from job as j join appliedJobs as a on j.jobId = a.jobId where a.jobSeekerId = " + id;
            return executeAppliedJobSeeker(sql, id);
        }
        public bool acceptJobSeeker(int id, int jobId)
        {
            try
            {
                string sql = "update appliedJobs set selected = '1' where jobSeekerId=" + id + " and jobId = " + jobId;
                Execute(sql);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public bool rejectJobSeeker(int id, int jobId)
        {
            try
            {
                string sql = "update appliedJobs set selected = '2' where jobSeekerId=" + id + " and jobId = " + jobId;
                Execute(sql);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public object searchLocation(string loc)
        {
            string sql = "SELECT job.*, ch_user.mobileNumber FROM job inner join ch_user on job.jobProviderId = ch_user.id where job.jobLocation LIKE '" + loc + "%'; ";
            return executeGetJobs(sql);
        }

        public object getJobSeekerById(int id)
        {
            string sql = "select * from jobSeeker where id = " + id;
            return executeGetJobSeekerById(sql);
        }

        public string checkCandidates(int jsId, int jId)
        {
            string sql = "select selected from appliedJobs where jobId = '" + jId + "' and jobSeekerId = '" + jsId + "'";
            SqlConnection sqlcon = new SqlConnection(con);
            sqlcon.Open();
            SqlCommand cmd = new SqlCommand(sql, sqlcon);
            var res = cmd.ExecuteScalar();
            string result = "";
            if (res != null)
            {
                result = res.ToString();
            }
            sqlcon.Close();
            return result;
        }
        public bool addReview(ReviewModel review)
        {
            try
            {
                string sql = "insert into review values(" + review.userId + ", " + review.rating + ", '" + review.comment + "'";
                Execute(sql);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        //JobController

        public string addJob(JobModel job, string id)
        {
            try
            {
                string sql = "insert into job(jobDescription, jobLocation, fromDate, toDate, wagePerDay, jobProviderId, mobileNumber) values('" + job.jobDescription + "', '" + job.jobLocation + "', '" + job.fromDate + "', '" + job.toDate + "', '" + job.wagePerDay + "', '" + id + "','" + job.mobileNumber + "')";
                string sql1 = "update ch_user set mobileNumber = '" + job.mobileNumber + "' where id=" + id;
                Execute(sql1);
                Execute(sql);
                return "Job added successful";
            }
            catch (Exception ex)
            {
                return "Error occured..!";
            }
        }
        public object executeGetJobs(string sql)
        {
            SqlConnection sqlcon = new SqlConnection(con);
            sqlcon.Open();
            SqlCommand cmd = new SqlCommand(sql, sqlcon);
            SqlDataReader reader = cmd.ExecuteReader();
            List<Dictionary<string, string>> list = new List<Dictionary<string, string>>();
            Dictionary<string, string> column;
            while (reader.Read())
            {
                column = new Dictionary<string, string>();
                column["jobId"] = reader["jobId"].ToString();
                column["jobDescription"] = reader["jobDescription"].ToString();
                column["jobLocation"] = reader["jobLocation"].ToString();
                column["fromDate"] = reader["fromDate"].ToString();
                column["toDate"] = reader["toDate"].ToString();
                column["wagePerDay"] = reader["wagePerDay"].ToString();
                column["phone"] = reader["mobileNumber"].ToString();
                list.Add(column);
            }
            sqlcon.Close();
            return list;
        }
        public object getJobs()
        {
            string sql = "select * from job";
            return executeGetJobs(sql);

        }
        public object getCandidatesApplied(int jobProviderid, int jobId)
        {
            string sql = "select id, name, address, experience, phone, email, jobId from jobSeeker inner join appliedJobs on jobSeeker.id = appliedJobs.jobSeekerId where jobProviderId = " + jobProviderid + " and appliedJobs.jobId = " + jobId;

            return executeCandidates(sql);
        }
        public object executeGetcustomerJobs(string sql)
        {
            SqlConnection sqlcon = new SqlConnection(con);
            sqlcon.Open();
            SqlCommand cmd = new SqlCommand(sql, sqlcon);
            SqlDataReader reader = cmd.ExecuteReader();
            List<Dictionary<string, string>> list = new List<Dictionary<string, string>>();
            Dictionary<string, string> column;
            while (reader.Read())
            {
                column = new Dictionary<string, string>();
                column["jobId"] = reader["jobId"].ToString();
                column["jobDescription"] = reader["jobDescription"].ToString();
                column["jobLocation"] = reader["jobLocation"].ToString();
                column["fromDate"] = reader["fromDate"].ToString();
                column["toDate"] = reader["toDate"].ToString();
                column["wagePerDay"] = reader["wagePerDay"].ToString();
                column["mobileNumber"] = reader["mobileNumber"].ToString();
                list.Add(column);
            }
            sqlcon.Close();
            return list;
        }
        public object getcustomerJobs(string id)
        {
            string sql = "select * from job where jobProviderId = " + id;
            return executeGetcustomerJobs(sql);
        }
        public string editJob(string id, JobModel job)
        {
            try
            {
                string sql = "update job set jobDescription='" + job.jobDescription + "', jobLocation='" + job.jobLocation + "', fromDate='" + job.fromDate + "', toDate='" + job.toDate + "', wagePerDay='" + job.wagePerDay + "', mobileNumber = '" + job.mobileNumber + "' where jobId=" + id;
                Execute(sql);
                return "Job updated";
            }
            catch (Exception ex)
            {
                return "Bad Request";
            }
        }
        public string deleteJob(string id)
        {
            try
            {
                string sql1 = "delete from job where jobId=" + id;
                string sql2 = "update appliedJobs set selected = '3' where jobId = " + id;
                Execute(sql1);
                Execute(sql2);
                return "Job Deleted";
            }
            catch (Exception ex)
            {
                return "Bad Request";
            }

        }

        public object executeCandidates(string sql)
        {
            SqlConnection sqlcon = new SqlConnection(con);
            sqlcon.Open();
            SqlCommand cmd = new SqlCommand(sql, sqlcon);
            SqlDataReader reader = cmd.ExecuteReader();
            List<Dictionary<string, string>> list = new List<Dictionary<string, string>>();
            Dictionary<string, string> column;
            while (reader.Read())
            {
                column = new Dictionary<string, string>();
                column["id"] = reader["id"].ToString();
                column["name"] = reader["name"].ToString();
                column["address"] = reader["address"].ToString();
                column["phone"] = reader["phone"].ToString();
                column["email"] = reader["email"].ToString();
                column["experience"] = reader["experience"].ToString();
               // column["jobId"] = reader["jobId"].ToString();
                list.Add(column);
            }
            sqlcon.Close();
            return list;
        }
        public object candidates()
        {
            string sql = "select * from jobSeeker;";
            return executeCandidates(sql);
        }

        //AdminController

        public string addProfile(AdminModel data)
        {
            try
            {
                string sql = "insert into admin(username, email, password, mobileNumber) values('" + data.username + "', '" + data.email + "', '" + data.password + "', '" + data.mobileNumber + "')";
                Execute(sql);
                return "Profile added";
            }
            catch (Exception e)
            {
                return "Bad Request";
            }
        }
        public string editUserDetails(UserModel user, int id)
        {
            try
            {
                string sql = "update ch_user set userrole = '" + user.userrole + "', username = '" + user.username + "', email = '" + user.email + "', mobileNumber = '" + user.mobileNumber + "' where id = '" + id + "'";
                Execute(sql);
                return "Profile Updated";
            }
            catch (Exception e)
            {
                return "Bad Request";
            }
        }
        public JsonResult deleteCandidates(int id)
        {
            try
            {
                string sql1 = "delete from jobSeeker where id=" + id;
                Execute(sql1);
                string sql = "delete from appliedJobs where jobSeekerId=" + id;
                Execute(sql);
                return  new JsonResult("Candidate deleted") ;
            }
            catch (Exception e)
            {
                return  new JsonResult("Bad Request");
            }
        }
        public string editProfile(string id, AdminModel data)
        {
            try
            {
                string sql = "update admin set username='" + data.username + "', email='" + data.email + "', password='" + data.password + "', mobileNumber='" + data.mobileNumber + "'";
                Execute(sql);
                return "Profile updated";
            }
            catch (Exception e)
            {
                return "Bad Request";
            }
        }
        public object executeViewProfile(string sql)
        {
            SqlConnection sqlcon = new SqlConnection(con);
            sqlcon.Open();
            SqlCommand cmd = new SqlCommand(sql, sqlcon);
            SqlDataReader reader = cmd.ExecuteReader();
            List<Dictionary<string, string>> list = new List<Dictionary<string, string>>();
            Dictionary<string, string> column;
            while (reader.Read())
            {
                column = new Dictionary<string, string>();
                column["id"] = reader["id"].ToString();
                column["username"] = reader["username"].ToString();
                column["email"] = reader["email"].ToString();
                column["password"] = reader["password"].ToString();
                column["mobileNumber"] = reader["mobileNumber"].ToString();
                list.Add(column);
            }
            sqlcon.Close();
            return list;
        }
        public object viewProfile()
        {
            string sql = "Select * from admin";
            return executeViewProfile(sql);

        }

        //Report
        public object totalUsers(string location)
        {
            SqlConnection sqlcon = new SqlConnection(con);
            sqlcon.Open();
            //Total Users
            SqlCommand cmd = new SqlCommand("select count(id) from ch_user", sqlcon);
            int total = int.Parse(cmd.ExecuteScalar().ToString());
            //Job Seeker
            string qry1 = "", qry2 = "";
            if (location == null)
            {
                qry1 = "Select count(id) from ch_user where userrole = 'Job Seeker'";
            }
            else
            {
                qry1 = "select count(id) from jobSeeker where address like '" + location + "%'";
            }
            cmd = new SqlCommand(qry1, sqlcon);
            int jobSeekerCount = int.Parse(cmd.ExecuteScalar().ToString());
            //Job Provider
            if (location == null)
            {
                qry2 = "select count(id) from ch_user where userrole = 'Job Provider'";
            }
            else
            {
                qry2 = "select count(distinct(j.jobProviderId)) from ch_user as c join job as j on j.jobProviderId = c.id where j.jobLocation like '" + location + "%'";
            }
            cmd = new SqlCommand(qry2, sqlcon);
            int jobProviderCount = int.Parse(cmd.ExecuteScalar().ToString());
            DateTime today = DateTime.Today;
           // active Jobs
            cmd = new SqlCommand("select count(jobProviderId) from job where toDate >= '" + today.ToString("yyyy-MM-dd") + "' and jobLocation like '" + location + "%'", sqlcon);
            int activeJobs = int.Parse(cmd.ExecuteScalar().ToString());
            //total jobs
            cmd = new SqlCommand("select count(jobId) from job", sqlcon);
            int totalJobs = int.Parse(cmd.ExecuteScalar().ToString());
            //Available jobs
            cmd = new SqlCommand("select count(a.jobSeekerId) from appliedJobs a join job as j on a.jobId = j.jobId where selected = 0 and j.jobLocation like '" + location + "%' and j.toDate >= '" + today.ToString("yyyy-MM-dd") + "'", sqlcon);
            int waiting = int.Parse(cmd.ExecuteScalar().ToString());
            //Accepted Jobs
            cmd = new SqlCommand("select count(a.jobSeekerId) from appliedJobs a join job as j on a.jobId = j.jobId where selected = 1 and j.jobLocation like '" + location + "%'", sqlcon);
            int accepted = int.Parse(cmd.ExecuteScalar().ToString());
            var obj = new
            {
                total = total,
                jobSeeker = jobSeekerCount,
                jobProvider = jobProviderCount,
                totalJobs = totalJobs,
                activeJobs = activeJobs,
                waiting = waiting,
                accepted = accepted
            };
            return obj;
        }
         public object totalUsers()
        {
            SqlConnection sqlcon = new SqlConnection(con);
            sqlcon.Open();
            //Total Users
            SqlCommand cmd = new SqlCommand("select count(id) from ch_user", sqlcon);
            int total = int.Parse(cmd.ExecuteScalar().ToString());
            //Job Seeker
            string qry1 = "",qry2="";
          
                qry1 = "Select count(id) from ch_user where userrole = 'Job Seeker'";
            
          
            cmd = new SqlCommand(qry1, sqlcon);
            int jobSeekerCount = int.Parse(cmd.ExecuteScalar().ToString());
            //Job Provider
          
                qry2 = "select count(id) from ch_user where userrole = 'Job Provider'";
          
            cmd = new SqlCommand(qry2, sqlcon);
            int jobProviderCount = int.Parse(cmd.ExecuteScalar().ToString());
            DateTime today = DateTime.Today;
           // active Jobs
            cmd = new SqlCommand("select count(jobProviderId) from job where toDate >= '"+ today.ToString("yyyy-MM-dd")+ "'" , sqlcon);
            int activeJobs = int.Parse(cmd.ExecuteScalar().ToString());
            //total jobs
            cmd = new SqlCommand("select count(jobId) from job", sqlcon);
            int totalJobs = int.Parse(cmd.ExecuteScalar().ToString());
            //Available jobs
            cmd = new SqlCommand("select count(a.jobSeekerId) from appliedJobs a join job as j on a.jobId = j.jobId where selected = 0 and j.toDate >= '" + today.ToString("yyyy-MM-dd") + "'", sqlcon);
            int waiting = int.Parse(cmd.ExecuteScalar().ToString());
            //Accepted Jobs
            cmd = new SqlCommand("select count(a.jobSeekerId) from appliedJobs a join job as j on a.jobId = j.jobId where selected = 1 ", sqlcon);
            int accepted = int.Parse(cmd.ExecuteScalar().ToString());
            var obj = new
            {
                total = total,
                jobSeeker = jobSeekerCount,
                jobProvider = jobProviderCount,
                totalJobs = totalJobs,
                activeJobs = activeJobs,
                waiting = waiting,
                accepted = accepted
            };
            return obj;
        }

    }
}
