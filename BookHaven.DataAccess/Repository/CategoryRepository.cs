using BookHaven.DataAccess.Data;
using BookHaven.DataAccess.Repository.Interfaces;
using BookHaven.Models;

namespace BookHaven.DataAccess.Repository;

public class CategoryRepository : Repository<Category>, ICategoryRepository
{
    private readonly ApplicationDbContext _context;

    public CategoryRepository(ApplicationDbContext context) : base(context)
    {
        _context = context;
    }

    public void Update(Category obj)
    {
        _context.Category.Update(obj);
    }
}