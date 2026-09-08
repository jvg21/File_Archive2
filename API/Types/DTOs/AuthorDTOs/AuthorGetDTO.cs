using API.Types.DTOs.UrlDTOs;

namespace API.Types.DTOs.AuthorDTOs
{
    public class AuthorGetDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public List<UrlGetDTO> Urls { get; set; } = new List<UrlGetDTO>();
        public bool IsActive { get; set; } = true;
    }
}
