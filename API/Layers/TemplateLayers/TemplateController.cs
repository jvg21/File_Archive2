using Microsoft.AspNetCore.Mvc;

namespace API.Layers.TemplateLayers
{
    [ApiController]
    [Route("[controller]")]
    public class TemplateController : ControllerBase
    {
        private readonly TemplateService _templateService;

        public TemplateController(TemplateService templateService)
        {
            _templateService = templateService;
        }

        [HttpGet("BookArrayInsertTemplate")]
        public IActionResult BookArrayInsertTemplate()
        {
            var stream = _templateService.BookArrayInsertTemplate();

            return File(
                stream,
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "BookArrayInsertTemplate.xlsx"
            );
        }
    }
}