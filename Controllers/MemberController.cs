using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ProjectController.Models;

namespace ProjectController.Controllers
{
    public class MemberController : Controller
    {

        public Settings Setting = new Settings();
        private readonly takip2Entities _db = new takip2Entities();
        // GET: Member
        public ActionResult Index()
        {
            return View();
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
                categoryName = x.category.categoryName,
                extra = x.extra,
                saleId = x.saleId
            }
            );
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetProjectDetail(int? id)
        {
            var data = _db.projects.Select(x => new
            {
                projectId = x.projectId,
                saleId = x.saleId,
                projectName = x.projectName,
                percentStatu = x.percentStatu,
                employeerId = x.employeerId,
                memberId = x.memberId,
                empFull = x.employee.name + " " + x.employee.surname,
                memberFull = x.member.name + " " + x.member.surname,
                statuName = x.statu.statuName,
                description = x.description,
                startDate = x.startDate,
                exceptedFinish = x.exceptedFinish,
                finishDate = x.finishDate,
                billId = x.sale.billId,
                price = x.sale.price,
                hirepurchase = x.sale.hirepurchase,
                IsPaidAll = x.sale.IsPaidAll,
                extra = x.extra,
                statuID = x.statuId,
                categoryId = x.categoryId

            }).FirstOrDefault(x => x.projectId == id);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetSale(int? id)
        {
            var data = _db.sales.Select(x => new
            {
                saleId = x.saleId,
                price = x.price,
                hirepurchase = x.hirepurchase,
                IsPaidAll = x.IsPaidAll,
                billId = x.billId,
                fullName = x.bill.name + " " + x.bill.surname,
                name = x.bill.name,
                surname = x.bill.surname,
                description = x.bill.description,
                taxno = x.bill.taxno,
                dateSell = x.bill.dateSell
            }).FirstOrDefault(x => x.saleId == id);
            return Json(data, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetPictures(int? id)
        {
            var data = _db.images.Where(x => x.projectId == id);
            return Json(data, JsonRequestBehavior.AllowGet);

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
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ProfileInfo(int? id)
        {
            var data = _db.members.FirstOrDefault(x => x.memberId == id);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult UpdateProfile(member newMember)
        {
            var data = _db.members.FirstOrDefault(x => x.memberId == newMember.memberId);
            if (data != null)
            {
                data.name = newMember.name;
                data.surname = newMember.surname;
                data.mail = newMember.mail;
                data.number = newMember.number;
                data.adress = newMember.adress;
                data.identityNo = newMember.identityNo;
                data.username = newMember.username;
                data.password = newMember.password;
                _db.SaveChanges();
                return Json(new { success = true, responseText = "Güncellendi!" }, JsonRequestBehavior.AllowGet);
            }
            return Json(new { success = false, responseText = "Hata!" }, JsonRequestBehavior.AllowGet);
        }
    }
}