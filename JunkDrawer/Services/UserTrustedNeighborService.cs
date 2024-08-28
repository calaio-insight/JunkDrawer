using JunkDrawer.Entities;
using JunkDrawer.Entities.Auth;
using JunkDrawer.Repositories.Interfaces;
using JunkDrawer.Services.Interfaces;

namespace JunkDrawer.Services;

public class UserTrustedNeighborService : IUserTrustedNeighborService
{
    private readonly ILogger<UserTrustedNeighborService> _logger;
    private readonly IUserTrustedNeighborRepository _userTrustedNeighborRepository;
    private readonly IUserRepository _userRepository;

    public UserTrustedNeighborService(ILogger<UserTrustedNeighborService> logger, IUserTrustedNeighborRepository userTrustedNeighborRepository, IUserRepository userRepository)
    {
        _logger = logger;
        _userTrustedNeighborRepository = userTrustedNeighborRepository;
        _userRepository = userRepository;
    }

    //Get list of trusted neighbors for current user
    public async Task<List<UserTrustedNeighbor>> GetUserTrustedNeighborsByUserId(int userId)
    {
        var userTrustedNeighbors = await _userTrustedNeighborRepository.GetUserTrustedNeighborsByUserId(userId);
        return userTrustedNeighbors;
    }

    //Search db for a specific user (w/ intention to add them to user trusted neighbor list)
    public async Task<User?> GetPossibleTrustedNeighborByUserEmail(string userEmail)
    {
        var user = await _userRepository.GetUserByEmail(userEmail);
        return user;
    }
    
    //Add a user to current user's trusted neighbor list
    public async Task<int?> InsertUserTrustedNeighbor(UserTrustedNeighbor userTrustedNeighbor)
    {
        var userTrustedNeighborId = await _userTrustedNeighborRepository.InsertUserTrustedNeighbor(userTrustedNeighbor);
        return userTrustedNeighborId;
    }
    
    //Remove a user from current user's trusted neighbor list ~ cascade remove that neighbor from all homes of current user
    public async Task DeleteUserTrustedNeighbor(int userTrustedNeighborId, int currentUserId)
    {
        await _userTrustedNeighborRepository.DeleteUserTrustedNeighbor(userTrustedNeighborId, currentUserId);
    }
}