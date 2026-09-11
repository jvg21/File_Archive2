using API.Types.DTOs.AuthorDTOs;
using API.Types.Models;
using System.Linq.Expressions;

namespace API.Types.Interfaces.IAuthor
{
    public interface IAuthorService
    {
        Task<List<AuthorGetDTO>> GetAll();
        Task<List<AuthorMiniGetDTO>> GetAllMini();
        Task<AuthorGetDTO> GetById(int id);
        Task<bool> Exists(Expression<Func<Author, bool>> predicate);
        Task<List<Author>> Get(Expression<Func<Author, bool>> predicate);
        Task<AuthorGetDTO> Insert(AuthorInsertDTO dto);
        Task<AuthorGetDTO> Update(int id, AuthorUpdateDTO dto);
        Task<AuthorGetDTO> ChangeActiveStatus(int id, bool status);
        Task<AuthorGetDTO> Delete(int id);
    }
}
