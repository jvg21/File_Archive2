using API.Types.DTOs.UrlDTOs;
using API.Types.Models;
using Microsoft.EntityFrameworkCore;
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
        Task ChangeState(Url url, EntityState state);
    }
}
