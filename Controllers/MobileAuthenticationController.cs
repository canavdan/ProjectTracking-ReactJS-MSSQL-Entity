using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ProjectController.Models;
namespace ProjectController.Controllers
{
    public class MobileAuthenticationController : Controller
    {
        public Settings Setting = new Settings();
        private readonly takip2Entities _db = new takip2Entities();
        public class Data
        {
            public string username { get; set; }
            public string password { get; set; }
        }
        // GET: MobileAuthentication
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
            Data sendNull = new Data();
            sendNull.username = "hatali";
            sendNull.password = "hatali";
            return Json(sendNull, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult ControlUsername(Data controlData)
        {
            var data = _db.members.SingleOrDefault(x => x.username == controlData.username);
            if (data != null)
            {
                return Json(true, JsonRequestBehavior.AllowGet);
            }

            Data sendNull = new Data();
            sendNull.username = "hatali";
            sendNull.password = "hatali";
            return Json(sendNull, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult SendSMS(Data controlData)
        {
            var data = _db.members.SingleOrDefault(x => x.username == controlData.username);

            var projects = _db.projects.Where(x => x.statuId == 1 && x.memberId == data.memberId).Select(x => new
            {

                projectName = x.projectName,
                percentStatu = x.percentStatu,
                exceptedFinish = x.exceptedFinish,
            }
            );
            string ba = "";
            foreach (var x in projects)
            {
                ba = ba + " Proje Ismi:" + x.projectName + " Yüzde:" + x.percentStatu + " Tahmini Bitiş:" + x.exceptedFinish;
            }
            SendSMS a = new SendSMS();
            a.ana(" Proje Ismi: Otobüs Otomasyon Yüzde: 45 Tahmini Bitiş: 23.12.2017", "905059051102");
            Data sendNull = new Data();
            sendNull.username = "hatali";
            sendNull.password = "hatali";
            return Json(sendNull, JsonRequestBehavior.AllowGet);
            

        }
        public JsonResult SendPass(Data controlData)
        {
            var data = _db.members.SingleOrDefault(x => x.username == controlData.username);

            SendSMS a = new SendSMS();

            a.ana("Şifreniz:123466" , "905059051102");
            Data sendNull = new Data();
            sendNull.username = "hatali";
            sendNull.password = "hatali";
            return Json(sendNull, JsonRequestBehavior.AllowGet);

        }

    }
}