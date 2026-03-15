using System.Linq.Expressions;
using BookHaven.DataAccess.Data;
using BookHaven.DataAccess.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BookHaven.DataAccess.Repository;

public class Repository<T> : IRepository<T> where T : class
{
    private readonly ApplicationDbContext _context;
    private readonly DbSet<T> _dbSet;
    
    protected Repository(ApplicationDbContext context)
    {
        _context = context;
        _dbSet = _context.Set<T>();
    }
    
    public async Task<List<T>> GetAllAsync(string? includeProperties = null)
    {
        IQueryable<T> query = _dbSet;  

        if (includeProperties != null)
        {
            foreach (var property in includeProperties
                         .Split(',', StringSplitOptions.RemoveEmptyEntries))
            {
                query = query.Include(property);  
            }
        }

        return await query.ToListAsync();
    }

    public async Task<T?> GetAsync(Expression<Func<T, bool>> filter)
    {
        return await _dbSet.FirstOrDefaultAsync(filter);
    }

    public void Add(T entity)
    {
        _dbSet.Add(entity);
    }

    public void Remove(T entity)
    {
        _dbSet.Remove(entity);
    }

    public void RemoveRange(IEnumerable<T> entity)
    {
        _dbSet.RemoveRange(entity);
    }
}