using Infrastructure;
using Microsoft.EntityFrameworkCore;

internal class Startup
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        var env = builder.Environment;
        var configuration = builder.Configuration;
        var allowedOrigins = configuration["AllowedClientCorsOrigin"];

        builder.Configuration
            .SetBasePath(env.ContentRootPath)
            .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
            .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true, reloadOnChange: true)
            .AddEnvironmentVariables();

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

        app.MapControllers();

        app.Run();
    }
}