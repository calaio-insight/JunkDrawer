using JunkDrawer.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Graph.Models;

namespace JunkDrawer.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class UserController : Controller
{
    private readonly ILogger<UserController> _logger;
    private readonly IGraphApiService _graphApiService;

    public UserController(ILogger<UserController> logger, IGraphApiService graphApiService)
    {
        _logger = logger;
        _graphApiService = graphApiService;
    }
    
    [HttpGet("GetUserById/{userId}", Name = "GetUserById")]
    public async Task<User> GetUserById(string userId)
    {
        return await _graphApiService.GetUserById(userId);
    }

    [HttpGet("GetUserIdByEmail/{userEmail}", Name = "GetUserIdByEmail")]
    public async Task<string> GetUserIdByEmail(string userEmail)
    {
        return await _graphApiService.GetUserIdByEmail(userEmail);
    }
}