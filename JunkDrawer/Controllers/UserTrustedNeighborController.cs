using JunkDrawer.Entities;
using JunkDrawer.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace JunkDrawer.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class UserTrustedNeighborController : Controller
{
    private readonly ILogger<UserTrustedNeighborController> _logger;
    private readonly IUserTrustedNeighborService _userTrustedNeighborService;

    public UserTrustedNeighborController(ILogger<UserTrustedNeighborController> logger, IUserTrustedNeighborService userTrustedNeighborService)
    {
        _logger = logger;
        _userTrustedNeighborService = userTrustedNeighborService;
    }
    
    [HttpGet("GetUserTrustedNeighborsByUserId/{userId:int}", Name = "GetUserTrustedNeighborsByUserId")]
    public async Task<IActionResult> GetUserTrustedNeighborsByUserId(int userId)
    {
        try
        {
            var userTrustedNeighbors = await _userTrustedNeighborService.GetUserTrustedNeighborsByUserId(userId);
            return Ok(userTrustedNeighbors);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message);
            return NotFound();
        }
    }
    
    [HttpGet("GetPossibleTrustedNeighborByUserEmail", Name = "GetPossibleTrustedNeighborByUserEmail")]
    public async Task<IActionResult> GetPossibleTrustedNeighborByUserEmail([FromQuery] string userEmail)
    {
        try
        {
            var possibleTrustedNeighbor = await _userTrustedNeighborService.GetPossibleTrustedNeighborByUserEmail(userEmail);
            return Ok(possibleTrustedNeighbor);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message);
            return NotFound();
        }
    }
    
    [HttpPost(Name = "InsertUserTrustedNeighbor")]
    public async Task<IActionResult> InsertUserTrustedNeighbor([FromBody] UserTrustedNeighbor userTrustedNeighbor)
    {
        try
        {
            var userTrustedNeighborId = await _userTrustedNeighborService.InsertUserTrustedNeighbor(userTrustedNeighbor);
            if (userTrustedNeighborId is null or 0)
            {
                return NotFound();
            }
            return Ok(userTrustedNeighborId);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message);
            return NotFound();
        }
    }
    
    [HttpDelete("{userTrustedNeighborId:int}/{currentUserId:int}", Name = "DeleteUserTrustedNeighbor")]
    public async Task<IActionResult> DeleteUserTrustedNeighbor(int userTrustedNeighborId, int currentUserId)
    {
        try
        {
            await _userTrustedNeighborService.DeleteUserTrustedNeighbor(userTrustedNeighborId, currentUserId);
            return Ok();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message);
            return NotFound();
        }
    }
}