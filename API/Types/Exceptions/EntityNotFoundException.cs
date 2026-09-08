using System.Net;

namespace API.Types.Exceptions
{
    public class EntityNotFoundException : HttpException
    {
        public EntityNotFoundException(string message = "Intended Entity Not Found") : base(message, HttpStatusCode.NotFound)
        { }
    }
}
