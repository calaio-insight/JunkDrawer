using JunkDrawer.Entities;

namespace JunkDrawer.Services.Interfaces;

public interface IHomeService
{
    Task<List<Home>> GetHomesByUserId(int userId);
    Task<Home?> GetHomeById(int id, int currentUserId);
    Task<int?> UpsertHome(Home home, int currentUserId);
}