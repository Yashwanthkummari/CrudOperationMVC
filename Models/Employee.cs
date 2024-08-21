using System.ComponentModel.DataAnnotations;

namespace EmployeeMangementSystem.Models
{
    public class Employee
    {
        [Key]
        public int id { get; set; }
        public string name { get; set; }
        public string phoneNumber { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public string State { get; set; }
        public string city { get; set; }


    }
}
