using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ProjectController.Models;


namespace ProjectController.Controllers
{

    public class AdminController : Controller
    {
        // GET: Admin
        public ActionResult Index()
        {
            return View();
        }
        public Settings Setting = new Settings();
        private readonly takip2Entities _db = new takip2Entities();
        public JsonResult GetAllProjects()
        {

            var data = _db.projects;
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetGuncelProjects()
        {

            var data = _db.projects.Where(x => x.statuId == 1).Select(x => new
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

            //Include("member").Include("employee") .Include("category");

            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetIptalProjects()
        {
            var data = _db.projects.Where(x => x.statuId == 2).Select(x => new
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
                saleId = x.saleId
            }
            );

            //Include("member").Include("employee") .Include("category");

            return Json(data, JsonRequestBehavior.AllowGet);

        }

        public JsonResult GetBitenProjects()
        {
            var data = _db.projects.Where(x => x.statuId == 4).Select(x => new
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
                saleId = x.saleId
            }
            );

            //Include("member").Include("employee") .Include("category");

            return Json(data, JsonRequestBehavior.AllowGet);

        }
        //Select Option için
        public JsonResult GetStatus()
        {

            var data = _db.status;
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public void AddProject(project newProject)
        {
            employee emp = _db.employees.SingleOrDefault(x => x.empId == newProject.employeerId);
            bill newBill = new bill();
            newBill.name = emp.name;
            newBill.dateSell = DateTime.Now;
            _db.bills.Add(newBill);
            _db.SaveChanges();

            bill bil = _db.bills.OrderByDescending(x => x.billId).FirstOrDefault();
            sale newSale = new sale();
            newSale.IsPaidAll = false;
            newSale.billId = bil.billId;
            _db.sales.Add(newSale);
            _db.SaveChanges();

            sale sal = _db.sales.OrderByDescending(x => x.saleId).FirstOrDefault();
            newProject.percentStatu = 0;
            newProject.saleId = sal.saleId;
            _db.projects.Add(newProject);
            _db.SaveChanges();

        }
        //Select Option için sadece 2 sütun
        public JsonResult GetEmployees()
        {

            var data = _db.employees.ToList().Select(x => new employee()
            {
                empId = x.empId,
                name = x.name + " " + x.surname
            }
            );
            return Json(data, JsonRequestBehavior.AllowGet);
        }
        //Select Option için
        public JsonResult GetCategories()
        {
            var data = _db.categories;
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        //Select Option için 2 sütun
        public JsonResult GetMember()
        {

            var data = _db.members.ToList().Select(x => new member()
            {
                memberId = x.memberId,
                name = x.name + " " + x.surname
            }
            );
            return Json(data, JsonRequestBehavior.AllowGet);
        }
        //Tüm üyelerin özellikleri
        public JsonResult GetAllMembers()
        {
            return Json(_db.members, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public void DeleteMember(int id)
        {
            member member = _db.members.FirstOrDefault(x => x.memberId == id);
            _db.members.Remove(member);
            _db.SaveChanges();
        }
        [HttpPost]
        public void DeleteCategory(int id)
        {
            category cat = _db.categories.SingleOrDefault(x => x.categoryId == id);
            _db.categories.Remove(cat);
            _db.SaveChanges();

        }
        public JsonResult GetRolesForMember()
        {
            return Json(_db.roles.Where(x => x.roleId == 2 || x.roleId == 3), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult AddMember(member newMember)
        {
            newMember.registerDay = DateTime.Now;
            _db.members.Add(newMember);
            _db.SaveChanges();
            return Json(new { success = true, responseText = "Eklendi!" }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public void AddCategory(category newCategory)
        {
            _db.categories.Add(newCategory);
            _db.SaveChanges();
        }

        [HttpPost]
        public JsonResult AddCategoryValue(categoryValue newCategoryValue)
        {

            _db.categoryValues.Add(newCategoryValue);
            _db.SaveChanges();
            return Json(new { success = true, responseText = "Eklendi!" }, JsonRequestBehavior.AllowGet);

        }


        public JsonResult GetCategoryValue(int? id)
        {
            var data = _db.categoryValues.Where(x => x.categoryId == id);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public void UpdateCategoryValue(categoryValue newCategoryValue)
        {
            var data = _db.categoryValues.SingleOrDefault(x => x.categoryValueId == newCategoryValue.categoryValueId);
            if (data != null) data.name = newCategoryValue.name;
            _db.SaveChanges();
        }

        [HttpPost]
        public JsonResult UpdateCategory(category newCategory)
        {
            var data = _db.categories.SingleOrDefault(x => x.categoryId == newCategory.categoryId);
            if (data != null)
            {

                data.categoryName = newCategory.categoryName;

                _db.SaveChanges();
                return Json(new { success = true, responseText = "Güncellendi!" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, responseText = "Hata,güncellenemedi!" }, JsonRequestBehavior.AllowGet);
            }

        }

        [HttpPost]
        public JsonResult DeleteProject(int id)
        {
            project project = _db.projects.FirstOrDefault(x => x.projectId == id);
            if (project != null)
            {
                _db.projects.Remove(project);
                _db.SaveChanges();
                return Json(new { success = true, responseText = "Silindi!" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, responseText = "Hata,Silinemedi!" }, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetMemberValue(int? id)
        {
            var data = _db.members.FirstOrDefault(x => x.memberId == id);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult UpdateMember(member newMember)
        {
            var data = _db.members.FirstOrDefault(x => x.memberId == newMember.memberId);
            if (data != null)
            {
                data.name = newMember.name;
                data.surname = newMember.surname;
                data.mail = newMember.mail;
                data.number = newMember.number;
                data.roleId = newMember.roleId;
                data.adress = newMember.adress;
                data.identityNo = newMember.identityNo;
                data.username = newMember.username;
                data.password = newMember.password;
                _db.SaveChanges();
                return Json(new { success = true, responseText = "Güncellendi!" }, JsonRequestBehavior.AllowGet);
            }
            return Json(new { success = false, responseText = "Hata!" }, JsonRequestBehavior.AllowGet);
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
        public JsonResult GetProject(int? id)
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
        public string GetFullName(string name, string surname)
        {
            if (surname == null)
                return name;
            return name + " " + surname;
        }
        public JsonResult GetBill(int? id)
        {
            var data = _db.bills.FirstOrDefault(x => x.billId == id);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetPictures(int? id)
        {
            var data = _db.images.Where(x => x.projectId == id);
            return Json(data, JsonRequestBehavior.AllowGet);

        }

        [HttpPost]
        public JsonResult UpdateProject(project newProject)
        {
            project data = _db.projects.SingleOrDefault(x => x.projectId == newProject.projectId);
            if (data != null)
            {
                data.projectName = newProject.projectName;
                data.description = newProject.description;
                data.employeerId = newProject.employeerId;
                data.memberId = newProject.memberId;
                data.exceptedFinish = newProject.exceptedFinish;
                data.startDate = newProject.startDate;
                data.extra = newProject.extra;
                data.percentStatu = newProject.percentStatu;
                data.statuId = newProject.statuId;
                data.categoryId = newProject.categoryId;
                data.finishDate = newProject.finishDate;
                _db.SaveChanges();
                return Json(new { success = true, responseText = "Güncellendi!" }, JsonRequestBehavior.AllowGet);
            }
            return Json(new { success = false, responseText = "Hata!" }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult UpdateSaleAll(int saleId, int price, int hirepurchase, string name, string surname, string description, int taxno, int billId)
        {
            sale neWSale = _db.sales.SingleOrDefault(x => x.saleId == saleId);
            if (neWSale != null)
            {
                neWSale.price = price;
                neWSale.hirepurchase = hirepurchase;
                _db.SaveChanges();

            }
            bill newBill = _db.bills.SingleOrDefault(x => x.billId == billId);
            if (newBill != null)
            {
                newBill.name = name;
                newBill.surname = surname;
                newBill.description = description;
                newBill.taxno = taxno;
                _db.SaveChanges();
            }

            return Json(new { success = true, responseText = "Güncellendi!" }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult UpdateProjectValue(categoryValueProject[] catV)
        {
            foreach (var y in catV)
            {
                categoryValueProject cvp = _db.categoryValueProjects.SingleOrDefault(x => x.valueId == y.valueId);
                cvp.statu = y.statu;
                _db.SaveChanges();
            }
            return Json(new { success = true, responseText = "Güncellendi!" }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult UploadPictures()
        {
            var a = Request.Files["file"];
            var b = Request.Files["data"];
            return Json(new { success = true, responseText = "Yüklendi!" }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult ControlUsername(member member)
        {
            var data = _db.members.SingleOrDefault(x => x.username == member.username);
            if (data != null)
            {
                return Json(true, JsonRequestBehavior.AllowGet);
            }
            return Json(false, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult ControlMail(member member)
        {
            var data = _db.members.SingleOrDefault(x => x.mail == member.mail);
            if (data != null)
            {
                return Json(true, JsonRequestBehavior.AllowGet);
            }
            return Json(false, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ProfileInfo(int? id)
        {
            var data = _db.employees.FirstOrDefault(x => x.empId == id);
            return Json(data, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult UpdateProfile(employee newEmp)
        {
            var data = _db.employees.FirstOrDefault(x => x.empId == newEmp.empId);
            if (data != null)
            {
                data.name = newEmp.name;
                data.surname = newEmp.surname;
                data.mail = newEmp.mail;
                data.number = newEmp.number;
                data.adress = newEmp.adress;
                data.username = newEmp.username;
                data.password = newEmp.password;
                _db.SaveChanges();
                return Json(new { success = true, responseText = "Güncellendi!" }, JsonRequestBehavior.AllowGet);
            }
            return Json(new { success = false, responseText = "Hata!" }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetReports()
        {
            List<Int32> data = new List<Int32>();
            data.Add(_db.projects.Count());
            data.Add(_db.projects.Where(x => x.statuId == 1).Count());
            data.Add(_db.projects.Where(x => x.statuId == 2).Count());
            data.Add(_db.projects.Where(x => x.statuId == 4).Count());
            return Json(data, JsonRequestBehavior.AllowGet);
        }
    }
}
