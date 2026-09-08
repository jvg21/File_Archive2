using API.Types.DTOs.UrlDTOs;
using API.Types.Enums;
using API.Types.Models;

namespace API.Types.DTOs.BookDTOs
{
    public class BookGetDTO
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Summary { get; set; } = string.Empty;
        public string? Notes { get; set; } = string.Empty;
        public double? Rating { get; set; }
        public int? TotalChapters { get; set; }
        public int? CurrentChapter { get; set; }
        public int? Words { get; set; }
        public ReadingStatus ReadingStatus { get; set; }
        public WritingStatus WritingStatus { get; set; }
        public ICollection<UrlGetDTO> Urls { get; set; } = new List<UrlGetDTO>();
        public bool IsActive { get; set; }
    }
}
