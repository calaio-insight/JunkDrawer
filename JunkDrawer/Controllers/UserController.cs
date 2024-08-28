using JunkDrawer.Entities.Auth;
using JunkDrawer.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace JunkDrawer.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : Controller
{
    private readonly ILogger<UserController> _logger;
    private readonly IUserService _userService;

    public UserController(ILogger<UserController> logger, IUserService userService)
    {
        _logger = logger;
        _userService = userService;
    }
    
    //goes to db and checks for user by email, if user does not exist, return null to UI to "register" with app
    [HttpGet("GetUserByEmail", Name = "GetUserByEmail")]
    public async Task<User?> GetUserByEmail([FromQuery]string userEmail)
    {
        return await _userService.GetUserByEmail(userEmail);
    }
    
    [HttpGet("GetUserById/{userId:int}", Name = "GetUserById")]
    public async Task<User?> GetUserById(int userId)
    {
        return await _userService.GetUserById(userId);
    }
    
    //takes gmail, first, last, display and creates record in db
    //do not allow email/first/last/display to be changed from Google fields
    [HttpPost(Name = "InsertUser")]
    public async Task<IActionResult> InsertUser([FromBody] User user)
    {
        try
        {
            var userId = await _userService.InsertUser(user);
            if (userId is null or 0)
            {
                return NotFound();
            }
            return Ok(userId);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message);
            return NotFound();
        }
    }
    
    
}