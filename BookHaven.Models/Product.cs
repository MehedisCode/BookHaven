using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookHaven.Models;

public class Product
{
    [Key]
    public int Id { get; set; }
    [Required]
    public string Title { get; set; }
    public string Description { get; set; }
    [Required]
    public string ISBN { get; set; }
    [Required]
    public string Author { get; set; }
    [Required]
    [Display(Name = "List Price")]
    public double ListPrice { get; set; }
    
    [Required]
    public double Price { get; set; } // 1-49
    [Required]
    public double Price50 { get; set; } // 50 - 99
    [Required]
    public double Price100 { get; set; } // 100+
    
    public int? CategoryId { get; set; }
    [ForeignKey("CategoryId")]
    public Category? Category { get; set; }
    
    public string? ImageUrl { get; set; }
}
