using JunkDrawer.Entities;

namespace JunkDrawer.Repositories.Interfaces;

public interface IHomeRepository
{
    Task<List<Home>> GetHomesByUserId(int userId);
    Task<Home?> GetHomeById(int homeId);
    Task<int?> UpsertHome(Home home, int currentUserId);
    Task UpdateHomeImage(int homeId, int currentUserId, string imagePath);
}