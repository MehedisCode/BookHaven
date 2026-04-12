using System.ComponentModel.DataAnnotations;

namespace BookHaven.Models;

public class Cart
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string UserId { get; set; } = string.Empty;

    public ICollection<CartItem> Items { get; set; } = new List<CartItem>();
}
