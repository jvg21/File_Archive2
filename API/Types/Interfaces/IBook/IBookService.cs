
using API.Types.DTOs.BookDTOs;

namespace API.Types.Interfaces.IBook
{
    public interface IBookService
    {
        Task<List<BookGetDTO>> GetAll();
        Task<BookGetDTO> GetById(int id);
        Task<BookGetDTO> Insert(BookInsertDTO dto);
        Task<BookGetDTO> Update(int id, BookUpdateDTO dto);
        Task<BookGetDTO> ChangeActiveStatus(int id, bool status);
        Task<BookGetDTO> Delete(int id);
    }
}
