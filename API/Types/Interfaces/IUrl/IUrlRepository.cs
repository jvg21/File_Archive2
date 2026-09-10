using API.Types.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace API.Types.Interfaces.IUrl
{
    public interface IUrlRepository
    {
        Task<List<Url>> GetAll();
        Task<List<Url>> Get(Expression<Func<Url,bool>>predicate);
        Task<Url?> GetById(int id);
        Task<bool> Exists(Expression<Func<Url, bool>> predicate);
        Task<Url> Insert(Url url);
        Task<Url> Update(Url url);
        Task<Url> Delete(Url url);
        void ChangeState(Url url, EntityState state);
    }
}
