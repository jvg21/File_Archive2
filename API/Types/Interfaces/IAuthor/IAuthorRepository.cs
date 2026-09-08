using API.Types.Models;
using System.Linq.Expressions;

namespace API.Types.Interfaces.IAuthor
{
    public interface IAuthorRepository
    {
        Task<List<Author>> GetAll();
        Task<Author?> GetById(int id);
        Task<List<Author>> Get(Expression<Func<Author, bool>> predicate);
        Task<bool> Exists(Expression<Func<Author, bool>> predicate);
        Task<Author> Insert(Author author);
        Task<Author> Update(Author author);
        Task<Author> Delete(Author author);


    }
}
