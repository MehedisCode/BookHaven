namespace BookHaven.DataAccess.Repository.Interfaces;

public interface IUnitOfWork
{
    ICategoryRepository Category { get; }
    IProductRepository Product { get; }
    ICartRepository Cart { get; }
    Task SaveAsync();
}