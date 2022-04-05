using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatabaseController;
using CookHiring.Controllers;
using CookHiring.Models;

namespace CookHiring.Controllers
{
    public class AuthController : ControllerBase
    {
        BusinessLayer bsl = new BusinessLayer();
        [Route("user/login")]
        [HttpPost]
        public object isUserPresent([FromBody]LoginModel login)
        {
            return bsl.isUserPresent(login);
        }
        [Route("admin/login")]
        [HttpPost]
        public bool isAdminPresent([FromBody] LoginModel login)
        {
            return true ? bsl.isAdminPresent(login) : false;
        }
        [Route("user/signup")]
        [HttpPost]
<<<<<<< HEAD
       public string saveUser([FromBody]UserModel user)
        {
            try
            {
                // LoginModel login = new LoginModel();
                // login.email = user.email;
                // login.password = user.password;
=======
        public string saveUser([FromBody]UserModel user)
        {
            try
            {
>>>>>>> 92a1c9db7e3925ad4d62c56a84c075a202ede9db
                if (!(bsl.isUserPres(user.email)))
                {
                    bsl.saveUser(user);
                    return "true";
                }
                else
                {
                    return "Email already exists..!";
                }
            }
            catch (Exception ex)
            {
                return "Error Occured..!";
            }
        }
        [Route("admin/signup")]
        [HttpPost]
<<<<<<< HEAD
       public string saveAdmin([FromBody] AdminModel admin)
=======
        public string saveAdmin([FromBody] AdminModel admin)
>>>>>>> 92a1c9db7e3925ad4d62c56a84c075a202ede9db
        {
            try
            {
                if (!(bsl.isAdminPres(admin.email)))
                {
                    bsl.saveAdmin(admin);
                    return "true";
                }
                else
                {
                    return "Email already exists..!";
                }
            }
            catch (Exception ex)
            {
                return "Error Occured..!";
            }
        }
    }
}
