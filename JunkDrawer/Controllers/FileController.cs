using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace JunkDrawer.Controllers;

[Authorize]
[Route("api/[controller]")]
public class FileController : Controller
{
    private readonly ILogger<FileController> _logger;

    public FileController(ILogger<FileController> logger)
    {
        _logger = logger;
    }
    
    [HttpPost("{homeId:int}/{currentUserId:int}", Name = "UploadFile")]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> UploadFile([FromForm] IFormFile file, int homeId, int currentUserId)
    {
        try
        {
            _logger.LogInformation("UploadFile " + file.FileName);
            return Ok();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message);
            return NotFound();
        }
    }
}