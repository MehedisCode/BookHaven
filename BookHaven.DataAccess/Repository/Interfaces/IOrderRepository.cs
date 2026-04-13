using BookHaven.Models;

namespace BookHaven.DataAccess.Repository.Interfaces;

public interface IOrderRepository : IRepository<Order>
{
    Task<List<Order>> GetOrdersByUserIdAsync(string userId);
}
