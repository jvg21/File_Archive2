using API.Data.Maps;
using API.Types.Models;
using Microsoft.EntityFrameworkCore;


namespace API.Data.Database
{
    public class AppDbContext:DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Author> Author { get; set; }
        public DbSet<Url> Url { get; set; }
        public DbSet<Book> Book { get; set; }
        //public DbSet<BookAuthor> BookAuthor { get; set; }

        //public DbSet<FileArchive> FileArchive { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new AuthorMap());
            modelBuilder.ApplyConfiguration(new BookMap());
            modelBuilder.ApplyConfiguration(new UrlMap());
            //modelBuilder.ApplyConfiguration(new FileArchiveMap());
        }
    }
}
