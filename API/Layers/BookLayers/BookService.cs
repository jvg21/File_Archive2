
using API.Layers.UrlLayers;
using API.Types.DTOs.BookAuthorDTOs;
using API.Types.DTOs.BookDTOs;
using API.Types.DTOs.UrlDTOs;
using API.Types.Enums;
using API.Types.Exceptions;
using API.Types.Interfaces.IAuthor;
using API.Types.Interfaces.IBook;
using API.Types.Interfaces.IUrl;
using API.Types.Models;
using API.Utils;
using API.Utils.FileManipulation;
using ClosedXML.Excel;
using Mapster;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Nodes;

namespace API.Layers.BookLayers
{
    public class BookService : IBookService
    {
        private readonly IBookRepository _bookRepository;
        private readonly IAuthorService _authorService;
        private readonly IUrlService _urlService;
        private readonly IBookAuthorService _bookAuthorService;
        public BookService(IBookRepository bookRepository, IAuthorService authorService, IUrlService urlService, IBookAuthorService bookAuthorService)
        {
            this._bookRepository = bookRepository;
            this._authorService = authorService;
            this._urlService = urlService;
            this._bookAuthorService = bookAuthorService;
        }

        public async Task<List<BookGetDTO>> GetAll()
        {
            var request = await this._bookRepository.GetAll();
            return request.Adapt<List<BookGetDTO>>();
        }

        public async Task<List<BookMiniGetDTO>> GetAllMini()
        {
            var request = await this._bookRepository.GetAll();
            return request.Adapt<List<BookMiniGetDTO>>();
        }

        public async Task<BookGetDTO> GetById(int id)
        {
            var request = await this._bookRepository.GetById(id);
            if (request == null) throw new EntityNotFoundException();

            return request.Adapt<BookGetDTO>();
        }

        public async Task<BookGetDTO> Insert(BookInsertDTO dto)
        {
            var newBook = dto.Adapt<Book>();
            newBook.ValidateInsert();

            if (dto.Authors != null)
            {
                var authorIds = dto.Authors.Select(a => a.Id).Distinct().ToList();
                var authors = await this._authorService.Get((a => authorIds.Contains(a.Id)));
                newBook.Authors = authors;
            }

            var request = await _bookRepository.Insert(newBook);

            return request.Adapt<BookGetDTO>();
        }

        public async Task<BookInsertArrayResultDTO> InsertArray(List<BookInsertDTO> books)
        {
            var success = new List<BookGetDTO>();
            var failed = new List<BookInsertArrayErrorDTO>();

            foreach (var book in books)
            {
                try
                {
                    var request = await Insert(book);
                    success.Add(request);
                }
                catch (Exception exception)
                {
                    failed.Add(new BookInsertArrayErrorDTO { Entry = book, ErrorMessage = exception.Message });
                }
            }


            return new BookInsertArrayResultDTO { Success = success, Failed = failed };
        }

        public async Task<BookInsertArrayResultDTO> InsertSheet(IFormFile file)
        {
            var filename = file.FileName;

            if (!filename.Contains(".xlsx")) throw new InvalidFormException("File must be in xlsx format");

            var sheetArrayData = XlsxFunctions.IFileToArray(file);
            var bookData = new List<BookInsertDTO>();

            foreach (var row in sheetArrayData)
            {
                List<UrlInsertDTO> urls = [];

                for (var i = 9; i <= 11; i++)
                {
                    if (row[i] != null)
                    {
                        urls.Add(new UrlInsertDTO { Content = row[i], Name = row[i] });
                    }
                }

                var book = new BookInsertDTO
                {
                    Title = row[0] != "" ? row[0] : "",
                    Summary = row[1] != "" ? row[1] : null,
                    Notes = row[2] != "" ? row[2] : null,
                    Rating = row[3] != "" ? Convert.ToDouble(row[3]) : null,
                    CurrentChapter = row[4] != "" ? Convert.ToInt32(row[4]) : null,
                    TotalChapters = row[5] != "" ? Convert.ToInt32(row[5]) : null,
                    Words = row[6] != "" ? Convert.ToInt32(row[6]) : null,
                    ReadingStatus = row[7] != "" && Enum.TryParse<ReadingStatus>(row[7], true, out var parsedReadingStatus) ? parsedReadingStatus : null,
                    WritingStatus = row[8] != "" && Enum.TryParse<WritingStatus>(row[8], true, out var parsedWritingStatus) ? parsedWritingStatus : 0,
                    Urls = urls ?? []
                };
                bookData.Add(book);
            }

            var request = await InsertArray(bookData);

            return request;
        }

        public async Task<BookGetDTO> Update(int id, BookUpdateDTO dto)
        {

            var book = await _bookRepository.GetById(id);
            if (book == null) throw new EntityNotFoundException();

            book.ApplyUpdate(dto);
            book.ValidateInsert();

            if (dto.removeAuthors != null)
            {
                foreach (var authorId in dto.removeAuthors)
                {
                    var bookAuthorKey = await _bookAuthorService.Exists(new BookAuthorSearchDTO { Author_Id = authorId, Book_Id = book.Id });

                    if (bookAuthorKey) await _bookAuthorService.ChangeState(new BookAuthor { Author_Id = authorId, Book_Id = book.Id }, EntityState.Deleted);
                }
            }

            if (dto.Authors != null)
            {
                foreach (var author in dto.Authors)
                {
                    book.Authors.Add(author);
                }
            }

            if (dto.RemoveUrls != null)
            {
                foreach (var urlId in dto.RemoveUrls)
                {
                    var url = book.Urls.FirstOrDefault(u => u.Id == urlId);
                    if (url == null) throw new InvalidFormException("Url to remove is invalid");

                    await _urlService.ChangeState(url, EntityState.Deleted);
                }
            }

            if (dto.Urls != null)
            {
                foreach (var url in dto.Urls)
                {
                    var newUrl = url.Adapt<Url>();
                    newUrl.Book_Id = book.Id;
                    book.Urls.Add(newUrl);
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
