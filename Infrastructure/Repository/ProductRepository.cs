using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;

namespace Infrastructure.Repository
{
    public class ProductRepository : IProductRepository
    {
        public Task<Products> GetProductByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IReadOnlyList<Products>> GetProductsAsync()
        {
            throw new NotImplementedException();
        }
    }
}