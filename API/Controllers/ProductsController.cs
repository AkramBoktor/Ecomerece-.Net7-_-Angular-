 using Core.Data;
using Core.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Core.Interfaces;
using Core.Specification;
using API.Dtos;
using AutoMapper;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IGenericRepository<Products> _productRepo;
        private readonly IGenericRepository<ProductBrand> _productBandRepo;
        private readonly IGenericRepository<ProductType> _productTyperepo;
        private readonly IMapper _mapper;

        public ProductsController(IGenericRepository<Products> productRepo , 
                                  IGenericRepository<ProductBrand> productBandRepo ,
                                  IGenericRepository<ProductType> productTyperepo ,
                                  IMapper mapper)
        {
            _productRepo = productRepo;
            _productBandRepo = productBandRepo;
            _productTyperepo = productTyperepo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Products>>> GetProducts()
        {
            var spec = new ProductsWithTypesAndBrandsSpecification();

          var productList = await _productRepo.ListAsyncSpec(spec);
            return Ok(productList.Select(productList => new ProductToReturnDto
            {
                Id = productList.Id,
                Description = productList.Description,
                Name = productList.Name,
                PictureUrl = productList.PictureUrl,
                Price = productList.Price,
                ProductBrand = productList.ProductBrand.Name,
                ProductType = productList.ProductType.Name
            }));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
        {
            var spec = new ProductsWithTypesAndBrandsSpecification(id);

            var product = (await _productRepo.GetEntityWithSpec(spec));

            return Ok(_mapper.Map<Products, ProductToReturnDto>(product));
        }

        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetProductBrands()
        {
            return Ok(await _productBandRepo.ListAllAsync());
        }

        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetProductTypes()
        {
            return Ok(await _productTyperepo.ListAllAsync());
        }
    }
}