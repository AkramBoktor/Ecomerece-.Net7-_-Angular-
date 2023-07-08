
namespace Core.Specification
{
    public class ProductSpecParams
    {
        private const int MaxPageSize = 40;
        public int PageIndex { get; set; } = 1;

        private int _PageSize { get; set; } = 20;

        private string _search { get; set; }

        public int PageSize {
            get => _PageSize;
            set => _PageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }

        public int? BrandId { get; set; }

        public int? TypeId { get; set; }

        public string Sort { get; set; }

        public string Search { get => _search; set => _search = value.ToLower(); }
    }
}
