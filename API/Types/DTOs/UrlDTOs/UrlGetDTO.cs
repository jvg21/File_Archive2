namespace API.Types.DTOs.UrlDTOs
{
    public class UrlGetDTO
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string Content { get; set; } = string.Empty;
        public int? Author_Id { get; set; }
    }
}
