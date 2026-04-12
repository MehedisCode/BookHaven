namespace BookHaven.API.DTOs;

public class AddToCartDto
{
    public int ProductId { get; set; }
    public int Quantity { get; set; }
}

public class UpdateCartItemDto
{
    public int CartItemId { get; set; }
    public int Quantity { get; set; }
}

public class CartItemResponseDto
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public string ProductTitle { get; set; } = string.Empty;
    public int Quantity { get; set; }
    public double Price { get; set; }
    public double LineTotal { get; set; }
}

public class CartResponseDto
{
    public int CartId { get; set; }
    public IReadOnlyList<CartItemResponseDto> Items { get; set; } = Array.Empty<CartItemResponseDto>();
    public double Subtotal { get; set; }
}
