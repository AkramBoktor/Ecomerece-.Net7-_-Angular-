using Core.Entities;
using Microsoft.AspNetCore.Mvc;
using Core.Interfaces;
using Core.Specification;
using API.Dtos;
using AutoMapper;
using API.Errors;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : BaseApiController
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
        public async Task<ActionResult<IReadOnlyList<Products>>> GetProducts(
          [FromQuery] ProductSpecParams productParams)
        {
            var spec = new ProductsWithTypesAndBrandsSpecification(productParams);

          var productList = await _productRepo.ListAsyncSpec(spec);
            return Ok(_mapper.Map<IReadOnlyList<Products> , IReadOnlyList<ProductToReturnDto>>(productList));   
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse),StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
        {
            var spec = new ProductsWithTypesAndBrandsSpecification(id);

            var product = (await _productRepo.GetEntityWithSpec(spec));

           if(product == null) return NotFound(new ApiResponse(404));

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