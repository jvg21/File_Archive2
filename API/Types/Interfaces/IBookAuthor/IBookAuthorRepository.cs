using API.Types.Models;
using System.Linq.Expressions;

namespace API.Types.Interfaces.IBook
{
    public interface IBookAuthorRepository
    {
        Task<List<BookAuthor>> GetAll();
        Task<BookAuthor?> GetById(BookAuthor bookAuthor);
        Task<List<BookAuthor>> Get(Expression<Func<BookAuthor, bool>> predicate);
        Task<bool> Exists(BookAuthor bookAuthor);
        Task<BookAuthor> Insert(BookAuthor bookAuthor);
        Task<BookAuthor> Delete(BookAuthor bookAuthor);
    }
}
