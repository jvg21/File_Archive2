using API.Data.Database;
using API.Types.Interfaces.IAuthor;
using API.Types.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace API.Layers.AuthorLayers
{
    public class AuthorRepository : IAuthorRepository
    {
        private readonly AppDbContext _context;
        public AuthorRepository(AppDbContext context)
        {
            this._context = context;
        }

        public async Task<List<Author>> GetAll()
        {
            return await _context.Author.AsNoTracking().ToListAsync();
        }

        public async Task<Author?> GetById(int id)
        {
            return await _context.Author.FirstOrDefaultAsync(table => table.Id == id);
        }


        public async Task<List<Author>> Get(Expression<Func<Author, bool>> predicate)
        {
            return await _context.Author.Where(predicate).ToListAsync();
        }

        public async Task<bool> Exists(Expression<Func<Author, bool>> predicate)
        {
            return await _context.Author.AsNoTracking().AnyAsync(predicate);
        }

        public async Task<Author> Insert(Author author)
        {
            await _context.Author.AddAsync(author);
            await _context.SaveChangesAsync();

            return author;
        }

        public async Task<Author> Update(Author author)
        {
            _context.Author.Update(author);
            await _context.SaveChangesAsync();

            return author;
        }
        public async Task<Author> Delete(Author author)
        {
            _context.Author.Remove(author);
            await _context.SaveChangesAsync();
            return author;
        }



    }
}
