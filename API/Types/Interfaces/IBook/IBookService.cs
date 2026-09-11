
using API.Types.DTOs.BookDTOs;
using API.Types.Models;
using Microsoft.AspNetCore.Mvc;
using System.Linq.Expressions;

namespace API.Types.Interfaces.IBook
{
    public interface IBookService
    {
        Task<List<BookGetDTO>> GetAll();
        Task<List<BookMiniGetDTO>> GetAllMini();
        Task<BookGetDTO> GetById(int id);
        Task<BookGetDTO> Insert(BookInsertDTO dto);
        Task<BookInsertArrayResultDTO> InsertArray(List<BookInsertDTO> books);
        Task<BookGetDTO> Update(int id, BookUpdateDTO dto);
        Task<BookGetDTO> ChangeActiveStatus(int id, bool status);
        Task<BookGetDTO> Delete(int id);
    }
}
