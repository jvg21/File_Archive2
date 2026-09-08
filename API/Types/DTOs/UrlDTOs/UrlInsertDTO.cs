namespace API.Types.DTOs.UrlDTOs
{
    public class UrlInsertDTO
    {
        public string? Name { get; set; }
        public string Content { get; set; } = string.Empty;
        public int? Author_Id { get; set; }
        public int? Book_Id { get; set; }

    }
}
