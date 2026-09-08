using API.Types.DTOs.AuthorDTOs;

namespace API.Types.Interfaces.IAuthor
{
    public interface IAuthorService
    {
        Task<List<AuthorGetDTO>> GetAll();
        Task<AuthorGetDTO> GetById(int id);
        //Task<AuthorGetDTO[]> Get();
        Task<AuthorGetDTO> Insert(AuthorInsertDTO dto);
        Task<AuthorGetDTO> Update(int id, AuthorUpdateDTO dto);
        Task<AuthorGetDTO> ChangeActiveStatus(int id, bool status);
        Task<AuthorGetDTO> Delete(int id);
    }
}
