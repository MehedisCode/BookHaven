using System.Threading.Tasks;
using BookHaven.Models;

namespace BookHaven.DataAccess.Repository.Interfaces;

public interface ICategoryRepository : IRepository<Category>
{
    void Update(Category obj);
    Task SaveAsync();
}