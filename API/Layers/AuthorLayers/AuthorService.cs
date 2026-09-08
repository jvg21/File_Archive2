using API.Types.DTOs.AuthorDTOs;
using API.Types.Exceptions;
using API.Types.Models;
using API.Types.Interfaces.IAuthor;
using Mapster;

namespace API.Layers.AuthorLayers
{
    public class AuthorService:IAuthorService
    {
        private readonly IAuthorRepository _authorRepository;
        
        public AuthorService(IAuthorRepository authorRepository)
        {
            this._authorRepository = authorRepository;
        }

        public async Task<List<AuthorGetDTO>> GetAll()
        {
            var request = await this._authorRepository.GetAll();
            return request.Adapt<List<AuthorGetDTO>>();
        }
        public async  Task<AuthorGetDTO> GetById(int id)
        {
            var request = await this._authorRepository.GetById(id);
            if (request == null) throw new EntityNotFoundException();

            return request.Adapt<AuthorGetDTO>();

        }
       
        public async Task<AuthorGetDTO> Insert(AuthorInsertDTO dto)
        {
            var request = await _authorRepository.Insert(dto.Adapt<Author>());
            return request.Adapt<AuthorGetDTO>();

        }
        public async Task<AuthorGetDTO> Update(int id, AuthorUpdateDTO dto)
        {
            var author = await _authorRepository.GetById(id);
            if (author == null) throw new EntityNotFoundException();

            if (dto.Name != null) author.Name = dto.Name;
            author.IsActive = dto.IsActive ?? author.IsActive;
            var request = await _authorRepository.Update(author);
            return request.Adapt<AuthorGetDTO>();

        }

        public async Task<AuthorGetDTO> ChangeActiveStatus(int id,bool status)
        {   
            var author = await _authorRepository.GetById(id);
            if (author == null) throw new EntityNotFoundException();

            author.IsActive = status;

            var request = await _authorRepository.Update(author);
            return request.Adapt<AuthorGetDTO>();

        }

        public async Task<AuthorGetDTO> Delete(int id)
        {
            var author = await _authorRepository.GetById(id);
            if (author == null) throw new EntityNotFoundException();

            var request = await _authorRepository.Delete(author);
            return request.Adapt<AuthorGetDTO>();
        }
    }
}
