using BookHaven.DataAccess.Repository.Interfaces;
using BookHaven.Models;
using Microsoft.AspNetCore.Mvc;

namespace BookHaven.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IWebHostEnvironment _webHostEnvironment;

    public ProductController(IUnitOfWork unitOfWork, IWebHostEnvironment webHostEnvironment)
    {
        _unitOfWork = unitOfWork;
        _webHostEnvironment = webHostEnvironment;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllAsync()
    {
        var categoryList = await _unitOfWork.Product.GetAllAsync("Category");
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
        data.CategoryId = obj.CategoryId;
        data.ImageUrl = obj.ImageUrl;

        await _unitOfWork.SaveAsync();
        return Ok(obj);
    }
    
    [HttpPost("upload-product-image")]
    public async Task<IActionResult> UploadImage(IFormFile file, [FromQuery] string? oldImageUrl)
    {
        Console.WriteLine($"Old image URL received: {oldImageUrl}"); // 👈 debug check

        if (file == null || file.Length == 0)
            return BadRequest("No file uploaded.");

        if (!string.IsNullOrEmpty(oldImageUrl))
        {
            string oldFilePath = Path.Combine(_webHostEnvironment.WebRootPath, oldImageUrl.TrimStart('/'));
            Console.WriteLine($"Attempting to delete: {oldFilePath}"); // 👈 debug check
            if (System.IO.File.Exists(oldFilePath))
            {
                System.IO.File.Delete(oldFilePath);
                Console.WriteLine("Old image deleted."); // 👈 debug check
            }
            else
            {
                Console.WriteLine("Old file not found at path."); // 👈 debug check
            }
        }

        string uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "images", "products");
        Directory.CreateDirectory(uploadsFolder);

        string uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
        string filePath = Path.Combine(uploadsFolder, uniqueFileName);

        using (var stream = new FileStream(filePath, FileMode.Create))
            await file.CopyToAsync(stream);

        return Ok(new { imageUrl = $"/images/products/{uniqueFileName}" });
    }
}