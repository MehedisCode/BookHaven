using System.Security.Claims;
using BookHaven.API.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace BookHaven.API.Controllers;

[ApiController]
[Route("api/profile")]
[Authorize]
public class ProfileController : ControllerBase
{
    private readonly UserManager<IdentityUser> _userManager;

    public ProfileController(UserManager<IdentityUser> userManager)
    {
        _userManager = userManager;
    }

    private string? GetCurrentUserId()
    {
        return User.FindFirstValue(ClaimTypes.NameIdentifier)
            ?? User.FindFirstValue("sub");
    }

    [HttpGet]
    public async Task<IActionResult> GetProfile()
    {
        var userId = GetCurrentUserId();
        if (string.IsNullOrWhiteSpace(userId))
        {
            return Unauthorized(new { message = "User ID was not found in token." });
        }

        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
        {
            return NotFound(new { message = "User not found." });
        }

        var roles = await _userManager.GetRolesAsync(user);
        var role = roles.FirstOrDefault() ?? "Customer";

        return Ok(new
        {
            email = user.Email ?? string.Empty,
            userName = user.UserName ?? string.Empty,
            createdAt = (DateTime?)null,
            role
        });
    }

    [HttpPut("update-name")]
    public async Task<IActionResult> UpdateName([FromBody] UpdateNameDto dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(new
            {
                message = "Invalid username.",
                errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage)
            });
        }

        var userId = GetCurrentUserId();
        if (string.IsNullOrWhiteSpace(userId))
        {
            return Unauthorized(new { message = "User ID was not found in token." });
        }

        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
        {
            return NotFound(new { message = "User not found." });
        }

        var normalizedName = dto.UserName.Trim();
        var existingUser = await _userManager.FindByNameAsync(normalizedName);
        if (existingUser != null && existingUser.Id != userId)
        {
            return BadRequest(new { message = "This username is already taken." });
        }

        user.UserName = normalizedName;
        var result = await _userManager.UpdateAsync(user);
        if (!result.Succeeded)
        {
            return BadRequest(new
            {
                message = "Failed to update username.",
                errors = result.Errors.Select(e => e.Description)
            });
        }

        return Ok(new { message = "Username updated successfully.", userName = user.UserName });
    }

    [HttpPut("change-password")]
    public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(new
            {
                message = "Invalid password payload.",
                errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage)
            });
        }

        if (dto.CurrentPassword == dto.NewPassword)
        {
            return BadRequest(new { message = "New password must be different from current password." });
        }

        var userId = GetCurrentUserId();
        if (string.IsNullOrWhiteSpace(userId))
        {
            return Unauthorized(new { message = "User ID was not found in token." });
        }

        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
        {
            return NotFound(new { message = "User not found." });
        }

        var result = await _userManager.ChangePasswordAsync(user, dto.CurrentPassword, dto.NewPassword);
        if (!result.Succeeded)
        {
            return BadRequest(new
            {
                message = "Failed to change password.",
                errors = result.Errors.Select(e => e.Description)
            });
        }

        return Ok(new { message = "Password changed successfully." });
    }
}
