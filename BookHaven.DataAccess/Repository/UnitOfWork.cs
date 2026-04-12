using BookHaven.DataAccess.Data;
using BookHaven.DataAccess.Repository.Interfaces;

namespace BookHaven.DataAccess.Repository;

public class UnitOfWork : IUnitOfWork
{
    public ICategoryRepository Category { get; }
    public IProductRepository Product { get; }
    public ICartRepository Cart { get; }
    private readonly ApplicationDbContext _context;

    public UnitOfWork(ApplicationDbContext context)
    {
        _context = context;
        Category = new CategoryRepository(_context);
        Product = new ProductRepository(_context);
        Cart = new CartRepository(_context);
    }
     
    public async Task SaveAsync()
    {
        await _context.SaveChangesAsync();
    }
}