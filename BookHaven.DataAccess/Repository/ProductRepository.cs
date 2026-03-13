using BookHaven.DataAccess.Data;
using BookHaven.DataAccess.Repository.Interfaces;
using BookHaven.Models;

namespace BookHaven.DataAccess.Repository;

public class ProductRepository : Repository<Product>, IProductRepository
{
    private readonly ApplicationDbContext _context;
    
    public ProductRepository(ApplicationDbContext context) : base(context)
    {
        _context = context;
    }

    public void Update(Product obj)
    {
        _context.Product.Update(obj);
    }
}