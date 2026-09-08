using API.Data.Database;
using API.Layers.AuthorLayers;
using API.Layers.UrlLayers;
using API.Middleware;
using API.Types.Interfaces.IAuthor;
using API.Types.Interfaces.IUrl;
using Microsoft.AspNetCore.DataProtection.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

#region Swagger

builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "FILE API",
        Version = "v1",
        Description = "API para gerenciamento de arquivos"
    });
});

#endregion

#region Database Connection

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("DefaultConnection")
    )
);

#endregion

#region Dependency Injection

builder.Services.AddScoped<IAuthorRepository, AuthorRepository>();
builder.Services.AddScoped<IAuthorService, AuthorService>();
builder.Services.AddScoped<IUrlRepository, UrlRepository>();
builder.Services.AddScoped<IUrlService, UrlService>();
//builder.Services.AddScoped<IBookRepository, BookRepository>();
//builder.Services.AddScoped<IBookService, BookService>();
//builder.Services.AddScoped<IBookAuthorRepository, BookAuthorRepository>();
//builder.Services.AddScoped<IBookAuthorService, BookAuthorService>();




#endregion


# region CORS
var corsPolicyName = "DefaultCorsPolicy";

builder.Services.AddCors(options =>
{
    options.AddPolicy(corsPolicyName, policy =>
    {
        policy.WithOrigins("http://localhost:5174", "http://localhost:5173")
        .AllowAnyHeader()
        .AllowAnyMethod();
        // .AllowCredentials(); // só se precisar enviar cookies/auth headers, e nesse caso não pode usar AllowAnyOrigin

    });
});

#endregion


var app = builder.Build();

#region Development

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();

    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "FILE API v1");
    });
}

#endregion

app.UseMiddleware<ExceptionHandlerMiddleware>();

app.UseHttpsRedirection();

app.UseCors("DefaultCorsPolicy");

app.UseAuthorization();

app.MapControllers();

app.Run();