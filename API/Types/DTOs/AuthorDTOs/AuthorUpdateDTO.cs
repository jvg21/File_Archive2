using API.Types.DTOs.UrlDTOs;
using API.Types.Models;

namespace API.Types.DTOs.AuthorDTOs
{
    public class AuthorUpdateDTO
    {
        public string? Name { get; set; } = string.Empty;
        public bool? IsActive { get; set; }
        public List<UrlUpsertDTO>? Urls { get; set; } = new List<UrlUpsertDTO>();
        public List<int>? RemovedUrls { get; set; } = new List<int>();
    }
}