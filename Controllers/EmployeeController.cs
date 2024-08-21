using EmployeeMangementSystem.Context;
using EmployeeMangementSystem.Models;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeMangementSystem.Controllers
{
    public class EmployeeController : Controller
    {
        private readonly EmployeeContext _employeeContext;
        public EmployeeController(EmployeeContext employeeContext)
        {
            this._employeeContext = employeeContext;
        }
        public IActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public JsonResult AddEmployee([FromBody] Employee employee)
        {
            var emp = new Employee()
            {
                name = employee.name,
                phoneNumber = employee.phoneNumber,
                email = employee.email,
                password = employee.password,
                State = employee.State,
                city = employee.city
            };
            _employeeContext.Employees.Add(emp);
            _employeeContext.SaveChanges();
            return Json(emp);
        }

        [HttpGet]
        public JsonResult GetEmployeesData()
        {
            var employeesData = _employeeContext.Employees.ToList();
            return Json(employeesData);
        }

     
        [HttpGet]
        public JsonResult GetEmployeeById(int id)
        {
            var employee = _employeeContext.Employees.FirstOrDefault(e => e.id == id);
            return Json(employee);
           
        }


        [HttpPatch]
        public JsonResult UpdateEmployeeData([FromBody] Employee employee)
        {
            var existingEmployee = _employeeContext.Employees.FirstOrDefault(e => e.id == employee.id);
            if (existingEmployee != null)
            {
                existingEmployee.name = employee.name;
                existingEmployee.phoneNumber = employee.phoneNumber;
                existingEmployee.email = employee.email;
                existingEmployee.password = employee.password;
                existingEmployee.State = employee.State;
                existingEmployee.city = employee.city;

                _employeeContext.SaveChanges();
                return Json(new { success = true, message = "Employee updated successfully" });
            }
            else
            {
                return Json(new { success = false, message = "Employee not found" });
            }
        }
    
        [HttpDelete]
        public JsonResult DeleteEmployeesData(int id)
        {

            var deleteData = _employeeContext.Employees.Where(e => e.id == id).SingleOrDefault();
            _employeeContext.Employees.Remove(deleteData);
            _employeeContext.SaveChanges();
            return Json(deleteData);

        }
    }
}
