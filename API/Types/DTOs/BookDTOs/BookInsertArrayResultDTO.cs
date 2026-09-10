namespace API.Types.DTOs.BookDTOs
{
    public class BookInsertArrayErrorDTO
    {
        public string ErrorMessage { get; set; } = string.Empty;
        public BookInsertDTO Entry { get; set; } = new BookInsertDTO();

    }
    public class BookInsertArrayResultDTO
    {
        public ICollection<BookGetDTO> Success { get; set; } = new List<BookGetDTO>();
        public ICollection<BookInsertArrayErrorDTO> Failed { get; set; } = new List<BookInsertArrayErrorDTO>();

    }
}
