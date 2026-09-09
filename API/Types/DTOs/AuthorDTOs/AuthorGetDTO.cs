using API.Types.DTOs.BookDTOs;
using API.Types.DTOs.UrlDTOs;

namespace API.Types.DTOs.AuthorDTOs
{
    public class AuthorGetDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public List<UrlGetDTO> Urls { get; set; } = new List<UrlGetDTO>();
        public List<BookMiniGetDTO>? Books { get; set; } = new List<BookMiniGetDTO>();
        public bool IsActive { get; set; } = true;
    }
}
