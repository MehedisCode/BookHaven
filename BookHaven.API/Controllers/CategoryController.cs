using System.Threading.Tasks;
using BookHaven.Models;
using BookHaven.DataAccess.Repository.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BookHaven.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoryController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;

    public CategoryController(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    [HttpGet]
    public async Task<IActionResult> GetData()
    {
        var categoryList = await _unitOfWork.Category.GetAllAsync();
        return Ok(categoryList);
    }

    [HttpPost]
    public async Task<IActionResult> Create(Category category)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        
        _unitOfWork.Category.Add(category);
        await _unitOfWork.SaveAsync();

        return CreatedAtAction(nameof(GetData), new { id = category.Id }, category);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var data = await _unitOfWork.Category.GetAsync(e => e.Id == id);

        if (data == null)
            return NotFound();
        
        _unitOfWork.Category.Remove(data);
        await _unitOfWork.SaveAsync();

        return Ok(new { message = "Deleted successfully" });
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Category obj)
    {
        if (id != obj.Id)
            return BadRequest();

        var data = await _unitOfWork.Category.GetAsync(e => e.Id == id);

        if (data == null)
            return NotFound();
        
        data.Name = obj.Name;
        data.DisplayOrder = obj.DisplayOrder;
        await _unitOfWork.SaveAsync();
        
        return Ok(obj);
    }
}