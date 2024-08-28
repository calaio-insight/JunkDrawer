using JunkDrawer.Entities;
using JunkDrawer.Entities.Auth;

namespace JunkDrawer.Services.Interfaces;

public interface IUserTrustedNeighborService
{
    Task<List<UserTrustedNeighbor>> GetUserTrustedNeighborsByUserId(int userId);
    Task<User?> GetPossibleTrustedNeighborByUserEmail(string userEmail);
    Task<int?> InsertUserTrustedNeighbor(UserTrustedNeighbor userTrustedNeighbor);
    Task DeleteUserTrustedNeighbor(int userTrustedNeighborId, int currentUserId);

}