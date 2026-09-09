using API.Types.DTOs.BookAuthorDTOs;
using API.Types.Interfaces.IBook;
using Microsoft.AspNetCore.Mvc;

namespace API.Layers.BookAuthorLayers
{
    [ApiController]
    [Route("[controller]")]
    public class BookAuthorController:ControllerBase
    {
        private readonly IBookAuthorService _bookAuthorService;
        public BookAuthorController(IBookAuthorService bookAuthorService)
        {
            _bookAuthorService = bookAuthorService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var bookAuthors = await _bookAuthorService.GetAll();
            return Ok(bookAuthors);
        }

        [HttpGet("GetById")]
        public async Task<IActionResult> GetById([FromQuery] BookAuthorSearchDTO bookAuthor)
        {
            var result = await _bookAuthorService.GetById(bookAuthor);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> LinkBookToAuthor([FromBody] BookAuthorInsertDTO dto)
        {
            var result = await _bookAuthorService.LinkBookToAuthor(dto);
            return CreatedAtAction(nameof(GetById), new { bookAuthor = dto }, result);
        }

        [HttpDelete]
        public async Task<IActionResult> UnlinkBookFromAuthor([FromBody] BookAuthorInsertDTO dto)
        {
            var result = await _bookAuthorService.DeleteLinkBookToAuthor(dto);
            return Ok(result);
        }
    }
}
