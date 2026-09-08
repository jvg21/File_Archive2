using System.Net;

namespace API.Types.Exceptions
{
    public class UnknownException: HttpException
    {
        public UnknownException(string message = "Unknown Exception") : base(message, HttpStatusCode.InternalServerError)
        { }
    }
}
