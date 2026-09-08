using API.Types.DTOs.UrlDTOs;
using API.Types.Interfaces.IUrl;
using Microsoft.AspNetCore.Mvc;

namespace API.Layers.UrlLayers
{
    [ApiController]
    [Route("[controller]")]
    public class UrlController:ControllerBase
    {
        private readonly IUrlService _urlService;

        public UrlController(IUrlService urlService) { this._urlService = urlService; }


        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var response = await _urlService.GetAll();
            return Ok(response);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var response = await _urlService.GetById(id);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> Insert([FromBody] UrlInsertDTO url)
        {
            var response = await _urlService.Insert(url);
            return CreatedAtAction(nameof(GetById), new { id = response.Id }, response);
        }

        [HttpPatch("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] UrlUpdateDTO url)
        {
            var response = await _urlService.Update(id, url);
            return Ok(response);
        }


        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var response = await _urlService.Delete(id);
            return Ok(response);
        }

    }
}
