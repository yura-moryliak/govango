using Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly AppDbContext _dbContext;

        public WeatherForecastController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("database")]
        public async Task<IActionResult> CheckDatabaseConnection()
        {
            try
            {
                await _dbContext.Database.CanConnectAsync();
                return Ok(new { status = "Healthy", message = "Database connection successful" });
            }
            catch
            {
                return StatusCode(500, new { status = "Unhealthy", message = "Database connection failed" });
            }
        }
    }
}
