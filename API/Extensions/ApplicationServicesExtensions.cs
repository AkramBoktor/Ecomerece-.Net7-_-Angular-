using API.Errors;
using Core.Data;
using Core.Interfaces;
using Infrastructure.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace API.Extensions
{
    public static class ApplicationservicesExtensions
    {
        public static IServiceCollection AddApplicationservices(this IServiceCollection services, IConfiguration config)
        {
                // Add services to the container.

                services.AddControllers();
                // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
                services.AddEndpointsApiExplorer();
                services.AddSwaggerGen();
                services.AddDbContext<StoreContext>(options =>
                {
                    options.UseSqlite(config.GetConnectionString("DefaultConnection"));
                });
                services.AddScoped<IProductRepository, ProductRepository>();
                services.AddScoped(typeof(IGenericRepository<>),typeof(GenericRepository<>));
                services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
                //Change the beahvior options of APi in controller 
                services.Configure<ApiBehaviorOptions>(options => {
                    options.InvalidModelStateResponseFactory = actionContext =>
                    {
                        var errors = actionContext.ModelState.Where(e => e.Value.Errors.Count > 0)
                                                             .SelectMany(x => x.Value.Errors)
                                                             .Select(x => x.ErrorMessage).ToArray();

                        var errorResponse = new ApiValidationErrorResponse
                        {
                            Errors = errors
                        };

                        return new BadRequestObjectResult(errors);
                    };
                });
           return services;
        }
    }
}