
using Core.Entities;

namespace Core.Interfaces
{
    public interface IProductRepository
    {
        Task<Products> GetProductByIdAsync(int id);

        Task<IReadOnlyList<Products>> GetProductsAsync();

        Task<IReadOnlyList<ProductBrand>> GetProductBrandAsync(); 

        Task<IReadOnlyList<ProductType>> GetProductTypeAsync();
        
    }
}