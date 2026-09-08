namespace API.Types.Models
{
    public class Author
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        //public List<Book> Books { get; set; } = new List<Book>();
        public List<Url> Urls { get; set; } = new List<Url>();
        public bool IsActive { get; set; } = true;
    }
}
