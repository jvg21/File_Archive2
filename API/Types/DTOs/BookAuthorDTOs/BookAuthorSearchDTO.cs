using API.Types.DTOs.AuthorDTOs;
using API.Types.DTOs.BookDTOs;

namespace API.Types.DTOs.BookAuthorDTOs
{
    public class BookAuthorSearchDTO
    {
        public int Book_Id { get; set; }
        public int Author_Id { get; set; }
    }
}
