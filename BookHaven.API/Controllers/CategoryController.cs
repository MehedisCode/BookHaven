using BookHaven.Models;
using BookHaven.DataAccess.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookHaven.API.Controllers;

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
        var categoryList = await _context.Category.ToListAsync();
        return Ok(categoryList);
    }

    [HttpPost]
    public async Task<IActionResult> Create(Category category)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        await _context.Category.AddAsync(category);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetData), new { id = category.Id }, category);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var data = await _context.Category.FindAsync(id);

        if (data == null)
            return NotFound();

        _context.Category.Remove(data);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Deleted successfully" });
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Category obj)
    {
        if (id != obj.Id)
            return BadRequest();

        var data = await _context.Category.FindAsync(id);

        if (data == null)
            return NotFound();

        data.Name = obj.Name;
        data.DisplayOrder = obj.DisplayOrder;

        await _context.SaveChangesAsync();

        return Ok(data);
    }
}