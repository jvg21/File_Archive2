using API.Types.DTOs.BookDTOs;
using API.Types.Enums;
using API.Types.Exceptions;
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
        public ICollection<Author> Authors { get; set; } = new List<Author>();
        public bool IsActive { get; set; } = true;



        public void ApplyUpdate(BookUpdateDTO dto)
        {
            if (dto.Title != null)
                this.Title = dto.Title;

            if (dto.Notes != null)
                this.Notes = dto.Notes;

            if (dto.Summary != null)
                this.Summary = dto.Summary;

            if (dto.Words.HasValue)
                this.Words = dto.Words.Value;

            if (dto.Rating.HasValue)
                this.Rating = dto.Rating.Value;

            if (dto.ReadingStatus.HasValue)
            {
                if (!Enum.IsDefined(typeof(ReadingStatus), dto.ReadingStatus.Value))
                    throw new InvalidFormException("Invalid reading status");

                this.ReadingStatus = dto.ReadingStatus.Value;
            }

            if (dto.WritingStatus.HasValue)
            {
                if (!Enum.IsDefined(typeof(WritingStatus), dto.WritingStatus.Value))
                    throw new InvalidFormException("Invalid writing status");

                this.WritingStatus = dto.WritingStatus.Value;
            }

            if (dto.CurrentChapter.HasValue)
                this.CurrentChapter = dto.CurrentChapter.Value;

            if (dto.TotalChapters.HasValue)
                this.TotalChapters = dto.TotalChapters.Value;

            if (dto.IsActive.HasValue)
                this.IsActive = dto.IsActive.Value;
        }

        public bool ValidateInsert()
        {
            var isValid = true;

            if (this.Rating != null && (this.Rating > 10 || this.Rating < 0))
            {
                throw new InvalidFormException("Rating Value Invalid, must be between 0 and 10");
            }


            return isValid;
        }

    }
}
