namespace API.Types.Models
{
    public class Url
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string Content { get; set; } = string.Empty;
        public int? Author_Id { get; set; }
        public Author? Author { get; set; }
    }
}
