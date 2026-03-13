using Microsoft.EntityFrameworkCore;
using BookHaven.Models;

namespace BookHaven.DataAccess.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<Category> Category { get; set; }
    public DbSet<Product> Product { get; set; }
}
 