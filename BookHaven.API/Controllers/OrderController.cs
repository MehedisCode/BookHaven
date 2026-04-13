using System.Security.Claims;
using BookHaven.DataAccess.Repository.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BookHaven.API.Controllers;

[ApiController]
[Route("api/orders")]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class OrderController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;

    public OrderController(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    private string? GetUserId()
    {
        return User.FindFirstValue("sub");
    }

    [HttpGet]
    public async Task<IActionResult> GetUserOrders()
    {
        var userId = GetUserId();
        if (string.IsNullOrEmpty(userId))
            return Unauthorized();

        var orders = await _unitOfWork.Order.GetOrdersByUserIdAsync(userId);
        
        var response = orders.Select(o => new 
        {
            Id = o.Id,
            TotalAmount = o.TotalAmount,
            Status = o.Status,
            CreatedAt = o.CreatedAt,
            Items = o.OrderItems.Select(oi => new 
            {
                Id = oi.Id,
                ProductId = oi.ProductId,
                ProductTitle = oi.Product?.Title,
                Quantity = oi.Quantity,
                Price = oi.Price
            })
        });

        return Ok(response);
    }
}
