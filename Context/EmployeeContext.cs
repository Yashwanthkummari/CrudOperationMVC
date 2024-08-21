using EmployeeMangementSystem.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeMangementSystem.Context
{
    public class EmployeeContext:DbContext
    {
        public EmployeeContext(DbContextOptions dbContextOptions):base(dbContextOptions) { }

        public DbSet<Employee> Employees { get; set; }
    }
}
