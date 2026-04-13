using System.ComponentModel.DataAnnotations;

namespace BookHaven.API.DTOs;

public class UpdateNameDto
{
    [Required]
    [StringLength(100, MinimumLength = 2)]
    public string UserName { get; set; } = string.Empty;
}

public class ChangePasswordDto
{
    [Required]
    public string CurrentPassword { get; set; } = string.Empty;

    [Required]
    [StringLength(100, MinimumLength = 6)]
    public string NewPassword { get; set; } = string.Empty;
}
