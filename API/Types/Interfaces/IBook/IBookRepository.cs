using API.Types.Models;
using System.Linq.Expressions;

namespace API.Types.Interfaces.IBook
{
    public interface IBookRepository
    {
        Task<List<Book>> GetAll();
        Task<Book?> GetById(int id);
        Task<List<Book>> Get(Expression<Func<Book, bool>> predicate);
        Task<bool> Exists(Expression<Func<Book, bool>> predicate);
        Task<Book> Insert(Book book);
        Task<Book> Update(Book book);
        Task<Book> Delete(Book book);

    }
}
