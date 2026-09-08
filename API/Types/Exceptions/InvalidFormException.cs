using System.Net;

namespace API.Types.Exceptions
{
    public class InvalidFormException:HttpException
    {
        public InvalidFormException(string message = "Input Form Have Invalid Data") : base(message, HttpStatusCode.BadRequest)
        { }
    }
}
