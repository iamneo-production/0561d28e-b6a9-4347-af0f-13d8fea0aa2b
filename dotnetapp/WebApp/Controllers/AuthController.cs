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
        public bool saveUser([FromBody]UserModel user)
        {
            try
            {
                bool flag = false;
                LoginModel login = new LoginModel();
                login.email = user.email;
                login.password = user.password;
                if (!(bsl.isUserPres(login.email)))
                {
                    bsl.saveUser(user);
                    flag = true;
                }
                return flag;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        [Route("admin/singup")]
        [HttpPost]
        public bool saveAdmin([FromBody] AdminModel admin)
        {
            try
            {
                bool flag = false;
                LoginModel login = new LoginModel();
                login.email = admin.email;
                login.password = admin.password;
                if (!(isAdminPresent(login)))
                {
                    bsl.saveAdmin(admin);
                    flag = true;
                }
                return flag;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
