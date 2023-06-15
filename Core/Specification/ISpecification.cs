using System.Linq.Expressions;

namespace Core.Specification
{
    public interface ISpecification<T>
    {
       Expression<Func<T,bool>> Criteria {get;} 
       
       List<Expression<Func<T, object>>> Includes {get;}   

       // For order by and order by descending 
       Expression<Func<T,object>> OrderBy {get; }

       Expression<Func<T,object>> OrderByDescending {get; }

        // Pagination

        int Take { get; }
        int Skip { get; }
        bool IsPagingEnabled { get; }

    }
}