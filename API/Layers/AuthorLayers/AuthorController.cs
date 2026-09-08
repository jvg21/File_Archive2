using API.Types.DTOs.AuthorDTOs;
using API.Types.Interfaces.IAuthor;
using Microsoft.AspNetCore.Mvc;

namespace API.Layers.AuthorLayers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthorController : ControllerBase
    {
        private readonly IAuthorService _authorService;

        public AuthorController(IAuthorService authorService)
        {
            _authorService = authorService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var response = await _authorService.GetAll();
            return Ok(response);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var response = await _authorService.GetById(id);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> Insert([FromBody] AuthorInsertDTO author)
        {
            var response = await _authorService.Insert(author);
            return CreatedAtAction(nameof(GetById), new { id = response.Id }, response);
        }

        [HttpPatch("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] AuthorUpdateDTO author)
        {
            var response = await _authorService.Update(id, author);
            return Ok(response);
        }

        [HttpPatch("status/{id:int}/{status:bool}")]
        public async Task<IActionResult> ChangeActiveStatus(int id,bool status)
        {
            var response = await _authorService.ChangeActiveStatus(id,status);
            return Ok(response);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var response = await _authorService.Delete(id);
            return Ok(response);
        }


    }
}
