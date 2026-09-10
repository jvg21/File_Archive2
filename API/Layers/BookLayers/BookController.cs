using API.Types.DTOs.BookDTOs;
using API.Types.Interfaces.IBook;
using Microsoft.AspNetCore.Mvc;

namespace API.Layers.BookLayers
{
    [ApiController]
    [Route("[controller]")]
    public class BookController:ControllerBase
    {
        private readonly IBookService _bookService;

        public BookController(IBookService bookService)
        {
            _bookService = bookService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var response = await _bookService.GetAll();
            return Ok(response);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var response = await _bookService.GetById(id);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> Insert([FromBody] BookInsertDTO book)
        {
            var response = await _bookService.Insert(book);
            return CreatedAtAction(nameof(GetById), new { id = response.Id }, response);
        }

        [HttpPost("array")]
        public async Task<IActionResult> InsertArray([FromBody] List<BookInsertDTO> books)
        {
            var response = await _bookService.InsertArray(books);
            return Ok(response);
        }

        [HttpPatch("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] BookUpdateDTO book)
        {
            var response = await _bookService.Update(id, book);
            return Ok(response);
        }

        [HttpPatch("status/{id:int}/{status:bool}")]
        public async Task<IActionResult> ChangeActiveStatus(int id, bool status)
        {
            var response = await _bookService.ChangeActiveStatus(id, status);
            return Ok(response);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var response = await _bookService.Delete(id);
            return Ok(response);
        }

    }
}
