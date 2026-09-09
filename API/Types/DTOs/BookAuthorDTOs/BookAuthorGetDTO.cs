using API.Types.DTOs.AuthorDTOs;
using API.Types.DTOs.BookDTOs;

namespace API.Types.DTOs.BookAuthorDTOs
{
    public class BookAuthorGetDTO
    {
        public int Book_Id { get; set; }
        public BookGetDTO? Book { get; set; }
        public int Author_Id { get; set; }
        public AuthorGetDTO? Author { get; set; }
    }
}
