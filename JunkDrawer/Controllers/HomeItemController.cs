using JunkDrawer.Entities;
using JunkDrawer.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace JunkDrawer.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class HomeItemController : Controller
{
    private readonly ILogger<HomeItemController> _logger;
    private readonly IHomeItemService _homeItemService;

    public HomeItemController(ILogger<HomeItemController> logger, IHomeItemService homeItemService)
    {
        _logger = logger;
        _homeItemService = homeItemService;
    }
    
    [HttpGet("GetHomeItemsByHomeId/{homeId:int}", Name = "GetHomeItemsByHomeId")]
    public async Task<IActionResult> GetHomeItemsByHomeId(int homeId)
    {
        try
        {
            var homeItems = await _homeItemService.GetHomeItemsByHomeId(homeId);
            return Ok(homeItems);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message);
            return NotFound();
        }
    }
    
    [HttpGet("GetHomeItemById/{homeItemId:int}", Name = "GetHomeItemById")]
    public async Task<IActionResult> GetHomeItemById(int homeItemId)
    {
        try
        {
            var homeItem = await _homeItemService.GetHomeItemById(homeItemId);
            return Ok(homeItem);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message);
            return NotFound();
        }
    }
    
    [HttpPost("{currentUserId:int}", Name = "UpsertHomeItem")]
    public async Task<IActionResult> UpsertHomeItem([FromBody] HomeItem homeItem, int currentUserId)
    {
        try
        {
            var homeItemId = await _homeItemService.UpsertHomeItem(homeItem, currentUserId);
            if (homeItemId is null or 0)
            {
                return NotFound();
            }
            return Ok(homeItemId);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message);
            return NotFound();
        }
    }
}