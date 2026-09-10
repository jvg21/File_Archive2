using API.Types.DTOs.UrlDTOs;
using API.Types.Models;

namespace API.Types.DTOs.AuthorDTOs
{
    public class AuthorUpdateDTO
    {
        public string? Name { get; set; } = string.Empty;
        public List<UrlInsertDTO>? Urls { get; set; } = new List<UrlInsertDTO>();
        public List<int>? RemoveUrls { get; set; } = new List<int>();
        public bool? IsActive { get; set; }
    }
}