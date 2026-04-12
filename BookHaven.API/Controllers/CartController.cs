using System.Security.Claims;
using BookHaven.API.DTOs;
using BookHaven.DataAccess.Repository.Interfaces;
using BookHaven.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;

namespace BookHaven.API.Controllers;

[ApiController]
[Route("api/cart")]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class CartController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;

    public CartController(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    private string? GetUserId()
    {
        return User.FindFirstValue("sub");
    }

    private static CartResponseDto MapCart(Cart cart)
    {
        var items = cart.Items.Select(i => new CartItemResponseDto
        {
            Id = i.Id,
            ProductId = i.ProductId,
            ProductTitle = i.Product.Title,
            Quantity = i.Quantity,
            Price = i.Price,
            LineTotal = i.Price * i.Quantity
        }).ToList();

        return new CartResponseDto
        {
            CartId = cart.Id,
            Items = items,
            Subtotal = items.Sum(x => x.LineTotal)
        };
    }

    private async Task<Cart> GetOrCreateCartAsync(string userId)
    {
        var cart = await _unitOfWork.Cart.GetByUserIdWithItemsAsync(userId);
        if (cart != null)
            return cart;

        cart = new Cart { UserId = userId };
        _unitOfWork.Cart.Add(cart);
        await _unitOfWork.SaveAsync();

        return await _unitOfWork.Cart.GetByUserIdWithItemsAsync(userId)
               ?? cart;
    }

    [HttpPost("add")]
    public async Task<IActionResult> Add([FromBody] AddToCartDto dto)
    {
        var userId = GetUserId();
        if (string.IsNullOrEmpty(userId))
            return Unauthorized();

        if (dto.ProductId <= 0)
            return BadRequest("Invalid product.");

        if (dto.Quantity < 1)
            return BadRequest("Quantity must be at least 1.");

        var product = await _unitOfWork.Product.GetAsync(p => p.Id == dto.ProductId);
        if (product == null)
            return NotFound("Product not found.");

        var cart = await GetOrCreateCartAsync(userId);

        var existing = cart.Items.FirstOrDefault(i => i.ProductId == dto.ProductId);
        if (existing != null)
        {
            existing.Quantity += dto.Quantity;
        }
        else
        {
            cart.Items.Add(new CartItem
            {
                CartId = cart.Id,
                ProductId = dto.ProductId,
                Quantity = dto.Quantity,
                Price = product.Price
            });
        }

        await _unitOfWork.SaveAsync();

        cart = await _unitOfWork.Cart.GetByUserIdWithItemsAsync(userId)
               ?? cart;
        return Ok(MapCart(cart));
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var userId = GetUserId();
        if (string.IsNullOrEmpty(userId))
            return Unauthorized("UserId not found in token");

        var cart = await _unitOfWork.Cart.GetByUserIdWithItemsAsync(userId);
        if (cart == null)
        {
            cart = await GetOrCreateCartAsync(userId);
        }

        return Ok(MapCart(cart));
    }

    [HttpPut("update")]
    public async Task<IActionResult> Update([FromBody] UpdateCartItemDto dto)
    {
        var userId = GetUserId();
        if (string.IsNullOrEmpty(userId))
            return Unauthorized();

        if (dto.Quantity < 1)
            return BadRequest("Quantity must be at least 1.");

        var item = await _unitOfWork.Cart.GetCartItemOwnedByUserAsync(userId, dto.CartItemId);
        if (item == null)
            return NotFound("Cart item not found.");

        item.Quantity = dto.Quantity;
        await _unitOfWork.SaveAsync();

        var cart = await _unitOfWork.Cart.GetByUserIdWithItemsAsync(userId);
        if (cart == null)
            return NotFound("Cart not found.");

        return Ok(MapCart(cart));
    }

    [HttpDelete("remove/{id:int}")]
    public async Task<IActionResult> Remove(int id)
    {
        var userId = GetUserId();
        if (string.IsNullOrEmpty(userId))
            return Unauthorized();

        var item = await _unitOfWork.Cart.GetCartItemOwnedByUserAsync(userId, id);
        if (item == null)
            return NotFound("Cart item not found.");

        _unitOfWork.Cart.RemoveCartItem(item);
        await _unitOfWork.SaveAsync();

        var updated = await _unitOfWork.Cart.GetByUserIdWithItemsAsync(userId);
        if (updated == null)
            return NotFound("Cart not found.");

        return Ok(MapCart(updated));
    }
}
