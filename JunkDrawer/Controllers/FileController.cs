using JunkDrawer.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace JunkDrawer.Controllers;

[Authorize]
[Route("api/[controller]")]
public class FileController : Controller
{
    private readonly ILogger<FileController> _logger;
    private readonly IAzureBlobService _blobService;
    private readonly IHomeService _homeService;
    private readonly IHomeItemService _homeItemService;

    public FileController(ILogger<FileController> logger, IAzureBlobService blobService, IHomeService homeService, IHomeItemService homeItemService)
    {
        _logger = logger;
        _blobService = blobService;
        _homeService = homeService;
        _homeItemService = homeItemService;
    }
    
    [HttpPost("UploadHomeIcon/{homeId:int}/{currentUserId:int}", Name = "UploadHomeIcon")]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> UploadHomeIcon([FromForm] IFormFile file, int homeId, int currentUserId)
    {
        try
        {
            const string fileName = "homeIcon.png";
            
            //Upload file to storage
            var blobUrl = await _blobService.UploadBlobAsync(file, fileName, homeId);
            
            //Update home in db with path
            await _homeService.UpdateHomeImage(homeId, currentUserId, blobUrl);
            
            return Ok();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message);
            return NotFound();
        }
    }
    
    [HttpPost("UploadHomeItemIcon/{homeId:int}/{homeItemId:int}/{currentUserId:int}", Name = "UploadHomeItemIcon")]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> UploadHomeItemIcon([FromForm] IFormFile file, int homeId, int homeItemId, int currentUserId)
    {
        try
        {
            const string fileName = "homeItemIcon.png";
            
            //Upload file to storage
            var blobUrl = await _blobService.UploadBlobAsync(file, fileName, homeId);
            
            //Update homeItem in db with path
            await _homeItemService.UpdateHomeItemImage(homeItemId, currentUserId, blobUrl);
            
            return Ok();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message);
            return NotFound();
        }
    }
}