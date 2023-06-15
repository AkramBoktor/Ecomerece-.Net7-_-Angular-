using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specification
{
    public class ProductSpecParams
    {
        private const int MaxPageSize = 40;
        public int PageIndex { get; set; } = 1;

        private int _PageSize { get; set; } = 6;

        public int PageSize {
            get => _PageSize;
            set => _PageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }

        public int? BrandId { get; set; }

        public int? TypeId { get; set; }

        public string sort { get; set; }
    }
}
