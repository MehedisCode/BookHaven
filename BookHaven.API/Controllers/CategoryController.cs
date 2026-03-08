using BookHaven.API.Data;
using BookHaven.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class CategoryController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    public CategoryController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetData()
    {
        var categroyList = await _context.Category.ToListAsync();
        return Ok(categroyList);
    }

    [HttpPost]
    public async Task<IActionResult> Create(Category category)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            await _context.AddAsync(category);
            await _context.SaveChangesAsync();
            System.Console.WriteLine("Added Successfully");
            return Ok(category);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Error creating category", error = ex.Message });
        }
    }
}