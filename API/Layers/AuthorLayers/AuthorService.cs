using API.Layers.UrlLayers;
using API.Types.DTOs.AuthorDTOs;
using API.Types.DTOs.UrlDTOs;
using API.Types.Exceptions;
using API.Types.Interfaces.IAuthor;
using API.Types.Interfaces.IUrl;
using API.Types.Models;
using Mapster;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace API.Layers.AuthorLayers
{
    public class AuthorService : IAuthorService
    {
        private readonly IAuthorRepository _authorRepository;
        private readonly IUrlService _urlService;
        public AuthorService(IAuthorRepository authorRepository, IUrlService urlService)
        {
            this._authorRepository = authorRepository;
            this._urlService = urlService;
        }

        public async Task<List<AuthorGetDTO>> GetAll()
        {
            var request = await this._authorRepository.GetAll();
            return request.Adapt<List<AuthorGetDTO>>();
        }
        public async Task<List<AuthorMiniGetDTO>> GetAllMini()
        {
            var request = await this._authorRepository.GetAll();
            return request.Adapt<List<AuthorMiniGetDTO>>();
        }

        public async Task<AuthorGetDTO> GetById(int id)
        {
            var request = await this._authorRepository.GetById(id);
            if (request == null) throw new EntityNotFoundException($"Author with Id {id} does not exist");

            return request.Adapt<AuthorGetDTO>();
        }

        public async Task<List<Author>> Get(Expression<Func<Author, bool>> predicate)
        {
            return await this._authorRepository.Get(predicate);
        }

        public async Task<bool> Exists(Expression<Func<Author, bool>> predicate)
        {
            return await this._authorRepository.Exists(predicate);
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

            author.ApplyUpdate(dto);


            if (dto.RemoveUrls != null)
            {
                foreach (var urlId in dto.RemoveUrls)
                {
                    //var url = await _urlService.GetById(urlId);
                    var url = author.Urls.FirstOrDefault(u => u.Id == urlId);

                    if (url == null) throw new InvalidFormException("Url to remove is invalid");

                    await _urlService.ChangeState(url, EntityState.Deleted);
                }
            }

            if (dto.Urls != null)
            {
                foreach (var url in dto.Urls)
                {
                    var newUrl = url.Adapt<Url>();
                    newUrl.Author_Id = author.Id;
                    author.Urls.Add(newUrl);
                }
            }


            var request = await _authorRepository.Update(author);
            return request.Adapt<AuthorGetDTO>();

        }

        public async Task<AuthorGetDTO> ChangeActiveStatus(int id, bool status)
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
