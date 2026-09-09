using API.Types.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Data.Maps
{
    public class AuthorMap : IEntityTypeConfiguration<Author>
    {

        public void Configure(EntityTypeBuilder<Author> builder)
        {

            builder.ToTable("author");

            builder.HasKey(a => a.Id);

            builder.Property(a => a.Name).HasMaxLength(60).IsRequired();
            builder.HasIndex(a => a.Name).IsUnique();

            builder.Property(a => a.IsActive).HasDefaultValue(true);

            builder.HasMany(a => a.Books).WithMany(b => b.Authors).UsingEntity<BookAuthor>(
                    j => j.HasOne(ba => ba.Book).WithMany().HasForeignKey(ba=>ba.Book_Id),
                    j => j.HasOne(ba => ba.Author).WithMany().HasForeignKey(ba=>ba.Author_Id),
                    j =>
                    {
                        j.HasKey(ba => new { ba.Author_Id, ba.Book_Id });
                        j.ToTable("book_author");
                    }
                );
        }
    }
}
