using Microsoft.AspNetCore.Mvc;

namespace API.Layers.TemplateLayers
{
    [ApiController]
    [Route("[controller]")]
    public class TemplateController:ControllerBase
    {
        [HttpGet("BookArrayInsertTemplate")]
        public IActionResult BookArrayInsertTemplate()
        {
            return Ok();
        }
    }
}
