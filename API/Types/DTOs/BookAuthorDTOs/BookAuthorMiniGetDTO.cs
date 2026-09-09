using API.Types.DTOs.AuthorDTOs;
using API.Types.DTOs.BookDTOs;

namespace API.Types.DTOs.BookAuthorDTOs
{
    public class BookAuthorMiniGetDTO
    {
        public int Book_Id { get; set; }
        public BookMiniGetDTO? Book { get; set; }
        public int Author_Id { get; set; }
        public AuthorMiniGetDTO? Author { get; set; }
    }
}
