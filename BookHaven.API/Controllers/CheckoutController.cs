using System.Security.Claims;
using BookHaven.DataAccess.Repository.Interfaces;
using BookHaven.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BookHaven.API.Controllers;

[ApiController]
[Route("api/checkout")]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class CheckoutController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;

    public CheckoutController(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    private string? GetUserId()
    {
        return User.FindFirstValue("sub");
    }

    [HttpPost]
    public async Task<IActionResult> Checkout()
    {
        var userId = GetUserId();
        if (string.IsNullOrEmpty(userId))
            return Unauthorized();

        var cart = await _unitOfWork.Cart.GetByUserIdWithItemsAsync(userId);
        
        if (cart == null || cart.Items.Count == 0)
        {
            return BadRequest(new { message = "Cart is empty." });
        }

        var totalAmount = cart.Items.Sum(i => i.Price * i.Quantity);

        var order = new Order
        {
            UserId = userId,
            TotalAmount = totalAmount,
            Status = "Pending",
            CreatedAt = DateTime.UtcNow
        };

        foreach (var item in cart.Items)
        {
            order.OrderItems.Add(new OrderItem
            {
                ProductId = item.ProductId,
                Quantity = item.Quantity,
                Price = item.Price
            });
        }

        _unitOfWork.Order.Add(order);
        
        _unitOfWork.Cart.ClearCart(cart);

        await _unitOfWork.SaveAsync();

        return Ok(new { message = "Order successfully created", orderId = order.Id });
    }
}
