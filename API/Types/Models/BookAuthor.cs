namespace API.Types.Models
{
    public class BookAuthor
    {
        public int Book_Id { get; set; }

        public Book? Book { get; set; }
        public int Author_Id { get; set; }
        public Author? Author { get; set; }
    }
}
