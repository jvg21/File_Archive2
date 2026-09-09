
using API.Types.DTOs.BookDTOs;
using API.Types.DTOs.UrlDTOs;
using API.Types.Enums;
using API.Types.Exceptions;
using API.Types.Interfaces.IBook;
using API.Types.Interfaces.IUrl;
using API.Types.Models;
using Mapster;

namespace API.Layers.BookLayers
{
    public class BookService : IBookService
    {
        private readonly IBookRepository _bookRepository;
        private readonly IUrlService _urlService;
        public BookService(IBookRepository bookRepository, IUrlService urlService)
        {
            this._bookRepository = bookRepository;
            this._urlService = urlService;
        }

        public async Task<List<BookGetDTO>> GetAll()
        {
            var request = await this._bookRepository.GetAll();
            return request.Adapt<List<BookGetDTO>>();
        }
        public async Task<BookGetDTO> GetById(int id)
        {
            var request = await this._bookRepository.GetById(id);
            if (request == null) throw new EntityNotFoundException();

            return request.Adapt<BookGetDTO>();
        }

        public async Task<BookGetDTO> Insert(BookInsertDTO dto)
        {
            if (dto.Rating != null && (dto.Rating > 10 || dto.Rating < 0)) throw new InvalidFormException("Rating Value Invalid, must be between 0 and 10");

            var request = await _bookRepository.Insert(dto.Adapt<Book>());
            return request.Adapt<BookGetDTO>();

        }
        public async Task<BookGetDTO> Update(int id, BookUpdateDTO dto)
        {
            var book = await _bookRepository.GetById(id);
            if (book == null) throw new EntityNotFoundException();

            if (dto.Title != null) book.Title = dto.Title;
            if (dto.Notes != null) book.Notes = dto.Notes;
            if (dto.Summary != null) book.Summary = dto.Summary;

            if (dto.Words != null) book.Words = dto.Words.Value;
            if (dto.Rating != null) book.Rating = dto.Rating.Value;
            if (dto.ReadingStatus != null && Enum.IsDefined(typeof(ReadingStatus), dto.ReadingStatus.Value)) book.ReadingStatus = dto.ReadingStatus.Value;
            if (dto.WritingStatus != null && Enum.IsDefined(typeof(WritingStatus), dto.WritingStatus.Value)) book.WritingStatus = dto.WritingStatus.Value;
            if (dto.CurrentChapter != null) book.CurrentChapter = dto.CurrentChapter.Value;
            if (dto.TotalChapters != null) book.TotalChapters = dto.TotalChapters.Value;

            book.IsActive = dto.IsActive ?? book.IsActive;

            //Console.WriteLine(dto);
            if (dto.RemovedUrls != null)
            {
                foreach (var urlId in dto.RemovedUrls)
                {
                    var url = await _urlService.GetById(urlId);
                    if (url.Book_Id == null || url.Book_Id != book.Id) throw new InvalidFormException("Url to remove is invalid");

                    await _urlService.Delete(urlId);
                }
            }

            if (dto.Urls != null)
            {
                foreach (var url in dto.Urls)
                {
                    var newurl = url.Adapt<UrlInsertDTO>();
                    newurl.Book_Id = book.Id;
                    await _urlService.Insert(newurl);
                }
            }


            var request = await _bookRepository.Update(book);
            return request.Adapt<BookGetDTO>();

        }

        public async Task<BookGetDTO> ChangeActiveStatus(int id, bool status)
        {
            var book = await _bookRepository.GetById(id);
            if (book == null) throw new EntityNotFoundException();

            book.IsActive = status;

            var request = await _bookRepository.Update(book);
            return request.Adapt<BookGetDTO>();

        }

        public async Task<BookGetDTO> Delete(int id)
        {
            var book = await _bookRepository.GetById(id);
            if (book == null) throw new EntityNotFoundException();

            var request = await _bookRepository.Delete(book);
            return request.Adapt<BookGetDTO>();
        }
    }
}
