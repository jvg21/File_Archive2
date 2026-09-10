using API.Types.DTOs.UrlDTOs;
using API.Types.Exceptions;
using API.Types.Interfaces.IUrl;
using API.Types.Models;
using Mapster;
using Microsoft.EntityFrameworkCore;

namespace API.Layers.UrlLayers
{
    public class UrlService:IUrlService
    {
        private readonly IUrlRepository _urlRepository;

        public UrlService(IUrlRepository urlRepository)
        {
            this._urlRepository = urlRepository;
        }

        public async Task<List<UrlGetDTO>> GetAll()
        {
            var request = await _urlRepository.GetAll();
            return request.Adapt<List<UrlGetDTO>>();
        }
        public async Task<UrlGetDTO> GetById(int id)
        {
            var request = await _urlRepository.GetById(id);
            if (request == null) throw new EntityNotFoundException();

            return request.Adapt<UrlGetDTO>();
        }
        //Task<UrlGetDTO> Get(Expression<Func<Url, bool>> predicate);
        public async Task<UrlGetDTO> Insert(UrlInsertDTO dto)
        {
            var request = await _urlRepository.Insert(dto.Adapt<Url>());
            return request.Adapt<UrlGetDTO>();
        }
        public async Task<UrlGetDTO> Update(int id, UrlUpdateDTO dto)
        {
            var url = await _urlRepository.GetById(id);
            if (url == null) throw new EntityNotFoundException();

            if (dto.Name != null) url.Name = dto.Name;
            if (dto.Content != null) url.Content = dto.Content;

            var request = await _urlRepository.Update(url);
            return request.Adapt<UrlGetDTO>();
        }
        public async Task<UrlGetDTO> Delete(int id)
        {
            var url = await _urlRepository.GetById(id);
            if(url == null) throw new EntityNotFoundException();

            var request = await _urlRepository.Delete(url);
            return request.Adapt<UrlGetDTO>();
        }

        public async Task ChangeState(Url url, EntityState state)
        {
           
            _urlRepository.ChangeState(url, state);
        }
    }
}
