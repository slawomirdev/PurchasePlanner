using Microsoft.EntityFrameworkCore;

namespace Backend.EFCore
{
    public class EF_DataContext : DbContext
    {
        public EF_DataContext(DbContextOptions<EF_DataContext> options) : base (options) { }

        public DbSet<product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }
    }

}
