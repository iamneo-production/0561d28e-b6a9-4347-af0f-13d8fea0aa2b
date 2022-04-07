using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CookHiring.Models
{
    public class ReviewModel
    {
        public int userId{ get; set; }
        public int rating { get; set; }

        public string comment { get; set; }
    }
}
