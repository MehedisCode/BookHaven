using System.ComponentModel.DataAnnotations;

namespace BookHaven.API.Models;

public class Category
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(20)]
    public string Name { get; set; } = string.Empty;

    [Range(1, 100)]
    public int DisplayOrder { get; set; }
}