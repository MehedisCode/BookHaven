using BookHaven.Models;

namespace BookHaven.DataAccess.Repository.Interfaces;

public interface IProductRepository : IRepository<Product>
{
    void Update(Product obj);
}