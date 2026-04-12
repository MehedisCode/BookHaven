using BookHaven.Models;

namespace BookHaven.DataAccess.Repository.Interfaces;

public interface ICartRepository : IRepository<Cart>
{
    Task<Cart?> GetByUserIdWithItemsAsync(string userId);

    Task<CartItem?> GetItemInCartAsync(int cartId, int cartItemId);

    Task<CartItem?> GetCartItemOwnedByUserAsync(string userId, int cartItemId);

    void RemoveCartItem(CartItem item);
    void ClearCart(Cart cart);
}
