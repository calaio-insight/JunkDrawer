using JunkDrawer.Entities;

namespace JunkDrawer.Repositories.Interfaces;

public interface IUserTrustedNeighborRepository
{
    Task<List<UserTrustedNeighbor>> GetUserTrustedNeighborsByUserId(int userId);
    Task<int?> InsertUserTrustedNeighbor(UserTrustedNeighbor userTrustedNeighbor);
    Task DeleteUserTrustedNeighbor(int userTrustedNeighborId, int currentUserId);
}