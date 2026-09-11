using API.Types.DTOs.AuthorDTOs;
using API.Types.DTOs.BookAuthorDTOs;
using API.Types.DTOs.BookDTOs;
using API.Types.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace API.Types.Interfaces.IBook
{
    public interface IBookAuthorService
    {
        Task<List<BookAuthorMiniGetDTO>> GetAll();
        Task<BookAuthorGetDTO> GetById(BookAuthorSearchDTO bookAuthor);
        Task<bool> Exists(BookAuthorSearchDTO dto);
        Task<BookAuthorMiniGetDTO> LinkBookToAuthor(BookAuthorInsertDTO dto);
        Task<BookAuthorMiniGetDTO> DeleteLinkBookToAuthor(BookAuthorInsertDTO dto);
        Task ChangeState(BookAuthor bookAuthor, EntityState state);


    }
}
