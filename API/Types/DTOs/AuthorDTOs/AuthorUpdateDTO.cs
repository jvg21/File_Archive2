using API.Types.DTOs.UrlDTOs;

namespace API.Types.DTOs.AuthorDTOs
{
    public class AuthorUpdateDTO
    {
        public string? Name { get; set; } = string.Empty;
        public bool? IsActive { get; set; }
        public List<UrlUpsertDTO> Urls { get; set; } = new List<UrlUpsertDTO>();
    }
}