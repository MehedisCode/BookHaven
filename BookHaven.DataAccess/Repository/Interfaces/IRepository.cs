using System.Linq.Expressions;

namespace BookHaven.DataAccess.Repository.Interfaces;

public interface IRepository<T>  where T : class 
{
    Task<List<T>> GetAllAsync(string? includeProperties = null);
    Task<T?> GetAsync(Expression<Func<T, bool>> filter);
    void Add(T entity);
    void Remove(T entity);
    void RemoveRange(IEnumerable<T> entity);
}