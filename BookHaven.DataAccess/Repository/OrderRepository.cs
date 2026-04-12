using BookHaven.DataAccess.Data;
using BookHaven.DataAccess.Repository.Interfaces;
using BookHaven.Models;

namespace BookHaven.DataAccess.Repository;

public class OrderRepository : Repository<Order>, IOrderRepository
{
    private readonly ApplicationDbContext _context;

    public OrderRepository(ApplicationDbContext context) : base(context)
    {
        _context = context;
    }
}
