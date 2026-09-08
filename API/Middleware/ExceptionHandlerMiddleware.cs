using API.Types.Exceptions;
using System.Text.Json;

namespace API.Middleware
{
    public class ExceptionHandlerMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IHostEnvironment _environment;
        private readonly ILogger<ExceptionHandlerMiddleware> _logger;
        public ExceptionHandlerMiddleware(RequestDelegate next, IHostEnvironment environment, ILogger<ExceptionHandlerMiddleware> logger)
        {
            this._next = next;
            this._environment = environment;
            this._logger = logger;
        }

        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                await _next(httpContext);
            }
            catch (HttpException ex)
            {

                await HandleException(ex, httpContext, (int)ex.StatusCode);
            }
            catch (Exception ex)
            {
                await HandleException(ex, httpContext, 500);
            }
        }

        public async Task HandleException(Exception ex, HttpContext httpContext, int statusCode)
        {

            _logger.LogError(ex, ex.Message);
            httpContext.Response.ContentType = "application/json";
            httpContext.Response.StatusCode = statusCode;

            var response = new
            {
                message = ex.Message,
                details = _environment.IsDevelopment() ? ex.StackTrace : ""

            };

            await httpContext.Response.WriteAsync(JsonSerializer.Serialize(response));

        }
    }
}