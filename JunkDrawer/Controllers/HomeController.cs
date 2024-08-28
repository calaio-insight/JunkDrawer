using JunkDrawer.Entities;
using JunkDrawer.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace JunkDrawer.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly IHomeService _homeService;

    public HomeController(ILogger<HomeController> logger, IHomeService homeService)
    {
        _logger = logger;
        _homeService = homeService;
    }
    
    [HttpGet("GetHomesByUserId/{userId:int}", Name = "GetHomesByUserId")]
    public async Task<IActionResult> GetHomesByUserId(int userId)
    {
        try
        {
            var homes = await _homeService.GetHomesByUserId(userId);
            return Ok(homes);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message);
            return NotFound();
        }
    }
    
    [HttpGet("GetHomeById/{homeId:int}", Name = "GetHomeById")]
    public async Task<IActionResult> GetHomeById(int homeId)
    {
        try
        {
            var home = await _homeService.GetHomeById(homeId);
            return Ok(home);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message);
            return NotFound();
        }
    }
    
    [HttpPost("{currentUserId:int}", Name = "UpsertHome")]
    public async Task<IActionResult> UpsertHome([FromBody] Home home, int currentUserId)
    {
        try
        {
            var homeId = await _homeService.UpsertHome(home, currentUserId);
            if (homeId is null or 0)
            {
                return NotFound();
            }
            return Ok(homeId);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message);
            return NotFound();
        }
    }

}