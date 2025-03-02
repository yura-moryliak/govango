using Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;

internal class Startup
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        var env = builder.Environment;
        var configuration = builder.Configuration;
        var allowedOrigins = configuration.GetSection("AllowedClientCorsOrigins").Get<string[]>();

        if (allowedOrigins == null || allowedOrigins.Length == 0)
        {
            Console.WriteLine("🚨 WARNING: AllowedClientCorsOrigins is missing or empty. Using fallback origins.");
            allowedOrigins = new List<string> { "http://localhost:4200", "http://localhost:4300" }.ToArray();
        }

        builder.Services.AddCors(options =>
        {
            options.AddPolicy("ClientUiPolicy", builder =>
                builder.WithOrigins(allowedOrigins!)
                       .AllowAnyHeader()
                       .WithMethods("GET", "POST", "PUT", "DELETE")
                       .AllowCredentials()
            );
        });

        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        builder.Services.AddDbContext<AppDbContext>(options =>
            options.UseMySql(builder.Configuration.GetConnectionString("MySQLConnection"),
                ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("MySQLConnection"))));

        var port = builder.Configuration.GetValue<int>("Kestrel:Endpoints:Http:Port", 4300);

        builder.WebHost.ConfigureKestrel(serverOptions =>
        {
            serverOptions.ListenAnyIP(port);
        });

        var app = builder.Build();
        
        app.UseCors("ClientUiPolicy");

        app.UseSwagger();
        app.UseSwaggerUI();

        app.UseAuthorization();

        var angularDistPath = Path.Combine(app.Environment.WebRootPath, "browser");

        if (!Directory.Exists(angularDistPath))
        {
            throw new DirectoryNotFoundException($"Angular dist folder not found: {angularDistPath}");
        }

        app.UseDefaultFiles(new DefaultFilesOptions
        {
            DefaultFileNames = new List<string> { "index.html" },
            FileProvider = new PhysicalFileProvider(angularDistPath)
        });

        app.UseStaticFiles(new StaticFileOptions
        {
            FileProvider = new PhysicalFileProvider(angularDistPath),
            RequestPath = ""
        });

        app.Use(async (context, next) =>
        {
            if (!context.Request.Path.StartsWithSegments("/api") &&
                !Path.HasExtension(context.Request.Path.Value))
            {
                context.Response.ContentType = "text/html";
                await context.Response.SendFileAsync(Path.Combine(angularDistPath, "index.html"));
                return;
            }

            await next();
        });

        app.MapControllers();

        app.Run();
    }
}