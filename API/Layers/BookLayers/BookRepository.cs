using API.Data.Database;
using API.Types.Interfaces.IBook;
using API.Types.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace API.Layers.BookLayers
{
    public class BookRepository:IBookRepository
    {
        private readonly AppDbContext _context;
        public BookRepository(AppDbContext context)
        {
            this._context = context;
        }

        public async Task<List<Book>> GetAll()
        {
            return await _context.Book.AsNoTracking()
                .Include(table => table.Urls).Include(table => table.Authors)
                .ToListAsync();
        }

        public async Task<Book?> GetById(int id)
        {
            return await _context.Book.Include(table => table.Urls).FirstOrDefaultAsync(table => table.Id == id);
        }


        public async Task<List<Book>> Get(Expression<Func<Book, bool>> predicate)
        {
            return await _context.Book.Where(predicate).Include(table => table.Urls).Include(table => table.Authors).ToListAsync();
        }

        public async Task<bool> Exists(Expression<Func<Book, bool>> predicate)
        {
            return await _context.Book.AsNoTracking().Include(table => table.Urls).AnyAsync(predicate);
        }

        public async Task<Book> Insert(Book book)
        {
            await _context.Book.AddAsync(book);
            await _context.SaveChangesAsync();

            return book;
        }

        public async Task<Book> Update(Book book)
        {
            _context.Book.Update(book);
            await _context.SaveChangesAsync();

            return book;
        }
        public async Task<Book> Delete(Book book)
        {
            _context.Book.Remove(book);
            await _context.SaveChangesAsync();
            return book;
        }

    }
}
