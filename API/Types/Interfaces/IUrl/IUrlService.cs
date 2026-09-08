using API.Types.DTOs.UrlDTOs;
using API.Types.Models;
using System.Linq.Expressions;

namespace API.Types.Interfaces.IUrl
{
    public interface IUrlService
    {
        Task<List<UrlGetDTO>> GetAll();
        Task<UrlGetDTO> GetById(int id);
        //Task<UrlGetDTO> Get(Expression<Func<Url, bool>> predicate);
        Task<UrlGetDTO> Insert(UrlInsertDTO dto);
        Task<UrlGetDTO> Update(int id, UrlUpdateDTO dto);
        Task<UrlGetDTO> Delete(int id);
    }
}
