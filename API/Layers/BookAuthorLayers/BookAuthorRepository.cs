using API.Data.Database;
using API.Types.Interfaces.IBook;
using API.Types.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace API.Layers.BookAuthorLayers
{
    public class BookAuthorRepository:IBookAuthorRepository
    {
        private readonly AppDbContext _context;
        public BookAuthorRepository(AppDbContext context)
        {
            this._context = context;
        }

        public async Task<List<BookAuthor>> GetAll()
        {
            return await _context.BookAuthor.AsNoTracking().Include(table => table.Book).Include(table => table.Author).ToListAsync();
        }

        public async Task<BookAuthor?> GetById(BookAuthor bookAuthor)
        {
            return await _context.BookAuthor.Include(table=>table.Book).Include(table=>table.Author)
                .FirstOrDefaultAsync(table =>
                table.Author_Id == bookAuthor.Author_Id && table.Book_Id == bookAuthor.Book_Id);
        }

        public async Task<List<BookAuthor>> Get(Expression<Func<BookAuthor, bool>> predicate)
        {
            return await _context.BookAuthor.AsNoTracking().Include(table => table.Author).Include(table => table.Book)
                .Where(predicate).ToListAsync();
        }

        public async Task<bool> Exists(BookAuthor bookAuthor)
        {
            return await _context.BookAuthor.AnyAsync(table =>
                table.Author_Id == bookAuthor.Author_Id && table.Book_Id == bookAuthor.Book_Id);
        }

        public async Task<BookAuthor> Insert(BookAuthor bookAuthor)
        {
            await _context.BookAuthor.AddAsync(bookAuthor);
            await _context.SaveChangesAsync();
            return bookAuthor;
        }

        public async Task<BookAuthor> Delete(BookAuthor bookAuthor)
        {
            _context.BookAuthor.Remove(bookAuthor);
            await _context.SaveChangesAsync();
            return bookAuthor;
        }
    }
}
