using System.Net;

namespace API.Types.Exceptions
{
    public class InvalidHeaderException:HttpException
    {
        public InvalidHeaderException(string message = "Input Header Have Invalid Data") : base(message, HttpStatusCode.BadRequest)
        { }
    }
}
