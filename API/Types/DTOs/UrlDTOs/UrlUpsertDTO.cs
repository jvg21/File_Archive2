namespace API.Types.DTOs.UrlDTOs
{
    public class UrlUpsertDTO
    {
        public int? Id { get; set; }
        public string? Name { get; set; }
        public string? Content { get; set; } = string.Empty;
    }
}
