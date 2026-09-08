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


        }
    }
}
