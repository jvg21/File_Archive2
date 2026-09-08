using API.Data.Database;
using API.Types.Interfaces.IUrl;
using API.Types.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace API.Layers.UrlLayers
{
    public class UrlRepository:IUrlRepository
    {
        private readonly AppDbContext _context;

        public UrlRepository(AppDbContext context)
        {
            this._context = context;
        }

        public async Task<List<Url>> GetAll()
        {
            return await _context.Url.AsNoTracking().Include(table => table.Author).ToListAsync();
        }
        public async Task<List<Url>> Get(Expression<Func<Url, bool>> predicate)
        {
            return await _context.Url.Where(predicate).Include(table => table.Author).ToListAsync();
        }
        public async Task<Url?> GetById(int id)
        {
            return await _context.Url.Include(table => table.Author).FirstOrDefaultAsync(table => table.Id == id);
        }
        public async Task<bool> Exists(Expression<Func<Url, bool>> predicate)
        {
            return await _context.Url.AsNoTracking().AnyAsync(predicate);
        }
        public async Task<Url> Insert(Url url)
        {
            await _context.Url.AddAsync(url);
            await _context.SaveChangesAsync();
            return url;
        }
        public async Task<Url> Update(Url url)
        {
            _context.Url.Update(url);
            await _context.SaveChangesAsync();
            return url;
        }
        public async Task<Url> Delete(Url url)
        {
            _context.Url.Remove(url);
            await _context.SaveChangesAsync();
            return url;

        }
    }
}
