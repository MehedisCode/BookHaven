using BookHaven.DataAccess.Repository.Interfaces;
using BookHaven.Models;
using Microsoft.AspNetCore.Mvc;

namespace BookHaven.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;

    public ProductController(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllAsync()
    {
        var categoryList = await _unitOfWork.Product.GetAllAsync();
        return Ok(categoryList);
    }
    
    
    [HttpPost]
    public async Task<IActionResult> Create(Product category)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        
        _unitOfWork.Product.Add(category);
        await _unitOfWork.SaveAsync();

        return Ok(category);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var data = await _unitOfWork.Product.GetAsync(e => e.Id == id);

        if (data == null)
            return NotFound();
        
        _unitOfWork.Product.Remove(data);
        await _unitOfWork.SaveAsync();

        return Ok(new { message = "Deleted successfully" });
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Product obj)
    {
        if (id != obj.Id)
            return BadRequest();

        var data = await _unitOfWork.Product.GetAsync(e => e.Id == id);

        if (data == null)
            return NotFound();

        data.Id = obj.Id;
        data.Title = obj.Title;
        data.Description = obj.Description;
        data.Author = obj.Author;
        data.ISBN = obj.ISBN;
        data.ListPrice = obj.ListPrice;
        data.Price = obj.Price;
        data.Price50 = obj.Price50;
        data.Price100 = obj.Price100;

        await _unitOfWork.SaveAsync();
        return Ok(obj);
    }
}