using API.Types.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Data.Maps
{
    public class UrlMap:IEntityTypeConfiguration<Url>
    {
        public void Configure(EntityTypeBuilder<Url> builder)
        {
            builder.ToTable("url");

            builder.HasKey(u => u.Id);

            builder.HasOne(u => u.Author).WithMany(u => u.Urls)
                .HasForeignKey(u => u.Author_Id).OnDelete(DeleteBehavior.Cascade).IsRequired(false);
        }
     
    }
}
