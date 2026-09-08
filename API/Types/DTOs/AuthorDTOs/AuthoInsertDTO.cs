using API.Types.DTOs.UrlDTOs;

namespace API.Types.DTOs.AuthorDTOs
{
    public class AuthorInsertDTO
    {
        public string Name { get; set; } = string.Empty;
        public List<UrlInsertDTO> Urls { get; set; } = new List<UrlInsertDTO>();

    }
}
