
using Core.Entities;
using Core.Interfaces;
using StackExchange.Redis;
using System.Text.Json;

namespace Infrastructure.Repository
{
    public class BasketRepository : IBasketRepository
    {
        private readonly IDatabase _database;
        public BasketRepository(IConnectionMultiplexer redis)
        {
                _database = redis.GetDatabase();
        }
        public Task<bool> DeleteBasketAsync(string basketId)
        {
            throw new NotImplementedException();
        }

        public async Task<CustomerBasket> GetBasketAsync(string basketId)
        {
            var basketData = await _database.StringGetAsync(basketId);
            //parse json to instance of the object
            return basketData.IsNullOrEmpty ? null : JsonSerializer.Deserialize<CustomerBasket>(basketData);
        }

        public Task<CustomerBasket> UpdateBasketAsync(CustomerBasket basket)
        {
            throw new NotImplementedException();
        }
    }
}
