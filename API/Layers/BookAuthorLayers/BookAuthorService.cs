using API.Types.DTOs.BookAuthorDTOs;
using API.Types.Exceptions;
using API.Types.Interfaces.IBook;
using API.Types.Models;
using Mapster;
using Microsoft.EntityFrameworkCore;

namespace API.Layers.BookAuthorLayers
{
    public class BookAuthorService:IBookAuthorService
    {
        private readonly IBookAuthorRepository _bookAuthorRepository;
        public BookAuthorService(IBookAuthorRepository bookAuthorRepository)
        {
            _bookAuthorRepository = bookAuthorRepository;
        }
        public async Task<List<BookAuthorMiniGetDTO>> GetAll()
        {
            var request = await _bookAuthorRepository.GetAll();
            return request.Adapt<List<BookAuthorMiniGetDTO>>();
        }
        public async Task<BookAuthorGetDTO> GetById(BookAuthorSearchDTO bookAuthor)
        {
            if (bookAuthor.Book_Id == 0 || bookAuthor.Author_Id == 0) throw new InvalidHeaderException();

            var request = await _bookAuthorRepository.GetById(bookAuthor.Adapt<BookAuthor>());
            if(request == null) throw new EntityNotFoundException();

            return request.Adapt<BookAuthorGetDTO>();
        }
        public async Task<bool> Exists(BookAuthorSearchDTO dto)
        {
            var request = await _bookAuthorRepository.Exists(dto.Adapt<BookAuthor>());
            return request;
        }
        public async Task<BookAuthorMiniGetDTO> LinkBookToAuthor(BookAuthorInsertDTO dto)
        {
            var request = await _bookAuthorRepository.Insert(dto.Adapt<BookAuthor>());
            return request.Adapt<BookAuthorMiniGetDTO>();
        }
        public async Task<BookAuthorMiniGetDTO> DeleteLinkBookToAuthor(BookAuthorInsertDTO dto)
        {
            var request = await _bookAuthorRepository.Delete(dto.Adapt<BookAuthor>());
            return request.Adapt<BookAuthorMiniGetDTO>();
        }

        public async Task ChangeState(BookAuthor bookAuthor, EntityState state)
        {

            _bookAuthorRepository.ChangeState(bookAuthor, state);
        }
    }
}
