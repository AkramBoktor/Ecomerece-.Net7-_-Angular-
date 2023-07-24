
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
        public async Task<bool> DeleteBasketAsync(string basketId)
        {
            return await _database.KeyDeleteAsync(basketId);
        }

        public async Task<CustomerBasket> GetBasketAsync(string basketId)
        {
            var basketData = await _database.StringGetAsync(basketId);
            //parse json to instance of the object
            return basketData.IsNullOrEmpty ? null : JsonSerializer.Deserialize<CustomerBasket>(basketData);
        }

        public async Task<CustomerBasket> UpdateBasketAsync(CustomerBasket basket)
        {
           var updateBasket =   await _database.StringSetAsync(basket.Id, 
                JsonSerializer.Serialize(basket), TimeSpan.FromDays(30));

            return (!updateBasket) ? null : await GetBasketAsync(basket.Id);

        }
    }
}
