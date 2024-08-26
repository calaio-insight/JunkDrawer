using JunkDrawer.Entities;

namespace JunkDrawer.Repositories.Interfaces;

public interface IHomeRepository
{
    Task<List<Home>> GetHomesByUserId(string userId);
    Task<Home?> GetHomeById(int homeId);
    Task<int?> UpsertHome(Home home, string currentUserId);
}