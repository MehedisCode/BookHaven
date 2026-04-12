using BookHaven.DataAccess.Data;
using BookHaven.DataAccess.Repository.Interfaces;
using BookHaven.Models;
using Microsoft.EntityFrameworkCore;

namespace BookHaven.DataAccess.Repository;

public class CartRepository : Repository<Cart>, ICartRepository
{
    private readonly ApplicationDbContext _context;

    public CartRepository(ApplicationDbContext context) : base(context)
    {
        _context = context;
    }

    public async Task<Cart?> GetByUserIdWithItemsAsync(string userId)
    {
        return await _context.Cart
            .Include(c => c.Items)
            .ThenInclude(i => i.Product)
            .FirstOrDefaultAsync(c => c.UserId == userId);
    }

    public async Task<CartItem?> GetItemInCartAsync(int cartId, int cartItemId)
    {
        return await _context.CartItem
            .FirstOrDefaultAsync(i => i.Id == cartItemId && i.CartId == cartId);
    }

    public async Task<CartItem?> GetCartItemOwnedByUserAsync(string userId, int cartItemId)
    {
        return await _context.CartItem
            .FirstOrDefaultAsync(ci =>
                ci.Id == cartItemId && ci.Cart.UserId == userId);
    }

    public void RemoveCartItem(CartItem item)
    {
        _context.CartItem.Remove(item);
    }

    public void ClearCart(Cart cart)
    {
        _context.CartItem.RemoveRange(cart.Items);
    }
}
