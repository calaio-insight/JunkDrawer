using JunkDrawer.Entities.Auth;
using JunkDrawer.Repositories.Interfaces;
using JunkDrawer.Services.Interfaces;

namespace JunkDrawer.Services;

public class UserService : IUserService
{
    private readonly ILogger<UserService> _logger;
    private readonly IUserRepository _userRepository;

    public UserService(ILogger<UserService> logger, IUserRepository userRepository)
    {
        _logger = logger;
        _userRepository = userRepository;
    }
    
    public async Task<User?> GetUserByEmail(string userEmail)
    {
        var user = await _userRepository.GetUserByEmail(userEmail);
        return user;
    }
    
    public async Task<User?> GetUserById(int userId)
    {
        var user = await _userRepository.GetUserById(userId);
        return user;
    }
    
    public async Task<int?> InsertUser(User user)
    {
        // Insert user with Google info
        var userId = await _userRepository.InsertUser(user);
        return userId;
    }
    
}