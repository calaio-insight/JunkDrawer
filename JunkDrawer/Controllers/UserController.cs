using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Google.Apis.Auth;
using JunkDrawer.Entities.Auth;
using JunkDrawer.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace JunkDrawer.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : Controller
{
    private readonly ILogger<UserController> _logger;
    private readonly IUserService _userService;
    private readonly string _clientId;
    private readonly string _jwtKey;
    private readonly string _jwtIssuer;

    public UserController(ILogger<UserController> logger, IUserService userService, IConfiguration configuration)
    {
        _logger = logger;
        _userService = userService;
        _clientId = configuration["Google:ClientId"] ?? "";
        _jwtKey = configuration["Jwt:Key"] ?? "";
        _jwtIssuer = configuration["Jwt:Issuer"] ?? "";
    }

    [HttpPost("authenticate", Name = "Authenticate")]
    public async Task<IActionResult> Authenticate([FromBody] string credential)
    {
        var settings = new GoogleJsonWebSignature.ValidationSettings()
        {
            Audience = new List<string> { _clientId }
        };
        var payload = await GoogleJsonWebSignature.ValidateAsync(credential, settings);
        if (payload == null) return Unauthorized();
        
        //Check for user in db by email
        var existingUser = await _userService.GetUserByEmail(payload.Email);
        if (existingUser == null)
        {
            //If no user found, create user
            var newUser = await Register(payload);
            existingUser = newUser;
        }
        
        //Create jwt token for user
        existingUser!.JwtToken = CreateJwtToken(existingUser!);
        return Ok(existingUser);
    }
    
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

    #region Private Methods

    private async Task<User?> Register(GoogleJsonWebSignature.Payload payload)
    {
        //if no user found, create user
        var newUser = new User
        {
            Email = payload.Email,
            FirstName = payload.GivenName,
            LastName = payload.FamilyName,
            DisplayName = payload.Name,
            PhotoUrl = payload.Picture
        };
        var userId = await _userService.InsertUser(newUser);
        if (userId is null or 0)
        {
            throw new Exception("Failed to register user for app.");
        }

        return await _userService.GetUserById((int)userId);
    }

    private string CreateJwtToken(User user)
    {
        List<Claim> claims =
        [
            new Claim(ClaimTypes.UserData, user.UserId.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Name, user.DisplayName),
            new Claim(ClaimTypes.Role, "User")
        ];
        var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_jwtKey));
        var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);
        var token = new JwtSecurityToken(_jwtIssuer, _jwtIssuer, claims: claims, expires: DateTime.Now.AddDays(1), signingCredentials: cred);
        var jwt = new JwtSecurityTokenHandler().WriteToken(token);
        return jwt;
    }
    
    #endregion
}