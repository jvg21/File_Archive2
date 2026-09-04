using Microsoft.AspNetCore.Mvc;

namespace API.Layers.Author
{
    [ApiController]
    [Route("[controller]")]
    public class AuthorController : ControllerBase
    {
        public IActionResult Index()
        {
            return Ok();
        }
    }
}
