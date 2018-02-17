using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ProjectController.Models;
namespace ProjectController.Controllers
{
    public class MobileMemberController : Controller
    {
        public Settings Setting = new Settings();
        private readonly takip2Entities _db = new takip2Entities();
        // GET: MobileMember
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetCategoryValues(int? id)
        {
            var data = _db.categoryValueProjects.Select(x => new
            {
                valueId = x.valueId,
                projectId = x.projectId,
                valueName = x.categoryValue.name,
                statu = x.statu
            }).Where(x => x.projectId == id);
            int le = data.ToArray().Length;
            if (le == 0)
            {
                categoryValueProject c = new categoryValueProject();
                c.valueId = -1;
                return Json(c, JsonRequestBehavior.AllowGet);
            }
            return Json(data, JsonRequestBehavior.AllowGet);


        }
        public JsonResult GetProject(int? id)
        {
            var data = _db.projects.Where(x => x.memberId == id).Select(x => new
            {

                projectName = x.projectName,
                projectId = x.projectId,
                description = x.description,
                employeeFull = x.employee.name + " " + x.employee.surname,
                memberFull = x.member.name + " " + x.member.surname,
                percentStatu = x.percentStatu,
                startDate = x.startDate,
                exceptedFinish = x.exceptedFinish,
                finishDate = x.finishDate,
                categoryName = x.category.categoryName,
                extra = x.extra,
                saleId = x.saleId,
                statuName = x.statu.statuName,
            }
            );

            return Json(data, JsonRequestBehavior.AllowGet);
        }


        public void SendSms()
        {
            SendSMS a = new SendSMS();
            a.ana("asdad", "+905454418782");
        }
    }
}