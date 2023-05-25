using Core.Data;
using Core.Entities;
using System.Text.Json;

namespace Infrastructure.Data
{
    public class StoreContextSeed
    {
        public static async Task SeedAsync(StoreContext context)
        {
            //check if have seed data or not if not add some
            if (!context.ProductBrands.Any())
            {
                var brandsData = File.ReadAllText("../Infrastructure/SeedData/brands.json");
                var brands = JsonSerializer.Deserialize<List<ProductBrand>>(brandsData);
                context.ProductBrands.AddRange(brands);
            }

            if (!context.ProductTypes.Any())
            {
                var typesData = File.ReadAllText("../Infrastructure/SeedData/types.json");
                var types = JsonSerializer.Deserialize<List<ProductType>>(typesData);
                context.ProductTypes.AddRange(types);
            }

            if (!context.Products.Any())
            {
                var ProductsData = File.ReadAllText("../Infrastructure/SeedData/products.json");
                var products = JsonSerializer.Deserialize<List<Products>>(ProductsData);
                context.Products.AddRange(products);
            }

            if (context.ChangeTracker.HasChanges()) await context.SaveChangesAsync();
        }
    }
}