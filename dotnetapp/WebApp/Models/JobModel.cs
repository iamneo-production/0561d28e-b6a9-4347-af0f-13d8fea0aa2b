using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CookHiring.Models
{
    public class JobModel
    {
        public string jobDescription { get; set; }
        public string jobLocation { get; set; }
        public string fromDate { get; set; }
        public string toDate { get; set; }
        public string wagePerDay { get; set; }  
        public string mobileNumber  { get; set; }
    }
}
