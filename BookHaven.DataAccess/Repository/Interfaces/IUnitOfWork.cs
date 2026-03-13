namespace BookHaven.DataAccess.Repository.Interfaces;

public interface IUnitOfWork
{ 
    ICategoryRepository Category { get; }
    IProductRepository Product { get; }
    Task SaveAsync();
}