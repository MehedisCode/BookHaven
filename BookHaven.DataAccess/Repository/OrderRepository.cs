using BookHaven.DataAccess.Data;
using BookHaven.DataAccess.Repository.Interfaces;
using BookHaven.Models;
using Microsoft.EntityFrameworkCore;

namespace BookHaven.DataAccess.Repository;

public class OrderRepository : Repository<Order>, IOrderRepository
{
    private readonly ApplicationDbContext _context;

    public OrderRepository(ApplicationDbContext context) : base(context)
    {
        _context = context;
    }

    public async Task<List<Order>> GetOrdersByUserIdAsync(string userId)
    {
        return await _context.Order
            .Include(o => o.OrderItems)
            .ThenInclude(oi => oi.Product)
            .Where(o => o.UserId == userId)
            .OrderByDescending(o => o.CreatedAt)
            .ToListAsync();
    }
}
