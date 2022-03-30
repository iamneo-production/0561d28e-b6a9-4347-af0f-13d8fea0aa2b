using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CookHiring.Models
{
    public class JobSeekerModel
    {
        public int personId { get; set; }
        public string personName { get; set; }
        public string personAddress { get; set; }
        public string personExp { get; set; }
        public string personPhone  { get; set; }
        public string email { get; set; }
    }
}
