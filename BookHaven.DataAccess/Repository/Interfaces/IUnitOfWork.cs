namespace BookHaven.DataAccess.Repository.Interfaces;

public interface IUnitOfWork
{ 
    ICategoryRepository Category { get; }
    Task SaveAsync();
}