using System.Threading.Tasks;
using BookHaven.Models;
using BookHaven.DataAccess.Repository.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BookHaven.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoryController : ControllerBase
{
    private readonly ICategoryRepository _categoryRepository;

    public CategoryController(ICategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetData()
    {
        var categoryList = await _categoryRepository.GetAllAsync();
        return Ok(categoryList);
    }

    [HttpPost]
    public async Task<IActionResult> Create(Category category)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        
        _categoryRepository.Add(category);
        await _categoryRepository.SaveAsync();

        return CreatedAtAction(nameof(GetData), new { id = category.Id }, category);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var data = await _categoryRepository.GetAsync(e => e.Id == id);

        if (data == null)
            return NotFound();
        
        _categoryRepository.Remove(data);
        await _categoryRepository.SaveAsync();

        return Ok(new { message = "Deleted successfully" });
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Category obj)
    {
        if (id != obj.Id)
            return BadRequest();

        var data = await _categoryRepository.GetAsync(e => e.Id == id);

        if (data == null)
            return NotFound();

        _categoryRepository.Update(obj);
        await _categoryRepository.SaveAsync();

        return Ok(obj);
    }
}