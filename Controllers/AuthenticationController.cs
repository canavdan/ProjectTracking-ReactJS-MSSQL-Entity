using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ProjectController.Models;

namespace ProjectController.Controllers
{
    public class AuthenticationController : Controller
    {
        public Settings Setting = new Settings();
        private readonly takip2Entities _db = new takip2Entities();
        public class Data
        {
            public string username { get; set; }
            public string password { get; set; }
        }
        // GET: Authentication
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public JsonResult ControlLoginInfo(Data controlData)
        {
            var data = _db.members.Select(x => new
            {
                username = x.username,
                password = x.password,
                roleName = x.role.name,
                memberId = x.memberId
            }).SingleOrDefault(x => x.username == controlData.username
                                                        && x.password == controlData.password);

            if (data != null)
                return Json(data, JsonRequestBehavior.AllowGet);
            else
            {
                var dataEmp = _db.employees.Select(x => new
                {
                    username = x.username,
                    password = x.password,
                    roleName = x.role.name,
                    empId = x.empId
                }).SingleOrDefault(x => x.username == controlData.username
                                        && x.password == controlData.password);
                if (dataEmp != null)
                    return Json(dataEmp, JsonRequestBehavior.AllowGet);
            }
            return Json(data, JsonRequestBehavior.AllowGet);

        }
    }
}