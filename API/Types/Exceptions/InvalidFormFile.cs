using System.Net;

namespace API.Types.Exceptions
{
    public class InvalidFormFile: HttpException
    {
        public InvalidFormFile(string message = "Form File Invalid") : base(message, HttpStatusCode.BadRequest)
        { }
    }
}
