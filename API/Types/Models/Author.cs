using API.Types.DTOs.AuthorDTOs;

namespace API.Types.Models
{
    public class Author
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        //public List<Book> Books { get; set; } = new List<Book>();
        public List<Url> Urls { get; set; } = new List<Url>();
        public ICollection<Book> Books { get; set; } = new List<Book>();
        public bool IsActive { get; set; } = true;

        public void ApplyUpdate(AuthorUpdateDTO dto)
        {
            if (dto.Name != null) this.Name = dto.Name;

            if (dto.IsActive.HasValue) this.IsActive = dto.IsActive.Value;

        }
    }

}
