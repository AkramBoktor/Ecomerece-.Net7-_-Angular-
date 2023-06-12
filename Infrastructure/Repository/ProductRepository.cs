using Core.Data;
using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly StoreContext _context;

        public ProductRepository(StoreContext context)
        {
            _context = context;
        }

        public async Task<Products> GetProductByIdAsync(int id)
        {
#pragma warning disable CS8603 // Possible null reference return.
            return await _context.Products
                         .Include(p => p.ProductType)
                         .Include(p => p.ProductBrand)
                         .FirstOrDefaultAsync(p => p.Id == id);
#pragma warning restore CS8603 // Possible null reference return.
        }

        public async Task<IReadOnlyList<Products>> GetProductsAsync()
        {
            return await _context.Products
                        .Include(p=>p.ProductType)
                        .Include(p=>p.ProductBrand)
                        .ToListAsync();
        }

        public async Task<IReadOnlyList<ProductType>> GetProductTypeAsync()
        {
            return await _context.ProductTypes.ToListAsync();

        }
        public async Task<IReadOnlyList<ProductBrand>> GetProductBrandAsync()
        {
            return await _context.ProductBrands.ToListAsync();
        }
    }
}