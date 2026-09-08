using API.Types.Enums;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace API.Types.Models
{
    public class Book
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Summary { get; set; } = string.Empty;
        public string? Notes { get; set; } = string.Empty;

        [Precision(3,1)]
        [Range(0.0,10.0,ErrorMessage = "Rating out of range")]
        public double? Rating { get; set; }
        public int? TotalChapters { get; set; }
        public int? CurrentChapter { get; set; }
        public int? Words { get; set; }
        public ReadingStatus ReadingStatus { get; set; }
        public WritingStatus WritingStatus { get; set; }
        public ICollection<Url> Urls { get; set; } = new List<Url>();
        public bool IsActive { get; set; } = true;

    }
}
