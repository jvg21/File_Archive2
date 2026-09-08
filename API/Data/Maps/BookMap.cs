using API.Types.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Data.Maps
{
    public class BookMap:IEntityTypeConfiguration<Book>
    {
        public void Configure(EntityTypeBuilder<Book> builder)
        {
            builder.ToTable("book");

            builder.HasKey(b => b.Id);

            builder.Property(a => a.IsActive).HasDefaultValue(true);
            builder.Property(a => a.Rating).HasPrecision(3,1);

        }
    }
}
